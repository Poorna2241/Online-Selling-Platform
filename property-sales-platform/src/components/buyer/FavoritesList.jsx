import PropertyCard from '../property/PropertyCard'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FavoritesList({ favorites, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="h-56 bg-gray-300"></div>
            <div className="p-5 space-y-3">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!favorites || favorites.length === 0) {
    return (
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
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse Properties
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          You have <strong className="text-blue-600">{favorites.length}</strong> favorite {favorites.length === 1 ? 'property' : 'properties'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <PropertyCard
            key={favorite.id}
            property={favorite.property}
          />
        ))}
      </div>
    </div>
  )
}