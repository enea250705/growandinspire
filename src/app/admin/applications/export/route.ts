import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'
import { createAdminClient } from '@/lib/supabase/admin'

// Columns exported to the spreadsheet, in order: [db field, Excel header].
const COLUMNS: [string, string][] = [
  ['created_at', 'Data'],
  ['name', 'Emri dhe mbiemri'],
  ['email', 'Email'],
  ['phone', 'Telefoni'],
  ['company', 'Kompania'],
  ['website', 'Website i kompanisë'],
  ['linkedin', 'Profili (LinkedIn/Instagram)'],
  ['founding_year', 'Vite në treg'],
  ['industry', 'Industria'],
  ['employee_count', 'Punonjës'],
  ['annual_revenue', 'Xhiro / Faza'],
  ['why_join', 'Pse dëshiron të marrë pjesë'],
  ['what_you_bring', 'Vlera për komunitetin'],
  ['question_for_alketa', 'Pyetje për Alketën'],
  ['business_description', 'Detaje shtesë (mosha, qyteti, sfida, tema, etj.)'],
  ['status', 'Statusi'],
]

function esc(v: unknown): string {
  if (v == null) return ''
  let s = Array.isArray(v) ? v.join('; ') : String(v)
  if (/[",\n\r]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"'
  return s
}

export async function GET() {
  if (!(await isAdmin())) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('dinner_applications')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = data ?? []
  const header = COLUMNS.map(([, label]) => esc(label)).join(',')
  const body = rows
    .map((r) => COLUMNS.map(([key]) => esc((r as Record<string, unknown>)[key])).join(','))
    .join('\n')

  // Prepend a UTF-8 BOM so Excel reads Albanian characters correctly.
  const csv = '﻿' + header + '\n' + body
  const filename = `dinner-applications-${new Date().toISOString().slice(0, 10)}.csv`

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
