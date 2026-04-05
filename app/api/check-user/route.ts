import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ user: users?.[0] || null });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}