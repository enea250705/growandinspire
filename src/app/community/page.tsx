import Link from 'next/link'
import { Users, MessageCircle, Lock, Zap, Heart, Star } from 'lucide-react'

const TIERS = [
  {
    name: 'Free Member',
    icon: Users,
    features: ['Akses forumit bazë', 'Lexo postimet e komunitetit', 'Profil anëtar'],
    locked: false,
  },
  {
    name: 'Premium Access',
    icon: Zap,
    features: [
      'Grup privat Premium',
      'Diskutime tematike javore',
      'Q&A me ekspertë',
      'Sfida mujore',
    ],
    locked: true,
  },
  {
    name: 'Inner Circle',
    icon: Star,
    features: [
      'Grup ekskluziv me Alketa',
      'Mastermind sessions',
      'Networking 1:1 me anëtarë',
      'Evente private',
      'Priority akses gjithçkaje',
    ],
    locked: true,
  },
]

const HIGHLIGHTS = [
  {
    quote: 'Komuniteti Grow and Inspire më ndihmoi të gjeja partneren e biznesit tim. Mundësi të vërteta lindin këtu.',
    name: 'Erinda M.',
    role: 'Co-founder, Studio Tirana',
  },
  {
    quote: 'Mastermind sessions çdo javë - niveli i bisedave dhe niveli i njerëzve është krejtësisht tjetër.',
    name: 'Blerina K.',
    role: 'CEO, BK Consulting',
  },
  {
    quote: 'Më shumë vlerë sesa çdo kurs apo trajnim. Ky komunitet është investimi im më i mirë i vitit.',
    name: 'Anxhela D.',
    role: 'Founder, AD Creative',
  },
]

export default function CommunityPage() {
  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      {/* Hero */}
      <section className="bg-brand-black py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Community</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-6">
            Komunitet i Vërtetë.<br />Rritje e Vërtetë.
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto mb-10">
            Bashkohu me gratë lider, sipërmarrëse dhe profesioniste ambicioze nga e gjithë Shqipëria dhe diaspora - në një hapësirë të kurdisur për mbështetje, bashkëpunim dhe rritje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              Bashkohu tani
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center border border-white/20 text-brand-white px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-colors"
            >
              Kyçu në llogarinë tënde
            </Link>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-brand-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Nivelet</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black">Zgjedh nivelin tënd</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map(({ name, icon: Icon, features, locked }) => (
              <div
                key={name}
                className={`rounded-3xl p-8 border ${
                  !locked ? 'bg-brand-white border-black/8' : 'bg-brand-black border-brand-gold/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  locked ? 'bg-brand-gold/10' : 'bg-brand-gold/10'
                }`}>
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
                    Zhblloko
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="w-full inline-flex items-center justify-center border border-black/15 text-brand-black py-3 rounded-full text-sm font-semibold hover:border-brand-gold/40 transition-colors"
                  >
                    Fillo falas
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-brand-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-white">Çfarë gjen këtu</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: MessageCircle, title: 'Diskutime dhe Forum', desc: 'Pyet, ndaj, mëso. Forumi aktiv 24/7 me anëtarë nga gjithë komuniteti.' },
              { icon: Users, title: 'Mastermind Groups', desc: 'Grupe të vogla fokusi - 6-8 anëtarë - që takohen rregullisht për progres dhe llogaridhënie.' },
              { icon: Zap, title: 'Sfida Mujore', desc: 'Sfida praktike çdo muaj: biznesi, produktiviteti, mirëqenia, marke personale.' },
              { icon: Heart, title: 'Mbështetje dhe Empati', desc: 'Hapësirë e sigurt për të qenë autentike - pa gjykim, me mbështetje reale.' },
              { icon: Star, title: 'Expert Sessions', desc: 'Q&A live me ekspertë, coach dhe sipërmarrës të ftuar nga Alketa Vejsiu.' },
              { icon: Lock, title: 'Networking Ekskluziv', desc: 'Lidhje direkte me anëtarë Inner Circle - bashkëpunime, partneritete, mundësi.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-gold/30 transition-colors">
                <Icon size={20} className="text-brand-gold mb-4" strokeWidth={1.5} />
                <p className="font-semibold text-brand-white mb-2">{title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-cream py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold text-brand-black">Çfarë thonë anëtarët</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((h) => (
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
              Bashkohu sot - Vende të kufizuara
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
