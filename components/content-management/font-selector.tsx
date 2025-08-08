'use client'

import { useState, useRef, useEffect } from 'react'

interface Font {
  name: string
  displayName: string
  category: 'serif' | 'sans-serif' | 'monospace' | 'display' | 'handwriting'
  weight: string[]
  cssFamily: string
  previewText?: string
}

const GOOGLE_FONTS: Font[] = [
  // Sans-serif fonts
  { name: 'inter', displayName: 'Inter', category: 'sans-serif', weight: ['300', '400', '500', '600', '700'], cssFamily: 'Inter, sans-serif' },
  { name: 'roboto', displayName: 'Roboto', category: 'sans-serif', weight: ['300', '400', '500', '700'], cssFamily: 'Roboto, sans-serif' },
  { name: 'open-sans', displayName: 'Open Sans', category: 'sans-serif', weight: ['300', '400', '600', '700'], cssFamily: 'Open Sans, sans-serif' },
  { name: 'lato', displayName: 'Lato', category: 'sans-serif', weight: ['300', '400', '700'], cssFamily: 'Lato, sans-serif' },
  { name: 'poppins', displayName: 'Poppins', category: 'sans-serif', weight: ['300', '400', '500', '600', '700'], cssFamily: 'Poppins, sans-serif' },
  { name: 'nunito', displayName: 'Nunito', category: 'sans-serif', weight: ['300', '400', '600', '700'], cssFamily: 'Nunito, sans-serif' },
  { name: 'montserrat', displayName: 'Montserrat', category: 'sans-serif', weight: ['300', '400', '500', '600', '700'], cssFamily: 'Montserrat, sans-serif' },
  
  // Serif fonts
  { name: 'playfair-display', displayName: 'Playfair Display', category: 'serif', weight: ['400', '500', '600', '700'], cssFamily: 'Playfair Display, serif' },
  { name: 'merriweather', displayName: 'Merriweather', category: 'serif', weight: ['300', '400', '700'], cssFamily: 'Merriweather, serif' },
  { name: 'crimson-pro', displayName: 'Crimson Pro', category: 'serif', weight: ['300', '400', '500', '600'], cssFamily: 'Crimson Pro, serif' },
  { name: 'libre-baskerville', displayName: 'Libre Baskerville', category: 'serif', weight: ['400', '700'], cssFamily: 'Libre Baskerville, serif' },
  
  // Display fonts
  { name: 'oswald', displayName: 'Oswald', category: 'display', weight: ['300', '400', '500', '600', '700'], cssFamily: 'Oswald, sans-serif' },
  { name: 'raleway', displayName: 'Raleway', category: 'display', weight: ['300', '400', '500', '600', '700'], cssFamily: 'Raleway, sans-serif' },
  { name: 'bebas-neue', displayName: 'Bebas Neue', category: 'display', weight: ['400'], cssFamily: 'Bebas Neue, sans-serif' },
  
  // Monospace fonts
  { name: 'fira-code', displayName: 'Fira Code', category: 'monospace', weight: ['300', '400', '500'], cssFamily: 'Fira Code, monospace' },
  { name: 'jetbrains-mono', displayName: 'JetBrains Mono', category: 'monospace', weight: ['300', '400', '500', '700'], cssFamily: 'JetBrains Mono, monospace' },
]

const SYSTEM_FONTS: Font[] = [
  { name: 'system-ui', displayName: 'System UI', category: 'sans-serif', weight: ['400', '500', '600', '700'], cssFamily: 'system-ui, -apple-system, sans-serif' },
  { name: 'helvetica', displayName: 'Helvetica', category: 'sans-serif', weight: ['400', '700'], cssFamily: 'Helvetica, Arial, sans-serif' },
  { name: 'arial', displayName: 'Arial', category: 'sans-serif', weight: ['400', '700'], cssFamily: 'Arial, sans-serif' },
  { name: 'georgia', displayName: 'Georgia', category: 'serif', weight: ['400', '700'], cssFamily: 'Georgia, serif' },
  { name: 'times', displayName: 'Times New Roman', category: 'serif', weight: ['400', '700'], cssFamily: 'Times, Times New Roman, serif' },
  { name: 'courier', displayName: 'Courier New', category: 'monospace', weight: ['400', '700'], cssFamily: 'Courier New, monospace' },
]

interface FontSelectorProps {
  value: string
  onChange: (fontFamily: string) => void
  onWeightChange?: (fontWeight: string) => void
  selectedWeight?: string
  showWeights?: boolean
  className?: string
}

export function FontSelector({
  value,
  onChange,
  onWeightChange,
  selectedWeight = '400',
  showWeights = false,
  className = ""
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const selectorRef = useRef<HTMLDivElement>(null)

  const allFonts = [...SYSTEM_FONTS, ...GOOGLE_FONTS]
  
  const currentFont = allFonts.find(font => 
    font.cssFamily === value || font.name === value
  ) || allFonts[0]

  const filteredFonts = allFonts.filter(font => {
    const matchesSearch = font.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [
    { id: 'all', name: 'All Fonts' },
    { id: 'sans-serif', name: 'Sans Serif' },
    { id: 'serif', name: 'Serif' },
    { id: 'display', name: 'Display' },
    { id: 'monospace', name: 'Monospace' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleFontSelect = (font: Font) => {
    onChange(font.cssFamily)
    setIsOpen(false)
    
    // Auto-select appropriate weight if current weight isn't available
    if (onWeightChange && !font.weight.includes(selectedWeight)) {
      onWeightChange(font.weight.includes('400') ? '400' : font.weight[0])
    }
  }

  const loadGoogleFont = (fontName: string) => {
    if (GOOGLE_FONTS.find(f => f.name === fontName)) {
      const link = document.createElement('link')
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/-/g, '+')}:wght@300;400;500;600;700&display=swap`
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }

  // Load current font if it's a Google Font
  useEffect(() => {
    if (currentFont && GOOGLE_FONTS.includes(currentFont)) {
      loadGoogleFont(currentFont.name)
    }
  }, [currentFont])

  return (
    <div ref={selectorRef} className={`relative ${className}`}>
      {/* Font Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      >
        <div className="flex items-center space-x-3">
          <div
            className="text-lg"
            style={{ fontFamily: currentFont.cssFamily, fontWeight: selectedWeight }}
          >
            Aa
          </div>
          <div>
            <div className="text-sm font-medium text-left">{currentFont.displayName}</div>
            <div className="text-xs text-gray-500 capitalize">{currentFont.category}</div>
          </div>
        </div>
        <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Font Weight Selector */}
      {showWeights && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
          <select
            value={selectedWeight}
            onChange={(e) => onWeightChange?.(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
            {currentFont.weight.map(weight => (
              <option key={weight} value={weight}>
                {weight === '300' ? 'Light (300)' :
                 weight === '400' ? 'Regular (400)' :
                 weight === '500' ? 'Medium (500)' :
                 weight === '600' ? 'Semibold (600)' :
                 weight === '700' ? 'Bold (700)' :
                 `Weight ${weight}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-96">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            {/* Search */}
            <input
              type="text"
              placeholder="Search fonts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            
            {/* Category Filter */}
            <div className="flex space-x-1 mt-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Font List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredFonts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No fonts found matching your search.
              </div>
            ) : (
              filteredFonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => handleFontSelect(font)}
                  onMouseEnter={() => {
                    if (GOOGLE_FONTS.includes(font)) {
                      loadGoogleFont(font.name)
                    }
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors ${
                    currentFont.name === font.name ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="text-lg"
                      style={{ fontFamily: font.cssFamily }}
                    >
                      Aa
                    </div>
                    <div>
                      <div className="text-sm font-medium">{font.displayName}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {font.category} • {font.weight.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview Text */}
                  <div
                    className="mt-2 text-sm text-gray-700 truncate"
                    style={{ fontFamily: font.cssFamily }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}