import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'
import { SITE_PAUSED, PAUSED_HTML } from '@/lib/paused'

// The Dinner-with-Alketa landing page has its own subdomain. When a request
// arrives on that host, serve the /dinner-with-alketa page at the root so the
// subdomain acts as a standalone landing page.
const DINNER_HOST_PREFIX = 'dinnerwithalketa.'

// While the site is paused, these paths still work so the owner can manage
// content, log in and read the applications.
const PAUSE_BYPASS = ['/admin', '/x7k9-aplikime', '/login', '/auth']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (SITE_PAUSED && !PAUSE_BYPASS.some((p) => pathname.startsWith(p))) {
    return new NextResponse(PAUSED_HTML, {
      status: 503,
      headers: { 'content-type': 'text/html; charset=utf-8', 'retry-after': '3600' },
    })
  }

  const host = request.headers.get('host') ?? ''
  if (host.startsWith(DINNER_HOST_PREFIX) && pathname === '/') {
    return NextResponse.rewrite(new URL('/dinner-with-alketa', request.url))
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
