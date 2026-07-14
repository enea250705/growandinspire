import Link from 'next/link'
import { Download as DownloadIcon, FileDown, Lock } from 'lucide-react'
import { getDownloads } from '@/lib/content'
import { isMember } from '@/lib/membership'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const T: Record<Lang, { title: string; count: (n: number) => string; empty: string; becomeMember: string }> = {
  en: {
    title: 'My Downloads',
    count: (n) => `${n} resources available.`,
    empty: 'No resources to download yet.',
    becomeMember: 'Become a member for premium resources →',
  },
  sq: {
    title: 'Shkarkimet e Mia',
    count: (n) => `${n} resurse të disponueshme.`,
    empty: 'Nuk ka resurse për shkarkim ende.',
    becomeMember: 'Bëhu anëtar për resurse premium →',
  },
}

export default async function DownloadsPage() {
  const [files, member] = await Promise.all([getDownloads(), isMember()])
  const lang = await getLang()
  const t = T[lang]

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">{t.title}</h1>
        <p className="text-black/50">{t.count(files.length)}</p>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-20 bg-brand-white rounded-2xl border border-black/8">
          <DownloadIcon size={32} className="text-black/20 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-black/40">{t.empty}</p>
          {!member && (
            <Link href="/membership" className="text-brand-gold text-sm font-medium hover:underline mt-2 inline-block">
              {t.becomeMember}
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {files.map((file) => (
            <a
              key={file.id}
              href={file.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-brand-white rounded-2xl border border-black/8 p-5 hover:border-brand-gold/30 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-gold/12 flex items-center justify-center shrink-0">
                <FileDown size={18} className="text-brand-gold" strokeWidth={1.5} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-brand-black truncate">{file.title}</p>
                  {file.is_premium && (
                    <span className="inline-flex items-center gap-1 bg-brand-gold text-brand-black text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                      <Lock size={9} /> PREMIUM
                    </span>
                  )}
                </div>
                {file.description && (
                  <p className="text-sm text-black/45 truncate">{file.description}</p>
                )}
              </div>
              <DownloadIcon size={17} className="text-black/30 group-hover:text-brand-gold transition-colors shrink-0" />
            </a>
          ))}
        </div>
      )}
    </>
  )
}
