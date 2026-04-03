import { NextResponse } from 'next/server';

// Simple in-memory storage for now (will work immediately)
let adminUsers: string[] = [];

export async function POST(request: Request) {
  try {
    const { email, name, password, studentId, phone } = await request.json();
    
    // Store in memory
    adminUsers.push(email);
    
    console.log('Admin setup:', { email, name, studentId, phone });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin account created! You can now login.',
      admin: { email, name, role: 'admin' }
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}