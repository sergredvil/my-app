'use client'

import { useState } from 'react'
import { SectionType } from '@/types'
import { SECTION_TYPES, SECTION_VARIANTS } from '@/components/sections'

interface SectionSidebarProps {
  isOpen: boolean
  onToggle: () => void
  onAddSection: (sectionType: SectionType, variantId: string) => void
}

const SECTION_ICONS: Record<SectionType, string> = {
  header: '🧭',
  hero: '🚀',
  features: '⭐',
  pricing: '💰',
  testimonials: '💬',
  cta: '📢',
  about: '📖',
  team: '👥',
  faq: '❓',
  contact: '📞',
  newsletter: '📧',
  blog: '📝',
  gallery: '🖼️',
  stats: '📊',
  footer: '⬇️'
}

const SECTION_NAMES: Record<SectionType, string> = {
  header: 'Header',
  hero: 'Hero',
  features: 'Features',
  pricing: 'Pricing',
  testimonials: 'Testimonials',
  cta: 'Call to Action',
  about: 'About',
  team: 'Team',
  faq: 'FAQ',
  contact: 'Contact',
  newsletter: 'Newsletter',
  blog: 'Blog',
  gallery: 'Gallery',
  stats: 'Statistics',
  footer: 'Footer'
}

export function SectionSidebar({ isOpen, onToggle, onAddSection }: SectionSidebarProps) {
  const [selectedSectionType, setSelectedSectionType] = useState<SectionType | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSectionTypes = SECTION_TYPES.filter(type =>
    SECTION_NAMES[type].toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) {
    return (
      <div className="w-12 bg-white border-r border-gray-200 flex flex-col items-center py-4">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 rounded-md"
          title="Open Sections Panel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Sections</h2>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded-md"
            title="Close Sections Panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search sections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Section Types */}
      <div className="flex-1 overflow-y-auto">
        {!selectedSectionType ? (
          <div className="p-4">
            <div className="grid gap-2">
              {filteredSectionTypes.map((sectionType) => (
                <button
                  key={sectionType}
                  onClick={() => setSelectedSectionType(sectionType)}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors text-left"
                >
                  <div className="text-2xl mr-3">
                    {SECTION_ICONS[sectionType]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {SECTION_NAMES[sectionType]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {SECTION_VARIANTS[sectionType]?.length || 0} variants
                    </div>
                  </div>
                  <svg className="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Back Button */}
            <div className="p-4 border-b border-gray-200">
              <button
                onClick={() => setSelectedSectionType(null)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to sections
              </button>
              <h3 className="text-lg font-semibold mt-2">
                {SECTION_ICONS[selectedSectionType]} {SECTION_NAMES[selectedSectionType]}
              </h3>
            </div>

            {/* Variants */}
            <div className="p-4">
              <div className="space-y-3">
                {SECTION_VARIANTS[selectedSectionType]?.map((variant) => (
                  <div
                    key={variant.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                  >
                    {/* Preview Placeholder */}
                    <div className="h-24 bg-gray-50 border-b border-gray-200 flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Preview</div>
                    </div>
                    
                    {/* Variant Info */}
                    <div className="p-3">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {variant.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {variant.description}
                      </p>
                      <button
                        onClick={() => {
                          onAddSection(selectedSectionType, variant.id)
                          setSelectedSectionType(null)
                        }}
                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add Section
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}