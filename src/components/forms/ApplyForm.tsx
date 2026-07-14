'use client'

import { useState } from 'react'
import { Input, Textarea, CheckboxGroup, RadioGroup, Select } from '@/components/ui/FormField'
import { Check, Briefcase, Mic2, Lightbulb } from 'lucide-react'
import { submitApplication, submitPodcastApplication, submitIdeaTableApplication } from '@/lib/actions/forms'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/components/i18n/I18nProvider'
import type { Lang } from '@/lib/i18n'
import type { JobPosition } from '@/types'

type TabType = 'job' | 'guest' | 'investment'

/** Always offered, so a good CV is never lost just because nothing is posted. */
const SPONTANEOUS = 'Aplikim spontan'

const TAB_ICONS: Record<TabType, React.ElementType> = { job: Briefcase, guest: Mic2, investment: Lightbulb }

const CONTENT: Record<Lang, {
  tabs: Record<TabType, { label: string; desc: string }>
  podcastTopics: string[]
  ideaIndustries: string[]
  ideaFeedback: string[]
  ideaStages: { label: string; value: string }[]
  spontaneous: string
  spontaneousOpt: string
  cvFail: string
  deckFail: string
  error: string
  sentTitle: string
  sentDesc: string
  sendAnother: string
  fullName: string
  fullNamePh: string
  email: string
  role: string
  whichRole: string
  whichRolePh: string
  cover: string
  coverPh: string
  cv: string
  optional: string
  cvNote: string
  guestTitle: string
  personal: string
  professional: string
  podcastInfo: string
  audienceValue: string
  first: string
  last: string
  phone: string
  position: string
  company: string
  industry: string
  employees: string
  yearsInBiz: string
  whyStory: string
  topicsLabel: string
  threeLessons: string
  priorMedia: string
  link: string
  ideaTitle: string
  aboutYou: string
  aboutIdea: string
  social: string
  age: string
  city: string
  ideaName: string
  industriesLabel: string
  describe: string
  problem: string
  forWhom: string
  stageLabel: string
  whyPresent: string
  feedbackLabel: string
  deckLabel: string
  deckNote: string
  sending: string
  submit: string
}> = {
  en: {
    tabs: {
      job: { label: 'Work with Class', desc: 'Join the Class Media team' },
      guest: { label: 'Guest on Inspire Podcast', desc: 'Apply to be a podcast guest' },
      investment: { label: 'Idea Tables', desc: 'Pitch your idea to Alketa' },
    },
    podcastTopics: ['Entrepreneurship', 'Business Growth', 'Innovation', 'Women in Business', 'Personal Growth', 'Marketing', 'Finance', 'Other'],
    ideaIndustries: ['Tech', 'Fashion', 'Education', 'Media', 'AI', 'Food', 'Health', 'Beauty', 'Other'],
    ideaFeedback: ['Business', 'Marketing', 'Branding', 'Communication', 'Investors', 'Growth'],
    ideaStages: [
      { label: 'Idea', value: 'ide' },
      { label: 'MVP', value: 'mvp' },
      { label: 'Product', value: 'produkt' },
      { label: 'Active business', value: 'biznes-aktiv' },
    ],
    spontaneous: 'Spontaneous application',
    spontaneousOpt: 'Spontaneous application (other position)',
    cvFail: 'CV upload failed. Please try again or remove the file.',
    deckFail: 'Pitch deck upload failed. Please try again or remove the file.',
    error: 'Something went wrong. Please try again.',
    sentTitle: 'Thank you for applying.',
    sentDesc: 'Every application is reviewed personally by the Grow and Inspire team. If selected, you will receive an invitation with the next steps.',
    sendAnother: 'Send another',
    fullName: 'Full Name', fullNamePh: 'Your name',
    email: 'Email',
    role: 'Role you are applying for',
    whichRole: 'Which position interests you?', whichRolePh: 'Video editor, Social media manager...',
    cover: 'Cover message', coverPh: 'Tell us about yourself and why you want to work with Class...',
    cv: 'CV / Resume', optional: '(optional)', cvNote: 'PDF, DOC, or DOCX - Max 5MB',
    guestTitle: 'Apply to be a Guest on Inspire Podcast',
    personal: 'Personal Information',
    professional: 'Professional Information',
    podcastInfo: 'Podcast Information',
    audienceValue: 'Audience Value',
    first: 'First Name', last: 'Last Name', phone: 'Phone',
    position: 'Position', company: 'Company name', industry: 'Industry',
    employees: 'Number of employees', yearsInBiz: 'Years in business',
    whyStory: 'Why do you think your story should be part of Inspire Podcast?',
    topicsLabel: 'What is the main topic you would like to discuss / focus on most?',
    threeLessons: 'What are the 3 most important lessons the audience will take from you?',
    priorMedia: 'Have you been a guest on a podcast or media before?',
    link: 'Link',
    ideaTitle: 'Idea Tables',
    aboutYou: 'About You', aboutIdea: 'About Your Idea', social: 'Social',
    age: 'Age', city: 'City', ideaName: 'Idea / startup name',
    industriesLabel: 'Which industry does it belong to?',
    describe: 'Describe the idea.',
    problem: 'What problem does it solve?',
    forWhom: 'Who is it for?',
    stageLabel: 'What stage is it at?',
    whyPresent: 'Why do you want to present it to Alketa?',
    feedbackLabel: 'What feedback are you looking for?',
    deckLabel: 'Pitch Deck Upload', deckNote: 'PDF, PPT, PPTX, or KEY - Max 10MB',
    sending: 'Sending...', submit: 'Submit Application',
  },
  sq: {
    tabs: {
      job: { label: 'Work with Class', desc: 'Bashkohu me ekipin Class Media' },
      guest: { label: 'I ftuar në Inspire Podcast', desc: 'Apliko për të qenë i ftuar' },
      investment: { label: 'Idea Tables', desc: 'Prezanto idenë tënde te Alketa' },
    },
    podcastTopics: ['Sipërmarrje', 'Rritje Biznesi', 'Inovacion', 'Gra në Biznes', 'Zhvillim Personal', 'Marketing', 'Financa', 'Tjetër'],
    ideaIndustries: ['Tech', 'Modë', 'Edukim', 'Media', 'AI', 'Ushqim', 'Shëndet', 'Bukuri', 'Tjetër'],
    ideaFeedback: ['Biznes', 'Marketing', 'Branding', 'Komunikim', 'Investitorë', 'Rritje'],
    ideaStages: [
      { label: 'Ide', value: 'ide' },
      { label: 'MVP', value: 'mvp' },
      { label: 'Produkt', value: 'produkt' },
      { label: 'Biznes aktiv', value: 'biznes-aktiv' },
    ],
    spontaneous: 'Aplikim spontan',
    spontaneousOpt: 'Aplikim spontan (pozicion tjetër)',
    cvFail: 'Ngarkimi i CV-së dështoi. Provo sërish ose hiq skedarin.',
    deckFail: 'Ngarkimi i pitch deck dështoi. Provo sërish ose hiq skedarin.',
    error: 'Ka ndodhur një problem. Ju lutem provoni sërish.',
    sentTitle: 'Faleminderit për aplikimin.',
    sentDesc: 'Çdo aplikim shqyrtohet personalisht nga ekipi Grow and Inspire. Nëse përzgjidheni, do të merrni një ftesë me hapat e mëtejshëm.',
    sendAnother: 'Dërgo një tjetër',
    fullName: 'Emri i Plotë', fullNamePh: 'Emri yt',
    email: 'Email',
    role: 'Pozicioni për të cilin aplikon',
    whichRole: 'Cili pozicion të intereson?', whichRolePh: 'Video editor, Social media manager...',
    cover: 'Mesazhi shoqërues', coverPh: 'Na trego për veten dhe pse dëshiron të punosh me Class...',
    cv: 'CV / Resume', optional: '(opsionale)', cvNote: 'PDF, DOC, ose DOCX - Max 5MB',
    guestTitle: 'Apliko për të qenë i ftuar në Inspire Podcast',
    personal: 'Informacion Personal',
    professional: 'Informacion Profesional',
    podcastInfo: 'Informacion Podcast',
    audienceValue: 'Vlera për Audiencën',
    first: 'Emër', last: 'Mbiemër', phone: 'Telefon',
    position: 'Pozicioni', company: 'Emri i kompanisë', industry: 'Industria',
    employees: 'Numri i punonjësve', yearsInBiz: 'Vitet në biznes',
    whyStory: 'Përse mendoni se historia juaj duhet të jetë pjesë e Inspire Podcast?',
    topicsLabel: 'Cila është tema kryesore që do të donit të diskutonit / fokusoheshit më shumë?',
    threeLessons: 'Cilat janë 3 mësimet më të rëndësishme që audienca do të marrë nga ju?',
    priorMedia: 'A keni qenë më parë i/e ftuar në podcast ose media?',
    link: 'Link',
    ideaTitle: 'Idea Tables',
    aboutYou: 'Rreth Teje', aboutIdea: 'Rreth Idesë Tënde', social: 'Social',
    age: 'Mosha', city: 'Qyteti', ideaName: 'Emri i idesë / startupit',
    industriesLabel: 'Në cilën industri bën pjesë?',
    describe: 'Përshkruani idenë.',
    problem: 'Çfarë problemi zgjidh?',
    forWhom: 'Për kë është?',
    stageLabel: 'Në çfarë faze ndodhet?',
    whyPresent: 'Pse dëshironi ta prezantoni para Alketës?',
    feedbackLabel: 'Çfarë feedback kërkoni?',
    deckLabel: 'Pitch Deck Upload', deckNote: 'PDF, PPT, PPTX, ose KEY - Max 10MB',
    sending: 'Duke dërguar...', submit: 'Dërgo Aplikimin',
  },
}

type SubmittedState = Partial<Record<TabType, boolean>>

export function ApplyForm({
  positions = [],
  initialTab = 'job',
  initialRole = '',
}: {
  positions?: JobPosition[]
  initialTab?: TabType
  initialRole?: string
}) {
  const { lang } = useI18n()
  const c = CONTENT[lang]
  const [active, setActive] = useState<TabType>(initialTab)
  const [submitted, setSubmitted] = useState<SubmittedState>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const openTitles = positions.map((p) => p.title)
  const preselected = openTitles.includes(initialRole) ? initialRole : ''
  const [job, setJob] = useState({
    name: '',
    email: '',
    role: preselected || (openTitles.length ? '' : SPONTANEOUS),
    roleOther: preselected ? '' : initialRole,
    message: '',
  })
  const [cvFile, setCvFile] = useState<File | null>(null)

  const [guest, setGuest] = useState({
    firstName: '', lastName: '', email: '', phone: '', linkedin: '', instagram: '', website: '',
    position: '', company: '', industry: '', employeeCount: '', yearsInBusiness: '',
    whyStory: '', threeLessons: '', priorMedia: '', mediaLink: '',
  })
  const [guestTopics, setGuestTopics] = useState<string[]>([])

  const [idea, setIdea] = useState({
    firstName: '', lastName: '', age: '', city: '', email: '', phone: '',
    ideaName: '', description: '', problemSolved: '', targetAudience: '', stage: '', whyPresent: '',
    linkedin: '', instagram: '', website: '',
  })
  const [ideaIndustries, setIdeaIndustries] = useState<string[]>([])
  const [ideaFeedback, setIdeaFeedback] = useState<string[]>([])
  const [deckFile, setDeckFile] = useState<File | null>(null)

  async function submit() {
    setLoading(true)
    setError('')

    let result
    if (active === 'job') {
      let cvPath = ''
      if (cvFile) {
        const supabase = createClient()
        const ext = cvFile.name.split('.').pop() ?? 'pdf'
        const path = `${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await supabase.storage.from('cvs').upload(path, cvFile)
        if (upErr) {
          setLoading(false)
          setError(c.cvFail)
          return
        }
        cvPath = path
      }
      result = await submitApplication({
        type: 'job',
        name: job.name,
        email: job.email,
        payload: {
          role: job.role === SPONTANEOUS ? `${SPONTANEOUS}: ${job.roleOther}` : job.role,
          message: job.message,
          cv_path: cvPath,
        },
      })
    } else if (active === 'guest') {
      result = await submitPodcastApplication({
        first_name: guest.firstName,
        last_name: guest.lastName,
        email: guest.email,
        phone: guest.phone,
        linkedin: guest.linkedin,
        instagram: guest.instagram,
        website: guest.website,
        position: guest.position,
        company: guest.company,
        industry: guest.industry,
        employee_count: guest.employeeCount,
        years_in_business: guest.yearsInBusiness,
        why_story: guest.whyStory,
        topics: guestTopics,
        three_lessons: guest.threeLessons,
        prior_media: guest.priorMedia,
        media_link: guest.mediaLink,
      })
    } else {
      let deckPath = ''
      if (deckFile) {
        const supabase = createClient()
        const ext = deckFile.name.split('.').pop() ?? 'pdf'
        const path = `${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await supabase.storage.from('pitch-decks').upload(path, deckFile)
        if (upErr) {
          setLoading(false)
          setError(c.deckFail)
          return
        }
        deckPath = path
      }
      result = await submitIdeaTableApplication({
        first_name: idea.firstName,
        last_name: idea.lastName,
        age: idea.age,
        city: idea.city,
        email: idea.email,
        phone: idea.phone,
        idea_name: idea.ideaName,
        industries: ideaIndustries,
        description: idea.description,
        problem_solved: idea.problemSolved,
        target_audience: idea.targetAudience,
        stage: idea.stage,
        why_present: idea.whyPresent,
        feedback_wanted: ideaFeedback,
        linkedin: idea.linkedin,
        instagram: idea.instagram,
        website: idea.website,
        pitch_deck_path: deckPath,
      })
    }

    setLoading(false)
    if (result.ok) setSubmitted((s) => ({ ...s, [active]: true }))
    else setError(c.error)
  }

  const isSubmitted = submitted[active]

  return (
    <div>
      {/* Tab selector */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {(['job', 'guest', 'investment'] as TabType[]).map((id) => {
          const Icon = TAB_ICONS[id]
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex-1 text-left p-5 rounded-2xl border transition-all ${
                active === id
                  ? 'bg-brand-black border-brand-black text-brand-white'
                  : 'bg-brand-white border-black/8 text-brand-black hover:border-black/20'
              }`}
            >
              <Icon size={18} className="text-brand-gold mb-2" strokeWidth={1.5} />
              <p className="font-semibold text-sm">{c.tabs[id].label}</p>
              <p className={`text-xs mt-0.5 ${active === id ? 'text-white/50' : 'text-black/40'}`}>{c.tabs[id].desc}</p>
            </button>
          )
        })}
      </div>

      <div className="bg-brand-white rounded-2xl border border-black/8 p-8">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-brand-gold" strokeWidth={2} />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-black mb-2">{c.sentTitle}</h3>
            <p className="text-black/50 text-sm max-w-md mx-auto">
              {c.sentDesc}
            </p>
            <button
              onClick={() => setSubmitted((s) => ({ ...s, [active]: false }))}
              className="mt-6 text-brand-gold text-sm font-medium hover:underline"
            >
              {c.sendAnother}
            </button>
          </div>
        ) : (
          <>
            {active === 'job' && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label={c.fullName} required value={job.name} onChange={(e) => setJob({ ...job, name: e.target.value })} placeholder={c.fullNamePh} />
                  <Input label={c.email} required type="email" value={job.email} onChange={(e) => setJob({ ...job, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <Select
                  label={c.role}
                  required
                  value={job.role}
                  onChange={(e) => setJob({ ...job, role: e.target.value })}
                  options={[
                    ...positions.map((p) => ({ label: p.title, value: p.title })),
                    { label: c.spontaneousOpt, value: SPONTANEOUS },
                  ]}
                />
                {job.role === SPONTANEOUS && (
                  <Input
                    label={c.whichRole}
                    required
                    value={job.roleOther}
                    onChange={(e) => setJob({ ...job, roleOther: e.target.value })}
                    placeholder={c.whichRolePh}
                  />
                )}
                <Textarea label={c.cover} required rows={5} value={job.message} onChange={(e) => setJob({ ...job, message: e.target.value })} placeholder={c.coverPh} />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-black">
                    {c.cv} <span className="text-black/30 text-xs font-normal">{c.optional}</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                    className="border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white focus:outline-none focus:border-brand-gold transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-gold/15 file:text-brand-gold-dark hover:file:bg-brand-gold/25 cursor-pointer"
                  />
                  <p className="text-xs text-black/35">{c.cvNote}</p>
                </div>
              </div>
            )}

            {active === 'guest' && (
              <div className="flex flex-col gap-10">
                <p className="font-serif text-lg text-brand-black -mb-4">{c.guestTitle}</p>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.personal}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label={c.first} required value={guest.firstName} onChange={(e) => setGuest({ ...guest, firstName: e.target.value })} />
                    <Input label={c.last} required value={guest.lastName} onChange={(e) => setGuest({ ...guest, lastName: e.target.value })} />
                    <Input label={c.email} required type="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} />
                    <Input label={c.phone} type="tel" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} />
                    <Input label="LinkedIn" value={guest.linkedin} onChange={(e) => setGuest({ ...guest, linkedin: e.target.value })} placeholder="https://..." />
                    <Input label="Instagram" value={guest.instagram} onChange={(e) => setGuest({ ...guest, instagram: e.target.value })} placeholder="@..." />
                    <Input label="Website" value={guest.website} onChange={(e) => setGuest({ ...guest, website: e.target.value })} placeholder="https://..." />
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.professional}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label={c.position} value={guest.position} onChange={(e) => setGuest({ ...guest, position: e.target.value })} />
                    <Input label={c.company} value={guest.company} onChange={(e) => setGuest({ ...guest, company: e.target.value })} />
                    <Input label={c.industry} value={guest.industry} onChange={(e) => setGuest({ ...guest, industry: e.target.value })} />
                    <Input label={c.employees} value={guest.employeeCount} onChange={(e) => setGuest({ ...guest, employeeCount: e.target.value })} />
                    <Input label={c.yearsInBiz} value={guest.yearsInBusiness} onChange={(e) => setGuest({ ...guest, yearsInBusiness: e.target.value })} />
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.podcastInfo}</legend>
                  <Textarea label={c.whyStory} required rows={4} value={guest.whyStory} onChange={(e) => setGuest({ ...guest, whyStory: e.target.value })} />
                  <CheckboxGroup label={c.topicsLabel} options={c.podcastTopics} value={guestTopics} onChange={setGuestTopics} />
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.audienceValue}</legend>
                  <Textarea label={c.threeLessons} required rows={4} value={guest.threeLessons} onChange={(e) => setGuest({ ...guest, threeLessons: e.target.value })} />
                  <Textarea label={c.priorMedia} rows={2} value={guest.priorMedia} onChange={(e) => setGuest({ ...guest, priorMedia: e.target.value })} />
                  <Input label={c.link} value={guest.mediaLink} onChange={(e) => setGuest({ ...guest, mediaLink: e.target.value })} placeholder="https://..." />
                </fieldset>
              </div>
            )}

            {active === 'investment' && (
              <div className="flex flex-col gap-10">
                <p className="font-serif text-lg text-brand-black -mb-4">{c.ideaTitle}</p>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.aboutYou}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label={c.first} required value={idea.firstName} onChange={(e) => setIdea({ ...idea, firstName: e.target.value })} />
                    <Input label={c.last} required value={idea.lastName} onChange={(e) => setIdea({ ...idea, lastName: e.target.value })} />
                    <Input label={c.age} value={idea.age} onChange={(e) => setIdea({ ...idea, age: e.target.value })} />
                    <Input label={c.city} value={idea.city} onChange={(e) => setIdea({ ...idea, city: e.target.value })} />
                    <Input label={c.email} required type="email" value={idea.email} onChange={(e) => setIdea({ ...idea, email: e.target.value })} />
                    <Input label={c.phone} type="tel" value={idea.phone} onChange={(e) => setIdea({ ...idea, phone: e.target.value })} />
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.aboutIdea}</legend>
                  <Input label={c.ideaName} value={idea.ideaName} onChange={(e) => setIdea({ ...idea, ideaName: e.target.value })} />
                  <CheckboxGroup label={c.industriesLabel} columns={3} options={c.ideaIndustries} value={ideaIndustries} onChange={setIdeaIndustries} />
                  <Textarea label={c.describe} required rows={4} value={idea.description} onChange={(e) => setIdea({ ...idea, description: e.target.value })} />
                  <Textarea label={c.problem} rows={3} value={idea.problemSolved} onChange={(e) => setIdea({ ...idea, problemSolved: e.target.value })} />
                  <Textarea label={c.forWhom} rows={2} value={idea.targetAudience} onChange={(e) => setIdea({ ...idea, targetAudience: e.target.value })} />
                  <RadioGroup label={c.stageLabel} columns={4} options={c.ideaStages} value={idea.stage} onChange={(v) => setIdea({ ...idea, stage: v })} />
                  <Textarea label={c.whyPresent} rows={3} value={idea.whyPresent} onChange={(e) => setIdea({ ...idea, whyPresent: e.target.value })} />
                  <CheckboxGroup label={c.feedbackLabel} columns={3} options={c.ideaFeedback} value={ideaFeedback} onChange={setIdeaFeedback} />
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">{c.social}</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Input label="LinkedIn" value={idea.linkedin} onChange={(e) => setIdea({ ...idea, linkedin: e.target.value })} placeholder="https://..." />
                    <Input label="Instagram" value={idea.instagram} onChange={(e) => setIdea({ ...idea, instagram: e.target.value })} placeholder="@..." />
                    <Input label="Website" value={idea.website} onChange={(e) => setIdea({ ...idea, website: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-brand-black">
                      {c.deckLabel} <span className="text-black/30 text-xs font-normal">{c.optional}</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.ppt,.pptx,.key"
                      onChange={(e) => setDeckFile(e.target.files?.[0] ?? null)}
                      className="border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white focus:outline-none focus:border-brand-gold transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-gold/15 file:text-brand-gold-dark hover:file:bg-brand-gold/25 cursor-pointer"
                    />
                    <p className="text-xs text-black/35">{c.deckNote}</p>
                  </div>
                </fieldset>
              </div>
            )}

            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

            <div className="mt-8 pt-6 border-t border-black/6 flex justify-end">
              <button
                onClick={submit}
                disabled={loading}
                className="bg-brand-gold text-brand-black px-7 py-3 rounded-full text-sm font-semibold hover:bg-brand-gold-light transition-colors disabled:opacity-50"
              >
                {loading ? c.sending : c.submit}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
