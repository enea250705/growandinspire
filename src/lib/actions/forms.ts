'use server'

import { createClient } from '@/lib/supabase/server'

type ActionResult = { ok: true } | { ok: false; error: string }

export async function submitDinnerApplication(data: {
  name: string
  email: string
  phone?: string
  profession?: string
  reason?: string
  social_link?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('dinner_applications').insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    profession: data.profession || null,
    reason: data.reason || null,
    social_link: data.social_link || null,
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

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

export async function submitEventRegistration(data: {
  name: string
  email: string
  phone?: string
  notes?: string
}): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('event_registrations').insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    event_id: null,
    status: 'pending',
  })
  if (error) return { ok: false, error: error.message }
  return { ok: true }
}

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

export async function submitNewsletterSignup(email: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { error } = await supabase.from('subscribers').insert({ email })
  if (error) {
    if (error.code === '23505') return { ok: false, error: 'already_subscribed' }
    return { ok: false, error: error.message }
  }
  return { ok: true }
}
