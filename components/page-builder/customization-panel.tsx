'use client'

import { Section, SectionContent, SectionStyles } from '@/types'
import { useState } from 'react'
import { 
  RichTextEditor, 
  ImageUpload, 
  ColorPicker, 
  FontSelector, 
  SpacingControls, 
  ButtonStyler 
} from '@/components/content-management'

interface CustomizationPanelProps {
  section: Section | undefined
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void
  onClose: () => void
}

export function CustomizationPanel({ section, onUpdateSection, onClose }: CustomizationPanelProps) {
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content')
  const [showColorPicker, setShowColorPicker] = useState<string | null>(null)

  if (!section) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🎯</div>
          <p className="text-sm">Select a section to customize</p>
        </div>
      </div>
    )
  }

  const handleContentChange = (key: string, value: any) => {
    const updatedContent = { ...section.content, [key]: value }
    onUpdateSection(section.id, { content: updatedContent })
  }

  const handleStyleChange = (styleUpdates: Partial<SectionStyles>) => {
    const updatedStyles = { ...section.styles, ...styleUpdates }
    onUpdateSection(section.id, { styles: updatedStyles })
  }

  const renderContentFields = () => {
    const content = section.content
    
    // Common content fields based on section type
    switch (section.type) {
      case 'hero':
      case 'cta':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headline
              </label>
              <RichTextEditor
                value={content.headline || ''}
                onChange={(value) => handleContentChange('headline', value)}
                placeholder="Enter your headline..."
                maxLength={200}
              />
            </div>
            
            {content.description !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <RichTextEditor
                  value={content.description || ''}
                  onChange={(value) => handleContentChange('description', value)}
                  placeholder="Enter your description..."
                  maxLength={500}
                />
              </div>
            )}

            {/* Background Image */}
            {(content.image !== undefined || content.backgroundImage !== undefined) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Image
                </label>
                <ImageUpload
                  value={content.image || content.backgroundImage || ''}
                  onChange={(url) => handleContentChange(content.image !== undefined ? 'image' : 'backgroundImage', url)}
                  placeholder="Upload background image"
                  width={280}
                  height={140}
                />
              </div>
            )}

            {content.cta && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Button
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Button text"
                    value={content.cta.primary?.text || content.primaryButton?.text || ''}
                    onChange={(e) => {
                      if (content.cta) {
                        handleContentChange('cta', {
                          ...content.cta,
                          primary: { ...content.cta.primary, text: e.target.value }
                        })
                      } else if (content.primaryButton) {
                        handleContentChange('primaryButton', {
                          ...content.primaryButton,
                          text: e.target.value
                        })
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                  <input
                    type="url"
                    placeholder="Button URL"
                    value={content.cta.primary?.href || content.primaryButton?.href || ''}
                    onChange={(e) => {
                      if (content.cta) {
                        handleContentChange('cta', {
                          ...content.cta,
                          primary: { ...content.cta.primary, href: e.target.value }
                        })
                      } else if (content.primaryButton) {
                        handleContentChange('primaryButton', {
                          ...content.primaryButton,
                          href: e.target.value
                        })
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'testimonials':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonials
              </label>
              <div className="text-sm text-gray-500">
                {content.testimonials?.length || 0} testimonials configured
              </div>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => handleContentChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={content.description || ''}
                onChange={(e) => handleContentChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => handleContentChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            
            {content.subtitle !== undefined && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={content.subtitle || ''}
                  onChange={(e) => handleContentChange('subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            )}
          </div>
        )
    }
  }

  const renderStyleFields = () => (
    <div className="space-y-6">
      {/* Background Color */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Background Color</label>
          <button
            onClick={() => setShowColorPicker(showColorPicker === 'background' ? null : 'background')}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            {showColorPicker === 'background' ? 'Close' : 'Advanced'}
          </button>
        </div>
        
        {showColorPicker === 'background' ? (
          <ColorPicker
            value={section.styles.backgroundColor || 'transparent'}
            onChange={(color) => handleStyleChange({ backgroundColor: color })}
            showGradients
          />
        ) : (
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
              style={{ backgroundColor: section.styles.backgroundColor || '#ffffff' }}
              onClick={() => setShowColorPicker('background')}
            />
            <input
              type="text"
              value={section.styles.backgroundColor || ''}
              onChange={(e) => handleStyleChange({ backgroundColor: e.target.value })}
              placeholder="transparent"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono"
            />
          </div>
        )}
      </div>

      {/* Text Color */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700">Text Color</label>
          <button
            onClick={() => setShowColorPicker(showColorPicker === 'text' ? null : 'text')}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            {showColorPicker === 'text' ? 'Close' : 'Advanced'}
          </button>
        </div>
        
        {showColorPicker === 'text' ? (
          <ColorPicker
            value={section.styles.textColor || '#000000'}
            onChange={(color) => handleStyleChange({ textColor: color })}
          />
        ) : (
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 border border-gray-300 rounded-md cursor-pointer"
              style={{ backgroundColor: section.styles.textColor || '#000000' }}
              onClick={() => setShowColorPicker('text')}
            />
            <input
              type="text"
              value={section.styles.textColor || ''}
              onChange={(e) => handleStyleChange({ textColor: e.target.value })}
              placeholder="inherit"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-mono"
            />
          </div>
        )}
      </div>

      {/* Typography */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <FontSelector
          value={section.styles.fontFamily || 'Inter, sans-serif'}
          onChange={(fontFamily) => handleStyleChange({ fontFamily })}
          showWeights
          selectedWeight={section.styles.fontWeight || '400'}
          onWeightChange={(fontWeight) => handleStyleChange({ fontWeight })}
        />
      </div>

      {/* Padding */}
      <SpacingControls
        label="Padding"
        value={section.styles.padding || { top: 0, right: 0, bottom: 0, left: 0 }}
        onChange={(padding) => handleStyleChange({ padding })}
        max={100}
        showPresets
      />

      {/* Margin */}
      <SpacingControls
        label="Margin"
        value={section.styles.margin ? { top: section.styles.margin.top || 0, right: 0, bottom: section.styles.margin.bottom || 0, left: 0 } : { top: 0, right: 0, bottom: 0, left: 0 }}
        onChange={(margin) => handleStyleChange({ 
          margin: { 
            top: margin.top || 0, 
            bottom: margin.bottom || 0 
          } 
        })}
        max={100}
        showPresets={false}
        allowNegative
      />
    </div>
  )

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Customize Section</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md"
            title="Close Panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Section Info */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <div className="capitalize font-medium">{section.type}</div>
          <span>•</span>
          <div>{section.variant}</div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'content'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'style'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Style
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'content' ? renderContentFields() : renderStyleFields()}
      </div>
    </div>
  )
}