'use client'

import { useState } from 'react'
import { Page, Section } from '@/types'
import { PagePreview } from '@/components/page-management/page-preview'

interface ResponsivePreviewProps {
  page: Page
  onClose: () => void
}

type ViewportType = 'desktop' | 'tablet' | 'mobile'

interface ViewportConfig {
  name: string
  width: number
  height: number
  icon: React.ReactNode
}

const viewportConfigs: Record<ViewportType, ViewportConfig> = {
  desktop: {
    name: 'Desktop',
    width: 1200,
    height: 800,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  tablet: {
    name: 'Tablet',
    width: 768,
    height: 1024,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
      </svg>
    )
  },
  mobile: {
    name: 'Mobile',
    width: 375,
    height: 667,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    )
  }
}

export function ResponsivePreview({ page, onClose }: ResponsivePreviewProps) {
  const [currentViewport, setCurrentViewport] = useState<ViewportType>('desktop')
  const [isRotated, setIsRotated] = useState(false)
  const [zoom, setZoom] = useState(1)

  const currentConfig = viewportConfigs[currentViewport]
  const displayWidth = isRotated ? currentConfig.height : currentConfig.width
  const displayHeight = isRotated ? currentConfig.width : currentConfig.height

  const getScaleToFit = () => {
    const containerWidth = window.innerWidth - 300 // Account for sidebar
    const containerHeight = window.innerHeight - 200 // Account for header/footer
    
    const scaleX = containerWidth / displayWidth
    const scaleY = containerHeight / displayHeight
    
    return Math.min(scaleX, scaleY, 1) // Don't scale up
  }

  const handleViewportChange = (viewport: ViewportType) => {
    setCurrentViewport(viewport)
    setIsRotated(false) // Reset rotation when changing viewport
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(Math.max(0.25, Math.min(2, newZoom)))
  }

  const autoFitZoom = () => {
    const scale = getScaleToFit()
    setZoom(scale)
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h1 className="text-xl font-semibold">Responsive Preview</h1>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{page.title}</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Viewport Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {(Object.keys(viewportConfigs) as ViewportType[]).map((viewport) => (
                <button
                  key={viewport}
                  onClick={() => handleViewportChange(viewport)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentViewport === viewport
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {viewportConfigs[viewport].icon}
                  <span className="hidden sm:inline">{viewportConfigs[viewport].name}</span>
                </button>
              ))}
            </div>

            {/* Rotation Toggle */}
            {currentViewport !== 'desktop' && (
              <button
                onClick={() => setIsRotated(!isRotated)}
                className="p-2 hover:bg-gray-100 rounded-md"
                title="Rotate device"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            )}

            {/* Zoom Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleZoomChange(zoom - 0.25)}
                className="p-1 hover:bg-gray-100 rounded text-sm"
                disabled={zoom <= 0.25}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <button
                onClick={autoFitZoom}
                className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded font-mono"
              >
                {Math.round(zoom * 100)}%
              </button>
              
              <button
                onClick={() => handleZoomChange(zoom + 0.25)}
                className="p-1 hover:bg-gray-100 rounded text-sm"
                disabled={zoom >= 2}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="relative">
          {/* Device Frame */}
          <div
            className={`bg-gray-800 rounded-lg shadow-2xl transition-all duration-300 ${
              currentViewport === 'mobile' ? 'p-2' : 
              currentViewport === 'tablet' ? 'p-3' : 'p-1'
            }`}
            style={{
              transform: `scale(${zoom}) ${isRotated ? 'rotate(90deg)' : ''}`,
              transformOrigin: 'center'
            }}
          >
            {/* Screen */}
            <div
              className="bg-white rounded overflow-hidden relative"
              style={{
                width: `${displayWidth}px`,
                height: `${displayHeight}px`
              }}
            >
              {/* Device-specific UI elements */}
              {currentViewport === 'mobile' && (
                <>
                  {/* Mobile notch/status bar */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black rounded-b-lg w-32 h-6 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                  {/* Home indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-gray-300 rounded-full w-32 h-1 z-10"></div>
                </>
              )}

              {currentViewport === 'tablet' && (
                <>
                  {/* Tablet home button */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-200 rounded-full w-8 h-8 z-10 border border-gray-300"></div>
                </>
              )}

              {/* Page Content */}
              <div className="w-full h-full overflow-auto">
                <PagePreview
                  page={page}
                  viewport={currentViewport}
                  showDeviceFrame={false}
                />
              </div>
            </div>
          </div>

          {/* Device Info */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-mono">
            {displayWidth} × {displayHeight}
            {isRotated && ' (rotated)'}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Live Preview</span>
            </div>
            
            <div>
              Viewport: {currentConfig.name} ({displayWidth}×{displayHeight})
            </div>
            
            <div>
              Zoom: {Math.round(zoom * 100)}%
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setZoom(0.5)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            >
              50%
            </button>
            <button
              onClick={() => setZoom(1)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            >
              100%
            </button>
            <button
              onClick={autoFitZoom}
              className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
            >
              Fit to Screen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}