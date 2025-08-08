'use client'

import { useState, useEffect } from 'react'
import { Page } from '@/types'

interface PageSettingsProps {
  page: Page
  onUpdatePage: (updatedPage: Page) => void
  onClose: () => void
}

export function PageSettings({ page, onUpdatePage, onClose }: PageSettingsProps) {
  const [formData, setFormData] = useState({
    title: page.title,
    slug: page.slug,
    seoTitle: page.seoTitle || '',
    seoDescription: page.seoDescription || '',
    customCss: page.customCss || '',
    customJs: page.customJs || ''
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSlugChange = (value: string) => {
    // Convert to URL-friendly slug
    const slug = value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

    setFormData(prev => ({
      ...prev,
      slug
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      const updatedPage: Page = {
        ...page,
        title: formData.title,
        slug: formData.slug,
        seoTitle: formData.seoTitle || undefined,
        seoDescription: formData.seoDescription || undefined,
        customCss: formData.customCss || undefined,
        customJs: formData.customJs || undefined,
        updatedAt: new Date()
      }
      
      onUpdatePage(updatedPage)
      onClose()
    } catch (error) {
      console.error('Failed to save page settings:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.slug.trim()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Page Settings</h2>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Basic Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Settings</h3>
              
              <div>
                <label htmlFor="page-title" className="block text-sm font-medium text-gray-700 mb-2">
                  Page Title
                </label>
                <input
                  id="page-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter page title"
                />
              </div>

              <div>
                <label htmlFor="page-slug" className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                    /
                  </span>
                  <input
                    id="page-slug"
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="page-url-slug"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  This will be the URL path for your page
                </p>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
              
              <div>
                <label htmlFor="seo-title" className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  id="seo-title"
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional: Custom title for search engines"
                  maxLength={60}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoTitle.length}/60 characters
                </p>
              </div>

              <div>
                <label htmlFor="seo-description" className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  id="seo-description"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Optional: Description for search engines"
                  maxLength={160}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoDescription.length}/160 characters
                </p>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Advanced Settings</h3>
              
              <div>
                <label htmlFor="custom-css" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom CSS
                </label>
                <textarea
                  id="custom-css"
                  value={formData.customCss}
                  onChange={(e) => handleInputChange('customCss', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="/* Add your custom CSS here */"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Custom styles will be applied to your page
                </p>
              </div>

              <div>
                <label htmlFor="custom-js" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom JavaScript
                </label>
                <textarea
                  id="custom-js"
                  value={formData.customJs}
                  onChange={(e) => handleInputChange('customJs', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="// Add your custom JavaScript here"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Custom scripts will be added to your page
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid || isSaving}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}