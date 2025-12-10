import { Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/helpers'

export default function PropertyManagement({ properties, onDeleteProperty, onUpdateStatus }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No properties found</p>
      </div>
    )
  }

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      sold: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={property.property_images?.[0]?.image_url || 'https://via.placeholder.com/100'}
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <Link 
                        to={`/property/${property.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                      >
                        {property.title}
                      </Link>
                      <p className="text-sm text-gray-500">{property.property_type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm font-medium text-gray-900">
                    {property.seller?.full_name || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">{property.seller?.email}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-semibold text-blue-600">
                    {formatPrice(property.price)}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">{property.city}</p>
                  <p className="text-xs text-gray-500">{property.country}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={property.status}
                    onChange={(e) => onUpdateStatus(property.id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(property.status)} border-0 cursor-pointer`}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/property/${property.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View property"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => onDeleteProperty(property.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}