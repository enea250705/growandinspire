import { Users, Star, MessageCircle, Utensils, Network, Check } from 'lucide-react'
import { DinnerForm } from '@/components/forms/DinnerForm'

const PERKS = [
  { icon: Users, label: '8–12 people', desc: 'Intimate group, carefully curated' },
  { icon: Star, label: 'Invitation only', desc: 'Every seat is earned, not bought' },
  { icon: MessageCircle, label: 'Real conversation', desc: 'No pitches. No panels. Pure dialogue.' },
]

const WHO_CAN_APPLY = [
  'Founders & Co-Founders',
  'CEOs & Business Owners',
  'Executives & Leaders',
  'Investors',
]

const FEATURES = [
  { icon: Users, label: 'Curated Guests' },
  { icon: Utensils, label: 'Private Dinner' },
  { icon: MessageCircle, label: 'Meaningful Conversations' },
  { icon: Network, label: 'High-Impact Networking' },
]

export default function DinnerPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Header */}
      <section className="bg-brand-black py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Exclusive Experience
              </p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-6">
                Dinner with Alketa
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                An executive dinner exchange — 8 to 12 carefully selected leaders sharing one table, one evening, and conversations that matter.
              </p>
              <div className="flex flex-col gap-4">
                {PERKS.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full border border-brand-gold/30 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-brand-white text-sm font-semibold">{label}</p>
                      <p className="text-white/40 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:block">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-dark to-brand-black border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-brand-gold" strokeWidth={1} />
                  </div>
                  <p className="font-serif text-lg text-white/60">One table.</p>
                  <p className="font-serif text-lg text-brand-white font-bold">One evening.</p>
                  <p className="font-serif text-lg text-white/60">Unlimited impact.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who can apply + features */}
      <section className="bg-brand-cream py-16 lg:py-20 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Who can apply */}
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Who Can Apply</p>
              <ul className="flex flex-col gap-3">
                {WHO_CAN_APPLY.map((item) => (
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
              {FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="bg-brand-white rounded-2xl border border-black/8 p-6 text-center">
                  <div className="w-10 h-10 rounded-full border border-brand-gold/30 flex items-center justify-center mx-auto mb-3">
                    <Icon size={18} className="text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold text-brand-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Apply</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black mb-3">Request Your Seat</h2>
            <p className="text-black/50">Applications are reviewed personally. We will respond within 5–7 days.</p>
          </div>
          <DinnerForm />
        </div>
      </section>
    </div>
  )
}
