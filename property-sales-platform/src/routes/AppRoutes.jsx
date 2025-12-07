import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { RoleBasedRoute } from './RoleBasedRoute'

// Pages
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

// Temporary placeholder pages (we'll create these in later days)
const AdminDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-purple-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-purple-900 mb-4">Admin Dashboard</h1>
      <p className="text-purple-700">Coming in Day 4! 🚀</p>
    </div>
  </div>
)

const SellerDashboard = () => (
  <div className="min-h-screen flex items-center justify-center bg-green-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-green-900 mb-4">Seller Dashboard</h1>
      <p className="text-green-700">Coming in Day 3! 🚀</p>
    </div>
  </div>
)

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

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

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}