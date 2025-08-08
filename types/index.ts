// Core types for the marketing site builder

export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface Page {
  id: string
  userId: string
  title: string
  slug: string
  sections: Section[]
  isPublished: boolean
  seoTitle?: string
  seoDescription?: string
  customCss?: string
  customJs?: string
  createdAt: Date
  updatedAt: Date
}

export interface Section {
  id: string
  type: SectionType
  variant: string
  content: SectionContent
  styles: SectionStyles
  order: number
}

export type SectionType = 
  | 'header'
  | 'hero'
  | 'features'
  | 'pricing'
  | 'testimonials'
  | 'cta'
  | 'about'
  | 'team'
  | 'faq'
  | 'contact'
  | 'newsletter'
  | 'blog'
  | 'gallery'
  | 'stats'
  | 'footer'

export interface SectionContent {
  [key: string]: any
  // Dynamic content based on section type
}

export interface SectionStyles {
  backgroundColor?: string
  textColor?: string
  padding?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  margin?: {
    top: number
    bottom: number
  }
  customCss?: string
}

export interface SectionVariant {
  id: string
  name: string
  description: string
  preview: string
  defaultContent: SectionContent
  defaultStyles: SectionStyles
}

export interface SectionTemplate {
  type: SectionType
  variants: SectionVariant[]
}