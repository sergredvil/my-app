import { NextRequest, NextResponse } from 'next/server'
import { DataStore } from '@/lib/data-store'
import { Page } from '@/types'

// GET /api/pages - Get all pages for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const pages = await DataStore.getPages(userId)
    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

// POST /api/pages - Create a new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, title, slug } = body

    if (!userId || !title || !slug) {
      return NextResponse.json(
        { error: 'User ID, title, and slug are required' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existingPage = await DataStore.getPageBySlug(slug)
    if (existingPage) {
      return NextResponse.json(
        { error: 'A page with this slug already exists' },
        { status: 409 }
      )
    }

    const pageData: Omit<Page, 'id' | 'createdAt' | 'updatedAt'> = {
      userId,
      title,
      slug,
      sections: [],
      isPublished: false,
      ...body
    }

    const page = await DataStore.createPage(pageData)
    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}