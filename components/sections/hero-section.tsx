import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface HeroContent {
  headline: string
  subheadline: string
  cta: {
    primary: {
      text: string
      href: string
    }
    secondary?: {
      text: string
      href: string
    }
  }
  image?: string
  videoUrl?: string
}

export function HeroSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as HeroContent

  if (section.variant === 'split') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {content.headline}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={content.cta.primary.href}
                  className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  {content.cta.primary.text}
                </a>
                {content.cta.secondary && (
                  <a
                    href={content.cta.secondary.href}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors text-center"
                  >
                    {content.cta.secondary.text}
                  </a>
                )}
              </div>
            </div>
            
            {/* Media */}
            <div className="relative">
              {content.videoUrl ? (
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={content.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : content.image ? (
                <img
                  src={content.image}
                  alt="Hero"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
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
    <BaseSectionWrapper section={section} {...props} className="group">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {content.headline}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {content.subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={content.cta.primary.href}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {content.cta.primary.text}
            </a>
            {content.cta.secondary && (
              <a
                href={content.cta.secondary.href}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                {content.cta.secondary.text}
              </a>
            )}
          </div>
          
          {/* Media */}
          {(content.image || content.videoUrl) && (
            <div className="mt-12">
              {content.videoUrl ? (
                <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden">
                  <iframe
                    src={content.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : content.image ? (
                <img
                  src={content.image}
                  alt="Hero"
                  className="max-w-4xl mx-auto h-auto rounded-lg shadow-lg"
                />
              ) : null}
            </div>
          )}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}