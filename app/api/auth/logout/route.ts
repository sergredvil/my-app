import { NextRequest, NextResponse } from 'next/server'

// POST /api/auth/logout - Logout user
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      message: 'Logged out successfully' 
    })
    
    // Clear the session cookie
    response.cookies.delete('user-id')
    
    return response
  } catch (error) {
    console.error('Error logging out:', error)
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    )
  }
}