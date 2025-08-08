import { Section, SectionType, SectionVariant } from '@/types'
import { HeaderSection } from './header-section'
import { HeroSection } from './hero-section'
import { FeaturesSection } from './features-section'
import { PricingSection } from './pricing-section'
import { TestimonialsSection } from './testimonials-section'
import { CTASection } from './cta-section'
import { AboutSection } from './about-section'
import { TeamSection } from './team-section'
import { FAQSection } from './faq-section'
import { ContactSection } from './contact-section'
import { NewsletterSection } from './newsletter-section'
import { BlogSection } from './blog-section'
import { GallerySection } from './gallery-section'
import { StatsSection } from './stats-section'
import { FooterSection } from './footer-section'
import { SectionComponentProps } from './base-section'

// Section component mapping
export const SECTION_COMPONENTS: Record<SectionType, React.ComponentType<SectionComponentProps>> = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
  pricing: PricingSection,
  testimonials: TestimonialsSection,
  cta: CTASection,
  about: AboutSection,
  team: TeamSection,
  faq: FAQSection,
  contact: ContactSection,
  newsletter: NewsletterSection,
  blog: BlogSection,
  gallery: GallerySection,
  stats: StatsSection,
  footer: FooterSection,
}

// Section variants configuration
export const SECTION_VARIANTS: Record<SectionType, SectionVariant[]> = {
  header: [
    {
      id: 'simple-nav',
      name: 'Simple Navigation',
      description: 'Logo on left, navigation in center, CTA on right',
      preview: '/previews/header-simple.jpg',
      defaultContent: {},
      defaultStyles: {}
    },
    {
      id: 'centered-logo',
      name: 'Centered Logo',
      description: 'Logo centered at top, navigation below',
      preview: '/previews/header-centered.jpg',
      defaultContent: {},
      defaultStyles: {}
    }
  ],
  hero: [
    {
      id: 'centered',
      name: 'Centered',
      description: 'Centered text with optional media below',
      preview: '/previews/hero-centered.jpg',
      defaultContent: {},
      defaultStyles: {}
    },
    {
      id: 'split',
      name: 'Split Layout',
      description: 'Text on left, media on right',
      preview: '/previews/hero-split.jpg',
      defaultContent: {},
      defaultStyles: {}
    }
  ],
  features: [
    {
      id: 'grid',
      name: 'Grid Layout',
      description: 'Simple grid with icons and text',
      preview: '/previews/features-grid.jpg',
      defaultContent: {},
      defaultStyles: {}
    },
    {
      id: 'cards',
      name: 'Card Layout',
      description: 'Features displayed in cards with shadows',
      preview: '/previews/features-cards.jpg',
      defaultContent: {},
      defaultStyles: {}
    }
  ],
  pricing: [
    {
      id: 'simple',
      name: 'Simple',
      description: 'Side-by-side pricing plans',
      preview: '/previews/pricing-simple.jpg',
      defaultContent: {},
      defaultStyles: {}
    },
    {
      id: 'tiered',
      name: 'Tiered',
      description: 'Tiered pricing with popular plan highlighted',
      preview: '/previews/pricing-tiered.jpg',
      defaultContent: {},
      defaultStyles: {}
    }
  ],
  testimonials: [
    {
      id: 'grid',
      name: 'Grid Layout',
      description: 'Display testimonials in a grid format with cards',
      preview: '/previews/testimonials-grid.jpg',
      defaultContent: {
        title: 'What Our Customers Say',
        subtitle: 'Hear from our satisfied customers about their experience',
        testimonials: [
          {
            quote: 'This product has completely transformed how we work. The results are amazing!',
            name: 'Sarah Johnson',
            title: 'Marketing Director',
            company: 'TechCorp',
            rating: 5
          },
          {
            quote: 'Outstanding support and incredible features. Highly recommended!',
            name: 'Mike Chen',
            title: 'Product Manager',
            company: 'StartupXYZ',
            rating: 5
          },
          {
            quote: 'The best investment we\'ve made for our business this year.',
            name: 'Emily Davis',
            title: 'CEO',
            company: 'GrowthCo',
            rating: 5
          }
        ]
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    },
    {
      id: 'carousel',
      name: 'Carousel Layout',
      description: 'Display testimonials in a rotating carousel format',
      preview: '/previews/testimonials-carousel.jpg',
      defaultContent: {
        title: 'Customer Success Stories',
        subtitle: 'See how our product is making a difference',
        testimonials: [
          {
            quote: 'This solution exceeded all our expectations. The team is incredibly responsive and the product delivers exactly what was promised.',
            name: 'David Wilson',
            title: 'Operations Manager',
            company: 'Enterprise Solutions',
            rating: 5
          },
          {
            quote: 'We saw immediate results after implementation. The ROI has been fantastic and our team loves using it.',
            name: 'Lisa Anderson',
            title: 'Director of Sales',
            company: 'SalesForce Pro',
            rating: 5
          }
        ]
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    }
  ],
  cta: [
    {
      id: 'simple',
      name: 'Simple CTA',
      description: 'Clean call-to-action with dark background',
      preview: '/previews/cta-simple.jpg',
      defaultContent: {
        headline: 'Ready to Get Started?',
        description: 'Join thousands of satisfied customers and transform your business today.',
        primaryButton: {
          text: 'Start Free Trial',
          href: '#signup'
        },
        secondaryButton: {
          text: 'Learn More',
          href: '#about'
        }
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    },
    {
      id: 'boxed',
      name: 'Boxed CTA',
      description: 'Eye-catching boxed design with gradient background',
      preview: '/previews/cta-boxed.jpg',
      defaultContent: {
        headline: 'Transform Your Business Today',
        description: 'Don\'t wait any longer. Take the first step towards success.',
        primaryButton: {
          text: 'Get Started Now',
          href: '#signup'
        },
        secondaryButton: {
          text: 'Contact Sales',
          href: '#contact'
        }
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    }
  ],
  about: [
    {
      id: 'text-image',
      name: 'Text + Image',
      description: 'Side-by-side layout with text and image',
      preview: '/previews/about-text-image.jpg',
      defaultContent: {
        title: 'About Our Company',
        subtitle: 'Leading the industry with innovation and excellence',
        description: 'We are passionate about delivering exceptional solutions that drive real results for our clients. With years of experience and a commitment to excellence, we\'ve helped hundreds of businesses achieve their goals.',
        features: [
          'Expert team with 10+ years experience',
          '99.9% uptime guarantee',
          '24/7 customer support',
          'Industry-leading security'
        ],
        stats: [
          { number: '500+', label: 'Happy Clients' },
          { number: '10+', label: 'Years Experience' }
        ],
        cta: {
          text: 'Learn More About Us',
          href: '#contact'
        }
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    },
    {
      id: 'centered',
      name: 'Centered',
      description: 'Centered layout with optional stats and features',
      preview: '/previews/about-centered.jpg',
      defaultContent: {
        title: 'Our Mission',
        subtitle: 'Empowering businesses to reach their full potential',
        description: 'We believe in the power of technology to transform businesses and create meaningful connections. Our mission is to provide innovative solutions that help our clients succeed in an ever-changing digital landscape.',
        stats: [
          { number: '1M+', label: 'Users Served' },
          { number: '50+', label: 'Countries' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Support' }
        ]
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    }
  ],
  team: [
    {
      id: 'grid',
      name: 'Grid Layout',
      description: 'Team members in a grid with circular photos',
      preview: '/previews/team-grid.jpg',
      defaultContent: {
        title: 'Meet Our Team',
        subtitle: 'The talented people behind our success',
        members: [
          {
            name: 'John Smith',
            title: 'CEO & Founder',
            bio: 'John has over 15 years of experience in the industry and leads our vision.',
            social: { linkedin: '#', twitter: '#' }
          },
          {
            name: 'Sarah Johnson',
            title: 'CTO',
            bio: 'Sarah oversees our technical strategy and product development.',
            social: { linkedin: '#', email: 'sarah@company.com' }
          },
          {
            name: 'Mike Davis',
            title: 'Head of Design',
            bio: 'Mike ensures our products are both beautiful and user-friendly.',
            social: { linkedin: '#', twitter: '#' }
          }
        ]
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    },
    {
      id: 'cards',
      name: 'Card Layout',
      description: 'Team members displayed in cards with detailed information',
      preview: '/previews/team-cards.jpg',
      defaultContent: {
        title: 'Our Leadership Team',
        subtitle: 'Meet the experts driving our company forward',
        members: [
          {
            name: 'Emily Chen',
            title: 'VP of Marketing',
            bio: 'Emily leads our marketing efforts and brand strategy with innovative campaigns that drive growth.',
            social: { linkedin: '#', twitter: '#', email: 'emily@company.com' }
          },
          {
            name: 'David Wilson',
            title: 'VP of Sales',
            bio: 'David manages our sales team and client relationships, ensuring customer success at every step.',
            social: { linkedin: '#', email: 'david@company.com' }
          }
        ]
      },
      defaultStyles: {
        padding: { top: 80, bottom: 80, left: 20, right: 20 }
      }
    }
  ],
  faq: [
    { id: 'accordion', name: 'Accordion', description: 'Accordion style', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'grid', name: 'Grid', description: 'Grid layout', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  contact: [
    { id: 'form', name: 'Form', description: 'Contact form', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'info', name: 'Info', description: 'Contact information', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  newsletter: [
    { id: 'simple', name: 'Simple', description: 'Simple signup', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'boxed', name: 'Boxed', description: 'Boxed signup', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  blog: [
    { id: 'grid', name: 'Grid', description: 'Grid layout', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'list', name: 'List', description: 'List layout', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  gallery: [
    { id: 'grid', name: 'Grid', description: 'Grid layout', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'masonry', name: 'Masonry', description: 'Masonry layout', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  stats: [
    { id: 'horizontal', name: 'Horizontal', description: 'Horizontal layout', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'grid', name: 'Grid', description: 'Grid layout', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  footer: [
    { id: 'minimal', name: 'Minimal', description: 'Minimal footer', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'detailed', name: 'Detailed', description: 'Detailed footer', preview: '', defaultContent: {}, defaultStyles: {} }
  ]
}

// Helper function to get section component
export function getSectionComponent(type: SectionType): React.ComponentType<SectionComponentProps> {
  return SECTION_COMPONENTS[type] || (() => <div>Unknown section type: {type}</div>)
}

// Helper function to get section variants
export function getSectionVariants(type: SectionType): SectionVariant[] {
  return SECTION_VARIANTS[type] || []
}

// Helper function to render a section
export function renderSection(section: Section, props: Omit<SectionComponentProps, 'section'> = {}) {
  const Component = getSectionComponent(section.type)
  return <Component section={section} {...props} />
}

// All section types for reference
export const SECTION_TYPES: SectionType[] = [
  'header',
  'hero',
  'features',
  'pricing',
  'testimonials',
  'cta',
  'about',
  'team',
  'faq',
  'contact',
  'newsletter',
  'blog',
  'gallery',
  'stats',
  'footer'
]