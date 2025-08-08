'use client'

import { Page, Section } from '@/types'
import { SectionRegistry } from '@/components/sections/section-registry'

interface PagePreviewProps {
  page: Page
  viewport?: 'desktop' | 'tablet' | 'mobile'
  showDeviceFrame?: boolean
}

export function PagePreview({ page, viewport = 'desktop', showDeviceFrame = false }: PagePreviewProps) {
  const renderSection = (section: Section) => {
    const SectionComponent = SectionRegistry[section.type]
    
    if (!SectionComponent) {
      return (
        <div key={section.id} className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
          <p className="text-red-700">Section type "{section.type}" not found</p>
        </div>
      )
    }

    return (
      <SectionComponent
        key={section.id}
        id={section.id}
        variant={section.variant}
        content={section.content}
        styles={section.styles}
        isEditing={false}
        onUpdate={() => {}} // No-op for preview
        onDelete={() => {}} // No-op for preview
        onMoveUp={() => {}} // No-op for preview
        onMoveDown={() => {}} // No-op for preview
      />
    )
  }

  const getViewportStyles = () => {
    const styles = {
      desktop: { width: '100%', maxWidth: 'none' },
      tablet: { width: '768px', maxWidth: '768px' },
      mobile: { width: '375px', maxWidth: '375px' }
    }
    return styles[viewport]
  }

  const getFrameStyles = () => {
    if (!showDeviceFrame) return {}

    const frames = {
      desktop: {
        border: '8px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      },
      tablet: {
        border: '12px solid #374151',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        position: 'relative' as const,
      },
      mobile: {
        border: '8px solid #1f2937',
        borderRadius: '24px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
        position: 'relative' as const,
      }
    }
    return frames[viewport]
  }

  const pageContent = (
    <div 
      style={getViewportStyles()}
      className="bg-white overflow-hidden"
    >
      {/* Custom CSS */}
      {page.customCss && (
        <style dangerouslySetInnerHTML={{ __html: page.customCss }} />
      )}
      
      {/* Page Sections */}
      <div className="min-h-screen">
        {page.sections
          .sort((a, b) => a.order - b.order)
          .map(renderSection)
        }
      </div>
      
      {/* Custom JavaScript */}
      {page.customJs && (
        <script dangerouslySetInnerHTML={{ __html: page.customJs }} />
      )}
    </div>
  )

  if (showDeviceFrame) {
    return (
      <div className="flex justify-center p-8 bg-gray-100 min-h-screen">
        <div style={getFrameStyles()}>
          {pageContent}
        </div>
      </div>
    )
  }

  return pageContent
}

// Utility function to generate preview HTML for new tab
export function generatePreviewHTML(page: Page): string {
  const sections = page.sections
    .sort((a, b) => a.order - b.order)
    .map(section => {
      // For preview, we'll render a simplified version of each section
      return `
        <div class="section-${section.type} section-${section.variant}" data-section-id="${section.id}">
          <div class="p-8 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              ${section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
            </h3>
            <p class="text-gray-600 text-sm">
              Variant: ${section.variant}
            </p>
            ${section.content?.title ? `<h4 class="mt-4 font-medium">${section.content.title}</h4>` : ''}
            ${section.content?.description ? `<p class="text-gray-700">${section.content.description}</p>` : ''}
          </div>
        </div>
      `
    }).join('')

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${page.seoTitle || page.title}</title>
      ${page.seoDescription ? `<meta name="description" content="${page.seoDescription}">` : ''}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        ${page.customCss || ''}
      </style>
    </head>
    <body class="bg-white">
      <div class="preview-watermark fixed top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium z-50">
        Preview Mode
      </div>
      
      <div class="min-h-screen">
        ${sections}
      </div>
      
      ${page.customJs ? `<script>${page.customJs}</script>` : ''}
    </body>
    </html>
  `
}

// Hook for opening preview in new tab
export function usePagePreview() {
  const openPreview = (page: Page, viewport: 'desktop' | 'tablet' | 'mobile' = 'desktop') => {
    const html = generatePreviewHTML(page)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    
    const windowFeatures = {
      desktop: 'width=1200,height=800,scrollbars=yes,resizable=yes',
      tablet: 'width=800,height=1024,scrollbars=yes,resizable=yes',
      mobile: 'width=400,height=800,scrollbars=yes,resizable=yes'
    }
    
    const previewWindow = window.open(
      url, 
      'pagePreview', 
      windowFeatures[viewport]
    )
    
    if (previewWindow) {
      previewWindow.addEventListener('beforeunload', () => {
        URL.revokeObjectURL(url)
      })
    } else {
      URL.revokeObjectURL(url)
      alert('Please allow popups to preview your page in a new tab')
    }
  }

  return { openPreview }
}