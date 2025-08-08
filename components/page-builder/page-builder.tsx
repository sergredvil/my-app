'use client'

import { useState, useCallback, useEffect } from 'react'
import { Section, SectionType, Page } from '@/types'
import { SECTION_TYPES, SECTION_VARIANTS, renderSection } from '@/components/sections'
import { SectionSidebar } from './section-sidebar'
import { CustomizationPanel } from './customization-panel'
import { PagePreview } from './page-preview'
import { PagesStore } from '@/lib/pages-store'
import { PagesDashboard } from '@/components/pages-dashboard'

interface PageBuilderProps {
  initialPage?: Page
  onSave?: (page: Page) => void
}

export function PageBuilder({ initialPage, onSave }: PageBuilderProps) {
  const [currentPage, setCurrentPage] = useState<Page>(initialPage || {
    id: crypto.randomUUID(),
    userId: 'demo',
    title: 'New Page',
    slug: 'new-page',
    sections: [],
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false)
  const [history, setHistory] = useState<Page[]>([currentPage])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [showPagesDashboard, setShowPagesDashboard] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Load current page from storage on mount
  useEffect(() => {
    const savedPage = PagesStore.getCurrentPage()
    if (savedPage && !initialPage) {
      setCurrentPage(savedPage)
      setHistory([savedPage])
      setHistoryIndex(0)
    }
  }, [initialPage])

  // Add a new section to the page
  const addSection = useCallback((sectionType: SectionType, variantId: string) => {
    const variant = SECTION_VARIANTS[sectionType]?.find(v => v.id === variantId)
    if (!variant) return

    const newSection: Section = {
      id: crypto.randomUUID(),
      type: sectionType,
      variant: variantId,
      content: variant.defaultContent,
      styles: variant.defaultStyles,
      order: currentPage.sections.length
    }

    const updatedPage = {
      ...currentPage,
      sections: [...currentPage.sections, newSection],
      updatedAt: new Date()
    }

    setCurrentPage(updatedPage)
    addToHistory(updatedPage)
    setSelectedSectionId(newSection.id)
    setIsCustomizationOpen(true)
  }, [currentPage])

  // Update section content or styles
  const updateSection = useCallback((sectionId: string, updates: Partial<Section>) => {
    const updatedSections = currentPage.sections.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    )

    const updatedPage = {
      ...currentPage,
      sections: updatedSections,
      updatedAt: new Date()
    }

    setCurrentPage(updatedPage)
    addToHistory(updatedPage)
  }, [currentPage])

  // Delete a section
  const deleteSection = useCallback((sectionId: string) => {
    const updatedSections = currentPage.sections
      .filter(section => section.id !== sectionId)
      .map((section, index) => ({ ...section, order: index }))

    const updatedPage = {
      ...currentPage,
      sections: updatedSections,
      updatedAt: new Date()
    }

    setCurrentPage(updatedPage)
    addToHistory(updatedPage)
    setSelectedSectionId(null)
    setIsCustomizationOpen(false)
  }, [currentPage])

  // Duplicate a section
  const duplicateSection = useCallback((sectionId: string) => {
    const sectionToDuplicate = currentPage.sections.find(s => s.id === sectionId)
    if (!sectionToDuplicate) return

    const newSection: Section = {
      ...sectionToDuplicate,
      id: crypto.randomUUID(),
      order: sectionToDuplicate.order + 1
    }

    const updatedSections = [
      ...currentPage.sections.slice(0, sectionToDuplicate.order + 1),
      newSection,
      ...currentPage.sections.slice(sectionToDuplicate.order + 1).map(s => ({
        ...s,
        order: s.order + 1
      }))
    ]

    const updatedPage = {
      ...currentPage,
      sections: updatedSections,
      updatedAt: new Date()
    }

    setCurrentPage(updatedPage)
    addToHistory(updatedPage)
  }, [currentPage])

  // Move section up/down
  const moveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = currentPage.sections.findIndex(s => s.id === sectionId)
    if (sectionIndex === -1) return

    const newIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1
    if (newIndex < 0 || newIndex >= currentPage.sections.length) return

    const updatedSections = [...currentPage.sections]
    const [movedSection] = updatedSections.splice(sectionIndex, 1)
    updatedSections.splice(newIndex, 0, movedSection)

    // Update order values
    const reorderedSections = updatedSections.map((section, index) => ({
      ...section,
      order: index
    }))

    const updatedPage = {
      ...currentPage,
      sections: reorderedSections,
      updatedAt: new Date()
    }

    setCurrentPage(updatedPage)
    addToHistory(updatedPage)
  }, [currentPage])

  // History management
  const addToHistory = useCallback((page: Page) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(page)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setCurrentPage(history[newIndex])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setCurrentPage(history[newIndex])
    }
  }, [history, historyIndex])

  // Save page
  const savePage = useCallback(async () => {
    setIsSaving(true)
    try {
      const success = PagesStore.savePage(currentPage)
      if (success) {
        if (onSave) {
          onSave(currentPage)
        }
      } else {
        alert('Failed to save page')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save page')
    } finally {
      setIsSaving(false)
    }
  }, [currentPage, onSave])

  // Load a page
  const loadPage = useCallback((page: Page | null) => {
    if (page) {
      setCurrentPage(page)
      setHistory([page])
      setHistoryIndex(0)
      PagesStore.setCurrentPage(page)
    } else {
      // Create new page
      const newPage: Page = {
        id: crypto.randomUUID(),
        userId: 'demo',
        title: 'New Page',
        slug: 'new-page',
        sections: [],
        isPublished: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setCurrentPage(newPage)
      setHistory([newPage])
      setHistoryIndex(0)
      PagesStore.setCurrentPage(newPage)
    }
    setSelectedSectionId(null)
    setIsCustomizationOpen(false)
  }, [])

  // Generate slug from title
  const updateTitle = useCallback((title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    const updatedPage = {
      ...currentPage,
      title,
      slug: slug || 'untitled',
      updatedAt: new Date()
    }
    
    setCurrentPage(updatedPage)
    addToHistory(updatedPage)
  }, [currentPage])

  const selectedSection = currentPage.sections.find(s => s.id === selectedSectionId)

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Section Sidebar */}
      <SectionSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onAddSection={addSection}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-md"
              title="Toggle Sections Panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={currentPage.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none focus:ring-0 focus:outline-none"
                placeholder="Page Title"
              />
              
              <button
                onClick={() => setShowPagesDashboard(true)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                title="Manage Pages"
              >
                📁 Pages
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Undo/Redo */}
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              title="Undo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              title="Redo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>

            {/* Save Button */}
            <button
              onClick={savePage}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSaving && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>

            {/* Preview Toggle */}
            <button
              onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
              className={`p-2 rounded-md transition-colors ${
                isCustomizationOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
              }`}
              title="Toggle Customization Panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 flex">
          <PagePreview
            page={currentPage}
            selectedSectionId={selectedSectionId}
            onSelectSection={setSelectedSectionId}
            onUpdateSection={updateSection}
            onDeleteSection={deleteSection}
            onDuplicateSection={duplicateSection}
            onMoveSection={moveSection}
          />

          {/* Customization Panel */}
          {isCustomizationOpen && (
            <CustomizationPanel
              section={selectedSection}
              onUpdateSection={updateSection}
              onClose={() => setIsCustomizationOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Pages Dashboard Modal */}
      {showPagesDashboard && (
        <PagesDashboard
          onSelectPage={loadPage}
          onClose={() => setShowPagesDashboard(false)}
        />
      )}
    </div>
  )
}