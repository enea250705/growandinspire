import { getSettings, SETTING_DEFS } from '@/lib/settings'
import { SettingsClient } from './SettingsClient'

export default async function AdminSettingsPage() {
  const values = await getSettings()

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Site Settings</h1>
        <p className="text-black/50">Çmimet dhe datat që shfaqen në faqet publike.</p>
      </div>
      <SettingsClient defs={SETTING_DEFS.map((d) => ({ key: d.key, label: d.label }))} initial={values} />
    </>
  )
}
