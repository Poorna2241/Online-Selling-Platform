import { supabase } from './supabaseClient'

export const authService = {
  // Sign up new user
  signUp: async (email, password, userData) => {
    try {
      console.log('🔵 Step 1: Creating auth user...')
      
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        console.error('❌ Auth error:', authError)
        throw authError
      }

      if (!authData.user) {
        throw new Error('User creation failed')
      }

      console.log('✅ Step 2: Auth user created:', authData.user.id)

      // 2. Create or update user profile manually
      console.log('🔵 Step 3: Creating user profile...')
      
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: authData.user.id,
          email: email,
          full_name: userData.fullName,
          phone: userData.phone || null,
          role: userData.role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        })
        .select()

      if (profileError) {
        console.error('❌ Profile error:', profileError)
        // If profile creation fails, delete the auth user
        await supabase.auth.admin.deleteUser(authData.user.id)
        throw new Error('Failed to create user profile: ' + profileError.message)
      }

      console.log('✅ Step 4: Profile created successfully!')
      console.log('✅ Final role:', userData.role)

      return authData
    } catch (error) {
      console.error('❌ Sign up error:', error)
      throw error
    }
  },

  // Sign in existing user
  signIn: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      console.log('✅ Sign in successful')
      return data
    } catch (error) {
      console.error('❌ Sign in error:', error)
      throw error
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      console.log('✅ Sign out successful')
    } catch (error) {
      console.error('❌ Sign out error:', error)
      throw error
    }
  },

  // Get current user with profile
  getCurrentUser: async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()

      if (userError) throw userError
      if (!user) return null

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) {
        console.error('❌ Profile fetch error:', profileError)
        throw profileError
      }

      console.log('✅ Current user:', user.email, '| Role:', profile?.role)
      return { ...user, profile }
    } catch (error) {
      console.error('❌ Get current user error:', error)
      return null
    }
  },

  // Get user's role
  getUserRole: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data?.role
    } catch (error) {
      console.error('❌ Get user role error:', error)
      return null
    }
  },
}