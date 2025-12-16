import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Navbar from '../components/common/Navbar'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-blue-600">404</h1>
          </div>

          {/* Error Message */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. 
            The page might have been moved or deleted.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Home className="w-5 h-5" />
              <span>Go to Homepage</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Illustration */}
          <div className="mt-12">
            <svg
              className="w-64 h-64 mx-auto text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Popular Links */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Popular Pages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="text-blue-600 hover:text-blue-700 hover:underline">
                Browse Properties
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/signin" className="text-blue-600 hover:text-blue-700 hover:underline">
                Sign In
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/signup" className="text-blue-600 hover:text-blue-700 hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}