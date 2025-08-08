import { Page } from '@/types'

export class PagesStore {
  private static readonly STORAGE_KEY = 'marketing-site-builder-pages'
  private static readonly CURRENT_PAGE_KEY = 'marketing-site-builder-current-page'

  static getAllPages(): Page[] {
    if (typeof window === 'undefined') return []
    
    try {
      const pagesJson = localStorage.getItem(this.STORAGE_KEY)
      return pagesJson ? JSON.parse(pagesJson) : []
    } catch (error) {
      console.error('Failed to load pages:', error)
      return []
    }
  }

  static savePage(page: Page): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      const pages = this.getAllPages()
      const existingIndex = pages.findIndex(p => p.id === page.id)
      
      if (existingIndex >= 0) {
        pages[existingIndex] = { ...page, updatedAt: new Date() }
      } else {
        pages.push({ ...page, createdAt: new Date(), updatedAt: new Date() })
      }
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pages))
      this.setCurrentPage(page)
      return true
    } catch (error) {
      console.error('Failed to save page:', error)
      return false
    }
  }

  static loadPage(pageId: string): Page | null {
    const pages = this.getAllPages()
    return pages.find(p => p.id === pageId) || null
  }

  static deletePage(pageId: string): boolean {
    if (typeof window === 'undefined') return false
    
    try {
      const pages = this.getAllPages()
      const filteredPages = pages.filter(p => p.id !== pageId)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredPages))
      
      // Clear current page if it was deleted
      const currentPage = this.getCurrentPage()
      if (currentPage && currentPage.id === pageId) {
        localStorage.removeItem(this.CURRENT_PAGE_KEY)
      }
      
      return true
    } catch (error) {
      console.error('Failed to delete page:', error)
      return false
    }
  }

  static duplicatePage(pageId: string): Page | null {
    const originalPage = this.loadPage(pageId)
    if (!originalPage) return null
    
    const duplicatedPage: Page = {
      ...originalPage,
      id: crypto.randomUUID(),
      title: `${originalPage.title} (Copy)`,
      slug: `${originalPage.slug}-copy-${Date.now()}`,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    if (this.savePage(duplicatedPage)) {
      return duplicatedPage
    }
    
    return null
  }

  static getCurrentPage(): Page | null {
    if (typeof window === 'undefined') return null
    
    try {
      const pageJson = localStorage.getItem(this.CURRENT_PAGE_KEY)
      if (!pageJson) return null
      
      const page = JSON.parse(pageJson)
      // Convert date strings back to Date objects
      return {
        ...page,
        createdAt: new Date(page.createdAt),
        updatedAt: new Date(page.updatedAt)
      }
    } catch (error) {
      console.error('Failed to load current page:', error)
      return null
    }
  }

  static setCurrentPage(page: Page): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.CURRENT_PAGE_KEY, JSON.stringify(page))
    } catch (error) {
      console.error('Failed to set current page:', error)
    }
  }

  static exportPage(pageId: string): string | null {
    const page = this.loadPage(pageId)
    if (!page) return null
    
    return JSON.stringify(page, null, 2)
  }

  static importPage(pageJson: string): Page | null {
    try {
      const page: Page = JSON.parse(pageJson)
      
      // Validate page structure
      if (!page.id || !page.title || !Array.isArray(page.sections)) {
        throw new Error('Invalid page format')
      }
      
      // Generate new ID to avoid conflicts
      const importedPage: Page = {
        ...page,
        id: crypto.randomUUID(),
        title: `${page.title} (Imported)`,
        slug: `imported-${Date.now()}`,
        isPublished: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      if (this.savePage(importedPage)) {
        return importedPage
      }
      
      return null
    } catch (error) {
      console.error('Failed to import page:', error)
      return null
    }
  }

  static clearAllPages(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(this.STORAGE_KEY)
    localStorage.removeItem(this.CURRENT_PAGE_KEY)
  }
}