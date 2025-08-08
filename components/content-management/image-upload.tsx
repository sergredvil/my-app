'use client'

import { useState, useRef, useCallback } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  onRemove?: () => void
  placeholder?: string
  accept?: string
  maxSizeMB?: number
  width?: number
  height?: number
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  placeholder = "Upload an image",
  accept = "image/*",
  maxSizeMB = 5,
  width,
  height,
  className = ""
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file'
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must be less than ${maxSizeMB}MB`
    }
    
    return null
  }, [maxSizeMB])

  const handleFileUpload = useCallback(async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // For demo purposes, we'll convert to base64
      // In production, you'd upload to a cloud service like Cloudinary, AWS S3, etc.
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
        setIsUploading(false)
      }
      reader.onerror = () => {
        setError('Failed to read file')
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError('Upload failed. Please try again.')
      setIsUploading(false)
    }
  }, [validateFile, onChange])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [handleFileUpload])

  const handleUrlInput = useCallback((url: string) => {
    if (url.trim()) {
      onChange(url.trim())
      setError(null)
    }
  }, [onChange])

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleRemove = useCallback(() => {
    if (onRemove) {
      onRemove()
    } else {
      onChange('')
    }
    setError(null)
  }, [onChange, onRemove])

  if (value) {
    return (
      <div className={`relative group ${className}`}>
        <div 
          className="relative overflow-hidden rounded-lg border-2 border-gray-200"
          style={{ width, height }}
        >
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-2">
              <button
                onClick={triggerFileSelect}
                className="px-3 py-2 bg-white text-gray-900 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Replace
              </button>
              <button
                onClick={handleRemove}
                className="px-3 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        style={{ width, height: height || 'auto', minHeight: height ? height : 120 }}
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">
                Drag & drop or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max {maxSizeMB}MB, JPG, PNG, GIF, WebP
              </p>
            </div>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* URL Input Alternative */}
      <div className="mt-4">
        <div className="flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-xs text-gray-500 bg-white">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        <div className="mt-3 flex space-x-2">
          <input
            type="url"
            placeholder="Enter image URL"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUrlInput(e.currentTarget.value)
              }
            }}
          />
          <button
            onClick={() => {
              const input = document.querySelector('input[type="url"]') as HTMLInputElement
              if (input) {
                handleUrlInput(input.value)
                input.value = ''
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  )
}