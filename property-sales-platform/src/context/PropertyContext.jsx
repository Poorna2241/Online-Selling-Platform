import { createContext, useContext, useState, useEffect } from 'react'
import { propertyService } from '../services/propertyService'

const PropertyContext = createContext({})

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error('useProperty must be used within PropertyProvider')
  }
  return context
}

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    loadProperties()
  }, [filters])

  const loadProperties = async () => {
    try {
      setLoading(true)
      const data = await propertyService.getAllProperties(filters)
      setProperties(data)
    } catch (error) {
      console.error('Error loading properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const addProperty = async (propertyData) => {
    try {
      const newProperty = await propertyService.createProperty(propertyData)
      setProperties([newProperty, ...properties])
      return newProperty
    } catch (error) {
      console.error('Error adding property:', error)
      throw error
    }
  }

  const updateProperty = async (id, propertyData) => {
    try {
      const updatedProperty = await propertyService.updateProperty(id, propertyData)
      setProperties(properties.map(p => p.id === id ? updatedProperty : p))
      return updatedProperty
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  }

  const deleteProperty = async (id) => {
    try {
      await propertyService.deleteProperty(id)
      setProperties(properties.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  }

  const applyFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const value = {
    properties,
    loading,
    filters,
    addProperty,
    updateProperty,
    deleteProperty,
    applyFilters,
    refetch: loadProperties,
  }

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  )
}