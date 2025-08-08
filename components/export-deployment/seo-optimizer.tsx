'use client'

import { useState, useEffect } from 'react'
import { Page, Section } from '@/types'

interface SeoAnalysis {
  title: {
    score: number
    issues: string[]
    suggestions: string[]
  }
  description: {
    score: number
    issues: string[]
    suggestions: string[]
  }
  headings: {
    score: number
    issues: string[]
    suggestions: string[]
  }
  content: {
    score: number
    issues: string[]
    suggestions: string[]
  }
  images: {
    score: number
    issues: string[]
    suggestions: string[]
  }
  performance: {
    score: number
    issues: string[]
    suggestions: string[]
  }
  overall: number
}

interface SeoOptimizerProps {
  page: Page
  onUpdatePage: (updatedPage: Page) => void
  onClose: () => void
}

export function SeoOptimizer({ page, onUpdatePage, onClose }: SeoOptimizerProps) {
  const [analysis, setAnalysis] = useState<SeoAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState<'analysis' | 'recommendations' | 'preview'>('analysis')

  useEffect(() => {
    runSeoAnalysis()
  }, [page])

  const runSeoAnalysis = () => {
    setIsAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      const analysis = analyzePage(page)
      setAnalysis(analysis)
      setIsAnalyzing(false)
    }, 1500)
  }

  const analyzePage = (page: Page): SeoAnalysis => {
    const analysis: SeoAnalysis = {
      title: { score: 100, issues: [], suggestions: [] },
      description: { score: 100, issues: [], suggestions: [] },
      headings: { score: 100, issues: [], suggestions: [] },
      content: { score: 100, issues: [], suggestions: [] },
      images: { score: 100, issues: [], suggestions: [] },
      performance: { score: 100, issues: [], suggestions: [] },
      overall: 100
    }

    // Analyze title
    if (!page.title) {
      analysis.title.score = 0
      analysis.title.issues.push('Page title is missing')
      analysis.title.suggestions.push('Add a descriptive page title')
    } else {
      if (page.title.length < 30) {
        analysis.title.score -= 20
        analysis.title.issues.push('Page title is too short')
        analysis.title.suggestions.push('Make your title 30-60 characters long')
      }
      if (page.title.length > 60) {
        analysis.title.score -= 30
        analysis.title.issues.push('Page title is too long')
        analysis.title.suggestions.push('Keep your title under 60 characters')
      }
    }

    if (!page.seoTitle) {
      analysis.title.score -= 10
      analysis.title.suggestions.push('Set a custom SEO title for better search results')
    }

    // Analyze description
    if (!page.seoDescription) {
      analysis.description.score = 0
      analysis.description.issues.push('Meta description is missing')
      analysis.description.suggestions.push('Add a compelling meta description')
    } else {
      if (page.seoDescription.length < 120) {
        analysis.description.score -= 20
        analysis.description.issues.push('Meta description is too short')
        analysis.description.suggestions.push('Make your description 120-160 characters')
      }
      if (page.seoDescription.length > 160) {
        analysis.description.score -= 30
        analysis.description.issues.push('Meta description is too long')
        analysis.description.suggestions.push('Keep your description under 160 characters')
      }
    }

    // Analyze headings
    const headingSections = page.sections.filter(s => 
      ['hero', 'features', 'about', 'cta'].includes(s.type)
    )
    
    if (headingSections.length === 0) {
      analysis.headings.score -= 50
      analysis.headings.issues.push('No sections with headings found')
      analysis.headings.suggestions.push('Add sections with clear headings (Hero, Features, etc.)')
    }

    let hasH1 = false
    headingSections.forEach(section => {
      if (section.type === 'hero' && section.content?.title) {
        hasH1 = true
      }
    })

    if (!hasH1) {
      analysis.headings.score -= 30
      analysis.headings.issues.push('No H1 heading found')
      analysis.headings.suggestions.push('Add a main heading in your Hero section')
    }

    // Analyze content
    const contentSections = page.sections.filter(s => 
      s.content?.description || s.content?.content
    )
    
    if (contentSections.length === 0) {
      analysis.content.score -= 60
      analysis.content.issues.push('Very little content found')
      analysis.content.suggestions.push('Add more descriptive content to your sections')
    }

    const totalWords = contentSections.reduce((count, section) => {
      const text = (section.content?.description || section.content?.content || '').toString()
      return count + text.split(' ').length
    }, 0)

    if (totalWords < 300) {
      analysis.content.score -= 40
      analysis.content.issues.push('Content is too short for good SEO')
      analysis.content.suggestions.push('Aim for at least 300 words of quality content')
    }

    // Analyze images
    const imageSections = page.sections.filter(s => 
      s.content?.image || s.content?.images
    )

    if (imageSections.length === 0) {
      analysis.images.score -= 20
      analysis.images.suggestions.push('Consider adding images to make your page more engaging')
    } else {
      // Check for alt text (simulated)
      analysis.images.score -= 30
      analysis.images.issues.push('Some images may be missing alt text')
      analysis.images.suggestions.push('Add descriptive alt text to all images for accessibility')
    }

    // Analyze performance
    if (page.customCss && page.customCss.length > 5000) {
      analysis.performance.score -= 20
      analysis.performance.issues.push('Large amount of custom CSS')
      analysis.performance.suggestions.push('Consider optimizing your custom CSS')
    }

    if (page.customJs && page.customJs.length > 10000) {
      analysis.performance.score -= 30
      analysis.performance.issues.push('Large amount of custom JavaScript')
      analysis.performance.suggestions.push('Consider optimizing your custom JavaScript')
    }

    if (page.sections.length > 15) {
      analysis.performance.score -= 10
      analysis.performance.suggestions.push('Consider if all sections are necessary for page speed')
    }

    // Calculate overall score
    const scores = [
      analysis.title.score,
      analysis.description.score,
      analysis.headings.score,
      analysis.content.score,
      analysis.images.score,
      analysis.performance.score
    ]
    
    analysis.overall = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length)

    return analysis
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const handleQuickFix = (type: string, suggestion: string) => {
    const updatedPage = { ...page }
    
    switch (type) {
      case 'title':
        if (suggestion.includes('SEO title')) {
          updatedPage.seoTitle = page.title
        }
        break
      case 'description':
        if (suggestion.includes('meta description')) {
          updatedPage.seoDescription = `${page.title} - Created with Marketing Site Builder. Discover amazing features and benefits.`
        }
        break
    }
    
    onUpdatePage(updatedPage)
  }

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": page.seoTitle || page.title,
      "description": page.seoDescription,
      "url": `/${page.slug}`,
      "publisher": {
        "@type": "Organization",
        "name": "Marketing Site Builder"
      }
    }
  }

  if (isAnalyzing || !analysis) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing SEO</h3>
            <p className="text-gray-600">Running comprehensive SEO analysis...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">SEO Optimizer</h2>
              <p className="text-sm text-gray-600 mt-1">{page.title}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-lg ${getScoreBackground(analysis.overall)}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.overall)}`}>
                    {analysis.overall}
                  </div>
                  <div className="text-xs text-gray-600">SEO Score</div>
                </div>
              </div>
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

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'analysis', label: 'Analysis' },
              { id: 'recommendations', label: 'Recommendations' },
              { id: 'preview', label: 'Preview' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              {Object.entries(analysis).filter(([key]) => key !== 'overall').map(([category, data]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold capitalize">{category}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBackground(data.score)} ${getScoreColor(data.score)}`}>
                      {data.score}/100
                    </div>
                  </div>
                  
                  {data.issues.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-red-600 mb-2">Issues</h4>
                      <ul className="space-y-1">
                        {data.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-red-700 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {data.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-blue-600 mb-2">Suggestions</h4>
                      <ul className="space-y-2">
                        {data.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-blue-700 flex items-start justify-between">
                            <span className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {suggestion}
                            </span>
                            {(category === 'title' || category === 'description') && suggestion.includes('Add') && (
                              <button
                                onClick={() => handleQuickFix(category, suggestion)}
                                className="ml-2 px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded"
                              >
                                Quick Fix
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Priority Recommendations</h3>
                <div className="space-y-3">
                  {analysis.overall < 60 && (
                    <div className="bg-white rounded p-3">
                      <h4 className="font-medium mb-1">Critical: Improve Basic SEO</h4>
                      <p className="text-sm text-gray-600">Your page needs basic SEO elements like title, description, and headings.</p>
                    </div>
                  )}
                  
                  {analysis.content.score < 70 && (
                    <div className="bg-white rounded p-3">
                      <h4 className="font-medium mb-1">High: Add More Content</h4>
                      <p className="text-sm text-gray-600">Search engines prefer pages with substantial, high-quality content.</p>
                    </div>
                  )}
                  
                  {analysis.performance.score < 80 && (
                    <div className="bg-white rounded p-3">
                      <h4 className="font-medium mb-1">Medium: Optimize Performance</h4>
                      <p className="text-sm text-gray-600">Faster pages rank better and provide better user experience.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">SEO Best Practices</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Use unique titles and descriptions for each page
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Include relevant keywords naturally in your content
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Ensure your page loads quickly on all devices
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Add alt text to images for accessibility
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Search Engine Preview</h3>
                <div className="bg-white border rounded p-4 max-w-2xl">
                  <div className="text-blue-700 text-lg hover:underline cursor-pointer">
                    {page.seoTitle || page.title}
                  </div>
                  <div className="text-green-700 text-sm mt-1">
                    https://yoursite.com/{page.slug}
                  </div>
                  <div className="text-gray-700 text-sm mt-2">
                    {page.seoDescription || `${page.title} - Created with Marketing Site Builder`}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Structured Data</h3>
                <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                  {JSON.stringify(generateStructuredData(), null, 2)}
                </pre>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Social Media Preview</h3>
                <div className="bg-white border rounded p-4 max-w-md">
                  <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center text-gray-500">
                    Preview Image
                  </div>
                  <div className="font-semibold">
                    {page.seoTitle || page.title}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {page.seoDescription || `${page.title} - Created with Marketing Site Builder`}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    yoursite.com
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={runSeoAnalysis}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Re-analyze
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}