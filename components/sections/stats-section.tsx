import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface StatItem {
  number: string
  label: string
  description?: string
}

interface StatsContent {
  title?: string
  subtitle?: string
  stats: StatItem[]
}

export function StatsSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as StatsContent

  if (section.variant === 'grid') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          {(content.title || content.subtitle) && (
            <div className="text-center mb-12">
              {content.title && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {content.title}
                </h2>
              )}
              {content.subtitle && (
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {content.subtitle}
                </p>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">
                  {stat.label}
                </div>
                {stat.description && (
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: horizontal variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                {content.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats Horizontal */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {content.stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl md:text-6xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide opacity-90">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs opacity-75 mt-1">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseSectionWrapper>
  )
}