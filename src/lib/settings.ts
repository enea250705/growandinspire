import { createAnonClient } from '@/lib/supabase/anon'

// Cookieless anon client - site_settings has public-read RLS, keeps pages ISR.
const supabase = createAnonClient()

// Editable display settings. Each has a default used when the row is absent.
export const SETTING_DEFS = [
  { key: 'conference_price_early', label: 'Konferenca - Early Bird (€)', default: '150' },
  { key: 'conference_price_standard', label: 'Konferenca - Standard (€)', default: '175' },
  { key: 'conference_dates', label: 'Konferenca - Datat', default: 'April 25-26, 2026' },
  { key: 'conference_location', label: 'Konferenca - Vendi', default: 'Tirana, Albania' },
  { key: 'coaching_group_size', label: 'Coaching - Madhësia e grupit', default: '10' },
  { key: 'retreat_price_note', label: 'Retreat - Shënim çmimi', default: 'Vende të kufizuara' },
] as const

export type SettingKey = (typeof SETTING_DEFS)[number]['key']

const DEFAULTS: Record<string, string> = Object.fromEntries(
  SETTING_DEFS.map((s) => [s.key, s.default])
)

export type SettingsMap = Record<SettingKey, string>

export async function getSettings(): Promise<SettingsMap> {
  const { data } = await supabase.from('site_settings').select('key, value')
  const map = { ...DEFAULTS }
  for (const row of data ?? []) {
    if (row.value != null) map[row.key] = row.value
  }
  return map as SettingsMap
}
