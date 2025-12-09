// 

import { supabase } from './supabaseClient'

export const authService = {
  // Sign up new user
  signUp: async (email, password, userData) => {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) throw authError

      // 2. Wait a moment for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 3. Update user profile with correct role and additional info
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({
            full_name: userData.fullName,
            phone: userData.phone,
            role: userData.role, // This will update the role from 'buyer' to selected role
          })
          .eq('id', authData.user.id)

        if (profileError) {
          console.error('Profile update error:', profileError)
          throw profileError
        }

        // 4. Verify the update worked
        const { data: verifyProfile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single()

        console.log('✅ Profile created with role:', verifyProfile?.role)
      }

      return authData
    } catch (error) {
      console.error('Sign up error:', error)
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
      return data
    } catch (error) {
      console.error('Sign in error:', error)
      throw error
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Sign out error:', error)
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

      if (profileError) throw profileError

      return { ...user, profile }
    } catch (error) {
      console.error('Get current user error:', error)
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
      console.error('Get user role error:', error)
      return null
    }
  },
}