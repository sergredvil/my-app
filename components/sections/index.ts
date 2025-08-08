// Export all section components
export { HeaderSection } from './header-section'
export { HeroSection } from './hero-section'
export { FeaturesSection } from './features-section'
export { PricingSection } from './pricing-section'
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