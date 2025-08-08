import { NextRequest, NextResponse } from 'next/server'
import { DataStore } from '@/lib/data-store'

// POST /api/pages/[id]/duplicate - Duplicate a page
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const duplicatedPage = await DataStore.duplicatePage(id, userId)

    if (!duplicatedPage) {
      return NextResponse.json(
        { error: 'Page not found or access denied' },
        { status: 404 }
      )
    }

    return NextResponse.json({ page: duplicatedPage }, { status: 201 })
  } catch (error) {
    console.error('Error duplicating page:', error)
    return NextResponse.json(
      { error: 'Failed to duplicate page' },
      { status: 500 }
    )
  }
}