// Simple in-memory data store for development
// In production, this would be replaced with a proper database

import { Page, User, Section } from '@/types'
import { nanoid } from 'nanoid'

// In-memory storage (will be replaced with database)
let pages: Page[] = []
let users: User[] = []

// Demo user for development
const demoUser: User = {
  id: 'demo-user-1',
  email: 'demo@example.com',
  name: 'Demo User',
  createdAt: new Date(),
  updatedAt: new Date()
}

users.push(demoUser)

export class DataStore {
  // User operations
  static async getUser(id: string): Promise<User | null> {
    return users.find(u => u.id === id) || null
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return users.find(u => u.email === email) || null
  }

  static async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const user: User = {
      id: nanoid(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    users.push(user)
    return user
  }

  // Page operations
  static async getPages(userId: string): Promise<Page[]> {
    return pages.filter(p => p.userId === userId)
  }

  static async getPage(id: string): Promise<Page | null> {
    return pages.find(p => p.id === id) || null
  }

  static async getPageBySlug(slug: string): Promise<Page | null> {
    return pages.find(p => p.slug === slug) || null
  }

  static async createPage(pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>): Promise<Page> {
    const page: Page = {
      id: nanoid(),
      ...pageData,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    pages.push(page)
    return page
  }

  static async updatePage(id: string, updates: Partial<Page>): Promise<Page | null> {
    const pageIndex = pages.findIndex(p => p.id === id)
    if (pageIndex === -1) return null

    pages[pageIndex] = {
      ...pages[pageIndex],
      ...updates,
      updatedAt: new Date()
    }
    return pages[pageIndex]
  }

  static async deletePage(id: string): Promise<boolean> {
    const pageIndex = pages.findIndex(p => p.id === id)
    if (pageIndex === -1) return false

    pages.splice(pageIndex, 1)
    return true
  }

  static async duplicatePage(id: string, userId: string): Promise<Page | null> {
    const originalPage = await this.getPage(id)
    if (!originalPage || originalPage.userId !== userId) return null

    const duplicatedPage: Page = {
      ...originalPage,
      id: nanoid(),
      title: `${originalPage.title} (Copy)`,
      slug: `${originalPage.slug}-copy-${Date.now()}`,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    pages.push(duplicatedPage)
    return duplicatedPage
  }

  // Section operations within a page
  static async updatePageSections(pageId: string, sections: Section[]): Promise<Page | null> {
    const page = await this.getPage(pageId)
    if (!page) return null

    return await this.updatePage(pageId, { sections })
  }

  static async addSectionToPage(pageId: string, section: Section): Promise<Page | null> {
    const page = await this.getPage(pageId)
    if (!page) return null

    const updatedSections = [...page.sections, section]
    return await this.updatePage(pageId, { sections: updatedSections })
  }

  static async removeSectionFromPage(pageId: string, sectionId: string): Promise<Page | null> {
    const page = await this.getPage(pageId)
    if (!page) return null

    const updatedSections = page.sections.filter(s => s.id !== sectionId)
    return await this.updatePage(pageId, { sections: updatedSections })
  }

  // Demo data initialization
  static async initializeDemoData(): Promise<void> {
    // Create a demo page if none exists
    if (pages.length === 0) {
      await this.createPage({
        userId: demoUser.id,
        title: 'My Landing Page',
        slug: 'my-landing-page',
        sections: [],
        isPublished: false
      })
    }
  }

  // Get demo user for development
  static getDemoUser(): User {
    return demoUser
  }
}

// Initialize demo data on module load
DataStore.initializeDemoData()