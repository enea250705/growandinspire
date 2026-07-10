import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Email links (signup confirm, password recovery) land here. Supabase's email
// templates must point at /auth/confirm?token_hash=...&type=... - the default
// {{ .ConfirmationURL }} produces a ?code= link that only /auth/callback handles,
// and that flow needs the PKCE verifier cookie from the originating browser.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  let next = searchParams.get('next') ?? '/dashboard'
  if (!next.startsWith('/')) next = '/dashboard'

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({ token_hash, type })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=confirm_failed`)
}
