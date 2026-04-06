import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // For now, return a mock response
    return NextResponse.json({ 
      user: { 
        email: email,
        name: 'Admin User',
        role: 'admin'
      } 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}