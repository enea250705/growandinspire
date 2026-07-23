import { createAdminClient } from '@/lib/supabase/admin'
import { ApplicationsClient, type AdminApplication } from './ApplicationsClient'

function j(v: unknown): string | null {
  if (Array.isArray(v)) return v.length ? v.join(', ') : null
  return (v as string) ?? null
}

export default async function AdminApplicationsPage() {
  const supabase = createAdminClient()

  const [dinner, apps, podcast, ideas, coaching] = await Promise.all([
    supabase.from('dinner_applications').select('*').order('created_at', { ascending: false }),
    supabase.from('applications').select('*').order('created_at', { ascending: false }),
    supabase.from('podcast_applications').select('*').order('created_at', { ascending: false }),
    supabase.from('idea_tables_applications').select('*').order('created_at', { ascending: false }),
    supabase.from('coaching_applications').select('*').order('created_at', { ascending: false }),
  ])

  const items: AdminApplication[] = []

  for (const d of dinner.data ?? []) {
    items.push({
      id: d.id,
      source: 'dinner',
      kind: 'Dinner with Alketa',
      name: d.name || [d.first_name, d.last_name].filter(Boolean).join(' '),
      email: d.email,
      status: d.status,
      created_at: d.created_at,
      details: {
        Telefon: d.phone,
        Kompania: d.company,
        Website: d.website,
        Industria: d.industry,
        Pozicioni: d.position,
        'Viti i themelimit': d.founding_year,
        'Numri i punonjësve': d.employee_count,
        'Xhiro vjetore': d.annual_revenue,
        Biznesi: d.business_description,
        Sfidat: j(d.challenges),
        'Pse dëshiron': d.why_join,
        'Pyetje për Alketën': d.question_for_alketa,
        'Çfarë sjell': d.what_you_bring,
        Networking: j(d.networking_types),
        Pritshmëritë: d.expectations,
        LinkedIn: d.linkedin,
        Instagram: d.instagram,
      },
    })
  }

  for (const a of apps.data ?? []) {
    items.push({
      id: a.id,
      source: 'application',
      kind: a.type === 'job' ? 'Work with Class' : a.type === 'guest' ? 'Become a Guest' : 'Idea / Investment',
      name: a.name,
      email: a.email,
      status: a.status,
      created_at: a.created_at,
      details: (a.payload ?? {}) as Record<string, string | null>,
    })
  }

  for (const p of podcast.data ?? []) {
    items.push({
      id: p.id,
      source: 'podcast',
      kind: 'Podcast Guest',
      name: [p.first_name, p.last_name].filter(Boolean).join(' '),
      email: p.email,
      status: p.status,
      created_at: p.created_at,
      details: {
        Telefon: p.phone,
        LinkedIn: p.linkedin,
        Instagram: p.instagram,
        Website: p.website,
        Pozicioni: p.position,
        Kompania: p.company,
        Industria: p.industry,
        'Numri i punonjësve': p.employee_count,
        'Vitet në biznes': p.years_in_business,
        'Pse historia': p.why_story,
        Temat: j(p.topics),
        '3 mësimet': p.three_lessons,
        'Media më parë': p.prior_media,
        Link: p.media_link,
      },
    })
  }

  for (const i of ideas.data ?? []) {
    items.push({
      id: i.id,
      source: 'idea',
      kind: 'Idea Tables',
      name: [i.first_name, i.last_name].filter(Boolean).join(' '),
      email: i.email,
      status: i.status,
      created_at: i.created_at,
      details: {
        Mosha: i.age,
        Qyteti: i.city,
        Telefon: i.phone,
        'Emri i idesë': i.idea_name,
        Industritë: j(i.industries),
        Përshkrimi: i.description,
        Problemi: i.problem_solved,
        'Për kë': i.target_audience,
        Faza: i.stage,
        'Pse prezanton': i.why_present,
        Feedback: j(i.feedback_wanted),
        LinkedIn: i.linkedin,
        Instagram: i.instagram,
        Website: i.website,
        pitch_deck_path: i.pitch_deck_path,
      },
    })
  }

  for (const c of coaching.data ?? []) {
    items.push({
      id: c.id,
      source: 'coaching',
      kind: 'Coaching',
      name: [c.first_name, c.last_name].filter(Boolean).join(' '),
      email: c.email,
      status: c.status,
      created_at: c.created_at,
      details: {
        Telefon: c.phone,
        Qyteti: c.city,
        Pozicioni: c.position,
        Kompania: c.company,
        Industria: c.industry,
        Eksperienca: c.experience,
        'Çfarë përmirëson': j(c.improve_areas),
        Sfida: c.biggest_challenge,
        'Pas 6 muajsh': c.six_month_goal,
        'Lloji': c.coaching_type,
        Disponueshmëria: j(c.availability),
      },
    })
  }

  items.sort((x, y) => new Date(y.created_at).getTime() - new Date(x.created_at).getTime())

  return (
    <>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Applications</h1>
          <p className="text-black/50">Shqyrto dhe aprovo aplikimet. Çdo aplikim rishikohet manualisht.</p>
        </div>
        <a
          href="/admin/applications/export"
          className="shrink-0 inline-flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
        >
          Shkarko për Excel (CSV)
        </a>
      </div>
      <ApplicationsClient items={items} />
    </>
  )
}
