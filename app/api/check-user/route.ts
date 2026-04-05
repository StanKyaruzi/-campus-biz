import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test if supabase is configured
    const { data, error } = await supabase
      .from('users')
      .select('count');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connected',
      error: error?.message 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    });
  }
}