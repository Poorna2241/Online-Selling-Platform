import { AlertCircle, X } from 'lucide-react'

export default function ErrorMessage({ message, onClose, type = 'error' }) {
  if (!message) return null

  const styles = {
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'text-red-600',
      button: 'text-red-600 hover:bg-red-100',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: 'text-yellow-600',
      button: 'text-yellow-600 hover:bg-yellow-100',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'text-blue-600',
      button: 'text-blue-600 hover:bg-blue-100',
    },
  }

  const currentStyle = styles[type] || styles.error

  return (
    <div className={`flex items-start p-4 border rounded-lg ${currentStyle.container}`}>
      <AlertCircle className={`w-5 h-5 mr-3 flex-shrink-0 ${currentStyle.icon}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`ml-3 flex-shrink-0 p-1 rounded-lg transition ${currentStyle.button}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}