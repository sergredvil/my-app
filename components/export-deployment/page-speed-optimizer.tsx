'use client'

import { useState, useEffect } from 'react'
import { Page, Section } from '@/types'

interface SpeedMetrics {
  loadTime: number
  contentSize: number
  requests: number
  images: number
  scripts: number
  stylesheets: number
}

interface SpeedAnalysis {
  metrics: SpeedMetrics
  score: number
  issues: Array<{
    type: 'critical' | 'warning' | 'info'
    title: string
    description: string
    impact: string
    suggestion: string
  }>
  optimizations: Array<{
    title: string
    description: string
    impact: string
    effort: 'low' | 'medium' | 'high'
    enabled: boolean
  }>
}

interface PageSpeedOptimizerProps {
  page: Page
  onUpdatePage: (updatedPage: Page) => void
  onClose: () => void
}

export function PageSpeedOptimizer({ page, onUpdatePage, onClose }: PageSpeedOptimizerProps) {
  const [analysis, setAnalysis] = useState<SpeedAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [activeTab, setActiveTab] = useState<'metrics' | 'issues' | 'optimizations'>('metrics')

  useEffect(() => {
    runSpeedAnalysis()
  }, [page])

  const runSpeedAnalysis = () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      const analysis = analyzePage(page)
      setAnalysis(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const analyzePage = (page: Page): SpeedAnalysis => {
    const metrics: SpeedMetrics = {
      loadTime: 0,
      contentSize: 0,
      requests: 1, // HTML file
      images: 0,
      scripts: 0,
      stylesheets: 1 // Base CSS
    }

    const issues: SpeedAnalysis['issues'] = []
    const optimizations: SpeedAnalysis['optimizations'] = []

    // Analyze sections
    page.sections.forEach(section => {
      // Simulate content size calculation
      const sectionContent = JSON.stringify(section.content || {})
      metrics.contentSize += sectionContent.length

      // Check for images
      if (section.content?.image || section.content?.images) {
        metrics.images += Array.isArray(section.content.images) ? 
          section.content.images.length : 1
        metrics.requests += Array.isArray(section.content.images) ? 
          section.content.images.length : 1
      }

      // Check for performance impacts
      if (section.styles?.customCss && section.styles.customCss.length > 1000) {
        issues.push({
          type: 'warning',
          title: 'Large custom CSS in section',
          description: `Section "${section.type}" has ${section.styles.customCss.length} characters of custom CSS`,
          impact: 'May slow down rendering',
          suggestion: 'Consider moving repetitive styles to global CSS'
        })
      }
    })

    // Analyze custom CSS
    if (page.customCss) {
      metrics.contentSize += page.customCss.length
      if (page.customCss.length > 10000) {
        issues.push({
          type: 'critical',
          title: 'Large custom CSS file',
          description: `Custom CSS is ${Math.round(page.customCss.length / 1000)}KB`,
          impact: 'Significantly impacts load time',
          suggestion: 'Minify CSS and remove unused styles'
        })
      }
    }

    // Analyze custom JavaScript
    if (page.customJs) {
      metrics.contentSize += page.customJs.length
      metrics.scripts += 1
      if (page.customJs.length > 20000) {
        issues.push({
          type: 'critical',
          title: 'Large custom JavaScript file',
          description: `Custom JavaScript is ${Math.round(page.customJs.length / 1000)}KB`,
          impact: 'Blocks page rendering',
          suggestion: 'Minify JavaScript and consider async loading'
        })
      }
    }

    // Section count impact
    if (page.sections.length > 12) {
      issues.push({
        type: 'warning',
        title: 'Many sections on page',
        description: `Page has ${page.sections.length} sections`,
        impact: 'May increase render time',
        suggestion: 'Consider splitting into multiple pages'
      })
    }

    // Image optimization
    if (metrics.images > 8) {
      issues.push({
        type: 'warning',
        title: 'Many images',
        description: `Page contains ${metrics.images} images`,
        impact: 'Increases load time and bandwidth',
        suggestion: 'Implement lazy loading and image optimization'
      })
    }

    // Generate load time estimate
    let baseLoadTime = 800 // Base load time in ms
    baseLoadTime += Math.min(metrics.contentSize / 100, 2000) // Content size impact
    baseLoadTime += metrics.images * 200 // Image load time
    baseLoadTime += metrics.scripts * 300 // Script execution time
    
    metrics.loadTime = Math.round(baseLoadTime)

    // Generate optimizations
    optimizations.push(
      {
        title: 'Enable image lazy loading',
        description: 'Load images only when they come into view',
        impact: 'Reduces initial page load by 20-40%',
        effort: 'low',
        enabled: false
      },
      {
        title: 'Minify CSS and JavaScript',
        description: 'Remove whitespace and comments from code',
        impact: 'Reduces file size by 15-25%',
        effort: 'low',
        enabled: false
      },
      {
        title: 'Optimize images',
        description: 'Compress images and use modern formats (WebP)',
        impact: 'Reduces image size by 30-60%',
        effort: 'medium',
        enabled: false
      },
      {
        title: 'Enable browser caching',
        description: 'Cache static resources in browser',
        impact: 'Improves repeat visit speed by 50-80%',
        effort: 'medium',
        enabled: false
      },
      {
        title: 'Use a CDN',
        description: 'Serve content from geographically distributed servers',
        impact: 'Reduces load time by 20-50%',
        effort: 'high',
        enabled: false
      },
      {
        title: 'Preload critical resources',
        description: 'Load important resources early',
        impact: 'Improves perceived performance by 10-20%',
        effort: 'medium',
        enabled: false
      }
    )

    // Calculate overall score
    let score = 100
    issues.forEach(issue => {
      if (issue.type === 'critical') score -= 25
      if (issue.type === 'warning') score -= 15
      if (issue.type === 'info') score -= 5
    })

    // Load time penalty
    if (metrics.loadTime > 3000) score -= 30
    else if (metrics.loadTime > 2000) score -= 20
    else if (metrics.loadTime > 1000) score -= 10

    score = Math.max(0, score)

    return {
      metrics,
      score,
      issues,
      optimizations
    }
  }

  const handleOptimize = async () => {
    if (!analysis) return
    
    setIsOptimizing(true)
    
    // Simulate optimization process
    setTimeout(() => {
      const updatedPage = { ...page }
      
      // Apply basic optimizations
      if (page.customCss) {
        // Minify CSS (basic simulation)
        updatedPage.customCss = page.customCss
          .replace(/\s+/g, ' ')
          .replace(/;\s*}/g, '}')
          .replace(/{\s*/g, '{')
          .replace(/;\s*/g, ';')
          .trim()
      }
      
      if (page.customJs) {
        // Minify JS (basic simulation)
        updatedPage.customJs = page.customJs
          .replace(/\s+/g, ' ')
          .replace(/;\s*}/g, '}')
          .replace(/{\s*/g, '{')
          .trim()
      }
      
      onUpdatePage(updatedPage)
      setIsOptimizing(false)
      
      // Re-analyze after optimization
      setTimeout(() => {
        runSpeedAnalysis()
      }, 500)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    if (score >= 50) return 'text-orange-600'
    return 'text-red-600'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100'
    if (score >= 70) return 'bg-yellow-100'
    if (score >= 50) return 'bg-orange-100'
    return 'bg-red-100'
  }

  const getIssueColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      case 'info': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      case 'warning':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        )
      case 'info':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  if (isAnalyzing || !analysis) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Performance</h3>
            <p className="text-gray-600">Running page speed analysis...</p>
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
              <h2 className="text-xl font-semibold">Page Speed Optimizer</h2>
              <p className="text-sm text-gray-600 mt-1">{page.title}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-lg ${getScoreBackground(analysis.score)}`}>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </div>
                  <div className="text-xs text-gray-600">Speed Score</div>
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
              { id: 'metrics', label: 'Metrics' },
              { id: 'issues', label: `Issues (${analysis.issues.length})` },
              { id: 'optimizations', label: 'Optimizations' }
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {(analysis.metrics.loadTime / 1000).toFixed(1)}s
                  </div>
                  <div className="text-sm text-blue-700">Load Time</div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.round(analysis.metrics.contentSize / 1024)}KB
                  </div>
                  <div className="text-sm text-green-700">Total Size</div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {analysis.metrics.requests}
                  </div>
                  <div className="text-sm text-purple-700">Requests</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Resource Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Images</span>
                    <span className="font-medium">{analysis.metrics.images}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Scripts</span>
                    <span className="font-medium">{analysis.metrics.scripts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stylesheets</span>
                    <span className="font-medium">{analysis.metrics.stylesheets}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-4">Performance Budget</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Load Time Budget (3s)</span>
                      <span>{(analysis.metrics.loadTime / 1000).toFixed(1)}s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.metrics.loadTime <= 3000 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min((analysis.metrics.loadTime / 3000) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Size Budget (500KB)</span>
                      <span>{Math.round(analysis.metrics.contentSize / 1024)}KB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          analysis.metrics.contentSize <= 512000 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{
                          width: `${Math.min((analysis.metrics.contentSize / 512000) * 100, 100)}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'issues' && (
            <div className="space-y-4">
              {analysis.issues.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-green-600 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Issues Found</h3>
                  <p className="text-gray-600">Your page is well-optimized for speed!</p>
                </div>
              ) : (
                analysis.issues.map((issue, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-semibold ${getIssueColor(issue.type)}`}>
                            {issue.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            issue.type === 'critical' ? 'bg-red-100 text-red-800' :
                            issue.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {issue.type}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{issue.description}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          <strong>Impact:</strong> {issue.impact}
                        </p>
                        <p className="text-blue-700 text-sm mt-2">
                          <strong>Suggestion:</strong> {issue.suggestion}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'optimizations' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Auto-Optimization Available</h3>
                <p className="text-blue-800 text-sm mb-4">
                  We can automatically apply basic optimizations like CSS/JS minification.
                </p>
                <button
                  onClick={handleOptimize}
                  disabled={isOptimizing}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isOptimizing ? 'Optimizing...' : 'Auto-Optimize'}
                </button>
              </div>

              {analysis.optimizations.map((optimization, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{optimization.title}</h3>
                      <p className="text-gray-700 text-sm mt-1">{optimization.description}</p>
                      <p className="text-green-700 text-sm mt-1">
                        <strong>Impact:</strong> {optimization.impact}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                        optimization.effort === 'low' ? 'bg-green-100 text-green-800' :
                        optimization.effort === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {optimization.effort} effort
                      </span>
                    </div>
                    <div className="ml-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={optimization.enabled}
                          onChange={() => {
                            const updatedOptimizations = [...analysis.optimizations]
                            updatedOptimizations[index].enabled = !optimization.enabled
                            setAnalysis({
                              ...analysis,
                              optimizations: updatedOptimizations
                            })
                          }}
                          className="rounded"
                        />
                        <span className="ml-2 text-sm">Enable</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={runSpeedAnalysis}
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