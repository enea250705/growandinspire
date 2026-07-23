import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/admin'
import { createAdminClient } from '@/lib/supabase/admin'
import { DATA_VIEW_KEY } from '@/lib/data-view'
import { DINNER_EXTRA_FIELDS, parseDinnerExtras } from '@/lib/dinner-extras'

// Direct columns from the row: [db field, Excel header].
const DIRECT_BEFORE: [string, string][] = [
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
]

const HEADERS: string[] = [
  ...DIRECT_BEFORE.map(([, h]) => h),
  ...DINNER_EXTRA_FIELDS.map((f) => f.header),
  'Statusi',
]

function esc(v: unknown): string {
  if (v == null) return ''
  let s = Array.isArray(v) ? v.join('; ') : String(v)
  if (/[",\n\r]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"'
  return s
}

function rowCells(r: Record<string, unknown>): string[] {
  const extras = parseDinnerExtras(r.business_description as string | null)
  return [
    ...DIRECT_BEFORE.map(([key]) => esc(r[key])),
    ...DINNER_EXTRA_FIELDS.map((f) => esc(extras[f.key] ?? '')),
    esc(r.status),
  ]
}

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get('k')
  if (key !== DATA_VIEW_KEY && !(await isAdmin())) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('dinner_applications')
    .select('*')
    .order('created_at', { ascending: false })

  const rows = data ?? []
  const header = HEADERS.map((label) => esc(label)).join(',')
  const body = rows
    .map((r) => rowCells(r as Record<string, unknown>).join(','))
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
