import Link from 'next/link'
import { FileText, Megaphone, Calendar, Users, Film, Mail } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'

async function count(table: string, filter?: { col: string; val: string }) {
  const supabase = createAdminClient()
  let q = supabase.from(table).select('id', { count: 'exact', head: true })
  if (filter) q = q.eq(filter.col, filter.val)
  const { count } = await q
  return count ?? 0
}

export default async function AdminOverviewPage() {
  const [pendingDinner, pendingApps, leads, regs, members, content, subs] = await Promise.all([
    count('dinner_applications', { col: 'status', val: 'pending' }),
    count('applications', { col: 'status', val: 'pending' }),
    count('sponsorship_leads'),
    count('event_registrations'),
    count('memberships', { col: 'status', val: 'active' }),
    count('content_items'),
    count('subscribers'),
  ])

  const cards = [
    { label: 'Aplikime në pritje', value: pendingDinner + pendingApps, icon: FileText, href: '/admin/applications' },
    { label: 'Sponsorship leads', value: leads, icon: Megaphone, href: '/admin/leads' },
    { label: 'Regjistrime eventesh', value: regs, icon: Calendar, href: '/admin/registrations' },
    { label: 'Anëtarë aktivë', value: members, icon: Users, href: '/admin/members' },
    { label: 'Njësi përmbajtjeje', value: content, icon: Film, href: '/admin/content' },
    { label: 'Abonentë newsletter', value: subs, icon: Mail, href: '/admin/subscribers' },
  ]

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Admin Overview</h1>
        <p className="text-black/50">Menaxho aplikimet, përmbajtjen dhe anëtarët.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-brand-white rounded-2xl border border-black/8 p-6 hover:border-brand-gold/30 transition-colors"
          >
            <Icon size={18} className="text-brand-gold mb-4" strokeWidth={1.5} />
            <p className="font-serif text-3xl font-bold text-brand-black mb-1">{value}</p>
            <p className="text-xs text-black/40 uppercase tracking-widest">{label}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
