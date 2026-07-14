import Link from 'next/link'
import { Users, MessageCircle, Lock, Zap, Heart, Star } from 'lucide-react'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const TIER_ICONS = [Users, Zap, Star]
const FEATURE_ICONS = [MessageCircle, Users, Zap, Heart, Star, Lock]

const CONTENT: Record<Lang, {
  badge: string
  title: React.ReactNode
  subtitle: string
  joinNow: string
  login: string
  levels: string
  chooseLevel: string
  tiers: { name: string; features: string[]; locked: boolean }[]
  unlock: string
  startFree: string
  whatYouFind: string
  features: { title: string; desc: string }[]
  membersSay: string
  highlights: { quote: string; name: string; role: string }[]
  joinToday: string
}> = {
  en: {
    badge: 'Community',
    title: <>A Real Community.<br />Real Growth.</>,
    subtitle: 'Join women leaders, entrepreneurs and ambitious professionals from all over Albania and the diaspora - in a space curated for support, collaboration and growth.',
    joinNow: 'Join now',
    login: 'Log in to your account',
    levels: 'Levels',
    chooseLevel: 'Choose your level',
    tiers: [
      { name: 'Free Member', features: ['Basic forum access', 'Read community posts', 'Member profile'], locked: false },
      { name: 'Premium Access', features: ['Private Premium group', 'Weekly themed discussions', 'Q&A with experts', 'Monthly challenges'], locked: true },
      { name: 'Inner Circle', features: ['Exclusive group with Alketa', 'Mastermind sessions', '1:1 networking with members', 'Private events', 'Priority access to everything'], locked: true },
    ],
    unlock: 'Unlock',
    startFree: 'Start free',
    whatYouFind: 'What you find here',
    features: [
      { title: 'Discussions and Forum', desc: 'Ask, share, learn. An active 24/7 forum with members from across the community.' },
      { title: 'Mastermind Groups', desc: 'Small focus groups - 6-8 members - that meet regularly for progress and accountability.' },
      { title: 'Monthly Challenges', desc: 'Practical challenges every month: business, productivity, wellbeing, personal brand.' },
      { title: 'Support and Empathy', desc: 'A safe space to be authentic - no judgment, with real support.' },
      { title: 'Expert Sessions', desc: 'Live Q&A with experts, coaches and entrepreneurs invited by Alketa Vejsiu.' },
      { title: 'Exclusive Networking', desc: 'Direct connections with Inner Circle members - collaborations, partnerships, opportunities.' },
    ],
    membersSay: 'What members say',
    highlights: [
      { quote: 'The Grow and Inspire community helped me find my business partner. Real opportunities are born here.', name: 'Erinda M.', role: 'Co-founder, Studio Tirana' },
      { quote: 'Mastermind sessions every week - the level of the conversations and the people is completely different.', name: 'Blerina K.', role: 'CEO, BK Consulting' },
      { quote: 'More value than any course or training. This community is my best investment of the year.', name: 'Anxhela D.', role: 'Founder, AD Creative' },
    ],
    joinToday: 'Join today - Limited seats',
  },
  sq: {
    badge: 'Komuniteti',
    title: <>Komunitet i Vërtetë.<br />Rritje e Vërtetë.</>,
    subtitle: 'Bashkohu me gratë lider, sipërmarrëse dhe profesioniste ambicioze nga e gjithë Shqipëria dhe diaspora - në një hapësirë të kurdisur për mbështetje, bashkëpunim dhe rritje.',
    joinNow: 'Bashkohu tani',
    login: 'Kyçu në llogarinë tënde',
    levels: 'Nivelet',
    chooseLevel: 'Zgjedh nivelin tënd',
    tiers: [
      { name: 'Free Member', features: ['Akses forumit bazë', 'Lexo postimet e komunitetit', 'Profil anëtar'], locked: false },
      { name: 'Premium Access', features: ['Grup privat Premium', 'Diskutime tematike javore', 'Q&A me ekspertë', 'Sfida mujore'], locked: true },
      { name: 'Inner Circle', features: ['Grup ekskluziv me Alketa', 'Mastermind sessions', 'Networking 1:1 me anëtarë', 'Evente private', 'Priority akses gjithçkaje'], locked: true },
    ],
    unlock: 'Zhblloko',
    startFree: 'Fillo falas',
    whatYouFind: 'Çfarë gjen këtu',
    features: [
      { title: 'Diskutime dhe Forum', desc: 'Pyet, ndaj, mëso. Forumi aktiv 24/7 me anëtarë nga gjithë komuniteti.' },
      { title: 'Mastermind Groups', desc: 'Grupe të vogla fokusi - 6-8 anëtarë - që takohen rregullisht për progres dhe llogaridhënie.' },
      { title: 'Sfida Mujore', desc: 'Sfida praktike çdo muaj: biznesi, produktiviteti, mirëqenia, marke personale.' },
      { title: 'Mbështetje dhe Empati', desc: 'Hapësirë e sigurt për të qenë autentike - pa gjykim, me mbështetje reale.' },
      { title: 'Expert Sessions', desc: 'Q&A live me ekspertë, coach dhe sipërmarrës të ftuar nga Alketa Vejsiu.' },
      { title: 'Networking Ekskluziv', desc: 'Lidhje direkte me anëtarë Inner Circle - bashkëpunime, partneritete, mundësi.' },
    ],
    membersSay: 'Çfarë thonë anëtarët',
    highlights: [
      { quote: 'Komuniteti Grow and Inspire më ndihmoi të gjeja partneren e biznesit tim. Mundësi të vërteta lindin këtu.', name: 'Erinda M.', role: 'Co-founder, Studio Tirana' },
      { quote: 'Mastermind sessions çdo javë - niveli i bisedave dhe niveli i njerëzve është krejtësisht tjetër.', name: 'Blerina K.', role: 'CEO, BK Consulting' },
      { quote: 'Më shumë vlerë sesa çdo kurs apo trajnim. Ky komunitet është investimi im më i mirë i vitit.', name: 'Anxhela D.', role: 'Founder, AD Creative' },
    ],
    joinToday: 'Bashkohu sot - Vende të kufizuara',
  },
}

export default async function CommunityPage() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      {/* Hero */}
      <section className="bg-brand-black py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-6">
            {c.title}
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-10">
            {c.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              {c.joinNow}
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center border border-white/20 text-brand-white px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-colors"
            >
              {c.login}
            </Link>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-brand-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.levels}</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black">{c.chooseLevel}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.tiers.map(({ name, features, locked }, i) => {
              const Icon = TIER_ICONS[i]
              return (
                <div
                  key={name}
                  className={`rounded-3xl p-8 border ${
                    !locked ? 'bg-brand-white border-black/8' : 'bg-brand-black border-brand-gold/20'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-brand-gold/10">
                    <Icon size={18} className="text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <p className={`font-semibold text-lg mb-5 ${locked ? 'text-brand-white' : 'text-brand-black'}`}>
                    {name}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {features.map((f) => (
                      <li key={f} className={`text-sm flex items-center gap-2 ${locked ? 'text-white/60' : 'text-black/60'}`}>
                        <span className="w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {locked ? (
                    <Link
                      href="/membership"
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                    >
                      <Lock size={13} />
                      {c.unlock}
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="w-full inline-flex items-center justify-center border border-black/15 text-brand-black py-3 rounded-full text-sm font-semibold hover:border-brand-gold/40 transition-colors"
                    >
                      {c.startFree}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-brand-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-white">{c.whatYouFind}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.features.map(({ title, desc }, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-gold/30 transition-colors">
                  <Icon size={20} className="text-brand-gold mb-4" strokeWidth={1.5} />
                  <p className="font-semibold text-brand-white mb-2">{title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-black">{c.membersSay}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.highlights.map((h) => (
              <div key={h.name} className="bg-brand-white rounded-3xl border border-black/8 p-8">
                <div className="w-8 h-px bg-brand-gold mb-5" />
                <p className="text-brand-black/80 leading-relaxed mb-6 font-serif text-lg">
                  &ldquo;{h.quote}&rdquo;
                </p>
                <p className="font-semibold text-brand-black text-sm">{h.name}</p>
                <p className="text-black/40 text-xs mt-0.5">{h.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center bg-brand-black text-brand-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
            >
              {c.joinToday}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
