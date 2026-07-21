'use client'

import { useState, useEffect } from 'react'
import { UtensilsCrossed, Calendar, Clock, MessageCircle, Users, Link2, Sparkles, Check } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/FormField'
import { submitDinnerApplication } from '@/lib/actions/forms'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'

const AWAITS_ICONS = [MessageCircle, Users, Link2, UtensilsCrossed, Sparkles]

const CONTENT: Record<Lang, {
  badge: string
  title: string
  lead: string
  intro: string[]
  dateLabel: string
  date: string
  timeLabel: string
  time: string
  priceText: string
  applyNow: string
  communityTitle: string
  community: string[]
  curatedTitle: string
  curated: string[]
  awaitsTitle: string
  awaits: { title: string; desc: string }[]
  forWhoTitle: string
  forWhoIntro: string
  forWho: string[]
  growingTitle: string
  growing: string[]
  seatTitle: string
  seat: string[]
  formTitle: string
  sentTitle: string
  sentDesc: string
  fields: {
    fullName: string; age: string; city: string; email: string; phone: string
    company: string; companyWebsite: string; profileLink: string; yearsInMarket: string
    industry: string; employees: string; revenueStage: string
    whyJoin: string; valueToCommunity: string; biggestChallenge: string; discussionTopic: string
    financialGoal5y: string; valuableIdea: string; betterWorld: string; objective12m: string
    whySelected: string; specificValue: string; questionForAlketa: string
  }
  submit: string
  submitting: string
  error: string
}> = {
  en: {
    badge: 'DINNER WITH ALKETA',
    title: 'More than a dinner',
    lead: 'A table where the people who invest in the future come together.',
    intro: [
      'Dinner with Alketa is a private experience that brings together entrepreneurs, company leaders and visionary professionals, in an evening dedicated to ideas, dialogue and meaningful connections.',
      'Every detail is designed to create an environment where conversations unfold naturally, perspectives expand and relationships are built on trust.',
    ],
    dateLabel: 'Date',
    date: '30 July 2026',
    timeLabel: 'Time',
    time: '20:00',
    priceText: 'The participation fee is 199€.',
    applyNow: 'Apply now',
    communityTitle: 'A CAREFULLY CREATED COMMUNITY',
    community: [
      'Dinner with Alketa is built on the belief that the greatest opportunities arise when the right people sit at the same table.',
      'Each event gathers a select group of participants from different fields, who share the same desire to learn, to collaborate and to create impact.',
      'At the heart of every evening are authentic conversations, the exchange of experiences and the building of relationships that continue well beyond the event.',
    ],
    curatedTitle: 'AN EXPERIENCE CURATED IN EVERY DETAIL',
    curated: [
      'From the moment of arrival to the end of the evening, every element is designed to create an experience that combines elegance with substance.',
      'The atmosphere, the gastronomy, the discussions and the introductions blend naturally to create a setting where people feel free to share ideas, challenge perspectives and form new connections.',
      'Nothing is by chance. Every detail has a purpose.',
    ],
    awaitsTitle: 'WHAT AWAITS YOU',
    awaits: [
      { title: 'Conversations that matter', desc: 'Discussions on the topics that shape how businesses are built, leaders grow and tomorrow’s opportunities are created.' },
      { title: 'Valuable connections', desc: 'A community of people with different experiences, perspectives and ambitions, united by the desire to create more.' },
      { title: 'Authentic relationships', desc: 'Introductions that arise naturally, in an environment where the quality of relationships matters more than the number of contacts.' },
      { title: 'A gastronomic experience', desc: 'A dinner curated down to the detail, where gastronomy becomes a full part of the experience.' },
      { title: 'Moments that inspire', desc: 'New ideas, real stories and conversations that continue even after the evening ends.' },
    ],
    forWhoTitle: 'WHO IS THIS EXPERIENCE FOR?',
    forWhoIntro: 'Dinner with Alketa is created for entrepreneurs, company founders, executives and professionals who:',
    forWho: [
      'seek to expand their network with valuable people;',
      'believe in the power of collaboration;',
      'want to share experiences and perspectives;',
      'are open to new ideas and opportunities;',
      'want to actively contribute to a quality community.',
    ],
    growingTitle: 'A COMMUNITY THAT KEEPS GROWING',
    growing: [
      'Each event is a new chapter of a community built on collaboration, respect and the desire to create value.',
      'Participants don’t leave only with new ideas. They leave with new people in their network, with new perspectives and with opportunities that can keep developing long after the evening ends.',
    ],
    seatTitle: 'YOUR SEAT AT THE TABLE',
    seat: [
      'To preserve the quality of the experience and the dynamics of the community, the number of participants is limited.',
      'Each event is built with care, bringing together people who can contribute, inspire and create value for one another.',
      'If you believe you can contribute to this community and would like to become part of it, we invite you to apply.',
    ],
    formTitle: 'Application Form',
    sentTitle: 'Application sent!',
    sentDesc: 'You will be contacted within 48 hours.',
    fields: {
      fullName: 'Full name of the entrepreneur / CEO',
      age: 'Age',
      city: 'City',
      email: 'Email',
      phone: 'Phone number',
      company: 'Company name',
      companyWebsite: 'Company website',
      profileLink: 'Your professional website or profile (LinkedIn / Instagram)',
      yearsInMarket: 'How many years has the company been on the market?',
      industry: 'What industry does the company operate in?',
      employees: 'How many employees does the company have?',
      revenueStage: "Annual revenue or the company's stage of development",
      whyJoin: 'Why do you want to take part in Dinner with Alketa?',
      valueToCommunity: 'What value can you bring to this community?',
      biggestChallenge: 'What is the biggest challenge your business is currently facing?',
      discussionTopic: 'What topic would you like to discuss with the other entrepreneurs?',
      financialGoal5y: 'What is your financial goal for the next five years?',
      valuableIdea: 'What is the most valuable idea or experience you would share at the table?',
      betterWorld: 'What would you like to do to make the world a better place?',
      objective12m: 'What is your main objective for the next 12 months?',
      whySelected: 'Why do you think you should be one of the 20 selected entrepreneurs?',
      specificValue: 'What specific value can you bring to the other entrepreneurs at this dinner?',
      questionForAlketa: 'What is the question you would like to ask Alketa?',
    },
    submit: 'Send Application',
    submitting: 'Sending...',
    error: 'Something went wrong. Please try again.',
  },
  sq: {
    badge: 'DINNER WITH ALKETA',
    title: 'Më shumë se një darkë',
    lead: 'Një tavolinë ku takohen njerëzit që investohen për të ardhmen.',
    intro: [
      'Dinner with Alketa është një eksperiencë private që bashkon sipërmarrës, drejtues kompanish dhe profesionistë me vizion, në një mbrëmje të dedikuar ideve, dialogut dhe lidhjeve me vlerë.',
      'Çdo detaj është menduar për të krijuar një ambient ku bisedat zhvillohen natyrshëm, perspektivat zgjerohen dhe marrëdhëniet ndërtohen mbi besim.',
    ],
    dateLabel: 'Data',
    date: '30 Korrik 2026',
    timeLabel: 'Ora',
    time: '20:00',
    priceText: 'Tarifa e pjesëmarrjes është 199€.',
    applyNow: 'Apliko tani',
    communityTitle: 'NJË KOMUNITET I KRIJUAR ME KUJDES',
    community: [
      'Dinner with Alketa është ndërtuar mbi bindjen se mundësitë më të mëdha lindin kur njerëzit e duhur ulen në të njëjtën tavolinë.',
      'Çdo event mbledh një grup të përzgjedhur pjesëmarrësish nga fusha të ndryshme, të cilët ndajnë të njëjtën dëshirë për të mësuar, për të bashkëpunuar dhe për të krijuar ndikim.',
      'Në qendër të çdo mbrëmjeje janë bisedat autentike, shkëmbimi i eksperiencave dhe krijimi i marrëdhënieve që vazhdojnë edhe përtej eventit.',
    ],
    curatedTitle: 'NJË EKSPERIENCË E KURUAR NË ÇDO DETAJ',
    curated: [
      'Nga momenti i mbërritjes deri në përfundimin e mbrëmjes, çdo element është menduar për të krijuar një eksperiencë që kombinon elegancën me përmbajtjen.',
      'Atmosfera, gastronomia, diskutimet dhe njohjet ndërthuren natyrshëm për të krijuar një mjedis ku njerëzit ndihen të lirë të ndajnë ide, të sfidojnë perspektiva dhe të krijojnë lidhje të reja.',
      'Asgjë nuk është rastësore. Çdo detaj ka një qëllim.',
    ],
    awaitsTitle: 'ÇFARË JU PRET',
    awaits: [
      { title: 'Biseda që kanë peshë', desc: 'Diskutime mbi temat që ndikojnë mënyrën se si ndërtohen bizneset, zhvillohen liderët dhe krijohen mundësitë e së nesërmes.' },
      { title: 'Njohje me vlerë', desc: 'Një komunitet njerëzish me eksperienca, perspektiva dhe ambicie të ndryshme, të bashkuar nga dëshira për të krijuar më shumë.' },
      { title: 'Lidhje autentike', desc: 'Njohje që lindin natyrshëm, në një ambient ku cilësia e marrëdhënieve ka më shumë rëndësi se numri i kontakteve.' },
      { title: 'Një eksperiencë gastronomike', desc: 'Një darkë e kuruar deri në detaj, ku gastronomia bëhet pjesë e plotë e eksperiencës.' },
      { title: 'Momente që frymëzojnë', desc: 'Ide të reja, histori reale dhe biseda që vazhdojnë edhe pasi mbrëmja përfundon.' },
    ],
    forWhoTitle: 'PËR KË ËSHTË KJO EKSPERIENCË?',
    forWhoIntro: 'Dinner with Alketa është krijuar për sipërmarrës, themelues kompanish, drejtues ekzekutivë dhe profesionistë që:',
    forWho: [
      'kërkojnë të zgjerojnë rrjetin e tyre me njerëz me vlerë;',
      'besojnë te fuqia e bashkëpunimit;',
      'dëshirojnë të ndajnë eksperienca dhe perspektiva;',
      'janë të hapur ndaj ideve dhe mundësive të reja;',
      'duan të kontribuojnë aktivisht në një komunitet cilësor.',
    ],
    growingTitle: 'NJË KOMUNITET QË VAZHDON TË RRITET',
    growing: [
      'Çdo event është një kapitull i ri i një komuniteti që ndërtohet mbi bashkëpunimin, respektin dhe dëshirën për të krijuar vlerë.',
      'Pjesëmarrësit nuk largohen vetëm me ide të reja. Ata largohen me njerëz të rinj në rrjetin e tyre, me perspektiva të reja dhe me mundësi që mund të vazhdojnë të zhvillohen shumë kohë pas përfundimit të mbrëmjes.',
    ],
    seatTitle: 'VENDI JUAJ NË TAVOLINË',
    seat: [
      'Për të ruajtur cilësinë e eksperiencës dhe dinamikën e komunitetit, numri i pjesëmarrësve është i kufizuar.',
      'Çdo event ndërtohet me kujdes, duke sjellë së bashku njerëz që mund të kontribuojnë, të frymëzojnë dhe të krijojnë vlerë për njëri-tjetrin.',
      'Nëse besoni se mund të kontribuoni në këtë komunitet dhe dëshironi të bëheni pjesë e tij, ju ftojmë të aplikoni.',
    ],
    formTitle: 'Formular Aplikimi',
    sentTitle: 'Aplikimi u dërgua!',
    sentDesc: 'Do të kontaktohesh brenda 48 orëve.',
    fields: {
      fullName: 'Emri dhe mbiemri i sipërmarrësit / CEO-s',
      age: 'Mosha',
      city: 'Qyteti',
      email: 'Email',
      phone: 'Numri i telefonit',
      company: 'Emri i kompanisë',
      companyWebsite: 'Website-i i kompanisë',
      profileLink: 'Website ose profili juaj profesional (LinkedIn / Instagram)',
      yearsInMarket: 'Sa vite ka kompania në treg?',
      industry: 'Në cilën industri operon kompania?',
      employees: 'Sa punonjës ka kompania?',
      revenueStage: 'Xhiroja vjetore ose faza e zhvillimit të biznesit',
      whyJoin: 'Pse dëshironi të merrni pjesë në Dinner with Alketa?',
      valueToCommunity: 'Çfarë vlere mund t’i sillni këtij komuniteti?',
      biggestChallenge: 'Cila është sfida më e madhe me të cilën po përballet aktualisht biznesi juaj?',
      discussionTopic: 'Për cilën temë do të dëshironit të diskutonit me sipërmarrësit e tjerë?',
      financialGoal5y: 'Cili është objektivi juaj financiar për pesë vitet e ardhshme?',
      valuableIdea: 'Cila është ideja ose përvoja më e vlefshme që do të ndani në tavolinë?',
      betterWorld: 'Çfarë do të dëshironit të bënit për ta bërë botën një vend më të mirë?',
      objective12m: 'Cili është objektivi juaj kryesor për 12 muajt e ardhshëm?',
      whySelected: 'Pse mendoni se duhet të jeni një nga 20 sipërmarrësit e përzgjedhur?',
      specificValue: 'Çfarë vlere specifike mund t’u sillni sipërmarrësve të tjerë në këtë darkë?',
      questionForAlketa: 'Cila është pyetja që do të dëshironit t’ia bënit Alketës?',
    },
    submit: 'Dërgo Aplikimin',
    submitting: 'Duke dërguar...',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
  },
}

function Block({ title, paras }: { title: string; paras: string[] }) {
  return (
    <div>
      <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-black mb-5">{title}</h3>
      <div className="text-black/65 text-lg leading-relaxed space-y-4">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  )
}

export function DinnerSection() {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [form, setForm] = useState({
    fullName: '', age: '', city: '', email: '', phone: '',
    company: '', companyWebsite: '', profileLink: '', yearsInMarket: '',
    industry: '', employees: '', revenueStage: '',
    whyJoin: '', valueToCommunity: '', biggestChallenge: '', discussionTopic: '',
    financialGoal5y: '', valuableIdea: '', betterWorld: '', objective12m: '',
    whySelected: '', specificValue: '', questionForAlketa: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function scrollToForm() {
    document.getElementById('dinner-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Kept so the popup's "Apply now" (if re-enabled) still jumps to the form.
  useEffect(() => {
    window.addEventListener('open-dinner-form', scrollToForm)
    return () => window.removeEventListener('open-dinner-form', scrollToForm)
  }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await submitDinnerApplication({
      first_name: form.fullName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      website: form.companyWebsite,
      linkedin: form.profileLink,
      founding_year: form.yearsInMarket,
      industry: form.industry,
      employee_count: form.employees,
      annual_revenue: form.revenueStage,
      why_join: form.whyJoin,
      what_you_bring: form.valueToCommunity,
      question_for_alketa: form.questionForAlketa,
      age: form.age,
      city: form.city,
      biggest_challenge: form.biggestChallenge,
      discussion_topic: form.discussionTopic,
      financial_goal_5y: form.financialGoal5y,
      valuable_idea: form.valuableIdea,
      better_world: form.betterWorld,
      objective_12m: form.objective12m,
      why_selected: form.whySelected,
      specific_value: form.specificValue,
    })
    setLoading(false)
    if (result.ok) setSubmitted(true)
    else setError(c.error)
  }

  return (
    <section id="dinner" className="bg-brand-cream py-20 lg:py-28 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden h-52 sm:h-64 lg:h-80 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dinner-table-3.jpg" alt="Dinner with Alketa" className="w-full h-full object-cover" />
        </div>

        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mt-12 lg:mt-16">
          <p className="text-brand-gold font-serif text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">{c.badge}</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brand-black mb-4">{c.title}</h2>
          <p className="text-brand-black text-lg lg:text-xl font-medium mb-6">{c.lead}</p>
          <div className="text-black/60 text-lg leading-relaxed space-y-4">
            {c.intro.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        {/* Date / time / price / apply */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 bg-brand-white border border-black/8 rounded-2xl px-5 py-4">
              <Calendar size={22} className="text-brand-gold" strokeWidth={1.5} />
              <div>
                <p className="text-black/40 text-xs uppercase tracking-wider">{c.dateLabel}</p>
                <p className="font-semibold text-brand-black">{c.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-brand-white border border-black/8 rounded-2xl px-5 py-4">
              <Clock size={22} className="text-brand-gold" strokeWidth={1.5} />
              <div>
                <p className="text-black/40 text-xs uppercase tracking-wider">{c.timeLabel}</p>
                <p className="font-semibold text-brand-black">{c.time}</p>
              </div>
            </div>
          </div>
          <p className="text-brand-black font-medium">{c.priceText}</p>
          <button
            type="button"
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 bg-brand-black text-brand-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
          >
            <UtensilsCrossed size={18} strokeWidth={1.5} /> {c.applyNow}
          </button>
        </div>

        {/* Content sections */}
        <div className="mt-16 lg:mt-24 max-w-3xl mx-auto space-y-14 lg:space-y-20">
          <Block title={c.communityTitle} paras={c.community} />
          <Block title={c.curatedTitle} paras={c.curated} />

          {/* What awaits */}
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-black mb-8">{c.awaitsTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {c.awaits.map((item, i) => {
                const Icon = AWAITS_ICONS[i]
                return (
                  <div key={item.title} className="bg-brand-white rounded-2xl border border-black/8 p-6">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4">
                      <Icon size={18} className="text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <p className="font-semibold text-brand-black mb-1.5">{item.title}</p>
                    <p className="text-black/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* For whom */}
          <div>
            <h3 className="font-serif text-2xl lg:text-3xl font-bold text-brand-black mb-5">{c.forWhoTitle}</h3>
            <p className="text-black/65 text-lg leading-relaxed mb-5">{c.forWhoIntro}</p>
            <ul className="space-y-3">
              {c.forWho.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center shrink-0">
                    <Check size={12} className="text-brand-gold" strokeWidth={2.5} />
                  </span>
                  <span className="text-black/70 text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Block title={c.growingTitle} paras={c.growing} />
          <Block title={c.seatTitle} paras={c.seat} />
        </div>

        {/* Form */}
        <div id="dinner-form" className="mt-16 max-w-2xl mx-auto scroll-mt-24 bg-brand-white rounded-3xl border border-black/8 p-8 shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-brand-black mb-6">{c.formTitle}</h3>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed size={20} className="text-brand-gold" strokeWidth={1.5} />
              </div>
              <p className="font-serif text-xl text-brand-black font-medium mb-2">{c.sentTitle}</p>
              <p className="text-black/50 text-sm">{c.sentDesc}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label={c.fields.fullName} required value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <Input label={c.fields.age} type="number" value={form.age} onChange={(e) => set('age', e.target.value)} />
                <Input label={c.fields.city} value={form.city} onChange={(e) => set('city', e.target.value)} />
              </div>
              <Input label={c.fields.email} type="email" required placeholder="email@juaj.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
              <Input label={c.fields.phone} type="tel" required placeholder="+355 6X XXX XXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
              <Input label={c.fields.company} required value={form.company} onChange={(e) => set('company', e.target.value)} />
              <Input label={c.fields.companyWebsite} value={form.companyWebsite} onChange={(e) => set('companyWebsite', e.target.value)} />
              <Input label={c.fields.profileLink} value={form.profileLink} onChange={(e) => set('profileLink', e.target.value)} />
              <Input label={c.fields.yearsInMarket} value={form.yearsInMarket} onChange={(e) => set('yearsInMarket', e.target.value)} />
              <Input label={c.fields.industry} value={form.industry} onChange={(e) => set('industry', e.target.value)} />
              <Input label={c.fields.employees} value={form.employees} onChange={(e) => set('employees', e.target.value)} />
              <Input label={c.fields.revenueStage} value={form.revenueStage} onChange={(e) => set('revenueStage', e.target.value)} />
              <Textarea label={c.fields.whyJoin} required rows={3} value={form.whyJoin} onChange={(e) => set('whyJoin', e.target.value)} />
              <Textarea label={c.fields.valueToCommunity} rows={3} value={form.valueToCommunity} onChange={(e) => set('valueToCommunity', e.target.value)} />
              <Textarea label={c.fields.biggestChallenge} required rows={3} value={form.biggestChallenge} onChange={(e) => set('biggestChallenge', e.target.value)} />
              <Textarea label={c.fields.discussionTopic} required rows={2} value={form.discussionTopic} onChange={(e) => set('discussionTopic', e.target.value)} />
              <Textarea label={c.fields.financialGoal5y} rows={2} value={form.financialGoal5y} onChange={(e) => set('financialGoal5y', e.target.value)} />
              <Textarea label={c.fields.valuableIdea} rows={3} value={form.valuableIdea} onChange={(e) => set('valuableIdea', e.target.value)} />
              <Textarea label={c.fields.betterWorld} rows={2} value={form.betterWorld} onChange={(e) => set('betterWorld', e.target.value)} />
              <Textarea label={c.fields.objective12m} rows={2} value={form.objective12m} onChange={(e) => set('objective12m', e.target.value)} />
              <Textarea label={c.fields.whySelected} rows={3} value={form.whySelected} onChange={(e) => set('whySelected', e.target.value)} />
              <Textarea label={c.fields.specificValue} rows={3} value={form.specificValue} onChange={(e) => set('specificValue', e.target.value)} />
              <Textarea label={c.fields.questionForAlketa} rows={2} value={form.questionForAlketa} onChange={(e) => set('questionForAlketa', e.target.value)} />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-black text-brand-white py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
              >
                {loading ? c.submitting : c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
