import { supabase } from './supabaseClient'

export const storageService = {
  // Upload property image
  uploadPropertyImage: async (propertyId, file) => {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${propertyId}/${fileName}`

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Upload property image error:', error)
      throw error
    }
  },

  // Upload profile image
  uploadProfileImage: async (userId, file) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `profile.${fileExt}`
      const filePath = `${userId}/${fileName}`

      // Upload file (upsert to replace existing)
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Upload profile image error:', error)
      throw error
    }
  },

  // Delete property image
  deletePropertyImage: async (imageUrl) => {
    try {
      // Extract path from URL
      const urlParts = imageUrl.split('/property-images/')
      if (urlParts.length < 2) throw new Error('Invalid image URL')
      
      const path = urlParts[1]

      const { error } = await supabase.storage
        .from('property-images')
        .remove([path])

      if (error) throw error
    } catch (error) {
      console.error('Delete property image error:', error)
      throw error
    }
  },

  // Delete profile image
  deleteProfileImage: async (userId) => {
    try {
      const { error } = await supabase.storage
        .from('profile-images')
        .remove([`${userId}/profile.jpg`, `${userId}/profile.png`, `${userId}/profile.jpeg`])

      if (error) throw error
    } catch (error) {
      console.error('Delete profile image error:', error)
      throw error
    }
  },

  // Validate image file
  validateImageFile: (file) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif']

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed.')
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 10MB.')
    }

    return true
  },
}