import { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { storageService } from '../../services/storageService'
import toast from 'react-hot-toast'

export default function PropertyImageUploader({ images, setImages, maxImages = 10 }) {
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)

    if (images.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`)
      return
    }

    // Validate each file
    const validFiles = []
    for (const file of files) {
      try {
        storageService.validateImageFile(file)
        validFiles.push(file)
      } catch (error) {
        toast.error(`${file.name}: ${error.message}`)
      }
    }

    if (validFiles.length === 0) return

    // Add to images array
    setImages([...images, ...validFiles])

    // Create previews
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews((prev) => [...prev, reader.result])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
    setPreviews(previews.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition">
        <label className="flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-700 mb-1">
            Click to upload images
          </span>
          <span className="text-xs text-gray-500">
            PNG, JPG, WEBP up to 10MB ({images.length}/{maxImages})
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            disabled={images.length >= maxImages}
          />
        </label>
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              {index === 0 && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  Primary
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs p-1 rounded text-center opacity-0 group-hover:opacity-100 transition">
                {images[index]?.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {images.length === 0 && (
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <ImageIcon className="w-4 h-4" />
          <span>No images uploaded yet. The first image will be the primary image.</span>
        </div>
      )}
    </div>
  )
}