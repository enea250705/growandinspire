'use server'

import { createClient } from '@/lib/supabase/server'

type ActionResult = { ok: true } | { ok: false; error: string }

// ---- Dinner with Alketa (full field set) -----------------------------------
export async function submitDinnerApplication(data: {
  first_name: string
  last_name?: string
  email: string
  phone?: string
  company?: string
  website?: string
  industry?: string
  position?: string
  founding_year?: string
  employee_count?: string
  annual_revenue?: string
  business_description?: string
  challenges?: string[]
  why_join?: string
  question_for_alketa?: string
  what_you_bring?: string
  networking_types?: string[]
  expectations?: string
  linkedin?: string
  instagram?: string
  website_link?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ').trim()
  const { error } = await supabase.from('dinner_applications').insert({
    name,
    first_name: data.first_name,
    last_name: data.last_name || null,
    email: data.email,
    phone: data.phone || null,
    company: data.company || null,
    website: data.website || data.website_link || null,
    industry: data.industry || null,
    position: data.position || null,
    profession: data.position || null, // legacy column kept in sync
    founding_year: data.founding_year || null,
    employee_count: data.employee_count || null,
    annual_revenue: data.annual_revenue || null,
    business_description: data.business_description || null,
    challenges: data.challenges ?? [],
    why_join: data.why_join || null,
    reason: data.why_join || null, // legacy column kept in sync
    question_for_alketa: data.question_for_alketa || null,
    what_you_bring: data.what_you_bring || null,
    networking_types: data.networking_types ?? [],
    expectations: data.expectations || null,
    linkedin: data.linkedin || null,
    instagram: data.instagram || null,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Apply: Work with Class (job) - unchanged shape ------------------------
export async function submitApplication(data: {
  type: 'job' | 'guest' | 'investment'
  name: string
  email: string
  payload: Record<string, string>
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('applications').insert({
    type: data.type,
    name: data.name,
    email: data.email,
    payload: data.payload,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Podcast Guest Application ----------------------------------------------
export async function submitPodcastApplication(data: {
  first_name: string
  last_name?: string
  email: string
  phone?: string
  linkedin?: string
  instagram?: string
  website?: string
  position?: string
  company?: string
  industry?: string
  employee_count?: string
  years_in_business?: string
  why_story?: string
  topics?: string[]
  three_lessons?: string
  prior_media?: string
  media_link?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('podcast_applications').insert({
    first_name: data.first_name,
    last_name: data.last_name || null,
    email: data.email,
    phone: data.phone || null,
    linkedin: data.linkedin || null,
    instagram: data.instagram || null,
    website: data.website || null,
    position: data.position || null,
    company: data.company || null,
    industry: data.industry || null,
    employee_count: data.employee_count || null,
    years_in_business: data.years_in_business || null,
    why_story: data.why_story || null,
    topics: data.topics ?? [],
    three_lessons: data.three_lessons || null,
    prior_media: data.prior_media || null,
    media_link: data.media_link || null,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Idea Tables Application (pitch-deck path uploaded client-side) ---------
export async function submitIdeaTableApplication(data: {
  first_name: string
  last_name?: string
  age?: string
  city?: string
  email: string
  phone?: string
  idea_name?: string
  industries?: string[]
  description?: string
  problem_solved?: string
  target_audience?: string
  stage?: string
  why_present?: string
  feedback_wanted?: string[]
  linkedin?: string
  instagram?: string
  website?: string
  pitch_deck_path?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('idea_tables_applications').insert({
    first_name: data.first_name,
    last_name: data.last_name || null,
    age: data.age || null,
    city: data.city || null,
    email: data.email,
    phone: data.phone || null,
    idea_name: data.idea_name || null,
    industries: data.industries ?? [],
    description: data.description || null,
    problem_solved: data.problem_solved || null,
    target_audience: data.target_audience || null,
    stage: data.stage || null,
    why_present: data.why_present || null,
    feedback_wanted: data.feedback_wanted ?? [],
    linkedin: data.linkedin || null,
    instagram: data.instagram || null,
    website: data.website || null,
    pitch_deck_path: data.pitch_deck_path || null,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Coaching Application ---------------------------------------------------
export async function submitCoachingApplication(data: {
  first_name: string
  last_name?: string
  email: string
  phone?: string
  city?: string
  position?: string
  company?: string
  industry?: string
  experience?: string
  improve_areas?: string[]
  biggest_challenge?: string
  six_month_goal?: string
  coaching_type?: string
  availability?: string[]
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('coaching_applications').insert({
    first_name: data.first_name,
    last_name: data.last_name || null,
    email: data.email,
    phone: data.phone || null,
    city: data.city || null,
    position: data.position || null,
    company: data.company || null,
    industry: data.industry || null,
    experience: data.experience || null,
    improve_areas: data.improve_areas ?? [],
    biggest_challenge: data.biggest_challenge || null,
    six_month_goal: data.six_month_goal || null,
    coaching_type: data.coaching_type || null,
    availability: data.availability ?? [],
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Business Conference registration (full field set) ---------------------
export async function submitEventRegistration(data: {
  first_name: string
  last_name?: string
  email: string
  phone?: string
  company?: string
  position?: string
  industry?: string
  city?: string
  interests?: string[]
  networking_goals?: string
  participation?: string[]
  package?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const name = [data.first_name, data.last_name].filter(Boolean).join(' ').trim()
  const { error } = await supabase.from('event_registrations').insert({
    name,
    first_name: data.first_name,
    last_name: data.last_name || null,
    email: data.email,
    phone: data.phone || null,
    company: data.company || null,
    position: data.position || null,
    industry: data.industry || null,
    city: data.city || null,
    interests: data.interests ?? [],
    networking_goals: data.networking_goals || null,
    participation: data.participation ?? [],
    package: data.package || null,
    event_id: null,
    status: 'pending',
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Membership "Join the Circle" signup -----------------------------------
export async function submitMembershipSignup(data: {
  first_name: string
  last_name?: string
  email: string
  phone?: string
  profession?: string
  industry?: string
  interests?: string[]
  main_objective?: string[]
  how_heard?: string
  newsletter?: boolean
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('membership_signups').insert({
    first_name: data.first_name,
    last_name: data.last_name || null,
    email: data.email,
    phone: data.phone || null,
    profession: data.profession || null,
    industry: data.industry || null,
    interests: data.interests ?? [],
    main_objective: data.main_objective ?? [],
    how_heard: data.how_heard || null,
    newsletter: data.newsletter ?? false,
  })
  if (error) return { ok: false, error: error.message }
  // Best-effort: if they opted into the newsletter, also add to subscribers.
  if (data.newsletter) {
    await supabase.from('subscribers').insert({ email: data.email })
  }
  return { ok: true }
}

// ---- Sponsorship contact lead - unchanged ----------------------------------
export async function submitSponsorshipLead(data: {
  company_name: string
  contact_name: string
  email: string
  phone?: string
  interest_area?: string
  budget?: string
  message?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('sponsorship_leads').insert({
    company_name: data.company_name,
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone || null,
    interest_area: data.interest_area || null,
    budget: data.budget || null,
    message: data.message || null,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Coaching program lead magnet ("Shkarko Programin") --------------------
// Public lead capture on /coaching. Stores the email so the lead is never lost;
// admin reads them with the service role (no public SELECT on the table).
export async function submitCoachingProgramRequest(email: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('coaching_program_requests').insert({ email })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

// ---- Newsletter - unchanged ------------------------------------------------
export async function submitNewsletterSignup(email: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('subscribers').insert({ email })
  if (error) {
    if (error.code === '23505') return { ok: false, error: 'already_subscribed' }
    return { ok: false, error: error.message }
  }
  return { ok: true }
}
