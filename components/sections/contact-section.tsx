import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface ContactInfo {
  address?: string
  phone?: string
  email?: string
  hours?: string
}

interface ContactContent {
  title: string
  subtitle?: string
  contactInfo?: ContactInfo
  formFields?: {
    name: boolean
    email: boolean
    phone: boolean
    company: boolean
    message: boolean
  }
  submitText?: string
}

export function ContactSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as ContactContent

  if (section.variant === 'info') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {content.title}
              </h2>
              {content.subtitle && (
                <p className="text-xl text-gray-600">
                  {content.subtitle}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {content.contactInfo?.address && (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm">
                    {content.contactInfo.address}
                  </p>
                </div>
              )}

              {content.contactInfo?.phone && (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600 text-sm">
                    <a href={`tel:${content.contactInfo.phone}`} className="hover:text-blue-600">
                      {content.contactInfo.phone}
                    </a>
                  </p>
                </div>
              )}

              {content.contactInfo?.email && (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600 text-sm">
                    <a href={`mailto:${content.contactInfo.email}`} className="hover:text-blue-600">
                      {content.contactInfo.email}
                    </a>
                  </p>
                </div>
              )}

              {content.contactInfo?.hours && (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Hours</h3>
                  <p className="text-gray-600 text-sm">
                    {content.contactInfo.hours}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: form variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-xl text-gray-600">
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Contact Form */}
          <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {content.formFields?.name && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              )}

              {content.formFields?.email && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {content.formFields?.phone && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              )}

              {content.formFields?.company && (
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="Your company name"
                  />
                </div>
              )}
            </div>

            {content.formFields?.message && (
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-vertical"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                {content.submitText || 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </BaseSectionWrapper>
  )
}