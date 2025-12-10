import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { propertyService } from '../services/propertyService'
import { favoriteService } from '../services/favoriteService'
import Navbar from '../components/common/Navbar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { 
  MapPin, Bed, Bath, Square, Calendar, Home as HomeIcon, 
  Heart, Phone, Mail, ArrowLeft, User 
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function PropertyDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadProperty()
  }, [id])

  useEffect(() => {
    if (user && property && user.profile?.role === 'buyer') {
      checkFavorite()
    }
  }, [user, property])

  const loadProperty = async () => {
    try {
      setLoading(true)
      const data = await propertyService.getPropertyById(id)
      setProperty(data)
    } catch (error) {
      console.error('Error loading property:', error)
      toast.error('Failed to load property')
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const checkFavorite = async () => {
    try {
      const favorited = await favoriteService.isFavorited(user.id, property.id)
      setIsFavorited(favorited)
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error('Please sign in to save favorites')
      navigate('/signin')
      return
    }

    if (user.profile?.role !== 'buyer') {
      toast.error('Only buyers can save favorites')
      return
    }

    try {
      const newState = await favoriteService.toggleFavorite(user.id, property.id)
      setIsFavorited(newState)
      toast.success(newState ? 'Added to favorites ❤️' : 'Removed from favorites')
    } catch (error) {
      toast.error('Failed to update favorite')
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      </div>
    )
  }

  const images = property.property_images || []
  const currentImage = images[selectedImage]?.image_url || 'https://via.placeholder.com/800x600?text=No+Image'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-96 lg:h-[500px]">
                <img
                  src={currentImage}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Favorite Button */}
                {user && user.profile?.role === 'buyer' && (
                  <button
                    onClick={handleFavoriteToggle}
                    className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all ${
                      isFavorited 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    property.status === 'active' 
                      ? 'bg-green-500 text-white' 
                      : property.status === 'sold'
                      ? 'bg-red-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {property.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                          selectedImage === index 
                            ? 'border-blue-600' 
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img.image_url}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {property.property_type}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.address}, {property.city}, {property.state} {property.zip_code}, {property.country}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                {property.bedrooms && (
                  <div className="flex items-center space-x-2">
                    <Bed className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                      <p className="text-sm text-gray-600">Bedrooms</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center space-x-2">
                    <Bath className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                      <p className="text-sm text-gray-600">Bathrooms</p>
                    </div>
                  </div>
                )}
                {property.area_sqft && (
                  <div className="flex items-center space-x-2">
                    <Square className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{property.area_sqft}</p>
                      <p className="text-sm text-gray-600">Sqft</p>
                    </div>
                  </div>
                )}
                {property.year_built && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{property.year_built}</p>
                      <p className="text-sm text-gray-600">Built</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description || 'No description available.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Price & Contact */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-1">Price</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${property.price.toLocaleString()}
                </p>
              </div>

              {/* Seller Info */}
              {property.seller && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{property.seller.full_name}</p>
                        <p className="text-sm text-gray-600">Property Owner</p>
                      </div>
                    </div>

                    <a
                      href={`mailto:${property.seller.email}`}
                      className="flex items-center space-x-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{property.seller.email}</span>
                    </a>

                    {property.seller.phone && (
                      <a
                        href={`tel:${property.seller.phone}`}
                        className="flex items-center space-x-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
                      >
                        <Phone className="w-5 h-5" />
                        <span>{property.seller.phone}</span>
                      </a>
                    )}
                  </div>

                  {!user && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800 mb-3">
                        Sign in to contact the seller or save this property
                      </p>
                      <button
                        onClick={() => navigate('/signin')}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}