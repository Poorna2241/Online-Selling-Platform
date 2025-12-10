import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { favoriteService } from '../services/favoriteService'
import Navbar from '../components/common/Navbar'
import PropertyCard from '../components/property/PropertyCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { Heart } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FavoritesPage() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadFavorites()
    }
  }, [user])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      const data = await favoriteService.getUserFavorites(user.id)
      setFavorites(data)
    } catch (error) {
      console.error('Error loading favorites:', error)
      toast.error('Failed to load favorites')
    } finally {
      setLoading(false)
    }
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
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="w-8 h-8 text-red-600 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          </div>
          <p className="text-gray-600">
            Properties you've saved for later
          </p>
        </div>

        {/* Favorites Count */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Favorites</p>
              <p className="text-3xl font-bold text-red-600">{favorites.length}</p>
            </div>
            <Heart className="w-16 h-16 text-red-100" />
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-6 bg-red-50 rounded-full mb-4">
              <Heart className="w-16 h-16 text-red-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              No Favorites Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring properties and save your favorites!
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Properties
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <PropertyCard
                key={favorite.id}
                property={favorite.property}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}