import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getAISuggestions } from '@/lib/ai';
import { aiSuggestionSchema } from '@/lib/validations';

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
    const parsed = aiSuggestionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { section, content, jobDescription } = parsed.data;
    const suggestions = await getAISuggestions(section, content, jobDescription);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('POST /api/ai/suggestions error:', error);
    return NextResponse.json({ error: 'AI service error' }, { status: 500 });
  }
}
