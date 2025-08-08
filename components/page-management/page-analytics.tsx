'use client'

import { useState, useEffect } from 'react'
import { Page } from '@/types'

interface PageAnalytics {
  pageId: string
  views: number
  uniqueVisitors: number
  avgSessionDuration: number
  bounceRate: number
  topReferrers: Array<{ source: string; visits: number }>
  deviceBreakdown: {
    desktop: number
    tablet: number
    mobile: number
  }
  lastViewed: Date
}

interface PageAnalyticsProps {
  page: Page
  onClose: () => void
}

export function PageAnalyticsComponent({ page, onClose }: PageAnalyticsProps) {
  const [analytics, setAnalytics] = useState<PageAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true)
      
      // Simulate loading analytics data
      // In a real app, this would fetch from your analytics service
      setTimeout(() => {
        const mockAnalytics: PageAnalytics = {
          pageId: page.id,
          views: Math.floor(Math.random() * 5000) + 100,
          uniqueVisitors: Math.floor(Math.random() * 2000) + 50,
          avgSessionDuration: Math.floor(Math.random() * 300) + 60,
          bounceRate: Math.floor(Math.random() * 50) + 25,
          topReferrers: [
            { source: 'google.com', visits: Math.floor(Math.random() * 200) + 50 },
            { source: 'facebook.com', visits: Math.floor(Math.random() * 150) + 30 },
            { source: 'twitter.com', visits: Math.floor(Math.random() * 100) + 20 },
            { source: 'linkedin.com', visits: Math.floor(Math.random() * 80) + 15 },
            { source: 'direct', visits: Math.floor(Math.random() * 300) + 100 }
          ],
          deviceBreakdown: {
            desktop: Math.floor(Math.random() * 60) + 40,
            tablet: Math.floor(Math.random() * 20) + 10,
            mobile: Math.floor(Math.random() * 40) + 30
          },
          lastViewed: new Date(Date.now() - Math.floor(Math.random() * 86400000))
        }
        
        setAnalytics(mockAnalytics)
        setIsLoading(false)
      }, 1000)
    }

    loadAnalytics()
  }, [page.id, timeRange])

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  }

  const getDeviceIcon = (device: string) => {
    const icons = {
      desktop: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      tablet: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      ),
      mobile: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
    return icons[device as keyof typeof icons]
  }

  if (!page.isPublished) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Page Analytics</h2>
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
          
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Page Not Published</h3>
            <p className="text-gray-600 mb-6">
              Analytics are only available for published pages. Publish your page to start tracking visitor data.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
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
              <h2 className="text-xl font-semibold">Page Analytics</h2>
              <p className="text-sm text-gray-600 mt-1">{page.title}</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
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
                <p className="text-gray-600">Loading analytics...</p>
              </div>
            </div>
          ) : analytics ? (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{formatNumber(analytics.views)}</p>
                      <p className="text-sm text-blue-700">Page Views</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div>
                      <p className="text-2xl font-bold text-green-900">{formatNumber(analytics.uniqueVisitors)}</p>
                      <p className="text-sm text-green-700">Unique Visitors</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-2xl font-bold text-purple-900">{formatDuration(analytics.avgSessionDuration)}</p>
                      <p className="text-sm text-purple-700">Avg. Duration</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <div>
                      <p className="text-2xl font-bold text-orange-900">{analytics.bounceRate}%</p>
                      <p className="text-sm text-orange-700">Bounce Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Breakdown */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Breakdown</h3>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(analytics.deviceBreakdown).map(([device, percentage]) => (
                    <div key={device} className="text-center">
                      <div className="flex items-center justify-center mb-2 text-gray-600">
                        {getDeviceIcon(device)}
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
                      <p className="text-sm text-gray-600 capitalize">{device}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Referrers */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Referrers</h3>
                <div className="space-y-3">
                  {analytics.topReferrers.map((referrer, index) => (
                    <div key={referrer.source} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <span className="text-gray-900">{referrer.source}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">{referrer.visits} visits</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${(referrer.visits / Math.max(...analytics.topReferrers.map(r => r.visits))) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last Updated */}
              <div className="text-center text-sm text-gray-500">
                Last updated: {analytics.lastViewed.toLocaleDateString()} at {analytics.lastViewed.toLocaleTimeString()}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load analytics data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}