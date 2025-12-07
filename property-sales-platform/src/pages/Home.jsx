import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home as HomeIcon, LogOut, User } from 'lucide-react'

export default function Home() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <HomeIcon className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PropertyHub</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.profile?.full_name}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {user.profile?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Buy, sell, or rent properties with ease
          </p>
          
          {user ? (
            <div className="bg-white p-8 rounded-xl shadow-lg inline-block">
              <h2 className="text-2xl font-semibold mb-4">
                Welcome, {user.profile?.full_name}! 👋
              </h2>
              <p className="text-gray-600 mb-6">
                You're signed in as a <strong>{user.profile?.role}</strong>
              </p>
              
              <div className="flex gap-4 justify-center">
                {user.profile?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    Go to Admin Dashboard
                  </Link>
                )}
                {user.profile?.role === 'seller' && (
                  <Link
                    to="/seller"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Go to Seller Dashboard
                  </Link>
                )}
                {user.profile?.role === 'buyer' && (
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Browse Properties
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-lg font-medium"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition text-lg font-medium"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">For Buyers</h3>
            <p className="text-gray-600">
              Browse thousands of properties and save your favorites
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-semibold mb-2">For Sellers</h3>
            <p className="text-gray-600">
              List your properties and reach potential buyers instantly
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
            <p className="text-gray-600">
              Quick transactions with secure payment processing
            </p>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
    
    </div>
  )
}