import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('subscribers')
    .select('email, created_at')
    .order('created_at', { ascending: false })

  const rows = data ?? []
  const header = 'email,created_at\n'
  const body = rows
    .map((r) => `${r.email},${r.created_at}`)
    .join('\n')
  const csv = header + body

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="subscribers.csv"',
    },
  })
}
