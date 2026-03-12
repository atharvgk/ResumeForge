import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { enhanceContent } from '@/lib/ai';
import { aiEnhanceSchema } from '@/lib/validations';

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
    const parsed = aiEnhanceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { section, content, jobDescription } = parsed.data;
    const enhanced = await enhanceContent(section, content, jobDescription);

    return NextResponse.json({ enhanced });
  } catch (error: unknown) {
    console.error('POST /api/ai/enhance error:', error);
    const status = (error as { status?: number })?.status;
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit reached. Please wait a moment and try again.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'AI service unavailable. Please try again.' }, { status: 500 });
  }
}
