'use client'

import { Page, Section } from '@/types'
import { renderSection } from '@/components/sections'

interface PagePreviewProps {
  page: Page
  selectedSectionId: string | null
  onSelectSection: (sectionId: string | null) => void
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void
  onDeleteSection: (sectionId: string) => void
  onDuplicateSection: (sectionId: string) => void
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void
}

export function PagePreview({
  page,
  selectedSectionId,
  onSelectSection,
  onUpdateSection,
  onDeleteSection,
  onDuplicateSection,
  onMoveSection
}: PagePreviewProps) {
  const handleSectionClick = (sectionId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    onSelectSection(sectionId === selectedSectionId ? null : sectionId)
  }

  const handleMoveUp = (sectionId: string) => {
    onMoveSection(sectionId, 'up')
  }

  const handleMoveDown = (sectionId: string) => {
    onMoveSection(sectionId, 'down')
  }

  const handleDuplicate = (sectionId: string) => {
    onDuplicateSection(sectionId)
  }

  const handleDelete = (sectionId: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      onDeleteSection(sectionId)
    }
  }

  return (
    <div 
      className="flex-1 bg-white overflow-y-auto"
      onClick={() => onSelectSection(null)}
    >
      {/* Page Content */}
      <div className="min-h-full">
        {page.sections.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start Building Your Page
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm">
                Add sections from the sidebar to start creating your marketing page.
              </p>
              <div className="text-sm text-gray-500">
                Click on sections in the sidebar to get started
              </div>
            </div>
          </div>
        ) : (
          <div>
            {page.sections
              .sort((a, b) => a.order - b.order)
              .map((section) => {
                const isSelected = section.id === selectedSectionId
                
                return (
                  <div
                    key={section.id}
                    className={`relative group transition-all duration-200 ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 ring-inset' 
                        : 'hover:ring-1 hover:ring-gray-300 hover:ring-inset'
                    }`}
                    onClick={(e) => handleSectionClick(section.id, e)}
                  >
                    {/* Section Controls Overlay */}
                    {isSelected && (
                      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                        {/* Section Info */}
                        <div className="flex items-center px-2 py-1 bg-blue-50 rounded text-xs font-medium text-blue-700">
                          {section.type} - {section.variant}
                        </div>
                        
                        {/* Move Up */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMoveUp(section.id)
                          }}
                          disabled={section.order === 0}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>

                        {/* Move Down */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMoveDown(section.id)
                          }}
                          disabled={section.order === page.sections.length - 1}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Duplicate */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDuplicate(section.id)
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Duplicate"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>

                        {/* Delete */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(section.id)
                          }}
                          className="p-1 hover:bg-red-100 text-red-600 rounded"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )}

                    {/* Section Drag Handle */}
                    {isSelected && (
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                          <div className="cursor-move">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Render Section */}
                    <div className={`transition-opacity ${isSelected ? 'opacity-100' : 'opacity-100'}`}>
                      {renderSection(section, {
                        isEditing: true,
                        onContentChange: (content) => onUpdateSection(section.id, { content }),
                        onStyleChange: (styles) => onUpdateSection(section.id, { styles }),
                        onDelete: () => handleDelete(section.id),
                        onDuplicate: () => handleDuplicate(section.id),
                        onMoveUp: section.order > 0 ? () => handleMoveUp(section.id) : undefined,
                        onMoveDown: section.order < page.sections.length - 1 ? () => handleMoveDown(section.id) : undefined
                      })}
                    </div>

                    {/* Drop Zone Indicator */}
                    <div className="absolute inset-x-0 -bottom-2 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-full h-0.5 bg-blue-400 rounded-full"></div>
                      <div className="absolute bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Drop section here
                      </div>
                    </div>
                  </div>
                )
              })}

            {/* Final Drop Zone */}
            <div className="h-16 flex items-center justify-center border-2 border-dashed border-gray-200 mx-4 mb-4 rounded-lg hover:border-blue-400 transition-colors">
              <div className="text-sm text-gray-400">Drop a section here</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}