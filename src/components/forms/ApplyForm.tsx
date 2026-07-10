'use client'

import { useState } from 'react'
import { Input, Textarea, CheckboxGroup, RadioGroup } from '@/components/ui/FormField'
import { Check, Briefcase, Mic2, Lightbulb } from 'lucide-react'
import { submitApplication, submitPodcastApplication, submitIdeaTableApplication } from '@/lib/actions/forms'
import { createClient } from '@/lib/supabase/client'

type TabType = 'job' | 'guest' | 'investment'

const TABS: { id: TabType; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'job', label: 'Work with Class', icon: Briefcase, desc: 'Join the Class Media team' },
  { id: 'guest', label: 'Guest on Inspire Podcast', icon: Mic2, desc: 'Apply to be a podcast guest' },
  { id: 'investment', label: 'Idea Tables', icon: Lightbulb, desc: 'Pitch your idea to Alketa' },
]

const PODCAST_TOPICS = ['Entrepreneurship', 'Business Growth', 'Innovation', 'Women in Business', 'Personal Growth', 'Marketing', 'Finance', 'Other']
const IDEA_INDUSTRIES = ['Tech', 'Fashion', 'Education', 'Media', 'AI', 'Food', 'Health', 'Beauty', 'Other']
const IDEA_FEEDBACK = ['Business', 'Marketing', 'Branding', 'Communication', 'Investors', 'Growth']
const IDEA_STAGES = [
  { label: 'Ide', value: 'ide' },
  { label: 'MVP', value: 'mvp' },
  { label: 'Produkt', value: 'produkt' },
  { label: 'Biznes aktiv', value: 'biznes-aktiv' },
]

type SubmittedState = Partial<Record<TabType, boolean>>

export function ApplyForm() {
  const [active, setActive] = useState<TabType>('job')
  const [submitted, setSubmitted] = useState<SubmittedState>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Job
  const [job, setJob] = useState({ name: '', email: '', role: '', message: '' })
  const [cvFile, setCvFile] = useState<File | null>(null)

  // Podcast guest
  const [guest, setGuest] = useState({
    firstName: '', lastName: '', email: '', phone: '', linkedin: '', instagram: '', website: '',
    position: '', company: '', industry: '', employeeCount: '', yearsInBusiness: '',
    whyStory: '', threeLessons: '', priorMedia: '', mediaLink: '',
  })
  const [guestTopics, setGuestTopics] = useState<string[]>([])

  // Idea Tables
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
          setError('Ngarkimi i CV-së dështoi. Provo sërish ose hiq skedarin.')
          return
        }
        cvPath = path
      }
      result = await submitApplication({
        type: 'job',
        name: job.name,
        email: job.email,
        payload: { role: job.role, message: job.message, cv_path: cvPath },
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
          setError('Ngarkimi i pitch deck dështoi. Provo sërish ose hiq skedarin.')
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
    else setError('Ka ndodhur një problem. Ju lutem provoni sërish.')
  }

  const isSubmitted = submitted[active]

  return (
    <div>
      {/* Tab selector */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        {TABS.map(({ id, label, icon: Icon, desc }) => (
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
            <p className="font-semibold text-sm">{label}</p>
            <p className={`text-xs mt-0.5 ${active === id ? 'text-white/50' : 'text-black/40'}`}>{desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-brand-white rounded-2xl border border-black/8 p-8">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4">
              <Check size={24} className="text-brand-gold" strokeWidth={2} />
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-black mb-2">Faleminderit për aplikimin.</h3>
            <p className="text-black/50 text-sm max-w-md mx-auto">
              Çdo aplikim shqyrtohet personalisht nga ekipi Grow and Inspire. Nëse përzgjidheni, do të merrni një ftesë me hapat e mëtejshëm.
            </p>
            <button
              onClick={() => setSubmitted((s) => ({ ...s, [active]: false }))}
              className="mt-6 text-brand-gold text-sm font-medium hover:underline"
            >
              Dërgo një tjetër
            </button>
          </div>
        ) : (
          <>
            {active === 'job' && (
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input label="Full Name" required value={job.name} onChange={(e) => setJob({ ...job, name: e.target.value })} placeholder="Your name" />
                  <Input label="Email" required type="email" value={job.email} onChange={(e) => setJob({ ...job, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <Input label="Role you are applying for" required value={job.role} onChange={(e) => setJob({ ...job, role: e.target.value })} placeholder="Video editor, Social media manager..." />
                <Textarea label="Cover message" required rows={5} value={job.message} onChange={(e) => setJob({ ...job, message: e.target.value })} placeholder="Tell us about yourself and why you want to work with Class..." />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-brand-black">
                    CV / Resume <span className="text-black/30 text-xs font-normal">(optional)</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                    className="border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white focus:outline-none focus:border-brand-gold transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-gold/15 file:text-brand-gold-dark hover:file:bg-brand-gold/25 cursor-pointer"
                  />
                  <p className="text-xs text-black/35">PDF, DOC, or DOCX - Max 5MB</p>
                </div>
              </div>
            )}

            {active === 'guest' && (
              <div className="flex flex-col gap-10">
                <p className="font-serif text-lg text-brand-black -mb-4">Apply to be a Guest on Inspire Podcast</p>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">Personal Information</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Emër" required value={guest.firstName} onChange={(e) => setGuest({ ...guest, firstName: e.target.value })} />
                    <Input label="Mbiemër" required value={guest.lastName} onChange={(e) => setGuest({ ...guest, lastName: e.target.value })} />
                    <Input label="Email" required type="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} />
                    <Input label="Telefon" type="tel" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} />
                    <Input label="LinkedIn" value={guest.linkedin} onChange={(e) => setGuest({ ...guest, linkedin: e.target.value })} placeholder="https://..." />
                    <Input label="Instagram" value={guest.instagram} onChange={(e) => setGuest({ ...guest, instagram: e.target.value })} placeholder="@..." />
                    <Input label="Website" value={guest.website} onChange={(e) => setGuest({ ...guest, website: e.target.value })} placeholder="https://..." />
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">Professional Information</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Pozicioni" value={guest.position} onChange={(e) => setGuest({ ...guest, position: e.target.value })} />
                    <Input label="Emri i kompanisë" value={guest.company} onChange={(e) => setGuest({ ...guest, company: e.target.value })} />
                    <Input label="Industria" value={guest.industry} onChange={(e) => setGuest({ ...guest, industry: e.target.value })} />
                    <Input label="Numri i punonjësve" value={guest.employeeCount} onChange={(e) => setGuest({ ...guest, employeeCount: e.target.value })} />
                    <Input label="Vitet në biznes" value={guest.yearsInBusiness} onChange={(e) => setGuest({ ...guest, yearsInBusiness: e.target.value })} />
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">Podcast Information</legend>
                  <Textarea label="Përse mendoni se historia juaj duhet të jetë pjesë e Inspire Podcast?" required rows={4} value={guest.whyStory} onChange={(e) => setGuest({ ...guest, whyStory: e.target.value })} />
                  <CheckboxGroup label="Cila është tema kryesore që do të donit të diskutonit / fokusoheshit më shumë?" options={PODCAST_TOPICS} value={guestTopics} onChange={setGuestTopics} />
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">Audience Value</legend>
                  <Textarea label="Cilat janë 3 mësimet më të rëndësishme që audienca do të marrë nga ju?" required rows={4} value={guest.threeLessons} onChange={(e) => setGuest({ ...guest, threeLessons: e.target.value })} />
                  <Textarea label="A keni qenë më parë i/e ftuar në podcast ose media?" rows={2} value={guest.priorMedia} onChange={(e) => setGuest({ ...guest, priorMedia: e.target.value })} />
                  <Input label="Link" value={guest.mediaLink} onChange={(e) => setGuest({ ...guest, mediaLink: e.target.value })} placeholder="https://..." />
                </fieldset>
              </div>
            )}

            {active === 'investment' && (
              <div className="flex flex-col gap-10">
                <p className="font-serif text-lg text-brand-black -mb-4">Idea Tables</p>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">About You</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Emër" required value={idea.firstName} onChange={(e) => setIdea({ ...idea, firstName: e.target.value })} />
                    <Input label="Mbiemër" required value={idea.lastName} onChange={(e) => setIdea({ ...idea, lastName: e.target.value })} />
                    <Input label="Mosha" value={idea.age} onChange={(e) => setIdea({ ...idea, age: e.target.value })} />
                    <Input label="Qyteti" value={idea.city} onChange={(e) => setIdea({ ...idea, city: e.target.value })} />
                    <Input label="Email" required type="email" value={idea.email} onChange={(e) => setIdea({ ...idea, email: e.target.value })} />
                    <Input label="Telefon" type="tel" value={idea.phone} onChange={(e) => setIdea({ ...idea, phone: e.target.value })} />
                  </div>
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">About Your Idea</legend>
                  <Input label="Emri i idesë / startupit" value={idea.ideaName} onChange={(e) => setIdea({ ...idea, ideaName: e.target.value })} />
                  <CheckboxGroup label="Në cilën industri bën pjesë?" columns={3} options={IDEA_INDUSTRIES} value={ideaIndustries} onChange={setIdeaIndustries} />
                  <Textarea label="Përshkruani idenë." required rows={4} value={idea.description} onChange={(e) => setIdea({ ...idea, description: e.target.value })} />
                  <Textarea label="Çfarë problemi zgjidh?" rows={3} value={idea.problemSolved} onChange={(e) => setIdea({ ...idea, problemSolved: e.target.value })} />
                  <Textarea label="Për kë është?" rows={2} value={idea.targetAudience} onChange={(e) => setIdea({ ...idea, targetAudience: e.target.value })} />
                  <RadioGroup label="Në çfarë faze ndodhet?" columns={4} options={IDEA_STAGES} value={idea.stage} onChange={(v) => setIdea({ ...idea, stage: v })} />
                  <Textarea label="Pse dëshironi ta prezantoni para Alketës?" rows={3} value={idea.whyPresent} onChange={(e) => setIdea({ ...idea, whyPresent: e.target.value })} />
                  <CheckboxGroup label="Çfarë feedback kërkoni?" columns={3} options={IDEA_FEEDBACK} value={ideaFeedback} onChange={setIdeaFeedback} />
                </fieldset>
                <fieldset className="flex flex-col gap-5">
                  <legend className="font-serif text-base font-bold text-brand-black mb-2">Social</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <Input label="LinkedIn" value={idea.linkedin} onChange={(e) => setIdea({ ...idea, linkedin: e.target.value })} placeholder="https://..." />
                    <Input label="Instagram" value={idea.instagram} onChange={(e) => setIdea({ ...idea, instagram: e.target.value })} placeholder="@..." />
                    <Input label="Website" value={idea.website} onChange={(e) => setIdea({ ...idea, website: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-brand-black">
                      Pitch Deck Upload <span className="text-black/30 text-xs font-normal">(optional)</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.ppt,.pptx,.key"
                      onChange={(e) => setDeckFile(e.target.files?.[0] ?? null)}
                      className="border border-black/15 rounded-lg px-4 py-2.5 text-sm bg-brand-white focus:outline-none focus:border-brand-gold transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-gold/15 file:text-brand-gold-dark hover:file:bg-brand-gold/25 cursor-pointer"
                    />
                    <p className="text-xs text-black/35">PDF, PPT, PPTX, or KEY - Max 10MB</p>
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
                {loading ? 'Duke dërguar...' : 'Submit Application'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
