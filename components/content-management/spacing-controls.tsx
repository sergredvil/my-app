'use client'

import { useState } from 'react'

interface SpacingValue {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

interface SpacingControlsProps {
  label: string
  value: SpacingValue
  onChange: (value: SpacingValue) => void
  min?: number
  max?: number
  step?: number
  unit?: 'px' | 'rem' | '%' | 'em'
  showPresets?: boolean
  allowNegative?: boolean
  className?: string
}

const SPACING_PRESETS = [
  { name: 'None', value: { top: 0, right: 0, bottom: 0, left: 0 } },
  { name: 'XS', value: { top: 4, right: 4, bottom: 4, left: 4 } },
  { name: 'SM', value: { top: 8, right: 8, bottom: 8, left: 8 } },
  { name: 'MD', value: { top: 16, right: 16, bottom: 16, left: 16 } },
  { name: 'LG', value: { top: 24, right: 24, bottom: 24, left: 24 } },
  { name: 'XL', value: { top: 32, right: 32, bottom: 32, left: 32 } },
  { name: '2XL', value: { top: 48, right: 48, bottom: 48, left: 48 } },
]

export function SpacingControls({
  label,
  value,
  onChange,
  min = 0,
  max = 200,
  step = 1,
  unit = 'px',
  showPresets = true,
  allowNegative = false,
  className = ""
}: SpacingControlsProps) {
  const [isLinked, setIsLinked] = useState(false)
  const [mode, setMode] = useState<'individual' | 'uniform' | 'preset'>('individual')

  const actualMin = allowNegative ? -max : min

  const handleValueChange = (property: keyof SpacingValue, newValue: number) => {
    if (isLinked) {
      // Apply to all sides
      onChange({
        top: newValue,
        right: newValue,
        bottom: newValue,
        left: newValue
      })
    } else {
      // Apply to specific side
      onChange({
        ...value,
        [property]: newValue
      })
    }
  }

  const handleUniformChange = (newValue: number) => {
    onChange({
      top: newValue,
      right: newValue,
      bottom: newValue,
      left: newValue
    })
  }

  const handlePresetSelect = (preset: SpacingValue) => {
    onChange(preset)
  }

  const getCurrentUniformValue = (): number => {
    const values = [value.top || 0, value.right || 0, value.bottom || 0, value.left || 0]
    return values.every(v => v === values[0]) ? values[0] : 0
  }

  const isUniform = (): boolean => {
    const values = [value.top || 0, value.right || 0, value.bottom || 0, value.left || 0]
    return values.every(v => v === values[0])
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center space-x-2">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setMode('individual')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                mode === 'individual' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setMode('uniform')}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                mode === 'uniform' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              Uniform
            </button>
            {showPresets && (
              <button
                onClick={() => setMode('preset')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  mode === 'preset' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                Presets
              </button>
            )}
          </div>

          {/* Link Toggle (for individual mode) */}
          {mode === 'individual' && (
            <button
              onClick={() => setIsLinked(!isLinked)}
              className={`p-1 rounded transition-colors ${
                isLinked ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
              }`}
              title={isLinked ? 'Unlink sides' : 'Link all sides'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isLinked ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      {mode === 'preset' && showPresets && (
        <div className="grid grid-cols-4 gap-2">
          {SPACING_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset.value)}
              className={`p-2 text-xs border rounded-md transition-colors ${
                JSON.stringify(value) === JSON.stringify(preset.value)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-gray-500">
                {preset.value.top}{unit}
              </div>
            </button>
          ))}
        </div>
      )}

      {mode === 'uniform' && (
        <div>
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <input
                type="range"
                min={actualMin}
                max={max}
                step={step}
                value={getCurrentUniformValue()}
                onChange={(e) => handleUniformChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="w-20">
              <div className="flex">
                <input
                  type="number"
                  min={actualMin}
                  max={max}
                  step={step}
                  value={getCurrentUniformValue()}
                  onChange={(e) => handleUniformChange(Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
                <div className="px-2 py-1 text-sm bg-gray-50 border border-l-0 border-gray-300 rounded-r-md">
                  {unit}
                </div>
              </div>
            </div>
          </div>
          
          {!isUniform() && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
              Values are not uniform. Adjusting will apply to all sides.
            </div>
          )}
        </div>
      )}

      {mode === 'individual' && (
        <div>
          {/* Visual Box Diagram */}
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 border-2 border-gray-300 bg-gray-50 rounded flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-100 border border-blue-300 rounded"></div>
              </div>
              
              {/* Top */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <input
                  type="number"
                  min={actualMin}
                  max={max}
                  step={step}
                  value={value.top || 0}
                  onChange={(e) => handleValueChange('top', Number(e.target.value))}
                  className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              {/* Right */}
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
                <input
                  type="number"
                  min={actualMin}
                  max={max}
                  step={step}
                  value={value.right || 0}
                  onChange={(e) => handleValueChange('right', Number(e.target.value))}
                  className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              {/* Bottom */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <input
                  type="number"
                  min={actualMin}
                  max={max}
                  step={step}
                  value={value.bottom || 0}
                  onChange={(e) => handleValueChange('bottom', Number(e.target.value))}
                  className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              
              {/* Left */}
              <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
                <input
                  type="number"
                  min={actualMin}
                  max={max}
                  step={step}
                  value={value.left || 0}
                  onChange={(e) => handleValueChange('left', Number(e.target.value))}
                  className="w-12 px-1 py-0.5 text-xs text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'top' as keyof SpacingValue, label: 'Top' },
              { key: 'right' as keyof SpacingValue, label: 'Right' },
              { key: 'bottom' as keyof SpacingValue, label: 'Bottom' },
              { key: 'left' as keyof SpacingValue, label: 'Left' },
            ].map(({ key, label: sideLabel }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {sideLabel}
                </label>
                <input
                  type="range"
                  min={actualMin}
                  max={max}
                  step={step}
                  value={value[key] || 0}
                  onChange={(e) => handleValueChange(key, Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-500 text-center mt-1">
                  {value[key] || 0}{unit}
                </div>
              </div>
            ))}
          </div>

          {isLinked && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
              All sides are linked. Changes will apply to all sides.
            </div>
          )}
        </div>
      )}

      {/* Current Values Display */}
      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded">
        <div className="font-medium mb-1">Current values:</div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>T: {value.top || 0}{unit}</div>
          <div>R: {value.right || 0}{unit}</div>
          <div>B: {value.bottom || 0}{unit}</div>
          <div>L: {value.left || 0}{unit}</div>
        </div>
      </div>
    </div>
  )
}