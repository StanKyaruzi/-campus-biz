import { NextResponse } from 'next/server';

export async function GET() {
  const products = JSON.parse(require('fs').readFileSync(require('path').join(process.cwd(), 'data', 'products.json'), 'utf-8') || '[]');
  return NextResponse.json(products.filter((p: any) => p.status === 'approved'));
}