import { createClient } from '@/lib/supabase/server'
import { SettingsClient } from './SettingsClient'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <SettingsClient
      initialName={user?.user_metadata?.full_name ?? ''}
      initialEmail={user?.email ?? ''}
      initialPhone={user?.user_metadata?.phone ?? ''}
      initialProfession={user?.user_metadata?.profession ?? ''}
    />
  )
}
