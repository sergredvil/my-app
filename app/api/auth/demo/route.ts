import { NextRequest, NextResponse } from 'next/server'
import { DataStore } from '@/lib/data-store'

// POST /api/auth/demo - Get demo user for development
export async function POST(request: NextRequest) {
  try {
    const demoUser = DataStore.getDemoUser()
    
    // In a real app, you would set proper session cookies here
    const response = NextResponse.json({ 
      user: demoUser,
      message: 'Logged in as demo user' 
    })
    
    // Set a simple session cookie (in production, use proper JWT or session management)
    response.cookies.set('user-id', demoUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    return response
  } catch (error) {
    console.error('Error with demo auth:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate' },
      { status: 500 }
    )
  }
}

// GET /api/auth/demo - Check if user is logged in
export async function GET(request: NextRequest) {
  try {
    const userId = request.cookies.get('user-id')?.value
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    const user = await DataStore.getUser(userId)
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error checking auth:', error)
    return NextResponse.json(
      { error: 'Failed to check authentication' },
      { status: 500 }
    )
  }
}