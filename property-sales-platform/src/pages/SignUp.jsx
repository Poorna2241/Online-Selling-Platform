// 

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabaseClient } from '../services/supabaseClient'
import '../styles/auth.css'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      // 1. Sign up user with Supabase Auth
      const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError

      const userId = authData.user.id
      console.log('User created with ID:', userId)

      // 2. Create user profile in user_profiles table
      const { data: profileData, error: profileError } = await supabaseClient
        .from('user_profiles')
        .insert([
          {
            id: userId,
            email: formData.email,
            full_name: formData.fullName,
            phone: formData.phone || null,
            role: formData.role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        ])
        .select()

      if (profileError) {
        console.error('Profile creation error:', profileError)
        throw profileError
      }

      console.log('Profile created:', profileData)

      alert('Account created successfully! Please check your email to verify.')

      // Redirect based on role
      setTimeout(() => {
        if (formData.role === 'seller') {
          navigate('/seller-dashboard')
        } else if (formData.role === 'admin') {
          navigate('/admin-dashboard')
        } else {
          navigate('/home')
        }
      }, 1000)

    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ submit: error.message || 'Error creating account' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-input"
            />
            {errors.fullName && <span className="error">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
              className="form-input"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="form-input"
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">I am a: *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {errors.submit && (
            <div className="error-box">
              <span className="error">{errors.submit}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)