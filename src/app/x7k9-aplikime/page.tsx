import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { DATA_VIEW_KEY } from '@/lib/data-view'
import { DINNER_EXTRA_FIELDS, parseDinnerExtras } from '@/lib/dinner-extras'

// Hidden internal view - never index it.
export const metadata: Metadata = { robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

// Direct columns from the row: [db field, column header].
const DIRECT_BEFORE: [string, string][] = [
  ['created_at', 'Data'],
  ['name', 'Emri dhe mbiemri'],
  ['email', 'Email'],
  ['phone', 'Telefoni'],
  ['company', 'Kompania'],
  ['website', 'Website'],
  ['linkedin', 'Profili'],
  ['founding_year', 'Vite në treg'],
  ['industry', 'Industria'],
  ['employee_count', 'Punonjës'],
  ['annual_revenue', 'Xhiro / Faza'],
  ['why_join', 'Pse dëshiron'],
  ['what_you_bring', 'Vlera për komunitetin'],
  ['question_for_alketa', 'Pyetje për Alketën'],
]

// Every column header in final order (direct → each extra question → status).
const HEADERS: string[] = [
  ...DIRECT_BEFORE.map(([, h]) => h),
  ...DINNER_EXTRA_FIELDS.map((f) => f.header),
  'Statusi',
]

function fmt(v: unknown): string {
  if (v == null) return ''
  if (Array.isArray(v)) return v.join(', ')
  return String(v)
}

/** All cell values for one row, in HEADERS order. */
function rowCells(r: Record<string, unknown>): string[] {
  const extras = parseDinnerExtras(r.business_description as string | null)
  return [
    ...DIRECT_BEFORE.map(([key]) => fmt(r[key])),
    ...DINNER_EXTRA_FIELDS.map((f) => extras[f.key] ?? ''),
    fmt(r.status),
  ]
}

export default async function LiveApplicationsView({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>
}) {
  const { k } = await searchParams
  if (k !== DATA_VIEW_KEY) notFound()

  const supabase = createAdminClient()
  const { data } = await supabase
    .from('dinner_applications')
    .select('*')
    .order('created_at', { ascending: false })
  const rows = (data ?? []) as Record<string, unknown>[]

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Sticky header - always reachable */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <h1 className="text-base font-bold">Aplikimet — Dinner with Alketa · {rows.length}</h1>
        <a
          href={`/x7k9-aplikime/export?k=${encodeURIComponent(DATA_VIEW_KEY)}`}
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-black/80"
        >
          ⬇ Shkarko për Excel (CSV)
        </a>
      </div>

      <div className="p-3 sm:p-4">
        <div className="overflow-x-auto border border-gray-300 rounded-lg bg-white">
          <table className="min-w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {HEADERS.map((label) => (
                  <th key={label} className="border border-gray-300 px-2 py-2 text-left font-semibold whitespace-nowrap">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={String(r.id)} className="odd:bg-gray-50 align-top">
                  {rowCells(r).map((val, i) => (
                    <td key={i} className="border border-gray-300 px-2 py-1.5">
                      <div className="w-[10rem] sm:w-[13rem] max-h-28 overflow-auto whitespace-pre-wrap break-words leading-snug">
                        {val}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={HEADERS.length} className="px-3 py-8 text-center text-gray-500">
                    Ende s’ka aplikime.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-3">Rrëshqit anash për të parë të gjitha kolonat.</p>
      </div>
    </div>
  )
}
