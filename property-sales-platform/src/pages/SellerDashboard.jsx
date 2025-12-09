import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { propertyService } from '../services/propertyService'
import { storageService } from '../services/storageService'
import Navbar from '../components/common/Navbar'
import PropertyForm from '../components/property/PropertyForm'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { Plus, Edit, Trash2, Eye, Home as HomeIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SellerDashboard() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    if (user) {
      loadProperties()
    }
  }, [user])

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await propertyService.getSellerProperties(user.id)
      setProperties(data)
    } catch (error) {
      console.error('Error loading properties:', error)
      toast.error('Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProperty = async (propertyData) => {
    setFormLoading(true)
    try {
      // Create property
      const newProperty = await propertyService.createProperty(propertyData, user.id)

      // Upload images if any
      if (propertyData.images && propertyData.images.length > 0) {
        for (let i = 0; i < propertyData.images.length; i++) {
          const file = propertyData.images[i]
          const imageUrl = await storageService.uploadPropertyImage(newProperty.id, file)
          await propertyService.addPropertyImage(newProperty.id, imageUrl, i === 0)
        }
      }

      toast.success('Property created successfully! 🎉')
      setShowForm(false)
      loadProperties()
    } catch (error) {
      console.error('Error creating property:', error)
      toast.error('Failed to create property')
    } finally {
      setFormLoading(false)
    }
  }

  const handleUpdateProperty = async (propertyData) => {
    setFormLoading(true)
    try {
      // Update property
      await propertyService.updateProperty(editingProperty.id, propertyData)

      // Upload new images if any
      if (propertyData.images && propertyData.images.length > 0) {
        for (const file of propertyData.images) {
          const imageUrl = await storageService.uploadPropertyImage(editingProperty.id, file)
          await propertyService.addPropertyImage(editingProperty.id, imageUrl)
        }
      }

      toast.success('Property updated successfully! ✅')
      setShowForm(false)
      setEditingProperty(null)
      loadProperties()
    } catch (error) {
      console.error('Error updating property:', error)
      toast.error('Failed to update property')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      await propertyService.deleteProperty(propertyId)
      toast.success('Property deleted successfully')
      loadProperties()
    } catch (error) {
      console.error('Error deleting property:', error)
      toast.error('Failed to delete property')
    }
  }

  const handleEditClick = (property) => {
    setEditingProperty(property)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  // Calculate stats
  const stats = {
    total: properties.length,
    active: properties.filter(p => p.status === 'active').length,
    sold: properties.filter(p => p.status === 'sold').length,
    pending: properties.filter(p => p.status === 'pending').length,
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Seller Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your property listings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <HomeIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Listings</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Sold Properties</p>
                <p className="text-3xl font-bold text-purple-600">{stats.sold}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Trash2 className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Edit className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Property Button */}
        {!showForm && (
          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Property</span>
            </button>
          </div>
        )}

        {/* Property Form */}
        {showForm && (
          <div className="mb-8">
            <div className="bg-gray-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <PropertyForm
                initialData={editingProperty}
                onSubmit={editingProperty ? handleUpdateProperty : handleCreateProperty}
                onCancel={handleCancelForm}
                loading={formLoading}
              />
            </div>
          </div>
        )}

        {/* Properties List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">My Properties</h2>
          </div>

          {properties.length === 0 ? (
            <div className="p-12 text-center">
              <HomeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Properties Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start by adding your first property listing
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Property
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Property
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={property.property_images?.[0]?.image_url || 'https://via.placeholder.com/100'}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{property.title}</p>
                            <p className="text-sm text-gray-500">{property.property_type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-semibold text-blue-600">
                          ${property.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{property.city}</p>
                        <p className="text-xs text-gray-500">{property.country}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          property.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : property.status === 'sold'
                            ? 'bg-red-100 text-red-800'
                            : property.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {property.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditClick(property)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}