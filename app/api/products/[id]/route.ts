import { NextResponse } from 'next/server';

let productsStore: any[] = [];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = productsStore.find(p => p.id === id);
  return NextResponse.json(product || null);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await request.json();
  const index = productsStore.findIndex(p => p.id === id);
  if (index !== -1) {
    productsStore[index] = { ...productsStore[index], ...updates };
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  productsStore = productsStore.filter(p => p.id !== id);
  return NextResponse.json({ success: true });
}