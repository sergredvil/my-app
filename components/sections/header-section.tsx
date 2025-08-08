import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface HeaderContent {
  logo: {
    text: string
    image?: string
  }
  navigation: Array<{
    label: string
    href: string
  }>
  cta: {
    text: string
    href: string
  }
}

export function HeaderSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as HeaderContent

  if (section.variant === 'centered-logo') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group">
        <header className="container mx-auto">
          <div className="flex flex-col items-center py-4 space-y-4">
            {/* Logo */}
            <div className="flex items-center">
              {content.logo.image ? (
                <img 
                  src={content.logo.image} 
                  alt={content.logo.text}
                  className="h-8 w-auto"
                />
              ) : (
                <span className="text-2xl font-bold">{content.logo.text}</span>
              )}
            </div>
            
            {/* Navigation and CTA */}
            <div className="flex items-center justify-between w-full">
              <nav className="flex items-center space-x-6">
                {content.navigation.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-sm font-medium hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              
              <a
                href={content.cta.href}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {content.cta.text}
              </a>
            </div>
          </div>
        </header>
      </BaseSectionWrapper>
    )
  }

  // Default: simple-nav variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group">
      <header className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            {content.logo.image ? (
              <img 
                src={content.logo.image} 
                alt={content.logo.text}
                className="h-8 w-auto"
              />
            ) : (
              <span className="text-2xl font-bold">{content.logo.text}</span>
            )}
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {content.navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* CTA */}
          <a
            href={content.cta.href}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {content.cta.text}
          </a>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
    </BaseSectionWrapper>
  )
}