import { Users, Star, MessageCircle, Utensils, Network, Check } from 'lucide-react'
import { DinnerForm } from '@/components/forms/DinnerForm'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const PERK_ICONS = [Users, Star, MessageCircle]
const FEATURE_ICONS = [Users, Utensils, MessageCircle, Network]

const CONTENT: Record<Lang, {
  badge: string
  title: string
  desc: string
  perks: { label: string; desc: string }[]
  line1: string
  line2: string
  line3: string
  aboutLabel: string
  about: string[]
  includesLabel: string
  includes: { label: string; desc: string }[]
  whoLabel: string
  who: string[]
  features: string[]
  applyBadge: string
  applyTitle: string
  applyDesc: string
}> = {
  en: {
    badge: 'Exclusive Experience',
    title: 'Dinner with Alketa',
    desc: 'An executive dinner exchange - a limited group of carefully selected leaders sharing one table, one evening, and conversations that matter.',
    perks: [
      { label: 'Limited seats', desc: 'A select group, carefully curated' },
      { label: 'Invitation only', desc: 'Every seat is earned, not bought' },
      { label: 'Real conversation', desc: 'No pitches. No panels. Pure dialogue.' },
    ],
    line1: 'One table.',
    line2: 'One evening.',
    line3: 'Unlimited impact.',
    aboutLabel: 'About the Experience',
    about: [
      'Around the right table, ideas turn into partnerships.',
      'Dinner with Alketa is an exclusive experience for entrepreneurs, leaders and professionals who value authentic conversations, the exchange of experience and connections that last. This event is built for a limited group of participants with a business profile, experience, influence or the potential to contribute to a meaningful conversation on motivation, business growth, decision-making, market challenges and opportunities for collaboration.',
      'Its value lies in access to a curated circle of people, the quality of the exchange, and the chance to build deeper professional relationships in an exclusive setting.',
    ],
    includesLabel: "What's Included",
    includes: [
      { label: 'Food and Drinks', desc: 'A curated menu, selected wines, and artisan desserts.' },
      { label: 'Ambiance', desc: 'A premium venue with warm lighting and careful decor.' },
      { label: 'Audio-Visual', desc: 'Short inspiring presentations and documented moments.' },
      { label: 'Networking', desc: 'Real connections with successful people from various fields.' },
    ],
    whoLabel: 'Who Can Apply',
    who: ['Founders and Co-Founders', 'CEOs and Business Owners', 'Executives and Leaders', 'Investors'],
    features: ['Curated Guests', 'Private Dinner', 'Meaningful Conversations', 'High-Impact Networking'],
    applyBadge: 'Apply',
    applyTitle: 'Request Your Seat',
    applyDesc: 'Applications are reviewed personally. We will respond within 5-7 days.',
  },
  sq: {
    badge: 'Eksperiencë Ekskluzive',
    title: 'Dinner with Alketa',
    desc: 'Një shkëmbim darke ekzekutive - një grup i kufizuar liderësh të përzgjedhur me kujdes që ndajnë një tavolinë, një mbrëmje dhe biseda që kanë rëndësi.',
    perks: [
      { label: 'Vende të kufizuara', desc: 'Grup i përzgjedhur, i kuruar me kujdes' },
      { label: 'Vetëm me ftesë', desc: 'Çdo vend fitohet, nuk blihet' },
      { label: 'Bisedë e vërtetë', desc: 'Pa pitch. Pa panele. Vetëm dialog.' },
    ],
    line1: 'Një tavolinë.',
    line2: 'Një mbrëmje.',
    line3: 'Impakt i pakufizuar.',
    aboutLabel: 'Rreth Eventit',
    about: [
      'Rreth tavolinës së duhur, idetë kthehen në bashkëpunime.',
      'Dinner with Alketa është një eksperiencë ekskluzive për sipërmarrës, drejtues dhe profesionistë që vlerësojnë bisedat autentike, shkëmbimin e përvojës dhe lidhjet që zgjasin. Ky event është ndërtuar për një grup të kufizuar pjesëmarrësish që kanë profil biznesi, eksperiencë, ndikim ose potencial për të kontribuar në një bisedë cilësore mbi motivimin, rritjen e biznesit, vendimmarrjen, sfidat e tregut dhe mundësitë e bashkëpunimit.',
      'Vlera e aktivitetit qëndron te aksesi në një rreth të kuruar njerëzish, te cilësia e shkëmbimit dhe te mundësia për të ndërtuar marrëdhënie më të thella profesionale në një ambient ekskluziv.',
    ],
    includesLabel: 'Çfarë Përfshin',
    includes: [
      { label: 'Ushqim dhe Pije', desc: 'Meny e kuruar, verëra të zgjedhura, dhe ëmbëlsira artizanale.' },
      { label: 'Ambient', desc: 'Lokacion premium me ndriçim të ngrohtë dhe dekor të kujdesshëm.' },
      { label: 'Audio-Vizual', desc: 'Prezantime të shkurtra inspiruese dhe momente të dokumentuara.' },
      { label: 'Networking', desc: 'Lidhje reale me profesionistë nga fusha të ndryshme.' },
    ],
    whoLabel: 'Kush Mund të Aplikojë',
    who: ['Themelues dhe Ko-Themelues', 'CEO dhe Pronarë Biznesi', 'Drejtues dhe Liderë', 'Investitorë'],
    features: ['Të Ftuar të Kuruar', 'Darkë Private', 'Biseda Kuptimplota', 'Networking me Impakt të Lartë'],
    applyBadge: 'Apliko',
    applyTitle: 'Kërko Vendin Tënd',
    applyDesc: 'Aplikimet shqyrtohen personalisht. Do të përgjigjemi brenda 5-7 ditëve.',
  },
}

export default async function DinnerPage() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                {c.badge}
              </p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-6">
                {c.title}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {c.desc}
              </p>
              <div className="flex flex-col gap-4">
                {c.perks.map((perk, i) => {
                  const Icon = PERK_ICONS[i]
                  return (
                    <div key={perk.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-brand-gold" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-brand-white text-sm font-semibold">{perk.label}</p>
                        <p className="text-white/40 text-sm">{perk.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-dark to-brand-black border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-brand-gold" strokeWidth={1} />
                  </div>
                  <p className="font-serif text-lg text-white/60">{c.line1}</p>
                  <p className="font-serif text-lg text-brand-white font-bold">{c.line2}</p>
                  <p className="font-serif text-lg text-white/60">{c.line3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the experience */}
      <section className="bg-brand-cream py-16 lg:py-24 border-b border-black/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">{c.aboutLabel}</p>
          <div className="flex flex-col gap-6 text-black/70 leading-relaxed text-lg">
            {c.about.map((p, i) => (
              <p key={i} className={i === 0 ? 'font-serif text-2xl lg:text-3xl text-brand-black font-medium' : ''}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-brand-white py-16 lg:py-20 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-8 text-center">{c.includesLabel}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.includes.map((item) => (
              <div key={item.label} className="bg-brand-cream rounded-2xl border border-black/8 p-6">
                <p className="font-semibold text-brand-black mb-1.5">{item.label}</p>
                <p className="text-black/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who can apply + features */}
      <section className="bg-brand-cream py-16 lg:py-20 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Who can apply */}
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.whoLabel}</p>
              <ul className="flex flex-col gap-3">
                {c.who.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-brand-gold" strokeWidth={2.5} />
                    </div>
                    <span className="text-brand-black font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feature icons */}
            <div className="grid grid-cols-2 gap-4">
              {c.features.map((label, i) => {
                const Icon = FEATURE_ICONS[i]
                return (
                  <div key={label} className="bg-brand-white rounded-2xl border border-black/8 p-6 text-center">
                    <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-3">
                      <Icon size={18} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-semibold text-brand-black">{label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.applyBadge}</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black mb-3">{c.applyTitle}</h2>
            <p className="text-black/50">{c.applyDesc}</p>
          </div>
          <DinnerForm />
        </div>
      </section>
    </div>
  )
}
