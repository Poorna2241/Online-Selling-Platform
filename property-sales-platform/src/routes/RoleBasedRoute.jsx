import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

export const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  const userRole = user?.profile?.role

  if (!allowedRoles.includes(userRole)) {
    // Redirect based on user role
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />
    } else if (userRole === 'seller') {
      return <Navigate to="/seller" replace />
    } else {
      return <Navigate to="/" replace />
    }
  }

  return children
}