import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  
  return context
}

// Helper functions
export const useAuthHelpers = () => {
  const { user } = useAuth()

  const isAuthenticated = () => {
    return user !== null && user !== undefined
  }

  const isAdmin = () => {
    return user?.profile?.role === 'admin'
  }

  const isSeller = () => {
    return user?.profile?.role === 'seller'
  }

  const isBuyer = () => {
    return user?.profile?.role === 'buyer'
  }

  const hasRole = (role) => {
    return user?.profile?.role === role
  }

  const hasAnyRole = (roles) => {
    return roles.includes(user?.profile?.role)
  }

  const getUserName = () => {
    return user?.profile?.full_name || user?.email || 'User'
  }

  const getUserEmail = () => {
    return user?.email || ''
  }

  const getUserId = () => {
    return user?.id || null
  }

  const getUserRole = () => {
    return user?.profile?.role || null
  }

  return {
    isAuthenticated,
    isAdmin,
    isSeller,
    isBuyer,
    hasRole,
    hasAnyRole,
    getUserName,
    getUserEmail,
    getUserId,
    getUserRole,
  }
}

export default useAuth