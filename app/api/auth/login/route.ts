import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Mock login - accept any credentials for testing
    if (email && password) {
      return NextResponse.json({ 
        user: {
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin'
        }
      });
    }
    
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}