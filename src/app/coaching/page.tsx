import Link from 'next/link'
import { Calendar, Users, Clock, MapPin } from 'lucide-react'
import { DownloadProgram } from '@/components/coaching/DownloadProgram'
import { CoachingForm } from '@/components/forms/CoachingForm'
import { getSettings } from '@/lib/settings'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

export const revalidate = 60

const CONTENT: Record<Lang, {
  badge: string
  title: string
  subtitle: string
  annual: string
  confTitle: string
  confDesc: string
  days: string
  limited: string
  register: string
  day1: string
  day2: string
  day1Items: string[]
  day2Items: string[]
  chips: string[]
  speakers: string
  speakerList: { name: string; role: string }[]
  maxPeople: string
  perGroup: string
  business: string
  businessDesc: string
  life: string
  lifeDesc: string
  ongoing: string
  smallGroup: string
  sgP1: string
  sgP2: string
  reserveTitle: string
  reserveDesc: string
  emailPh: string
}> = {
  en: {
    badge: 'Coaching',
    title: 'Business and Life Coaching',
    subtitle: 'Two flagship formats - a national business conference and exclusive small-group coaching programs.',
    annual: 'Annual Event',
    confTitle: 'Grow and Inspire Business Conference',
    confDesc: "Albania's premier business leadership conference. Two days of keynotes, expert panels, Smart Talks, and unparalleled networking - designed for founders, executives, and ambitious professionals.",
    days: '2 days',
    limited: 'Limited seats',
    register: 'Register Interest',
    day1: 'Day 1',
    day2: 'Day 2',
    day1Items: [
      'Opening keynote - Alketa Vejsiu',
      'Guest speaker: Leadership in Emerging Markets',
      'Smart Talks (10-min spotlight sessions)',
      'Networking lunch',
      'Panel: Women in Albanian Business',
      'Guest speaker: Scaling Without VC',
      'Evening reception',
    ],
    day2Items: [
      'Morning session - Alketa Vejsiu',
      'Guest speaker: Digital Transformation',
      'Expert discussion groups (small groups)',
      'Networking lunch',
      'Audience Q&A with all speakers',
      'Closing ceremony and awards',
    ],
    chips: ['Keynotes', 'Panels', 'Workshops', 'Networking', 'VIP Dinner'],
    speakers: 'Speakers',
    speakerList: [
      { name: 'Alketa Vejsiu', role: 'Host and Spokesperson' },
      { name: 'Speaker TBA', role: 'Announced soon' },
      { name: 'Speaker TBA', role: 'Announced soon' },
      { name: 'Speaker TBA', role: 'Announced soon' },
    ],
    maxPeople: 'Max 10 people',
    perGroup: 'per group - small by design',
    business: 'Business',
    businessDesc: 'Strategy and Growth',
    life: 'Life',
    lifeDesc: 'Clarity and Direction',
    ongoing: 'Ongoing Program',
    smallGroup: 'Small Group Coaching',
    sgP1: 'Small coaching groups of maximum 10 people. Business coaching focused on strategy, growth, and leadership. Life coaching centered on clarity, purpose, and high performance.',
    sgP2: 'Led personally by Alketa Vejsiu with structured curriculum and peer accountability.',
    reserveTitle: 'Reserve Your Spot',
    reserveDesc: "We'll confirm your registration by email.",
    emailPh: 'Your email address',
  },
  sq: {
    badge: 'Coaching',
    title: 'Business dhe Life Coaching',
    subtitle: 'Dy formate kryesore - një konferencë kombëtare biznesi dhe programe ekskluzive coaching në grupe të vogla.',
    annual: 'Eveniment Vjetor',
    confTitle: 'Grow and Inspire Business Conference',
    confDesc: 'Konferenca kryesore e lidershipit të biznesit në Shqipëri. Dy ditë keynotes, panele ekspertësh, Smart Talks dhe networking i pakrahasueshëm - për themelues, drejtues dhe profesionistë ambiciozë.',
    days: '2 ditë',
    limited: 'Vende të kufizuara',
    register: 'Regjistro Interesin',
    day1: 'Dita 1',
    day2: 'Dita 2',
    day1Items: [
      'Keynote hapëse - Alketa Vejsiu',
      'Folës i ftuar: Lidershipi në Tregjet në Zhvillim',
      'Smart Talks (sesione 10-minutëshe)',
      'Drekë networking',
      'Panel: Gratë në Biznesin Shqiptar',
      'Folës i ftuar: Rritje pa VC',
      'Pritje mbrëmjeje',
    ],
    day2Items: [
      'Sesioni i mëngjesit - Alketa Vejsiu',
      'Folës i ftuar: Transformimi Dixhital',
      'Grupe diskutimi me ekspertë (grupe të vogla)',
      'Drekë networking',
      'Pyetje-përgjigje me të gjithë folësit',
      'Ceremonia e mbylljes dhe çmimet',
    ],
    chips: ['Keynotes', 'Panele', 'Workshops', 'Networking', 'VIP Dinner'],
    speakers: 'Folësit',
    speakerList: [
      { name: 'Alketa Vejsiu', role: 'Prezantuese dhe Zëdhënëse' },
      { name: 'Folës së shpejti', role: 'Njoftohet së shpejti' },
      { name: 'Folës së shpejti', role: 'Njoftohet së shpejti' },
      { name: 'Folës së shpejti', role: 'Njoftohet së shpejti' },
    ],
    maxPeople: 'Maks 10 persona',
    perGroup: 'për grup - i vogël me qëllim',
    business: 'Business',
    businessDesc: 'Strategji dhe Rritje',
    life: 'Life',
    lifeDesc: 'Qartësi dhe Drejtim',
    ongoing: 'Program i Vazhdueshëm',
    smallGroup: 'Coaching në Grupe të Vogla',
    sgP1: 'Grupe të vogla coaching me maksimum 10 persona. Business coaching i fokusuar te strategjia, rritja dhe lidershipi. Life coaching i përqendruar te qartësia, qëllimi dhe performanca e lartë.',
    sgP2: 'Udhëhequr personalisht nga Alketa Vejsiu me kurrikul të strukturuar dhe llogaridhënie mes pjesëmarrësve.',
    reserveTitle: 'Rezervo Vendin Tënd',
    reserveDesc: 'Do të konfirmojmë regjistrimin tënd me email.',
    emailPh: 'Adresa jote e email-it',
  },
}

export default async function CoachingPage() {
  const s = await getSettings()
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.badge}</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            {c.title}
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            {c.subtitle}
          </p>
        </div>
      </section>

      {/* Conference section */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="inline-block bg-brand-gold/15 text-brand-gold-dark text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                {c.annual}
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                {c.confTitle}
              </h2>
              <p className="text-black/60 leading-relaxed mb-8">
                {c.confDesc}
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <Calendar size={16} className="text-brand-gold shrink-0" />
                  <span>{s.conference_dates}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <MapPin size={16} className="text-brand-gold shrink-0" />
                  <span>{s.conference_location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <Clock size={16} className="text-brand-gold shrink-0" />
                  <span>{c.days}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <Users size={16} className="text-brand-gold shrink-0" />
                  <span>{c.limited}</span>
                </div>
              </div>

              <Link
                href="#conference-register"
                className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                {c.register}
              </Link>
            </div>

            {/* Right - agenda */}
            <div className="flex flex-col gap-6">
              <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">{c.day1}</p>
                <ul className="flex flex-col gap-3">
                  {c.day1Items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-black/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">{c.day2}</p>
                <ul className="flex flex-col gap-3">
                  {c.day2Items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-black/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Format chips */}
              <div className="flex flex-wrap gap-2">
                {c.chips.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-dark text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Speakers */}
          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-6">{c.speakers}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.speakerList.map((sp, i) => (
                <div key={i} className="bg-brand-white rounded-2xl border border-black/8 p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif font-bold text-brand-gold text-lg">{sp.name[0]}</span>
                  </div>
                  <p className="font-semibold text-brand-black text-sm">{sp.name}</p>
                  <p className="text-black/40 text-xs mt-1">{sp.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Small group coaching */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="bg-brand-black rounded-2xl p-10 text-center order-last lg:order-first">
              <div className="w-16 h-16 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-6">
                <Users size={28} className="text-brand-gold" strokeWidth={1.5} />
              </div>
              <p className="font-serif text-3xl font-bold text-brand-white mb-2">{c.maxPeople}</p>
              <p className="text-white/40">{c.perGroup}</p>
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="font-serif text-2xl font-bold text-brand-gold">{c.business}</p>
                  <p className="text-white/40 text-sm mt-1">{c.businessDesc}</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-brand-gold">{c.life}</p>
                  <p className="text-white/40 text-sm mt-1">{c.lifeDesc}</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block bg-brand-gold/15 text-brand-gold-dark text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                {c.ongoing}
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                {c.smallGroup}
              </h2>
              <p className="text-black/60 leading-relaxed mb-6">
                {c.sgP1}
              </p>
              <p className="text-black/60 leading-relaxed mb-8">
                {c.sgP2}
              </p>
              <DownloadProgram />
            </div>
          </div>

          {/* Coaching application */}
          <div id="coaching-apply" className="mt-20 max-w-2xl mx-auto scroll-mt-24">
            <CoachingForm />
          </div>
        </div>
      </section>

      {/* Register interest form */}
      <section id="conference-register" className="bg-brand-black py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-white mb-3">{c.reserveTitle}</h2>
          <p className="text-white/50 mb-10">{c.reserveDesc}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder={c.emailPh}
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-brand-white placeholder:text-white/40 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors whitespace-nowrap">
              {c.register}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
