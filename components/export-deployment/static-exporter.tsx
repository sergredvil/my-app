'use client'

import { useState } from 'react'
import { Page, Section } from '@/types'
import { SectionRegistry } from '@/components/sections/section-registry'
import JSZip from 'jszip'

interface StaticExporterProps {
  page: Page
  onClose: () => void
}

interface ExportOptions {
  includeImages: boolean
  includeCustomCSS: boolean
  includeCustomJS: boolean
  includeAnalytics: boolean
  optimizeForSEO: boolean
  minifyCode: boolean
}

export function StaticExporter({ page, onClose }: StaticExporterProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [options, setOptions] = useState<ExportOptions>({
    includeImages: true,
    includeCustomCSS: true,
    includeCustomJS: true,
    includeAnalytics: false,
    optimizeForSEO: true,
    minifyCode: false
  })

  const handleOptionChange = (option: keyof ExportOptions, value: boolean) => {
    setOptions(prev => ({ ...prev, [option]: value }))
  }

  const generateSectionHTML = (section: Section): string => {
    // Generate semantic HTML for each section type
    const sectionContent = section.content || {}
    
    switch (section.type) {
      case 'header':
        return `
          <header class="section-header ${section.variant}" data-section-id="${section.id}">
            <nav class="container mx-auto px-4">
              ${sectionContent.logo ? `<div class="logo">${sectionContent.logo}</div>` : ''}
              ${sectionContent.navigation ? `
                <ul class="nav-menu">
                  ${sectionContent.navigation.map((item: any) => `
                    <li><a href="${item.href || '#'}">${item.text || item.label}</a></li>
                  `).join('')}
                </ul>
              ` : ''}
              ${sectionContent.ctaButton ? `
                <a href="${sectionContent.ctaButton.href || '#'}" class="cta-button">
                  ${sectionContent.ctaButton.text || sectionContent.ctaButton.label}
                </a>
              ` : ''}
            </nav>
          </header>
        `
      
      case 'hero':
        return `
          <section class="section-hero ${section.variant}" data-section-id="${section.id}">
            <div class="container mx-auto px-4">
              ${sectionContent.title ? `<h1>${sectionContent.title}</h1>` : ''}
              ${sectionContent.subtitle ? `<p class="subtitle">${sectionContent.subtitle}</p>` : ''}
              ${sectionContent.description ? `<p class="description">${sectionContent.description}</p>` : ''}
              ${sectionContent.primaryButton ? `
                <a href="${sectionContent.primaryButton.href || '#'}" class="primary-button">
                  ${sectionContent.primaryButton.text || sectionContent.primaryButton.label}
                </a>
              ` : ''}
              ${sectionContent.secondaryButton ? `
                <a href="${sectionContent.secondaryButton.href || '#'}" class="secondary-button">
                  ${sectionContent.secondaryButton.text || sectionContent.secondaryButton.label}
                </a>
              ` : ''}
            </div>
          </section>
        `
      
      case 'features':
        return `
          <section class="section-features ${section.variant}" data-section-id="${section.id}">
            <div class="container mx-auto px-4">
              ${sectionContent.title ? `<h2>${sectionContent.title}</h2>` : ''}
              ${sectionContent.description ? `<p class="section-description">${sectionContent.description}</p>` : ''}
              ${sectionContent.features ? `
                <div class="features-grid">
                  ${sectionContent.features.map((feature: any) => `
                    <div class="feature-item">
                      ${feature.icon ? `<div class="feature-icon">${feature.icon}</div>` : ''}
                      ${feature.title ? `<h3>${feature.title}</h3>` : ''}
                      ${feature.description ? `<p>${feature.description}</p>` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </section>
        `

      case 'cta':
        return `
          <section class="section-cta ${section.variant}" data-section-id="${section.id}">
            <div class="container mx-auto px-4">
              ${sectionContent.title ? `<h2>${sectionContent.title}</h2>` : ''}
              ${sectionContent.description ? `<p>${sectionContent.description}</p>` : ''}
              ${sectionContent.button ? `
                <a href="${sectionContent.button.href || '#'}" class="cta-button">
                  ${sectionContent.button.text || sectionContent.button.label}
                </a>
              ` : ''}
            </div>
          </section>
        `

      case 'footer':
        return `
          <footer class="section-footer ${section.variant}" data-section-id="${section.id}">
            <div class="container mx-auto px-4">
              ${sectionContent.columns ? `
                <div class="footer-columns">
                  ${sectionContent.columns.map((column: any) => `
                    <div class="footer-column">
                      ${column.title ? `<h4>${column.title}</h4>` : ''}
                      ${column.links ? `
                        <ul>
                          ${column.links.map((link: any) => `
                            <li><a href="${link.href || '#'}">${link.text || link.label}</a></li>
                          `).join('')}
                        </ul>
                      ` : ''}
                    </div>
                  `).join('')}
                </div>
              ` : ''}
              ${sectionContent.copyright ? `<div class="copyright">${sectionContent.copyright}</div>` : ''}
            </div>
          </footer>
        `

      default:
        return `
          <section class="section-${section.type} ${section.variant}" data-section-id="${section.id}">
            <div class="container mx-auto px-4">
              ${sectionContent.title ? `<h2>${sectionContent.title}</h2>` : ''}
              ${sectionContent.description ? `<p>${sectionContent.description}</p>` : ''}
            </div>
          </section>
        `
    }
  }

  const generateSectionCSS = (section: Section): string => {
    const styles = section.styles || {}
    let css = `
      .section-${section.type}.${section.variant} {
        ${styles.backgroundColor ? `background-color: ${styles.backgroundColor};` : ''}
        ${styles.textColor ? `color: ${styles.textColor};` : ''}
        ${styles.padding ? `
          padding-top: ${styles.padding.top}px;
          padding-bottom: ${styles.padding.bottom}px;
          padding-left: ${styles.padding.left}px;
          padding-right: ${styles.padding.right}px;
        ` : 'padding: 4rem 0;'}
        ${styles.margin ? `
          margin-top: ${styles.margin.top}px;
          margin-bottom: ${styles.margin.bottom}px;
        ` : ''}
        ${styles.customCss || ''}
      }
    `
    return css
  }

  const generateCompleteHTML = (): string => {
    const sortedSections = page.sections.sort((a, b) => a.order - b.order)
    
    // Generate HTML content
    const sectionsHTML = sortedSections.map(generateSectionHTML).join('\n')
    
    // Generate CSS
    const sectionsCSS = sortedSections.map(generateSectionCSS).join('\n')
    
    // Base CSS styles
    const baseCSS = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      .section-header nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 0;
      }
      
      .nav-menu {
        display: flex;
        list-style: none;
        gap: 2rem;
      }
      
      .nav-menu a {
        text-decoration: none;
        color: inherit;
        font-weight: 500;
      }
      
      .section-hero {
        text-align: center;
        padding: 6rem 0;
      }
      
      .section-hero h1 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      .subtitle {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        opacity: 0.8;
      }
      
      .description {
        font-size: 1.1rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .primary-button, .cta-button {
        display: inline-block;
        background: #3b82f6;
        color: white;
        padding: 0.75rem 2rem;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        margin: 0.5rem;
        transition: background 0.2s;
      }
      
      .primary-button:hover, .cta-button:hover {
        background: #2563eb;
      }
      
      .secondary-button {
        display: inline-block;
        border: 2px solid #3b82f6;
        color: #3b82f6;
        padding: 0.75rem 2rem;
        text-decoration: none;
        border-radius: 0.5rem;
        font-weight: 600;
        margin: 0.5rem;
        transition: all 0.2s;
      }
      
      .secondary-button:hover {
        background: #3b82f6;
        color: white;
      }
      
      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
      }
      
      .feature-item {
        text-align: center;
        padding: 2rem;
      }
      
      .feature-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      .feature-item h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
      }
      
      .section-cta {
        text-align: center;
        background: #f8fafc;
      }
      
      .section-footer {
        background: #1f2937;
        color: white;
      }
      
      .footer-columns {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
      }
      
      .footer-column h4 {
        margin-bottom: 1rem;
      }
      
      .footer-column ul {
        list-style: none;
      }
      
      .footer-column a {
        color: #d1d5db;
        text-decoration: none;
      }
      
      .footer-column a:hover {
        color: white;
      }
      
      .copyright {
        text-align: center;
        padding-top: 2rem;
        border-top: 1px solid #374151;
        opacity: 0.7;
      }
      
      @media (max-width: 768px) {
        .section-hero h1 {
          font-size: 2rem;
        }
        
        .nav-menu {
          flex-direction: column;
          gap: 1rem;
        }
        
        .features-grid {
          grid-template-columns: 1fr;
        }
        
        .footer-columns {
          grid-template-columns: 1fr;
        }
      }
    `

    // Generate SEO meta tags
    const seoMeta = options.optimizeForSEO ? `
      <meta name="description" content="${page.seoDescription || `${page.title} - Created with Marketing Site Builder`}">
      <meta name="keywords" content="marketing, website, ${page.title.toLowerCase()}">
      <meta name="author" content="Marketing Site Builder">
      <meta property="og:title" content="${page.seoTitle || page.title}">
      <meta property="og:description" content="${page.seoDescription || `${page.title} - Created with Marketing Site Builder`}">
      <meta property="og:type" content="website">
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${page.seoTitle || page.title}">
      <meta name="twitter:description" content="${page.seoDescription || `${page.title} - Created with Marketing Site Builder`}">
    ` : ''

    // Analytics code
    const analyticsCode = options.includeAnalytics ? `
      <!-- Google Analytics placeholder -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      </script>
    ` : ''

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.seoTitle || page.title}</title>
  ${seoMeta}
  ${analyticsCode}
  <style>
    ${baseCSS}
    ${sectionsCSS}
    ${options.includeCustomCSS && page.customCss ? page.customCss : ''}
  </style>
</head>
<body>
  ${sectionsHTML}
  
  ${options.includeCustomJS && page.customJs ? `<script>${page.customJs}</script>` : ''}
  
  <!-- Generated with Marketing Site Builder -->
  <script>
    console.log('This page was generated with Marketing Site Builder');
  </script>
</body>
</html>`
  }

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    
    try {
      // Simulate export progress
      setExportProgress(10)
      
      const html = generateCompleteHTML()
      
      setExportProgress(50)
      
      if (options.includeImages) {
        // Create ZIP with images (placeholder for now)
        const zip = new JSZip()
        zip.file('index.html', html)
        zip.file('README.md', `# ${page.title}\n\nExported from Marketing Site Builder\n\nTo use:\n1. Open index.html in a web browser\n2. Upload to your web server\n3. Customize as needed\n`)
        
        setExportProgress(80)
        
        const content = await zip.generateAsync({ type: 'blob' })
        
        const url = URL.createObjectURL(content)
        const a = document.createElement('a')
        a.href = url
        a.download = `${page.slug || 'website'}.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        // Single HTML file export
        const blob = new Blob([html], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${page.slug || 'website'}.html`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }
      
      setExportProgress(100)
      
      setTimeout(() => {
        onClose()
      }, 1000)
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setTimeout(() => {
        setIsExporting(false)
        setExportProgress(0)
      }, 1000)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Export Static Website</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md"
              disabled={isExporting}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <label htmlFor="includeImages" className="text-sm font-medium text-gray-700">
                Include images and create ZIP
              </label>
              <input
                id="includeImages"
                type="checkbox"
                checked={options.includeImages}
                onChange={(e) => handleOptionChange('includeImages', e.target.checked)}
                className="rounded"
                disabled={isExporting}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="includeCustomCSS" className="text-sm font-medium text-gray-700">
                Include custom CSS
              </label>
              <input
                id="includeCustomCSS"
                type="checkbox"
                checked={options.includeCustomCSS}
                onChange={(e) => handleOptionChange('includeCustomCSS', e.target.checked)}
                className="rounded"
                disabled={isExporting}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="includeCustomJS" className="text-sm font-medium text-gray-700">
                Include custom JavaScript
              </label>
              <input
                id="includeCustomJS"
                type="checkbox"
                checked={options.includeCustomJS}
                onChange={(e) => handleOptionChange('includeCustomJS', e.target.checked)}
                className="rounded"
                disabled={isExporting}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="optimizeForSEO" className="text-sm font-medium text-gray-700">
                Optimize for SEO (meta tags)
              </label>
              <input
                id="optimizeForSEO"
                type="checkbox"
                checked={options.optimizeForSEO}
                onChange={(e) => handleOptionChange('optimizeForSEO', e.target.checked)}
                className="rounded"
                disabled={isExporting}
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="includeAnalytics" className="text-sm font-medium text-gray-700">
                Include analytics placeholder
              </label>
              <input
                id="includeAnalytics"
                type="checkbox"
                checked={options.includeAnalytics}
                onChange={(e) => handleOptionChange('includeAnalytics', e.target.checked)}
                className="rounded"
                disabled={isExporting}
              />
            </div>
          </div>

          {isExporting && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Exporting...</span>
                <span className="text-sm text-gray-500">{exportProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              disabled={isExporting}
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? 'Exporting...' : 'Export Website'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}