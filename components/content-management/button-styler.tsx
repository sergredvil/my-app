'use client'

import { useState } from 'react'
import { ColorPicker } from './color-picker'

interface ButtonStyle {
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  fontSize?: number
  fontWeight?: string
  padding?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  shadow?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
}

interface ButtonStylerProps {
  value: ButtonStyle
  onChange: (style: ButtonStyle) => void
  buttonText?: string
  className?: string
}

const BUTTON_PRESETS = [
  {
    name: 'Primary',
    style: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderColor: '#3b82f6',
      borderWidth: 2,
      borderRadius: 6,
      fontSize: 16,
      fontWeight: '600',
      padding: { top: 12, right: 24, bottom: 12, left: 24 },
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      hoverBackgroundColor: '#2563eb',
      hoverTextColor: '#ffffff',
      hoverBorderColor: '#2563eb'
    }
  },
  {
    name: 'Secondary',
    style: {
      backgroundColor: 'transparent',
      textColor: '#374151',
      borderColor: '#d1d5db',
      borderWidth: 2,
      borderRadius: 6,
      fontSize: 16,
      fontWeight: '600',
      padding: { top: 12, right: 24, bottom: 12, left: 24 },
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      hoverBackgroundColor: '#f9fafb',
      hoverTextColor: '#374151',
      hoverBorderColor: '#9ca3af'
    }
  },
  {
    name: 'Ghost',
    style: {
      backgroundColor: 'transparent',
      textColor: '#3b82f6',
      borderColor: 'transparent',
      borderWidth: 2,
      borderRadius: 6,
      fontSize: 16,
      fontWeight: '600',
      padding: { top: 12, right: 24, bottom: 12, left: 24 },
      shadow: 'none',
      hoverBackgroundColor: '#eff6ff',
      hoverTextColor: '#2563eb',
      hoverBorderColor: 'transparent'
    }
  },
  {
    name: 'Rounded',
    style: {
      backgroundColor: '#10b981',
      textColor: '#ffffff',
      borderColor: '#10b981',
      borderWidth: 2,
      borderRadius: 9999,
      fontSize: 16,
      fontWeight: '600',
      padding: { top: 12, right: 32, bottom: 12, left: 32 },
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      hoverBackgroundColor: '#059669',
      hoverTextColor: '#ffffff',
      hoverBorderColor: '#059669'
    }
  },
  {
    name: 'Minimal',
    style: {
      backgroundColor: '#f3f4f6',
      textColor: '#374151',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 4,
      fontSize: 14,
      fontWeight: '500',
      padding: { top: 8, right: 16, bottom: 8, left: 16 },
      shadow: 'none',
      hoverBackgroundColor: '#e5e7eb',
      hoverTextColor: '#374151',
      hoverBorderColor: 'transparent'
    }
  },
  {
    name: 'Gradient',
    style: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 8,
      fontSize: 16,
      fontWeight: '600',
      padding: { top: 14, right: 28, bottom: 14, left: 28 },
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      hoverBackgroundColor: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      hoverTextColor: '#ffffff',
      hoverBorderColor: 'transparent'
    }
  }
]

export function ButtonStyler({
  value,
  onChange,
  buttonText = "Button",
  className = ""
}: ButtonStylerProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'colors' | 'dimensions' | 'effects'>('presets')
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null)

  const handleStyleChange = (updates: Partial<ButtonStyle>) => {
    onChange({ ...value, ...updates })
  }

  const handlePresetSelect = (preset: ButtonStyle) => {
    onChange(preset)
  }

  const handlePaddingChange = (side: keyof NonNullable<ButtonStyle['padding']>, newValue: number) => {
    const currentPadding = value.padding || { top: 12, right: 24, bottom: 12, left: 24 }
    handleStyleChange({
      padding: {
        ...currentPadding,
        [side]: newValue
      }
    })
  }

  const buttonStyle: React.CSSProperties = {
    backgroundColor: value.backgroundColor || '#3b82f6',
    color: value.textColor || '#ffffff',
    border: `${value.borderWidth || 2}px solid ${value.borderColor || value.backgroundColor || '#3b82f6'}`,
    borderRadius: `${value.borderRadius || 6}px`,
    fontSize: `${value.fontSize || 16}px`,
    fontWeight: value.fontWeight || '600',
    padding: `${value.padding?.top || 12}px ${value.padding?.right || 24}px ${value.padding?.bottom || 12}px ${value.padding?.left || 24}px`,
    boxShadow: value.shadow || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    background: value.backgroundColor || '#3b82f6',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Preview */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Preview</label>
        <div className="p-6 bg-gray-50 rounded-lg flex items-center justify-center">
          <button style={buttonStyle} className="whitespace-nowrap">
            {buttonText}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'presets', name: 'Presets' },
          { id: 'colors', name: 'Colors' },
          { id: 'dimensions', name: 'Size' },
          { id: 'effects', name: 'Effects' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === 'presets' && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Button Styles</h4>
            <div className="grid grid-cols-2 gap-4">
              {BUTTON_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset.style)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
                >
                  <div className="mb-3">
                    <div
                      className="inline-block px-4 py-2 text-sm rounded whitespace-nowrap"
                      style={{
                        backgroundColor: preset.style.backgroundColor,
                        color: preset.style.textColor,
                        border: `${preset.style.borderWidth}px solid ${preset.style.borderColor}`,
                        borderRadius: `${preset.style.borderRadius}px`,
                        fontWeight: preset.style.fontWeight,
                        boxShadow: preset.style.shadow,
                        background: preset.style.backgroundColor
                      }}
                    >
                      {preset.name}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 font-medium">{preset.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-6">
            {/* Background Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Color
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowColorPicker(showColorPicker === 'background' ? null : 'background')}
                  className="w-10 h-10 border border-gray-300 rounded-md shadow-sm"
                  style={{ backgroundColor: value.backgroundColor || '#3b82f6' }}
                />
                <input
                  type="text"
                  value={value.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange({ backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                />
              </div>
              {showColorPicker === 'background' && (
                <div className="mt-2">
                  <ColorPicker
                    value={value.backgroundColor || '#3b82f6'}
                    onChange={(color) => handleStyleChange({ backgroundColor: color })}
                    showGradients
                  />
                </div>
              )}
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowColorPicker(showColorPicker === 'text' ? null : 'text')}
                  className="w-10 h-10 border border-gray-300 rounded-md shadow-sm"
                  style={{ backgroundColor: value.textColor || '#ffffff' }}
                />
                <input
                  type="text"
                  value={value.textColor || '#ffffff'}
                  onChange={(e) => handleStyleChange({ textColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                />
              </div>
              {showColorPicker === 'text' && (
                <div className="mt-2">
                  <ColorPicker
                    value={value.textColor || '#ffffff'}
                    onChange={(color) => handleStyleChange({ textColor: color })}
                  />
                </div>
              )}
            </div>

            {/* Border Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Color
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowColorPicker(showColorPicker === 'border' ? null : 'border')}
                  className="w-10 h-10 border border-gray-300 rounded-md shadow-sm"
                  style={{ backgroundColor: value.borderColor || value.backgroundColor || '#3b82f6' }}
                />
                <input
                  type="text"
                  value={value.borderColor || value.backgroundColor || '#3b82f6'}
                  onChange={(e) => handleStyleChange({ borderColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                />
              </div>
              {showColorPicker === 'border' && (
                <div className="mt-2">
                  <ColorPicker
                    value={value.borderColor || value.backgroundColor || '#3b82f6'}
                    onChange={(color) => handleStyleChange({ borderColor: color })}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'dimensions' && (
          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size: {value.fontSize || 16}px
              </label>
              <input
                type="range"
                min={12}
                max={24}
                value={value.fontSize || 16}
                onChange={(e) => handleStyleChange({ fontSize: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Font Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Weight
              </label>
              <select
                value={value.fontWeight || '600'}
                onChange={(e) => handleStyleChange({ fontWeight: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="300">Light (300)</option>
                <option value="400">Regular (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">Semibold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </div>

            {/* Padding */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Padding
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Top/Bottom</label>
                  <input
                    type="number"
                    value={value.padding?.top || 12}
                    onChange={(e) => {
                      const newValue = Number(e.target.value)
                      handlePaddingChange('top', newValue)
                      handlePaddingChange('bottom', newValue)
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Left/Right</label>
                  <input
                    type="number"
                    value={value.padding?.right || 24}
                    onChange={(e) => {
                      const newValue = Number(e.target.value)
                      handlePaddingChange('left', newValue)
                      handlePaddingChange('right', newValue)
                    }}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Border Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Width: {value.borderWidth || 2}px
              </label>
              <input
                type="range"
                min={0}
                max={8}
                value={value.borderWidth || 2}
                onChange={(e) => handleStyleChange({ borderWidth: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Border Radius: {value.borderRadius || 6}px
              </label>
              <input
                type="range"
                min={0}
                max={50}
                value={value.borderRadius || 6}
                onChange={(e) => handleStyleChange({ borderRadius: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="space-y-6">
            {/* Shadow */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shadow
              </label>
              <select
                value={value.shadow || '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}
                onChange={(e) => handleStyleChange({ shadow: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="none">None</option>
                <option value="0 1px 2px 0 rgba(0, 0, 0, 0.05)">Small</option>
                <option value="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)">Medium</option>
                <option value="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)">Large</option>
                <option value="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)">Extra Large</option>
                <option value="0 25px 50px -12px rgba(0, 0, 0, 0.25)">Dramatic</option>
              </select>
            </div>

            {/* Hover Effects */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Hover Effects</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hover Background</label>
                  <input
                    type="text"
                    value={value.hoverBackgroundColor || '#2563eb'}
                    onChange={(e) => handleStyleChange({ hoverBackgroundColor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hover Text Color</label>
                  <input
                    type="text"
                    value={value.hoverTextColor || '#ffffff'}
                    onChange={(e) => handleStyleChange({ hoverTextColor: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}