import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface AboutContent {
  title: string
  subtitle?: string
  description: string
  features?: string[]
  image?: string
  stats?: {
    number: string
    label: string
  }[]
  cta?: {
    text: string
    href: string
  }
}

export function AboutSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as AboutContent

  if (section.variant === 'text-image') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {content.title}
              </h2>
              {content.subtitle && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {content.subtitle}
                </p>
              )}
              <p className="text-lg text-gray-600 leading-relaxed">
                {content.description}
              </p>
              
              {content.features && content.features.length > 0 && (
                <ul className="space-y-3">
                  {content.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {content.stats && content.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6 pt-6">
                  {content.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {content.cta && (
                <div className="pt-4">
                  <a
                    href={content.cta.href}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {content.cta.text}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              )}
            </div>

            {/* Image */}
            <div className="relative">
              {content.image ? (
                <div className="relative">
                  <img
                    src={content.image}
                    alt="About us"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-lg"></div>
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: centered variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              {content.subtitle}
            </p>
          )}
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            {content.description}
          </p>

          {content.stats && content.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12">
              {content.stats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="text-4xl font-bold text-blue-600">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {content.features && content.features.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 pt-12 max-w-2xl mx-auto">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {content.image && (
            <div className="pt-12">
              <img
                src={content.image}
                alt="About us"
                className="max-w-2xl mx-auto h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          {content.cta && (
            <div className="pt-8">
              <a
                href={content.cta.href}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                {content.cta.text}
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}