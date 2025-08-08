// Database schema definitions for Prisma or similar ORM

export interface DatabaseUser {
  id: string
  email: string
  name: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
  
  // Relations
  pages?: DatabasePage[]
}

export interface DatabasePage {
  id: string
  userId: string
  title: string
  slug: string
  sectionsJson: string // JSON string of Section[]
  isPublished: boolean
  seoTitle?: string
  seoDescription?: string
  customCss?: string
  customJs?: string
  createdAt: Date
  updatedAt: Date
  
  // Relations
  user?: DatabaseUser
}

export interface DatabaseTemplate {
  id: string
  name: string
  description: string
  category: string
  sectionsJson: string // JSON string of Section[]
  previewImage?: string
  isPublic: boolean
  createdBy: string
  createdAt: Date
  updatedAt: Date
  
  // Relations
  creator?: DatabaseUser
}

// For future analytics
export interface DatabasePageView {
  id: string
  pageId: string
  visitorId: string
  timestamp: Date
  userAgent?: string
  referrer?: string
  
  // Relations
  page?: DatabasePage
}