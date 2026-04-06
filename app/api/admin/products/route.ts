import { NextResponse } from 'next/server';

let productsStore: any[] = [];

export async function GET() {
  return NextResponse.json(productsStore);
}

export async function PUT(request: Request) {
  try {
    const { productId, status } = await request.json();
    const index = productsStore.findIndex((p: any) => p.id === productId);
    if (index !== -1) {
      productsStore[index].status = status;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    productsStore = productsStore.filter((p: any) => p.id !== productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}