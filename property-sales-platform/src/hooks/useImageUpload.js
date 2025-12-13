import { useState } from 'react'
import { storageService } from '../services/storageService'
import toast from 'react-hot-toast'

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadPropertyImages = async (propertyId, files) => {
    setUploading(true)
    setProgress(0)
    const uploadedUrls = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validate file
        storageService.validateImageFile(file)
        
        // Upload file
        const url = await storageService.uploadPropertyImage(propertyId, file)
        uploadedUrls.push(url)
        
        // Update progress
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      return uploadedUrls
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Failed to upload images')
      throw error
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const uploadProfileImage = async (userId, file) => {
    setUploading(true)
    setProgress(0)

    try {
      // Validate file
      storageService.validateImageFile(file)
      
      // Upload file
      const url = await storageService.uploadProfileImage(userId, file)
      setProgress(100)
      
      return url
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Failed to upload image')
      throw error
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const deleteImage = async (imageUrl) => {
    try {
      await storageService.deletePropertyImage(imageUrl)
      toast.success('Image deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete image')
      throw error
    }
  }

  return {
    uploading,
    progress,
    uploadPropertyImages,
    uploadProfileImage,
    deleteImage,
  }
}

export default useImageUpload