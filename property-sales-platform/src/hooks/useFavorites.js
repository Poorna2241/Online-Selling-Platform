import { useState, useEffect } from 'react'
import { favoriteService } from '../services/favoriteService'
import { useAuth } from '../context/AuthContext'

export const useFavorites = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user && user.profile?.role === 'buyer') {
      loadFavorites()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadFavorites = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await favoriteService.getUserFavorites(user.id)
      setFavorites(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading favorites:', err)
    } finally {
      setLoading(false)
    }
  }

  const isFavorited = (propertyId) => {
    return favorites.some(fav => fav.property_id === propertyId)
  }

  const toggleFavorite = async (propertyId) => {
    try {
      const newState = await favoriteService.toggleFavorite(user.id, propertyId)
      await loadFavorites() // Reload favorites
      return newState
    } catch (err) {
      console.error('Error toggling favorite:', err)
      throw err
    }
  }

  return {
    favorites,
    loading,
    error,
    isFavorited,
    toggleFavorite,
    refetch: loadFavorites,
  }
}

export default useFavorites