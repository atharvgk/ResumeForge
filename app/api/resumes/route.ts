import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('resumes')
      .select('id, title, created_at, updated_at, is_public')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ resumes: data });
  } catch (error) {
    console.error('GET /api/resumes error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, data } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data: resume, error } = await supabase
      .from('resumes')
      .insert({ user_id: user.id, title, data: data ?? {} })
      .select('id, title, created_at, updated_at')
      .single();

    if (error) throw error;

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error('POST /api/resumes error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
