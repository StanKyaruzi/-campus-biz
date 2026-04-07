import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/data';

export async function GET() {
  const users = getUsers();
  const usersWithoutPassword = users.map(({ password, ...rest }: any) => rest);
  return NextResponse.json(usersWithoutPassword);
}