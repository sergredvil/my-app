import { NextRequest, NextResponse } from 'next/server'
import { DataStore } from '@/lib/data-store'

// DELETE /api/sections/[id] - Remove a section from a page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      )
    }

    const page = await DataStore.removeSectionFromPage(pageId, id)

    if (!page) {
      return NextResponse.json(
        { error: 'Page or section not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, page })
  } catch (error) {
    console.error('Error removing section:', error)
    return NextResponse.json(
      { error: 'Failed to remove section' },
      { status: 500 }
    )
  }
}

// PUT /api/sections/[id] - Update a section (via page update)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { pageId, content, styles } = body

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      )
    }

    const page = await DataStore.getPage(pageId)
    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    const sectionIndex = page.sections.findIndex(s => s.id === id)
    if (sectionIndex === -1) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      )
    }

    // Update the section
    const updatedSections = [...page.sections]
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      ...(content && { content }),
      ...(styles && { styles })
    }

    const updatedPage = await DataStore.updatePage(pageId, { sections: updatedSections })

    return NextResponse.json({ 
      section: updatedSections[sectionIndex], 
      page: updatedPage 
    })
  } catch (error) {
    console.error('Error updating section:', error)
    return NextResponse.json(
      { error: 'Failed to update section' },
      { status: 500 }
    )
  }
}