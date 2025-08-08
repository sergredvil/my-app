'use client'

import { useState } from 'react'
import { Page } from '@/types'

interface CustomDomainProps {
  page: Page
  onClose: () => void
}

export function CustomDomain({ page, onClose }: CustomDomainProps) {
  const [domain, setDomain] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'failed' | null>(null)

  const handleVerifyDomain = () => {
    if (!domain) return
    
    setIsVerifying(true)
    
    // Simulate domain verification process
    setTimeout(() => {
      setVerificationStatus(Math.random() > 0.5 ? 'verified' : 'failed')
      setIsVerifying(false)
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Custom Domain Setup</h2>
              <p className="text-sm text-gray-600 mt-1">{page.title}</p>
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

        {/* Content */}
        <div className="p-6">
          {/* Coming Soon Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-blue-900">Coming Soon</h3>
                <p className="text-blue-800 mt-1">
                  Custom domain support is currently in development and will be available in a future update.
                </p>
              </div>
            </div>
          </div>

          {/* Preview of Future Feature */}
          <div className="space-y-6 opacity-50 pointer-events-none">
            <div>
              <label htmlFor="custom-domain" className="block text-sm font-medium text-gray-700 mb-2">
                Your Custom Domain
              </label>
              <div className="flex">
                <input
                  id="custom-domain"
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="www.yourdomain.com"
                  disabled
                />
                <button
                  onClick={handleVerifyDomain}
                  disabled={!domain || isVerifying}
                  className="px-4 py-2 bg-blue-600 text-white border border-blue-600 rounded-r-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isVerifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>
            </div>

            {verificationStatus && (
              <div className={`p-4 rounded-lg ${
                verificationStatus === 'verified' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {verificationStatus === 'verified' ? (
                  <div className="flex items-center text-green-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Domain verified successfully!
                  </div>
                ) : (
                  <div className="flex items-center text-red-700">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Domain verification failed. Please check your DNS settings.
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">DNS Configuration Required</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Add the following CNAME record to your DNS:</p>
                  <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    CNAME @ marketing-builder.com
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Or add this A record:</p>
                  <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    A @ 192.168.1.100
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Important Note</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    DNS changes can take up to 48 hours to propagate worldwide. SSL certificates will be automatically generated for verified domains.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Benefits */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">What you'll get with custom domains:</h3>
            <ul className="space-y-2">
              {[
                'Professional branded URLs for your pages',
                'Automatic SSL certificate generation',
                'Better SEO with your own domain authority',
                'Custom email addresses (contact@yourdomain.com)',
                'Advanced DNS management',
                'Subdomain support for different pages'
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Waitlist */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Join the Waitlist</h4>
            <p className="text-blue-800 text-sm mb-3">
              Be the first to know when custom domain support launches.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 border border-blue-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}