'use client'

import { useState } from 'react'
import { Mountain, Brain, TrendingUp, Heart, Users, Compass } from 'lucide-react'
import { Input, Textarea, Select } from '@/components/ui/FormField'

const THEMES = [
  { icon: TrendingUp, label: 'Lidership dhe Biznes', desc: 'Qartësi strategjike, vendimmarrje, founder energy.' },
  { icon: Brain, label: 'Clarity dhe Mindset', desc: 'Heq bllokimet, qartëso qëllimet, rikonstrukto perspektivën.' },
  { icon: Heart, label: 'Wellbeing dhe Energji', desc: 'Burnout prevention, balancë emocionale, qasje somatike.' },
  { icon: Users, label: 'Komunikim dhe Brand', desc: 'Personal brand, prezencë, komunikim autentik.' },
  { icon: Compass, label: 'Transition Moments', desc: 'Piketa kyçe jete e karriere - vendime të vetëdijshme.' },
  { icon: Mountain, label: 'Ekip dhe Organizatë', desc: 'Retreat korporativ për ekipe dhe drejtues.' },
]

const FORMATS = [
  { name: 'Retreat Njëditor', hours: '8–10 orë', spots: 'deri 20 vende', desc: 'Zhytje e thellë në një temë të vetme. Ideal për rikalibrim dhe qartësi.' },
  { name: 'Retreat Dyditor', hours: '2 ditë / 1 natë', spots: 'deri 15 vende', desc: 'Eksperiencë transformuese - reflektim, coaching, mindfulness dhe hapa konkretë.' },
  { name: 'Retreat Tematik', hours: 'Format i personalizuar', spots: 'deri 12 vende', desc: 'Fokus i posaçëm. Kuruar tërësisht sipas nevojave të grupit ose organizatës.' },
]

export function RetreatSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="bg-brand-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-20">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Eksperiencë Premium</p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-white mb-6">
            The Grow and Inspire Retreat
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Një hapësirë e dedikuar jashtë ritmit të përditshëm - ku ndalon, reflekton, qartëson qëllimet dhe punon mbi sfidat personale e profesionale. Zhvillimi trajtohet si proces <span className="text-brand-gold font-medium">360°</span>: mendësi, energji, komunikim, qartësi strategjike, balancë emocionale.
          </p>
        </div>

        {/* Formats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {FORMATS.map((f, i) => (
            <div
              key={f.name}
              className={`rounded-2xl p-6 border ${
                i === 1
                  ? 'bg-brand-gold/10 border-brand-gold/40'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${i === 1 ? 'text-brand-gold' : 'text-white/40'}`}>
                {f.hours} · {f.spots}
              </p>
              <h3 className="font-serif text-xl text-brand-white font-medium mb-2">{f.name}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Themes */}
        <div className="mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Tematika</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {THEMES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="group bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-brand-gold/30 hover:bg-white/8 transition-all">
                <Icon size={18} className="text-brand-gold mb-3" strokeWidth={1.5} />
                <p className="text-brand-white text-xs font-semibold mb-1">{label}</p>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-20">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Ekipi Udhëheqës</p>
          <div className="flex flex-wrap gap-3">
            {[
              'Business Coach',
              'Wellbeing and Somatic Coach',
              'Psikolog',
              'Facilitator Mindfulness',
              'Ekspert Komunikimi',
              'Mentor Biznesi',
            ].map((role) => (
              <span
                key={role}
                className="inline-flex items-center bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-medium px-3 py-1.5 rounded-full"
              >
                {role}
              </span>
            ))}
          </div>
          <p className="text-white/40 text-sm mt-4">
            Çdo retreat udhëhiqet nga 1–3 ekspertë të zgjedhur sipas temës, me ekip të kuruar nga Alketa Vejsiu.
          </p>
        </div>

        {/* Stats + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-6">Pse Retreat?</p>
            <div className="space-y-5">
              {[
                { q: 'Ndryshe nga konferenca', a: 'Më personal, më i përzgjedhur, më transformues. Nuk inspiron vetëm - ndryshon.' },
                { q: 'Qartësi dhe Hapa Konkretë', a: 'Del me vendime të vetëdijshme dhe një plan të qartë zhvillimi.' },
                { q: 'Bllokime dhe Breakthrough', a: 'Identifikon çfarë të ndalon dhe punon drejtpërdrejt mbi të.' },
                { q: 'Komunitet i Mbyllur', a: 'Lidhje autentike me individë me nivel, vizion dhe ambicie të ngjashme.' },
              ].map((item) => (
                <div key={item.q} className="flex gap-4">
                  <div className="flex-shrink-0 w-1 h-full min-h-[4px] bg-brand-gold rounded-full mt-1.5" />
                  <div>
                    <p className="text-brand-white text-sm font-semibold mb-0.5">{item.q}</p>
                    <p className="text-white/50 text-sm">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { num: '12–20', label: 'Vende / Retreat' },
                { num: '360°', label: 'Zhvillim Holistik' },
                { num: '100%', label: 'Eksperiencë Premium' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <p className="font-serif text-2xl text-brand-gold font-bold mb-1">{s.num}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-brand-dark rounded-3xl border border-white/10 p-8">
            <h3 className="font-serif text-2xl font-bold text-brand-white mb-2">Regjistrohu për Interest List</h3>
            <p className="text-white/40 text-sm mb-6">Vende të kufizuara. Njoftohesh i/e pari kur hapim regjistrimin.</p>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain size={20} className="text-brand-gold" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-xl text-brand-white font-medium mb-2">Faleminderit!</p>
                <p className="text-white/40 text-sm">Do të njoftohesh sapo hapim regjistrim për retreat-in tjetër.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input dark label="Emri dhe Mbiemri" required placeholder="Emri juaj i plotë" />
                <Input dark label="Email" type="email" required placeholder="email@juaj.com" />
                <Input dark label="Numri i Telefonit" type="tel" placeholder="+355 6X XXX XXXX" />
                <Select
                  dark
                  label="Formati që ju intereson"
                  required
                  options={[
                    { label: 'Retreat Njëditor', value: '1-day' },
                    { label: 'Retreat Dyditor', value: '2-day' },
                    { label: 'Retreat Tematik / Korporativ', value: 'thematic' },
                  ]}
                />
                <Select
                  dark
                  label="Tematika e preferuar"
                  options={[
                    { label: 'Lidership dhe Biznes', value: 'leadership' },
                    { label: 'Clarity dhe Mindset', value: 'clarity' },
                    { label: 'Wellbeing dhe Energji', value: 'wellbeing' },
                    { label: 'Komunikim dhe Personal Brand', value: 'brand' },
                    { label: 'Transition Moments', value: 'transition' },
                    { label: 'Retreat Korporativ', value: 'corporate' },
                  ]}
                />
                <Textarea
                  dark
                  label="Çfarë kërkoni nga ky retreat?"
                  placeholder="Ndani shkurtimisht ku ndodheni dhe çfarë dëshironi të arrini..."
                  rows={3}
                />
                <button
                  type="submit"
                  className="w-full bg-brand-gold text-brand-black py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
                >
                  Regjistrohu për Interest List
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
