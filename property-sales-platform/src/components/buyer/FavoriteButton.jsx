import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { favoriteService } from '../../services/favoriteService'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function FavoriteButton({ propertyId, size = 'md' }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isFavorited, setIsFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  useEffect(() => {
    if (user && user.profile?.role === 'buyer') {
      checkFavorite()
    }
  }, [user, propertyId])

  const checkFavorite = async () => {
    try {
      const favorited = await favoriteService.isFavorited(user.id, propertyId)
      setIsFavorited(favorited)
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error('Please sign in to save favorites')
      navigate('/signin')
      return
    }

    if (user.profile?.role !== 'buyer') {
      toast.error('Only buyers can save favorites')
      return
    }

    setLoading(true)
    try {
      const newState = await favoriteService.toggleFavorite(user.id, propertyId)
      setIsFavorited(newState)
      toast.success(newState ? 'Added to favorites ❤️' : 'Removed from favorites')
    } catch (error) {
      toast.error('Failed to update favorite')
    } finally {
      setLoading(false)
    }
  }

  // Only show for buyers or when not logged in
  if (user && user.profile?.role !== 'buyer') {
    return null
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`p-2 rounded-full transition-all ${
        isFavorited 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-white/80 text-gray-700 hover:bg-white backdrop-blur-sm'
      } disabled:opacity-50`}
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`${sizes[size]} ${isFavorited ? 'fill-current' : ''}`} />
    </button>
  )
}