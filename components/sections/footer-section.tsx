import { BaseSectionWrapper, SectionComponentProps } from './base-section'

interface FooterLink {
  text: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  platform: string
  href: string
  icon?: string
}

interface FooterContent {
  logo?: string
  description?: string
  columns?: FooterColumn[]
  social?: SocialLink[]
  copyright?: string
  bottomLinks?: FooterLink[]
}

export function FooterSection({ section, ...props }: SectionComponentProps) {
  const content = section.content as FooterContent

  const renderSocialIcon = (platform: string) => {
    const iconClass = "w-5 h-5 fill-current"
    
    switch (platform.toLowerCase()) {
      case 'twitter':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        )
      case 'facebook':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )
      case 'linkedin':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        )
      case 'instagram':
        return (
          <svg className={iconClass} viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.119 0c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54z" />
          </svg>
        )
      default:
        return <span className="w-5 h-5">{platform[0]}</span>
    }
  }

  if (section.variant === 'detailed') {
    return (
      <BaseSectionWrapper section={section} {...props} className="group bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-4">
              {content.logo && (
                <div className="mb-4">
                  <img src={content.logo} alt="Logo" className="h-8" />
                </div>
              )}
              {content.description && (
                <p className="text-gray-400 leading-relaxed max-w-md">
                  {content.description}
                </p>
              )}
              {content.social && content.social.length > 0 && (
                <div className="flex space-x-4">
                  {content.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {renderSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Columns */}
            {content.columns?.map((column, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-semibold text-white text-lg">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              {content.copyright || '© 2024 Company Name. All rights reserved.'}
            </p>
            {content.bottomLinks && content.bottomLinks.length > 0 && (
              <div className="flex space-x-6">
                {content.bottomLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </BaseSectionWrapper>
    )
  }

  // Default: minimal variant
  return (
    <BaseSectionWrapper section={section} {...props} className="group bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {content.logo && (
              <img src={content.logo} alt="Logo" className="h-6" />
            )}
            <p className="text-gray-400 text-sm">
              {content.copyright || '© 2024 Company Name. All rights reserved.'}
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {content.bottomLinks?.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.text}
              </a>
            ))}
            {content.social?.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {renderSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </BaseSectionWrapper>
  )
}