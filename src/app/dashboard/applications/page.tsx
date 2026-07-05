import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

const APPLICATIONS = [
  {
    type: 'Dinner with Alketa',
    date: '14 Qershor, 2026',
    status: 'pending',
    note: 'Aplikimi u mor. Ekipi po shqyrton.',
    href: '/dinner-with-alketa',
  },
  {
    type: 'Grow and Inspire Retreat',
    date: '2 Qershor, 2026',
    status: 'approved',
    note: 'Konfirmuar! Detajet do të vijnë me email.',
    href: '/#retreat',
  },
  {
    type: 'Business Conference - Standard',
    date: '20 Maj, 2026',
    status: 'approved',
    note: 'Regjistrimi konfirmuar. Paguaj para 1 Gusht.',
    href: '/events',
  },
  {
    type: 'Ideas and Angel Investor',
    date: '10 Maj, 2026',
    status: 'rejected',
    note: 'Nuk plotëson kriteret aktuale. Mund të riaplikosh pas 6 muajsh.',
    href: '/#angel-investor',
  },
]

const STATUS = {
  pending: { label: 'Në pritje', icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-200' },
  approved: { label: 'Aprovuar', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  rejected: { label: 'Refuzuar', icon: XCircle, color: 'text-red-500 bg-red-50 border-red-200' },
}

export default function ApplicationsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">My Applications</h1>
        <p className="text-black/50">Gjurmo statusin e aplikimeve tua.</p>
      </div>

      {APPLICATIONS.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <FileText size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40">Nuk ke aplikime ende.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {APPLICATIONS.map((app) => {
            const s = STATUS[app.status as keyof typeof STATUS]
            const StatusIcon = s.icon
            return (
              <div key={app.type} className="bg-brand-white rounded-2xl border border-black/8 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black">{app.type}</p>
                      <p className="text-xs text-black/40 mt-0.5">Aplikuar {app.date}</p>
                      <p className="text-sm text-black/50 mt-2">{app.note}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${s.color}`}>
                    <StatusIcon size={12} strokeWidth={2} />
                    {s.label}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-black/6 flex justify-end">
                  <Link href={app.href} className="text-xs text-brand-gold hover:underline font-medium">
                    Shko te aplikimi →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
