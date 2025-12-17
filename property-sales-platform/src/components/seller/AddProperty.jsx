import { useState } from 'react'
import PropertyForm from '../property/PropertyForm'
import { propertyService } from '../../services/propertyService'
import { storageService } from '../../services/storageService'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function AddProperty({ onSuccess }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (propertyData) => {
    setLoading(true)
    try {
      console.log('Creating property...', propertyData)

      // 1. Create property
      const newProperty = await propertyService.createProperty(propertyData, user.id)
      console.log('Property created:', newProperty.id)

      // 2. Upload images if any
      if (propertyData.images && propertyData.images.length > 0) {
        console.log('Uploading images...', propertyData.images.length)
        
        for (let i = 0; i < propertyData.images.length; i++) {
          const file = propertyData.images[i]
          const imageUrl = await storageService.uploadPropertyImage(newProperty.id, file)
          
          // Add image to property_images table
          await propertyService.addPropertyImage(newProperty.id, imageUrl, i === 0)
          console.log(`Image ${i + 1} uploaded`)
        }
      }

      toast.success('Property created successfully! 🎉')
      
      if (onSuccess) {
        onSuccess(newProperty)
      } else {
        navigate('/seller')
      }
    } catch (error) {
      console.error('Error creating property:', error)
      toast.error(error.message || 'Failed to create property')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess(null)
    } else {
      navigate('/seller')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h2>
        <PropertyForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  )
}