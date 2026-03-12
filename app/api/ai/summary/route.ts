import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateSummary } from '@/lib/ai';
import { aiSummarySchema } from '@/lib/validations';

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
    const parsed = aiSummarySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { name, experiences, skills, projects } = parsed.data;
    const summary = await generateSummary(name, experiences, skills, projects);

    return NextResponse.json({ summary });
  } catch (error: unknown) {
    console.error('POST /api/ai/summary error:', error);
    const status = (error as { status?: number })?.status;
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit reached. Please wait a moment and try again.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'AI service unavailable. Please try again.' }, { status: 500 });
  }
}
