// The extra dinner-application answers are stored packed into the single
// `business_description` field as "Label: value" blocks (see submitDinnerApplication).
// These helpers split them back into individual columns for the admin views.

export const DINNER_EXTRA_FIELDS: { key: string; header: string; label: string }[] = [
  { key: 'age', header: 'Mosha', label: 'Mosha' },
  { key: 'city', header: 'Qyteti', label: 'Qyteti' },
  { key: 'biggest_challenge', header: 'Sfida më e madhe', label: 'Sfida më e madhe' },
  { key: 'discussion_topic', header: 'Tema për diskutim', label: 'Tema për diskutim' },
  { key: 'financial_goal_5y', header: 'Objektivi financiar (5 vjet)', label: 'Objektivi financiar (5 vjet)' },
  { key: 'valuable_idea', header: 'Ideja/përvoja më e vlefshme', label: 'Ideja/përvoja më e vlefshme' },
  { key: 'better_world', header: 'Për një botë më të mirë', label: 'Për një botë më të mirë' },
  { key: 'objective_12m', header: 'Objektivi (12 muaj)', label: 'Objektivi (12 muaj)' },
  { key: 'why_selected', header: 'Pse një nga 20', label: 'Pse një nga 20' },
  { key: 'specific_value', header: 'Vlera specifike për të tjerët', label: 'Vlera specifike për të tjerët' },
]

/** Split the packed business_description back into { key: value } per question. */
export function parseDinnerExtras(desc: string | null | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  if (!desc) return out

  // Locate each known "Label:" and slice its value up to the next known label,
  // so multi-line answers stay intact.
  const found = DINNER_EXTRA_FIELDS
    .map((f) => ({ f, idx: desc.indexOf(`${f.label}:`) }))
    .filter((x) => x.idx >= 0)
    .sort((a, b) => a.idx - b.idx)

  for (let i = 0; i < found.length; i++) {
    const start = found[i].idx + found[i].f.label.length + 1
    const end = i + 1 < found.length ? found[i + 1].idx : desc.length
    out[found[i].f.key] = desc.slice(start, end).trim()
  }
  return out
}
