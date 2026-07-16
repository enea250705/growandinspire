import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/proxy'

// The Dinner-with-Alketa landing page has its own subdomain. When a request
// arrives on that host, serve the /dinner-with-alketa page at the root so the
// subdomain acts as a standalone landing page.
const DINNER_HOST_PREFIX = 'dinnerwithalketa.'

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  if (host.startsWith(DINNER_HOST_PREFIX) && request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL('/dinner-with-alketa', request.url))
  }
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
