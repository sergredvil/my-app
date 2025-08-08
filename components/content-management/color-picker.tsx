'use client'

import { useState, useRef, useEffect } from 'react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  onClose?: () => void
  showPresets?: boolean
  showGradients?: boolean
  className?: string
}

const COLOR_PRESETS = [
  // Grays
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#000000',
  // Blues
  '#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a',
  // Greens
  '#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d',
  // Reds
  '#fef2f2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a',
  // Yellows
  '#fefce8', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f',
  // Purples
  '#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7c3aed', '#6d28d9', '#5b21b6',
]

const GRADIENT_PRESETS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
]

export function ColorPicker({
  value,
  onChange,
  onClose,
  showPresets = true,
  showGradients = false,
  className = ""
}: ColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(value || '#ffffff')
  const [activeTab, setActiveTab] = useState<'solid' | 'gradient' | 'custom'>('solid')
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleColorChange = (color: string) => {
    setCurrentColor(color)
    onChange(color)
  }

  const handleHexInput = (hex: string) => {
    // Validate hex color
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      handleColorChange(hex)
    }
  }

  const extractHexFromValue = (colorValue: string): string => {
    if (colorValue.startsWith('#')) {
      return colorValue
    }
    if (colorValue.startsWith('rgb')) {
      // Convert RGB to hex (simplified)
      const match = colorValue.match(/\d+/g)
      if (match && match.length >= 3) {
        const r = parseInt(match[0])
        const g = parseInt(match[1])
        const b = parseInt(match[2])
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
      }
    }
    return '#ffffff'
  }

  return (
    <div ref={pickerRef} className={`bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Color Picker</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('solid')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'solid'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Solid
        </button>
        {showGradients && (
          <button
            onClick={() => setActiveTab('gradient')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'gradient'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Gradient
          </button>
        )}
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'custom'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Custom
        </button>
      </div>

      {/* Current Color Preview */}
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-lg border border-gray-300 shadow-sm"
            style={{ background: currentColor }}
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">Current</div>
            <div className="text-xs text-gray-500 truncate">{currentColor}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'solid' && showPresets && (
        <div>
          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Color Presets</h4>
            <div className="grid grid-cols-12 gap-1">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-6 h-6 rounded border border-gray-200 hover:border-gray-400 transition-colors ${
                    currentColor === color ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'gradient' && showGradients && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Gradient Presets</h4>
          <div className="grid grid-cols-2 gap-2">
            {GRADIENT_PRESETS.map((gradient, index) => (
              <button
                key={index}
                onClick={() => handleColorChange(gradient)}
                className={`h-12 rounded border border-gray-200 hover:border-gray-400 transition-colors ${
                  currentColor === gradient ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ background: gradient }}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="space-y-4">
          {/* Native Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Picker
            </label>
            <input
              type="color"
              value={extractHexFromValue(currentColor)}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-12 rounded border border-gray-300 cursor-pointer"
            />
          </div>

          {/* Hex Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hex Color
            </label>
            <input
              type="text"
              value={currentColor.startsWith('#') ? currentColor : '#ffffff'}
              onChange={(e) => handleHexInput(e.target.value)}
              placeholder="#ffffff"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
            />
          </div>

          {/* RGB Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSS Color
            </label>
            <input
              type="text"
              value={currentColor}
              onChange={(e) => setCurrentColor(e.target.value)}
              onBlur={(e) => onChange(e.target.value)}
              placeholder="rgb(255, 255, 255) or rgba(255, 255, 255, 0.5)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
            />
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => handleColorChange('transparent')}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Transparent
          </button>
          <button
            onClick={() => handleColorChange('')}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}