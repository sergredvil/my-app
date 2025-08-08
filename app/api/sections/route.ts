import { NextRequest, NextResponse } from 'next/server'
import { DataStore } from '@/lib/data-store'
import { createSection } from '@/lib/sections'
import { SectionType } from '@/types'

// POST /api/sections - Add a section to a page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { pageId, type, variant, order } = body

    if (!pageId || !type) {
      return NextResponse.json(
        { error: 'Page ID and section type are required' },
        { status: 400 }
      )
    }

    const section = createSection(type as SectionType, variant || 'default', order || 0)
    const page = await DataStore.addSectionToPage(pageId, section)

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ section, page }, { status: 201 })
  } catch (error) {
    console.error('Error adding section:', error)
    return NextResponse.json(
      { error: 'Failed to add section' },
      { status: 500 }
    )
  }
}