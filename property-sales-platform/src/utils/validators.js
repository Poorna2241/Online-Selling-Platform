/* ================================================
   VALIDATION FUNCTIONS
   ================================================ */

// Email validation
export const validateEmail = (email) => {
  const errors = []
  
  if (!email) {
    errors.push('Email is required')
    return { isValid: false, errors }
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Password validation
export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Password is required')
    return { isValid: false, errors }
  }
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }
  
  if (password.length > 50) {
    errors.push('Password must be less than 50 characters')
  }
  
  // Optional: Add more strict requirements
  // if (!/[A-Z]/.test(password)) {
  //   errors.push('Password must contain at least one uppercase letter')
  // }
  
  // if (!/[a-z]/.test(password)) {
  //   errors.push('Password must contain at least one lowercase letter')
  // }
  
  // if (!/[0-9]/.test(password)) {
  //   errors.push('Password must contain at least one number')
  // }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Phone validation
export const validatePhone = (phone) => {
  const errors = []
  
  if (!phone) {
    // Phone is optional
    return { isValid: true, errors: [] }
  }
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (cleanPhone.length < 10) {
    errors.push('Phone number must be at least 10 digits')
  }
  
  if (cleanPhone.length > 15) {
    errors.push('Phone number must be less than 15 digits')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Name validation
export const validateName = (name, fieldName = 'Name') => {
  const errors = []
  
  if (!name || !name.trim()) {
    errors.push(`${fieldName} is required`)
    return { isValid: false, errors }
  }
  
  if (name.trim().length < 2) {
    errors.push(`${fieldName} must be at least 2 characters`)
  }
  
  if (name.trim().length > 100) {
    errors.push(`${fieldName} must be less than 100 characters`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Property title validation
export const validatePropertyTitle = (title) => {
  const errors = []
  
  if (!title || !title.trim()) {
    errors.push('Property title is required')
    return { isValid: false, errors }
  }
  
  if (title.trim().length < 10) {
    errors.push('Title must be at least 10 characters')
  }
  
  if (title.trim().length > 200) {
    errors.push('Title must be less than 200 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Price validation
export const validatePrice = (price) => {
  const errors = []
  
  if (!price && price !== 0) {
    errors.push('Price is required')
    return { isValid: false, errors }
  }
  
  const numPrice = parseFloat(price)
  
  if (isNaN(numPrice)) {
    errors.push('Price must be a valid number')
  } else if (numPrice <= 0) {
    errors.push('Price must be greater than 0')
  } else if (numPrice > 1000000000) {
    errors.push('Price is too high')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Description validation
export const validateDescription = (description, isRequired = false) => {
  const errors = []
  
  if (isRequired && (!description || !description.trim())) {
    errors.push('Description is required')
    return { isValid: false, errors }
  }
  
  if (description && description.trim().length > 5000) {
    errors.push('Description must be less than 5000 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Address validation
export const validateAddress = (address) => {
  const errors = []
  
  if (!address || !address.trim()) {
    errors.push('Address is required')
    return { isValid: false, errors }
  }
  
  if (address.trim().length < 5) {
    errors.push('Address must be at least 5 characters')
  }
  
  if (address.trim().length > 500) {
    errors.push('Address must be less than 500 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// City validation
export const validateCity = (city) => {
  const errors = []
  
  if (!city || !city.trim()) {
    errors.push('City is required')
    return { isValid: false, errors }
  }
  
  if (city.trim().length < 2) {
    errors.push('City must be at least 2 characters')
  }
  
  if (city.trim().length > 100) {
    errors.push('City must be less than 100 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Zip code validation
export const validateZipCode = (zipCode, isRequired = false) => {
  const errors = []
  
  if (!zipCode) {
    if (isRequired) {
      errors.push('Zip code is required')
    }
    return { isValid: !isRequired, errors }
  }
  
  // Remove spaces and hyphens
  const cleanZip = zipCode.replace(/[\s-]/g, '')
  
  if (cleanZip.length < 3) {
    errors.push('Zip code must be at least 3 characters')
  }
  
  if (cleanZip.length > 10) {
    errors.push('Zip code must be less than 10 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Number range validation
export const validateNumberRange = (value, min, max, fieldName = 'Value') => {
  const errors = []
  
  if (value === null || value === undefined || value === '') {
    return { isValid: true, errors: [] } // Optional field
  }
  
  const numValue = parseFloat(value)
  
  if (isNaN(numValue)) {
    errors.push(`${fieldName} must be a valid number`)
  } else {
    if (min !== undefined && numValue < min) {
      errors.push(`${fieldName} must be at least ${min}`)
    }
    
    if (max !== undefined && numValue > max) {
      errors.push(`${fieldName} must be at most ${max}`)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Year validation
export const validateYear = (year, isRequired = false) => {
  const errors = []
  const currentYear = new Date().getFullYear()
  
  if (!year) {
    if (isRequired) {
      errors.push('Year is required')
    }
    return { isValid: !isRequired, errors }
  }
  
  const numYear = parseInt(year)
  
  if (isNaN(numYear)) {
    errors.push('Year must be a valid number')
  } else if (numYear < 1800) {
    errors.push('Year must be 1800 or later')
  } else if (numYear > currentYear + 5) {
    errors.push(`Year cannot be more than ${currentYear + 5}`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// File validation
export const validateFile = (file, allowedTypes = [], maxSize = 10 * 1024 * 1024) => {
  const errors = []
  
  if (!file) {
    errors.push('File is required')
    return { isValid: false, errors }
  }
  
  // Check file type
  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`)
  }
  
  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2)
    errors.push(`File size must be less than ${maxSizeMB}MB`)
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// URL validation
export const validateUrl = (url, isRequired = false) => {
  const errors = []
  
  if (!url) {
    if (isRequired) {
      errors.push('URL is required')
    }
    return { isValid: !isRequired, errors }
  }
  
  try {
    new URL(url)
  } catch (e) {
    errors.push('Please enter a valid URL')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Property form validation
export const validatePropertyForm = (formData) => {
  const errors = {}
  
  // Title
  const titleValidation = validatePropertyTitle(formData.title)
  if (!titleValidation.isValid) {
    errors.title = titleValidation.errors
  }
  
  // Price
  const priceValidation = validatePrice(formData.price)
  if (!priceValidation.isValid) {
    errors.price = priceValidation.errors
  }
  
  // Address
  const addressValidation = validateAddress(formData.address)
  if (!addressValidation.isValid) {
    errors.address = addressValidation.errors
  }
  
  // City
  const cityValidation = validateCity(formData.city)
  if (!cityValidation.isValid) {
    errors.city = cityValidation.errors
  }
  
  // Description (optional)
  if (formData.description) {
    const descValidation = validateDescription(formData.description)
    if (!descValidation.isValid) {
      errors.description = descValidation.errors
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// User signup validation
export const validateSignupForm = (formData) => {
  const errors = {}
  
  // Name
  const nameValidation = validateName(formData.fullName, 'Full name')
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.errors
  }
  
  // Email
  const emailValidation = validateEmail(formData.email)
  if (!emailValidation.isValid) {
    errors.email = emailValidation.errors
  }
  
  // Password
  const passwordValidation = validatePassword(formData.password)
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors
  }
  
  // Confirm password
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = ['Passwords do not match']
  }
  
  // Phone (optional)
  if (formData.phone) {
    const phoneValidation = validatePhone(formData.phone)
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.errors
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export default {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
  validatePropertyTitle,
  validatePrice,
  validateDescription,
  validateAddress,
  validateCity,
  validateZipCode,
  validateNumberRange,
  validateYear,
  validateFile,
  validateUrl,
  validatePropertyForm,
  validateSignupForm,
}