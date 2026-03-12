import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { suggestSkills } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json() as {
      experiences?: { position: string; company: string; description: string; bullets: string[] }[];
      projects?: { name: string; description: string; technologies: string[] }[];
      existingSkills?: string[];
    };

    const suggestions = await suggestSkills(
      body.experiences ?? [],
      body.projects ?? [],
      body.existingSkills ?? [],
    );

    return NextResponse.json({ suggestions });
  } catch (error: unknown) {
    console.error('POST /api/ai/skills error:', error);
    const status = (error as { status?: number })?.status;
    if (status === 429) {
      return NextResponse.json({ error: 'Rate limit reached. Please wait a moment and try again.' }, { status: 429 });
    }
    return NextResponse.json({ error: 'AI service unavailable. Please try again.' }, { status: 500 });
  }
}
