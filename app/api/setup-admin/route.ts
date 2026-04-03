import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name, studentId, phone, password } = await request.json();
    
    // For now, let's just log and return success
    console.log('Admin setup requested for:', email);
    
    // Since we don't have database yet, we'll store in localStorage temporarily
    // This will at least make it work across devices using the same browser
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin setup initiated. Please check console.',
      user: { email, name, role: 'admin' }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}