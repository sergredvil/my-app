'use client'

import { useState, useEffect } from 'react'
import { Page } from '@/types'

interface ShareLink {
  id: string
  name: string
  url: string
  description: string
  expiresAt: Date | null
  passwordProtected: boolean
  password?: string
  analytics: {
    views: number
    uniqueVisitors: number
    lastAccessed: Date | null
  }
  createdAt: Date
}

interface ShareableLinksProps {
  page: Page
  onClose: () => void
}

export function ShareableLinks({ page, onClose }: ShareableLinksProps) {
  const [shareLinks, setShareLinks] = useState<ShareLink[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    expiresAt: '',
    passwordProtected: false,
    password: ''
  })

  useEffect(() => {
    loadShareLinks()
  }, [page.id])

  const loadShareLinks = () => {
    // Load from localStorage (in a real app, this would be from an API)
    const stored = localStorage.getItem(`share-links-${page.id}`)
    if (stored) {
      const links = JSON.parse(stored).map((link: any) => ({
        ...link,
        expiresAt: link.expiresAt ? new Date(link.expiresAt) : null,
        createdAt: new Date(link.createdAt),
        analytics: {
          ...link.analytics,
          lastAccessed: link.analytics.lastAccessed ? new Date(link.analytics.lastAccessed) : null
        }
      }))
      setShareLinks(links)
    } else {
      // Create default public link
      const defaultLink: ShareLink = {
        id: 'public',
        name: 'Public Link',
        url: `${window.location.origin}/p/${page.slug}`,
        description: 'Anyone with this link can view your page',
        expiresAt: null,
        passwordProtected: false,
        analytics: {
          views: Math.floor(Math.random() * 100),
          uniqueVisitors: Math.floor(Math.random() * 50),
          lastAccessed: new Date()
        },
        createdAt: new Date()
      }
      setShareLinks([defaultLink])
    }
  }

  const saveShareLinks = (links: ShareLink[]) => {
    localStorage.setItem(`share-links-${page.id}`, JSON.stringify(links))
    setShareLinks(links)
  }

  const handleCreateLink = () => {
    if (!formData.name.trim()) return
    
    setIsCreating(true)
    
    setTimeout(() => {
      const newLink: ShareLink = {
        id: crypto.randomUUID(),
        name: formData.name,
        url: `${window.location.origin}/share/${crypto.randomUUID().substring(0, 8)}`,
        description: formData.description,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : null,
        passwordProtected: formData.passwordProtected,
        password: formData.passwordProtected ? formData.password : undefined,
        analytics: {
          views: 0,
          uniqueVisitors: 0,
          lastAccessed: null
        },
        createdAt: new Date()
      }
      
      const updatedLinks = [...shareLinks, newLink]
      saveShareLinks(updatedLinks)
      
      setFormData({
        name: '',
        description: '',
        expiresAt: '',
        passwordProtected: false,
        password: ''
      })
      setShowCreateForm(false)
      setIsCreating(false)
    }, 1000)
  }

  const handleDeleteLink = (linkId: string) => {
    if (linkId === 'public') return // Can't delete public link
    
    if (confirm('Are you sure you want to delete this share link?')) {
      const updatedLinks = shareLinks.filter(link => link.id !== linkId)
      saveShareLinks(updatedLinks)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
      console.log(`${type} copied to clipboard`)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const isLinkExpired = (link: ShareLink) => {
    return link.expiresAt && link.expiresAt < new Date()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateSocialShareUrls = (link: ShareLink) => {
    const encodedUrl = encodeURIComponent(link.url)
    const encodedTitle = encodeURIComponent(page.title)
    const encodedDescription = encodeURIComponent(page.seoDescription || `Check out ${page.title}`)
    
    return {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Shareable Links</h2>
              <p className="text-sm text-gray-600 mt-1">{page.title}</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Create New Link
              </button>
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
          {/* Create Link Form */}
          {showCreateForm && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Create Shareable Link</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="link-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Link Name *
                  </label>
                  <input
                    id="link-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Client Review, Team Feedback"
                  />
                </div>

                <div>
                  <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-2">
                    Expires At (Optional)
                  </label>
                  <input
                    id="expiry-date"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="link-description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="link-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What is this link for?"
                />
              </div>

              <div className="mt-4 flex items-center">
                <input
                  id="password-protected"
                  type="checkbox"
                  checked={formData.passwordProtected}
                  onChange={(e) => setFormData({ ...formData, passwordProtected: e.target.checked, password: '' })}
                  className="rounded"
                />
                <label htmlFor="password-protected" className="ml-2 text-sm text-gray-700">
                  Password protect this link
                </label>
              </div>

              {formData.passwordProtected && (
                <div className="mt-3">
                  <label htmlFor="link-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="link-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              )}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isCreating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateLink}
                  disabled={!formData.name.trim() || isCreating}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Creating...' : 'Create Link'}
                </button>
              </div>
            </div>
          )}

          {/* Share Links List */}
          <div className="space-y-4">
            {shareLinks.map((link) => (
              <div key={link.id} className={`border rounded-lg p-6 ${isLinkExpired(link) ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{link.name}</h3>
                      
                      {link.passwordProtected && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          Password Protected
                        </span>
                      )}
                      
                      {isLinkExpired(link) && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                          Expired
                        </span>
                      )}
                      
                      {link.id === 'public' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Public
                        </span>
                      )}
                    </div>
                    
                    {link.description && (
                      <p className="text-gray-600 text-sm mb-3">{link.description}</p>
                    )}

                    <div className="bg-gray-100 rounded p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <code className="text-sm text-gray-800 flex-1 mr-3">{link.url}</code>
                        <button
                          onClick={() => copyToClipboard(link.url, 'Link')}
                          className="p-1 hover:bg-gray-200 rounded"
                          title="Copy link"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Social Share Buttons */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm text-gray-600 mr-2">Share via:</span>
                      {Object.entries(generateSocialShareUrls(link)).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                          title={`Share on ${platform}`}
                        >
                          {platform === 'twitter' && '🐦'}
                          {platform === 'facebook' && '📘'}
                          {platform === 'linkedin' && '💼'}
                          {platform === 'email' && '📧'}
                          {platform === 'whatsapp' && '💬'}
                        </a>
                      ))}
                    </div>

                    {/* Analytics */}
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-900">{link.analytics.views}</div>
                        <div className="text-gray-600">Total Views</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{link.analytics.uniqueVisitors}</div>
                        <div className="text-gray-600">Unique Visitors</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {link.analytics.lastAccessed ? formatDate(link.analytics.lastAccessed) : 'Never'}
                        </div>
                        <div className="text-gray-600">Last Accessed</div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Created {formatDate(link.createdAt)}
                      {link.expiresAt && !isLinkExpired(link) && ` • Expires ${formatDate(link.expiresAt)}`}
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col space-y-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full"
                      title="Open link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    
                    {link.id !== 'public' && (
                      <button
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full"
                        title="Delete link"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shareLinks.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Shareable Links</h3>
              <p className="text-gray-600 mb-4">Create custom links to share your page with specific audiences</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}