import { supabase } from './supabaseClient'

export const userService = {
  // Get all users (admin only)
  getAllUsers: async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get all users error:', error)
      throw error
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get user by ID error:', error)
      throw error
    }
  },

  // Update user profile
  updateUserProfile: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Update user profile error:', error)
      throw error
    }
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Delete user error:', error)
      throw error
    }
  },

  // Get users by role
  getUsersByRole: async (role) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('role', role)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get users by role error:', error)
      throw error
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('role')

      if (error) throw error

      const stats = {
        total: data.length,
        admins: data.filter(u => u.role === 'admin').length,
        sellers: data.filter(u => u.role === 'seller').length,
        buyers: data.filter(u => u.role === 'buyer').length,
      }

      return stats
    } catch (error) {
      console.error('Get user stats error:', error)
      throw error
    }
  },
}