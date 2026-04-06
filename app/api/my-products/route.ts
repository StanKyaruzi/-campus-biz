import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { seller_email } = await request.json();
    
    // Return empty array for now
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}