import { useState, useEffect } from 'react'
import { Upload, X } from 'lucide-react'
import { storageService } from '../../services/storageService'
import toast from 'react-hot-toast'

export default function PropertyForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'house',
    price: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    bedrooms: '',
    bathrooms: '',
    area_sqft: '',
    year_built: '',
    status: 'active',
  })

  const [images, setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        property_type: initialData.property_type || 'house',
        price: initialData.price || '',
        address: initialData.address || '',
        city: initialData.city || '',
        state: initialData.state || '',
        country: initialData.country || '',
        zip_code: initialData.zip_code || '',
        bedrooms: initialData.bedrooms || '',
        bathrooms: initialData.bathrooms || '',
        area_sqft: initialData.area_sqft || '',
        year_built: initialData.year_built || '',
        status: initialData.status || 'active',
      })

      // Set existing images
      if (initialData.property_images) {
        setImagePreviews(initialData.property_images.map(img => img.image_url))
      }
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    
    // Validate each file
    try {
      files.forEach(file => storageService.validateImageFile(file))
    } catch (error) {
      toast.error(error.message)
      return
    }

    setImages(prev => [...prev, ...files])

    // Create previews
    files.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Please enter a valid price')
      return
    }
    if (!formData.city.trim()) {
      toast.error('Please enter a city')
      return
    }

    onSubmit({ ...formData, images })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Beautiful 3 Bedroom House"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type *
            </label>
            <select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="250000"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your property..."
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="New York"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="USA"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10001"
            />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area (sqft)
            </label>
            <input
              type="number"
              name="area_sqft"
              value={formData.area_sqft}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Built
            </label>
            <input
              type="number"
              name="year_built"
              value={formData.year_built}
              onChange={handleChange}
              min="1800"
              max={new Date().getFullYear()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="2020"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Property Images</h3>
        
        <div className="mb-4">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload images</span>
            <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Status</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Listing Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : initialData ? 'Update Property' : 'Create Property'}
        </button>
      </div>
    </form>
  )
}