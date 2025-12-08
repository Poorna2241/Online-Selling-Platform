import { Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { favoriteService } from '../../services/favoriteService'
import toast from 'react-hot-toast'

export default function PropertyCard({ property }) {
  const { user } = useAuth()
  const [isFavorited, setIsFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  // Get primary image or first image
  const primaryImage = property.property_images?.find(img => img.is_primary) || 
                       property.property_images?.[0]
  const imageUrl = primaryImage?.image_url || 'https://via.placeholder.com/400x300?text=No+Image'

  useEffect(() => {
    if (user && user.profile?.role === 'buyer') {
      checkFavorite()
    }
  }, [user, property.id])

  const checkFavorite = async () => {
    try {
      const favorited = await favoriteService.isFavorited(user.id, property.id)
      setIsFavorited(favorited)
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error('Please sign in to save favorites')
      return
    }

    if (user.profile?.role !== 'buyer') {
      toast.error('Only buyers can save favorites')
      return
    }

    setLoading(true)
    try {
      const newState = await favoriteService.toggleFavorite(user.id, property.id)
      setIsFavorited(newState)
      toast.success(newState ? 'Added to favorites ❤️' : 'Removed from favorites')
    } catch (error) {
      toast.error('Failed to update favorite')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Link to={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Favorite Button (Buyers only) */}
          {user && user.profile?.role === 'buyer' && (
            <button
              onClick={handleFavoriteClick}
              disabled={loading}
              className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                isFavorited 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

        {/* Content */}
        <div className="p-5">
          {/* Price */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-blue-600">
              ${property.price.toLocaleString()}
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {property.property_type}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h4>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm line-clamp-1">
              {property.city}, {property.country}
            </span>
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-gray-700 pt-3 border-t">
            {property.bedrooms && (
              <div className="flex items-center space-x-1">
                <Bed className="w-4 h-4" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center space-x-1">
                <Bath className="w-4 h-4" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
            )}
            {property.area_sqft && (
              <div className="flex items-center space-x-1">
                <Square className="w-4 h-4" />
                <span className="text-sm">{property.area_sqft} sqft</span>
              </div>
            )}
          </div>

          {/* Seller Info */}
          {property.seller && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">
                Listed by <span className="font-medium text-gray-700">{property.seller.full_name}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}