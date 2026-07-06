import Link from 'next/link'
import { Calendar, Users, Clock, MapPin } from 'lucide-react'
import { DownloadProgram } from '@/components/coaching/DownloadProgram'

const DAY1 = [
  'Opening keynote - Alketa Vejsiu',
  'Guest speaker: Leadership in Emerging Markets',
  'Smart Talks (10-min spotlight sessions)',
  'Networking lunch',
  'Panel: Women in Albanian Business',
  'Guest speaker: Scaling Without VC',
  'Evening reception',
]

const DAY2 = [
  'Morning session - Alketa Vejsiu',
  'Guest speaker: Digital Transformation',
  'Expert discussion groups (small groups)',
  'Networking lunch',
  'Audience Q&A with all speakers',
  'Closing ceremony and awards',
]

export default function CoachingPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Coaching</p>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-4">
            Business and Life Coaching
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Two flagship formats - a national business conference and exclusive small-group coaching programs.
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
                Annual Event
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                Grow and Inspire Business Conference
              </h2>
              <p className="text-black/60 leading-relaxed mb-8">
                Albania&apos;s premier business leadership conference. Two days of keynotes, expert panels, Smart Talks, and unparalleled networking - designed for founders, executives, and ambitious professionals.
              </p>

              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <Calendar size={16} className="text-brand-gold shrink-0" />
                  <span>April 25–26, 2026</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <MapPin size={16} className="text-brand-gold shrink-0" />
                  <span>Tirana, Albania - venue TBC</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <Clock size={16} className="text-brand-gold shrink-0" />
                  <span>2 days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-black/60">
                  <Users size={16} className="text-brand-gold shrink-0" />
                  <span>Limited seats</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="font-serif text-4xl font-bold text-brand-black">€150</span>
                <span className="text-black/40">– €175</span>
                <span className="text-black/40 text-sm">per person</span>
              </div>

              <Link
                href="#conference-register"
                className="inline-flex items-center justify-center bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
              >
                Register Interest
              </Link>
            </div>

            {/* Right - agenda */}
            <div className="flex flex-col gap-6">
              <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">Day 1</p>
                <ul className="flex flex-col gap-3">
                  {DAY1.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-black/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-4">Day 2</p>
                <ul className="flex flex-col gap-3">
                  {DAY2.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-black/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Format chips */}
              <div className="flex flex-wrap gap-2">
                {['Keynotes', 'Panels', 'Workshops', 'Networking', 'VIP Dinner'].map((f) => (
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
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-6">Speakers</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Alketa Vejsiu', role: 'Host and Spokesperson' },
                { name: 'Speaker TBA', role: 'Announced soon' },
                { name: 'Speaker TBA', role: 'Announced soon' },
                { name: 'Speaker TBA', role: 'Announced soon' },
              ].map((s, i) => (
                <div key={i} className="bg-brand-white rounded-2xl border border-black/8 p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif font-bold text-brand-gold text-lg">{s.name[0]}</span>
                  </div>
                  <p className="font-semibold text-brand-black text-sm">{s.name}</p>
                  <p className="text-black/40 text-xs mt-1">{s.role}</p>
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
              <p className="font-serif text-3xl font-bold text-brand-white mb-2">Max 10 people</p>
              <p className="text-white/40">per group - small by design</p>
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 gap-6 text-center">
                <div>
                  <p className="font-serif text-2xl font-bold text-brand-gold">Business</p>
                  <p className="text-white/40 text-sm mt-1">Strategy and Growth</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-brand-gold">Life</p>
                  <p className="text-white/40 text-sm mt-1">Clarity and Direction</p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <span className="inline-block bg-brand-gold/15 text-brand-gold-dark text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                Ongoing Program
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-black mb-6">
                Small Group Coaching
              </h2>
              <p className="text-black/60 leading-relaxed mb-6">
                Small coaching groups of maximum 10 people. Business coaching focused on strategy, growth, and leadership. Life coaching centered on clarity, purpose, and high performance.
              </p>
              <p className="text-black/60 leading-relaxed mb-8">
                Led personally by Alketa Vejsiu with structured curriculum and peer accountability.
              </p>
              <DownloadProgram />
            </div>
          </div>
        </div>
      </section>

      {/* Register interest form */}
      <section id="conference-register" className="bg-brand-black py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-white mb-3">Reserve Your Spot</h2>
          <p className="text-white/50 mb-10">Early bird pricing available. We&apos;ll confirm your registration by email.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 border border-white/20 rounded-full px-5 py-3.5 text-brand-white placeholder:text-white/40 text-sm focus:outline-none focus:border-brand-gold transition-colors"
            />
            <button className="bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors whitespace-nowrap">
              Register Interest
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
