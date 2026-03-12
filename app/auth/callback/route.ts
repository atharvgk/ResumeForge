import { NextResponse } from 'next/server';

// The PKCE code verifier is stored in browser storage by @supabase/ssr.
// A server route handler can't access it, so we redirect to a client page
// that calls exchangeCodeForSession() from the browser Supabase client.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const redirectUrl = new URL('/auth/exchange', url.origin);
  redirectUrl.search = url.search; // forward all query params (code, error, etc.)
  return NextResponse.redirect(redirectUrl.toString());
}
