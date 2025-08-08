// Export all section components
export { HeaderSection } from './header-section'
export { HeroSection } from './hero-section'
export { FeaturesSection } from './features-section'
export { PricingSection } from './pricing-section'
export { TestimonialsSection } from './testimonials-section'
export { CTASection } from './cta-section'
export { AboutSection } from './about-section'
export { TeamSection } from './team-section'
export { FAQSection } from './faq-section'
export { ContactSection } from './contact-section'
export { NewsletterSection } from './newsletter-section'
export { BlogSection } from './blog-section'
export { GallerySection } from './gallery-section'
export { StatsSection } from './stats-section'
export { FooterSection } from './footer-section'
export { BaseSectionWrapper } from './base-section'

// Export section registry
export {
  SECTION_COMPONENTS,
  SECTION_VARIANTS,
  SECTION_TYPES,
  getSectionComponent,
  getSectionVariants,
  renderSection
} from './section-registry'

// Export types
export type { SectionComponentProps } from './base-section'