import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface CTAContent {
  headline: string
  description?: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export function CTASection({ section, ...props }: SectionComponentProps) {
  const content = section.content as CTAContent

  if (section.variant === 'boxed') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 overflow-hidden"
              style={content.backgroundImage ? {
                backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)), url(${content.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              } : {}}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10 text-center text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  {content.headline}
                </h2>
                {content.description && (
                  <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                    {content.description}
                  </p>
                )}
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={content.primaryButton.href}
                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {content.primaryButton.text}
                  </a>
                  {content.secondaryButton && (
                    <a
                      href={content.secondaryButton.href}
                      className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      {content.secondaryButton.text}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: simple variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group py-20 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {content.headline}
          </h2>
          {content.description && (
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {content.description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={content.primaryButton.href}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {content.primaryButton.text}
            </a>
            {content.secondaryButton && (
              <a
                href={content.secondaryButton.href}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-500 hover:text-white transition-colors"
              >
                {content.secondaryButton.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </BaseSectionWrapper>
  )
}