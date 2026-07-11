import type { JobPosition } from '@/types'
import { createAnonClient } from '@/lib/supabase/anon'

// Cookieless anon client, same reasoning as content.ts: job_positions has a
// public-read policy for open roles, so no session is needed and the careers
// page stays cacheable.
const supabase = createAnonClient()

const SELECT = 'id, title, department, location, employment_type, description, requirements, is_open, sort_order, created_at'

/** Open positions only. Closed ones are invisible to anon via RLS anyway. */
export async function getOpenPositions(): Promise<JobPosition[]> {
  const { data } = await supabase
    .from('job_positions')
    .select(SELECT)
    .eq('is_open', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
  return (data as JobPosition[]) ?? []
}
