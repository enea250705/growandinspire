'use client'

import { useState, useTransition } from 'react'
import { Check, X, Clock, Mail, ChevronDown, Download } from 'lucide-react'
import { setDinnerStatus, setApplicationStatus, getCvUrl } from '@/lib/actions/admin'

export interface AdminApplication {
  id: string
  source: 'dinner' | 'application'
  kind: string
  name: string
  email: string
  status: string
  created_at: string
  details: Record<string, string | null>
}

const FILTERS = ['all', 'Dinner with Alketa', 'Work with Class', 'Become a Guest', 'Idea / Investment'] as const

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })
}

const STATUS_STYLE: Record<string, string> = {
  pending: 'text-amber-600 bg-amber-50 border-amber-200',
  approved: 'text-green-700 bg-green-50 border-green-200',
  rejected: 'text-red-500 bg-red-50 border-red-200',
}

export function ApplicationsClient({ items }: { items: AdminApplication[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all')
  const [open, setOpen] = useState<string | null>(null)
  const [rows, setRows] = useState(items)
  const [pending, startTransition] = useTransition()

  const visible = filter === 'all' ? rows : rows.filter((r) => r.kind === filter)

  function update(item: AdminApplication, status: 'approved' | 'rejected' | 'pending') {
    startTransition(async () => {
      const fn = item.source === 'dinner' ? setDinnerStatus : setApplicationStatus
      const res = await fn(item.id, status)
      if (res.ok) {
        setRows((prev) => prev.map((r) => (r.id === item.id ? { ...r, status } : r)))
      }
    })
  }

  async function downloadCv(path: string) {
    const res = await getCvUrl(path)
    if (res.ok) window.open(res.url, '_blank')
    else alert('CV nuk u gjet.')
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              filter === f ? 'bg-brand-black text-brand-white border-brand-black' : 'border-black/15 text-black/60 hover:border-black/30'
            }`}
          >
            {f === 'all' ? 'Të gjitha' : f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8 text-black/40">
          Nuk ka aplikime.
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((item) => (
            <div key={item.id} className="bg-brand-white rounded-2xl border border-black/8 overflow-hidden">
              <div className="p-5 flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">{item.kind}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLE[item.status] ?? STATUS_STYLE.pending}`}>
                      {item.status === 'approved' ? <Check size={9} /> : item.status === 'rejected' ? <X size={9} /> : <Clock size={9} />}
                      {item.status}
                    </span>
                  </div>
                  <p className="font-semibold text-brand-black">{item.name}</p>
                  <a href={`mailto:${item.email}`} className="text-sm text-black/50 hover:text-brand-gold inline-flex items-center gap-1">
                    <Mail size={12} /> {item.email}
                  </a>
                  <p className="text-xs text-black/30 mt-0.5">Aplikuar {fmt(item.created_at)}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => update(item, 'approved')}
                    disabled={pending || item.status === 'approved'}
                    className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors disabled:opacity-40"
                  >
                    <Check size={12} /> Aprovo
                  </button>
                  <button
                    onClick={() => update(item, 'rejected')}
                    disabled={pending || item.status === 'rejected'}
                    className="flex items-center gap-1 bg-red-50 text-red-500 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-red-100 transition-colors disabled:opacity-40"
                  >
                    <X size={12} /> Refuzo
                  </button>
                  <button
                    onClick={() => setOpen(open === item.id ? null : item.id)}
                    className="p-1.5 rounded-full hover:bg-black/5 transition-colors"
                    aria-label="Detaje"
                  >
                    <ChevronDown size={16} className={`text-black/40 transition-transform ${open === item.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {open === item.id && (
                <div className="px-5 pb-5 pt-1 border-t border-black/6 bg-brand-cream/40">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {Object.entries(item.details)
                      .filter(([k]) => k !== 'cv_path')
                      .map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[10px] uppercase tracking-widest text-black/40">{k}</dt>
                          <dd className="text-sm text-black/70 break-words">{v || '-'}</dd>
                        </div>
                      ))}
                  </dl>
                  {item.details.cv_path && (
                    <button
                      onClick={() => downloadCv(item.details.cv_path as string)}
                      className="mt-4 inline-flex items-center gap-2 bg-brand-black text-brand-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-brand-dark transition-colors"
                    >
                      <Download size={13} /> Shkarko CV
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
