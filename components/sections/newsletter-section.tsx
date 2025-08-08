import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface NewsletterContent {
  title: string
  description?: string
  placeholderText?: string
  buttonText?: string
  privacy?: string
}

export function NewsletterSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as NewsletterContent

  if (section.variant === 'boxed') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 rounded-2xl border border-blue-100">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {content.title}
                </h2>
                {content.description && (
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {content.description}
                  </p>
                )}
                
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder={content.placeholderText || 'Enter your email'}
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    {content.buttonText || 'Subscribe'}
                  </button>
                </form>
                
                {content.privacy && (
                  <p className="text-xs text-gray-500 mt-4">
                    {content.privacy}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: simple variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group py-16 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {content.description}
            </p>
          )}
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              required
              className="flex-1 px-4 py-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors placeholder-gray-400"
              placeholder={content.placeholderText || 'Enter your email'}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              {content.buttonText || 'Subscribe'}
            </button>
          </form>
          
          {content.privacy && (
            <p className="text-xs text-gray-400 mt-4">
              {content.privacy}
            </p>
          )}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}