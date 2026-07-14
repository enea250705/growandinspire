import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  badge: string
  title: string
  intro1: string
  intro2: string
  stats: { value: string; label: string }[]
  storyBadge: string
  storyTitle: string
  story: string[]
  ecoBadge: string
  ecoTitle: string
  brands: { name: string; desc: string }[]
  ctaTitle: string
  ctaDesc: string
  join: string
  partner: string
}> = {
  en: {
    badge: 'About',
    title: 'Alketa Vejsiu and Class Media',
    intro1: "Alketa Vejsiu is Albania's most influential voice in business media - entrepreneur, podcast host, keynote speaker, and community builder. Founder of Class Media, the company behind Albania's leading business media ecosystem.",
    intro2: 'Grow and Inspire is her most personal project yet - a platform built to transfer the knowledge, connections, and experiences she has curated over a decade, directly to the next generation of Albanian leaders.',
    stats: [
      { value: '10+', label: 'Years in media and business' },
      { value: '50k+', label: 'Community members' },
      { value: '200+', label: 'Podcast episodes' },
      { value: '5', label: 'Business verticals' },
    ],
    storyBadge: 'The Story',
    storyTitle: 'Built from the ground up',
    story: [
      'Class Media was founded with a single conviction: Albania deserves world-class business content. What started as a magazine became a podcast, then an events business, then a full media ecosystem reaching hundreds of thousands of people.',
      'Grow and Inspire is the natural next step - a community where members do not just consume content, but build relationships, access exclusive experiences, and accelerate their own growth alongside like-minded leaders.',
      'Every product in the ecosystem - from the podcast to the conference to the dinner table - is designed with one purpose: to create real, lasting impact in the lives of Albanian professionals and entrepreneurs.',
    ],
    ecoBadge: 'The Ecosystem',
    ecoTitle: 'The Class Family',
    brands: [
      { name: 'Class Media', desc: "Albania's leading independent media house" },
      { name: 'Inspire Podcast', desc: 'Top business podcast in Albanian language' },
      { name: 'Revista Class', desc: 'Premium business and lifestyle magazine' },
      { name: 'Class Events', desc: 'Corporate event organization and decoration' },
      { name: 'Grow and Inspire', desc: 'Membership platform for growth' },
    ],
    ctaTitle: 'Ready to be part of it?',
    ctaDesc: 'Join thousands of Albanian professionals growing together.',
    join: 'Join the Circle',
    partner: 'Partner with Us',
  },
  sq: {
    badge: 'Rreth Nesh',
    title: 'Alketa Vejsiu dhe Class Media',
    intro1: 'Alketa Vejsiu është zëri më me ndikim në median e biznesit në Shqipëri - sipërmarrëse, prezantuese podcast-i, folëse dhe ndërtuese komuniteti. Themeluese e Class Media, kompania pas ekosistemit kryesor të medias së biznesit në Shqipëri.',
    intro2: 'Grow and Inspire është projekti i saj më personal deri tani - një platformë e ndërtuar për të transferuar dijen, lidhjet dhe eksperiencat e kuruara gjatë një dekade, direkt te brezi i ardhshëm i liderëve shqiptarë.',
    stats: [
      { value: '10+', label: 'Vite në media dhe biznes' },
      { value: '50k+', label: 'Anëtarë komuniteti' },
      { value: '200+', label: 'Episode podcast-i' },
      { value: '5', label: 'Vertikale biznesi' },
    ],
    storyBadge: 'Historia',
    storyTitle: 'E ndërtuar nga themelet',
    story: [
      'Class Media u themelua me një bindje të vetme: Shqipëria meriton përmbajtje biznesi të nivelit botëror. Ajo që nisi si një revistë u bë podcast, pastaj një biznes eventesh, pastaj një ekosistem i plotë medial që arrin qindra mijëra njerëz.',
      'Grow and Inspire është hapi i natyrshëm i radhës - një komunitet ku anëtarët jo vetëm konsumojnë përmbajtje, por ndërtojnë marrëdhënie, aksesojnë eksperienca ekskluzive dhe përshpejtojnë rritjen e tyre krah liderëve me të njëjtin mendim.',
      'Çdo produkt në ekosistem - nga podcast-i te konferenca e te tavolina e darkës - është dizajnuar me një qëllim: të krijojë impakt real e të qëndrueshëm në jetën e profesionistëve dhe sipërmarrësve shqiptarë.',
    ],
    ecoBadge: 'Ekosistemi',
    ecoTitle: 'Familja Class',
    brands: [
      { name: 'Class Media', desc: 'Shtëpia mediatike e pavarur kryesore në Shqipëri' },
      { name: 'Inspire Podcast', desc: 'Podcast-i kryesor i biznesit në gjuhën shqipe' },
      { name: 'Revista Class', desc: 'Revistë premium biznesi dhe lifestyle' },
      { name: 'Class Events', desc: 'Organizim dhe dekorim eventesh korporative' },
      { name: 'Grow and Inspire', desc: 'Platformë anëtarësimi për rritje' },
    ],
    ctaTitle: 'Gati për të qenë pjesë?',
    ctaDesc: 'Bashkohu me mijëra profesionistë shqiptarë që rriten së bashku.',
    join: 'Bashkohu',
    partner: 'Bëhu Partner',
  },
}

export default async function AboutPage() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      {/* Hero */}
      <section className="bg-brand-black py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">{c.badge}</p>
              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-brand-white mb-6 leading-tight">
                {c.title}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                {c.intro1}
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                {c.intro2}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {c.stats.map(({ value, label }) => (
                <div key={label} className="bg-brand-dark rounded-2xl border border-white/10 p-7 text-center">
                  <p className="font-serif text-4xl font-bold text-brand-gold mb-2">{value}</p>
                  <p className="text-white/50 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">{c.storyBadge}</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-black mb-8">
            {c.storyTitle}
          </h2>
          <div className="flex flex-col gap-6 text-black/70 leading-relaxed text-lg">
            {c.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* The Class ecosystem */}
      <section className="py-20 lg:py-28 border-b border-black/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">{c.ecoBadge}</p>
            <h2 className="font-serif text-4xl font-bold text-brand-black">{c.ecoTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.brands.map(({ name, desc }) => (
              <div key={name} className="bg-brand-white rounded-2xl border border-black/8 p-7 hover:shadow-md transition-shadow">
                <h3 className="font-serif text-xl font-bold text-brand-black mb-2">{name}</h3>
                <p className="text-black/50 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-black py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-white mb-4">{c.ctaTitle}</h2>
          <p className="text-white/50 mb-8">{c.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors"
            >
              {c.join} <ArrowRight size={14} />
            </Link>
            <Link
              href="/sponsorship"
              className="inline-flex items-center justify-center border border-white/20 text-brand-white px-7 py-3.5 rounded-full text-sm font-medium hover:border-white/50 transition-colors"
            >
              {c.partner}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
