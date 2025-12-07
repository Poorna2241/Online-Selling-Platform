import { supabase } from './supabaseClient'

export const authService = {
  // Sign up new user
  signUp: async (email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) throw error
    
    // Update user profile with role and additional info
    if (data.user) {
      await supabase
        .from('user_profiles')
        .update({
          full_name: userData.fullName,
          phone: userData.phone,
          role: userData.role,
        })
        .eq('id', data.user.id)
    }
    
    return data
  },

  // Sign in
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user with profile
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      return { ...user, profile }
    }
    
    return null
  },
}