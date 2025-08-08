import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface Feature {
  title: string
  description: string
  icon: string
  image?: string
}

interface FeaturesContent {
  title: string
  subtitle?: string
  features: Feature[]
}

export function FeaturesSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as FeaturesContent

  if (section.variant === 'cards') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.title}
            </h2>
            {content.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {content.subtitle}
              </p>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                {feature.image ? (
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-16 h-16 mb-6 rounded-lg object-cover"
                  />
                ) : (
                  <div className="text-4xl mb-6">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: grid variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {content.features.map((feature, index) => (
            <div key={index} className="text-center">
              {feature.image ? (
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-16 h-16 mx-auto mb-6 rounded-lg object-cover"
                />
              ) : (
                <div className="text-5xl mb-6">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}