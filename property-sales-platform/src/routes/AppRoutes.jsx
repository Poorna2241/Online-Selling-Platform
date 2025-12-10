import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleBasedRoute } from './RoleBasedRoute'

// Pages
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

// Import other pages only if they exist
let SellerDashboard, AdminDashboard, FavoritesPage, PropertyDetailsPage

try {
  SellerDashboard = require('../pages/SellerDashboard').default
} catch {
  SellerDashboard = () => <div className="p-8 text-center">Seller Dashboard - Coming Soon</div>
}

try {
  AdminDashboard = require('../pages/AdminDashboard').default
} catch {
  AdminDashboard = () => <div className="p-8 text-center">Admin Dashboard - Coming Soon</div>
}

try {
  FavoritesPage = require('../pages/FavoritesPage').default
} catch {
  FavoritesPage = () => <div className="p-8 text-center">Favorites - Coming Soon</div>
}

try {
  PropertyDetailsPage = require('../pages/PropertyDetailsPage').default
} catch {
  PropertyDetailsPage = () => <div className="p-8 text-center">Property Details - Coming Soon</div>
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />

        {/* Protected Routes - Admin Only */}
        <Route
          path="/admin"
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Protected Routes - Seller & Admin */}
        <Route
          path="/seller"
          element={
            <RoleBasedRoute allowedRoles={['seller', 'admin']}>
              <SellerDashboard />
            </RoleBasedRoute>
          }
        />

        {/* Protected Routes - Buyer Only */}
        <Route
          path="/favorites"
          element={
            <RoleBasedRoute allowedRoles={['buyer']}>
              <FavoritesPage />
            </RoleBasedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}