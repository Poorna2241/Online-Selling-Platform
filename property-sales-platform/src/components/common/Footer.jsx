import { Home, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Home className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-white">PropertyHub</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Your trusted platform for buying, selling, and discovering properties. 
              Find your dream home with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-blue-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm hover:text-blue-500 transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-sm hover:text-blue-500 transition">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm hover:text-blue-500 transition">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-blue-500 transition">
                  For Buyers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-500 transition">
                  For Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-500 transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-blue-500 transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-blue-500" />
                <a href="mailto:info@propertyhub.com" className="hover:text-blue-500 transition">
                  info@propertyhub.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-blue-500" />
                <a href="tel:+1234567890" className="hover:text-blue-500 transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-sm text-gray-400">
                123 Real Estate Ave<br />
                New York, NY 10001<br />
                United States
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {currentYear} PropertyHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-blue-500 transition">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-blue-500 transition">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-blue-500 transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}