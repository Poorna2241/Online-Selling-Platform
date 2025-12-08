import { supabase } from './supabaseClient'

export const propertyService = {
  // Get all active properties (for public viewing)
  getAllProperties: async (filters = {}) => {
    try {
      let query = supabase
        .from('properties')
        .select(`
          *,
          seller:user_profiles!seller_id(id, full_name, email, phone, profile_image_url),
          property_images(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      // Apply filters if provided
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`)
      }
      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType)
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice)
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice)
      }
      if (filters.bedrooms) {
        query = query.gte('bedrooms', filters.bedrooms)
      }

      const { data, error } = await query

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get properties error:', error)
      throw error
    }
  },

  // Get single property by ID
  getPropertyById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          seller:user_profiles!seller_id(id, full_name, email, phone, profile_image_url),
          property_images(*)
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get property by ID error:', error)
      throw error
    }
  },

  // Get properties by seller ID
  getSellerProperties: async (sellerId) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          property_images(*)
        `)
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get seller properties error:', error)
      throw error
    }
  },

  // Create new property
  createProperty: async (propertyData, userId) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([{
          ...propertyData,
          seller_id: userId,
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Create property error:', error)
      throw error
    }
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Update property error:', error)
      throw error
    }
  },

  // Delete property
  deleteProperty: async (id) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Delete property error:', error)
      throw error
    }
  },

  // Add property image
  addPropertyImage: async (propertyId, imageUrl, isPrimary = false) => {
    try {
      const { data, error } = await supabase
        .from('property_images')
        .insert([{
          property_id: propertyId,
          image_url: imageUrl,
          is_primary: isPrimary,
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Add property image error:', error)
      throw error
    }
  },

  // Delete property image
  deletePropertyImage: async (imageId) => {
    try {
      const { error } = await supabase
        .from('property_images')
        .delete()
        .eq('id', imageId)

      if (error) throw error
    } catch (error) {
      console.error('Delete property image error:', error)
      throw error
    }
  },

  // Get all properties (admin only - includes all statuses)
  getAllPropertiesAdmin: async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          seller:user_profiles!seller_id(id, full_name, email),
          property_images(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Get all properties admin error:', error)
      throw error
    }
  },
}