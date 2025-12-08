import { supabase } from './supabaseClient'

export const favoriteService = {
  // Get user's favorites
  getUserFavorites: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          property:properties(
            *,
            property_images(*),
            seller:user_profiles!seller_id(full_name, email)
          )
        `)
        .eq('buyer_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get favorites error:', error)
      throw error
    }
  },

  // Check if property is favorited
  isFavorited: async (userId, propertyId) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('buyer_id', userId)
        .eq('property_id', propertyId)
        .single()

      if (error && error.code !== 'PGRST116') throw error
      return !!data
    } catch (error) {
      console.error('Check favorite error:', error)
      return false
    }
  },

  // Add to favorites
  addFavorite: async (userId, propertyId) => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .insert([{
          buyer_id: userId,
          property_id: propertyId,
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Add favorite error:', error)
      throw error
    }
  },

  // Remove from favorites
  removeFavorite: async (userId, propertyId) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('buyer_id', userId)
        .eq('property_id', propertyId)

      if (error) throw error
    } catch (error) {
      console.error('Remove favorite error:', error)
      throw error
    }
  },

  // Toggle favorite (add if not exists, remove if exists)
  toggleFavorite: async (userId, propertyId) => {
    try {
      const isFav = await favoriteService.isFavorited(userId, propertyId)
      
      if (isFav) {
        await favoriteService.removeFavorite(userId, propertyId)
        return false
      } else {
        await favoriteService.addFavorite(userId, propertyId)
        return true
      }
    } catch (error) {
      console.error('Toggle favorite error:', error)
      throw error
    }
  },
}