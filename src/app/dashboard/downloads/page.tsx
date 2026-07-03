import { Download, FileText, Lock } from 'lucide-react'
import Link from 'next/link'

const DOWNLOADS = [
  { title: 'Leadership Clarity Workbook', type: 'PDF', size: '2.4 MB', free: true, date: '12 Maj, 2026' },
  { title: 'Business Growth Plan Template', type: 'PDF', size: '1.8 MB', free: true, date: '3 Prill, 2026' },
  { title: 'Personal Brand Strategy Guide', type: 'PDF', size: '3.1 MB', free: false, date: null },
  { title: 'Founder Mindset Toolkit', type: 'PDF', size: '4.2 MB', free: false, date: null },
  { title: 'Coaching Session Notes — Q1 2026', type: 'PDF', size: '0.9 MB', free: false, date: null },
]

export default function DownloadsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">My Downloads</h1>
        <p className="text-black/50">Materiale dhe guida të shkarkueshme.</p>
      </div>

      <div className="space-y-3">
        {DOWNLOADS.map((item) => (
          <div
            key={item.title}
            className="bg-brand-white rounded-xl border border-black/8 p-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                item.free ? 'bg-brand-gold/10' : 'bg-black/5'
              }`}>
                <FileText size={18} className={item.free ? 'text-brand-gold' : 'text-black/30'} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-semibold text-brand-black text-sm">{item.title}</p>
                <p className="text-xs text-black/40 mt-0.5">
                  {item.type} · {item.size}
                  {item.date && <span> · Shkarkuar {item.date}</span>}
                </p>
              </div>
            </div>

            {item.free ? (
              <button className="shrink-0 flex items-center gap-1.5 bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-brand-gold/20 transition-colors">
                <Download size={12} strokeWidth={2} />
                Shkarko
              </button>
            ) : (
              <Link
                href="/membership"
                className="shrink-0 flex items-center gap-1.5 border border-black/10 text-black/40 text-xs font-medium px-3 py-1.5 rounded-full hover:border-brand-gold/30 hover:text-brand-gold transition-colors"
              >
                <Lock size={11} strokeWidth={2} />
                Unlock
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
