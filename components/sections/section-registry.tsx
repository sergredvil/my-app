import { Section, SectionType, SectionVariant } from '@/types'
import { HeaderSection } from './header-section'
import { HeroSection } from './hero-section'
import { FeaturesSection } from './features-section'
import { PricingSection } from './pricing-section'
import { SectionComponentProps } from './base-section'

// Section component mapping
export const SECTION_COMPONENTS: Record<SectionType, React.ComponentType<SectionComponentProps>> = {
  header: HeaderSection,
  hero: HeroSection,
  features: FeaturesSection,
  pricing: PricingSection,
  // Placeholder components for sections not yet implemented
  testimonials: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Testimonials Section - {section.variant}</div>,
  cta: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">CTA Section - {section.variant}</div>,
  about: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">About Section - {section.variant}</div>,
  team: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Team Section - {section.variant}</div>,
  faq: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">FAQ Section - {section.variant}</div>,
  contact: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Contact Section - {section.variant}</div>,
  newsletter: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Newsletter Section - {section.variant}</div>,
  blog: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Blog Section - {section.variant}</div>,
  gallery: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Gallery Section - {section.variant}</div>,
  stats: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Stats Section - {section.variant}</div>,
  footer: ({ section, ...props }) => <div className="p-8 bg-gray-100 text-center">Footer Section - {section.variant}</div>,
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
  // Placeholder variants for sections not yet implemented
  testimonials: [
    { id: 'grid', name: 'Grid', description: 'Grid layout', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'carousel', name: 'Carousel', description: 'Carousel layout', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  cta: [
    { id: 'simple', name: 'Simple', description: 'Simple CTA', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'boxed', name: 'Boxed', description: 'Boxed CTA', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  about: [
    { id: 'text-image', name: 'Text + Image', description: 'Text with image', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'centered', name: 'Centered', description: 'Centered text', preview: '', defaultContent: {}, defaultStyles: {} }
  ],
  team: [
    { id: 'grid', name: 'Grid', description: 'Grid layout', preview: '', defaultContent: {}, defaultStyles: {} },
    { id: 'cards', name: 'Cards', description: 'Card layout', preview: '', defaultContent: {}, defaultStyles: {} }
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