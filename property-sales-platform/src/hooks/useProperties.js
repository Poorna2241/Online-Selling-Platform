import { useState, useEffect } from 'react'
import { propertyService } from '../services/propertyService'

export const useProperties = (filters = {}, dependencies = []) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProperties()
  }, dependencies)

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getAllProperties(filters)
      setProperties(data)
    } catch (err) {
      setError(err.message)
      console.error('Error loading properties:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    loadProperties()
  }

  return { 
    properties, 
    loading, 
    error, 
    refetch 
  }
}

export default useProperties