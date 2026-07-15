import Link from 'next/link'
import { Users } from 'lucide-react'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  desc: string[]
  cta: string
}> = {
  en: {
    badge: 'Community',
    title: 'Who you surround yourself with shapes who you become.',
    desc: [
      'No one builds something meaningful alone.',
      'Grow & Inspire Community connects ambitious people who believe in learning from one another, sharing opportunities and growing through genuine relationships.',
      'Because your next opportunity may begin with one conversation.',
    ],
    cta: 'Join the Community',
  },
  sq: {
    badge: 'Community',
    title: 'Njerëzit që ke pranë formësojnë njeriun që ti bëhesh.',
    desc: [
      'Askush nuk ndërton diçka me vlerë i vetëm.',
      'Grow & Inspire Community bashkon njerëz ambiciozë që besojnë te fuqia e bashkëpunimit, ndarjes së përvojave dhe krijimit të marrëdhënieve me kuptim.',
      'Sepse mundësia jote e radhës mund të nisë nga një bisedë.',
    ],
    cta: 'Bashkohu me Komunitetin',
  },
}

export async function CommunitySection() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
          <Users size={20} className="text-brand-gold" strokeWidth={1.5} />
        </div>
        <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.badge}</p>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-white mb-6 max-w-2xl mx-auto">
          {c.title}
        </h2>
        <div className="text-white/60 text-lg leading-relaxed space-y-4 mb-10">
          {c.desc.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <Link
          href="/login"
          className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
        >
          {c.cta}
        </Link>
      </div>
    </section>
  )
}
