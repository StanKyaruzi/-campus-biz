import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([]);
}

export async function PUT(request: Request) {
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ success: true });
}