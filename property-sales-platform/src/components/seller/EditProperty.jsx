import { useState, useEffect } from 'react'
import PropertyForm from '../property/PropertyForm'
import { propertyService } from '../../services/propertyService'
import { storageService } from '../../services/storageService'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

export default function EditProperty({ propertyId, initialData, onSuccess }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [property, setProperty] = useState(initialData || null)
  const [fetchLoading, setFetchLoading] = useState(!initialData)

  useEffect(() => {
    if (!initialData && propertyId) {
      loadProperty()
    }
  }, [propertyId, initialData])

  const loadProperty = async () => {
    try {
      setFetchLoading(true)
      const data = await propertyService.getPropertyById(propertyId)
      setProperty(data)
    } catch (error) {
      console.error('Error loading property:', error)
      toast.error('Failed to load property')
      navigate('/seller')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleSubmit = async (propertyData) => {
    setLoading(true)
    try {
      console.log('Updating property...', propertyData)

      // 1. Update property data
      const updatedProperty = await propertyService.updateProperty(
        property.id, 
        propertyData
      )
      console.log('Property updated:', updatedProperty.id)

      // 2. Upload new images if any
      if (propertyData.images && propertyData.images.length > 0) {
        console.log('Uploading new images...', propertyData.images.length)
        
        for (let i = 0; i < propertyData.images.length; i++) {
          const file = propertyData.images[i]
          const imageUrl = await storageService.uploadPropertyImage(property.id, file)
          
          // Add image to property_images table
          await propertyService.addPropertyImage(property.id, imageUrl, false)
          console.log(`Image ${i + 1} uploaded`)
        }
      }

      toast.success('Property updated successfully! ✅')
      
      if (onSuccess) {
        onSuccess(updatedProperty)
      } else {
        navigate('/seller')
      }
    } catch (error) {
      console.error('Error updating property:', error)
      toast.error(error.message || 'Failed to update property')
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

  if (fetchLoading) {
    return <LoadingSpinner fullScreen />
  }

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Property not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Property</h2>
        <PropertyForm
          initialData={property}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  )
}