'use client'

import { useState, useEffect } from 'react'
import { Page } from '@/types'
import { PagesStore } from '@/lib/pages-store'

interface PagesDashboardProps {
  onSelectPage: (page: Page | null) => void
  onClose: () => void
}

export function PagesDashboard({ onSelectPage, onClose }: PagesDashboardProps) {
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPages = () => {
      setIsLoading(true)
      const savedPages = PagesStore.getAllPages()
      setPages(savedPages)
      setIsLoading(false)
    }

    loadPages()
  }, [])

  const handleDeletePage = (pageId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    
    if (confirm('Are you sure you want to delete this page?')) {
      PagesStore.deletePage(pageId)
      setPages(pages.filter(p => p.id !== pageId))
    }
  }

  const handleDuplicatePage = (pageId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    
    const duplicatedPage = PagesStore.duplicatePage(pageId)
    if (duplicatedPage) {
      setPages([duplicatedPage, ...pages])
    }
  }

  const handleExportPage = (pageId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    
    const pageJson = PagesStore.exportPage(pageId)
    if (pageJson) {
      const blob = new Blob([pageJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `page-${pageId}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleImportPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      const importedPage = PagesStore.importPage(content)
      if (importedPage) {
        setPages([importedPage, ...pages])
      } else {
        alert('Failed to import page. Please check the file format.')
      }
    }
    reader.readAsText(file)
    
    // Reset input
    event.target.value = ''
  }

  const handleCreateNewPage = () => {
    onSelectPage(null)
    onClose()
  }

  const handleSelectPage = (page: Page) => {
    onSelectPage(page)
    onClose()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Pages</h2>
            <div className="flex items-center space-x-4">
              {/* Import Button */}
              <label className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer transition-colors">
                Import Page
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportPage}
                  className="hidden"
                />
              </label>
              
              {/* New Page Button */}
              <button
                onClick={handleCreateNewPage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                New Page
              </button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading pages...</p>
              </div>
            </div>
          ) : pages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No pages yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first marketing page to get started
              </p>
              <button
                onClick={handleCreateNewPage}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Page
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pages.map((page) => (
                <div
                  key={page.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors cursor-pointer group"
                  onClick={() => handleSelectPage(page)}
                >
                  {/* Page Preview */}
                  <div className="h-32 bg-gray-50 border-b border-gray-200 flex items-center justify-center relative">
                    <div className="text-gray-400 text-sm">
                      {page.sections.length} sections
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        page.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Page Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Updated {formatDate(page.updatedAt)}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        /{page.slug}
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleExportPage(page.id, e)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Export"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => handleDuplicatePage(page.id, e)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => handleDeletePage(page.id, e)}
                          className="p-1 hover:bg-red-100 text-red-600 rounded"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}