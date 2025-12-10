// Property Types
export const PROPERTY_TYPES = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condo' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
]

// Property Status
export const PROPERTY_STATUS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'sold', label: 'Sold', color: 'red' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
]

// User Roles
export const USER_ROLES = [
  { value: 'admin', label: 'Admin', color: 'purple' },
  { value: 'seller', label: 'Seller', color: 'green' },
  { value: 'buyer', label: 'Buyer', color: 'blue' },
]

// Image Upload Settings
export const IMAGE_UPLOAD = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'],
  maxImages: 10,
}

// Pagination
export const PAGINATION = {
  itemsPerPage: 12,
  maxPages: 10,
}

// Price Ranges (for filters)
export const PRICE_RANGES = [
  { value: '0-100000', label: 'Under $100,000' },
  { value: '100000-250000', label: '$100,000 - $250,000' },
  { value: '250000-500000', label: '$250,000 - $500,000' },
  { value: '500000-1000000', label: '$500,000 - $1,000,000' },
  { value: '1000000-999999999', label: 'Over $1,000,000' },
]

// Popular Cities (you can customize this)
export const POPULAR_CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
]

// Countries
export const COUNTRIES = [
  'USA',
  'Canada',
  'UK',
  'Australia',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Japan',
  'China',
]