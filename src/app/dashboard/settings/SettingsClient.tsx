'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/FormField'
import { updateProfile, updatePassword, updateNotifications, type NotificationPrefs } from '@/lib/actions/auth'

interface Props {
  initialName: string
  initialEmail: string
  initialPhone: string
  initialProfession: string
  initialNotifications: NotificationPrefs
}

export function SettingsClient({ initialName, initialEmail, initialPhone, initialProfession, initialNotifications }: Props) {
  const [name, setName] = useState(initialName)
  const [phone, setPhone] = useState(initialPhone)
  const [profession, setProfession] = useState(initialProfession)
  const [profileSaved, setProfileSaved] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)

  const [notifications, setNotifications] = useState<NotificationPrefs>(initialNotifications)
  const [notifSaved, setNotifSaved] = useState(false)
  const [notifError, setNotifError] = useState('')
  const [notifLoading, setNotifLoading] = useState(false)

  async function handleNotifications() {
    setNotifLoading(true)
    setNotifError('')
    const result = await updateNotifications(notifications)
    setNotifLoading(false)
    if (result.ok) {
      setNotifSaved(true)
      setTimeout(() => setNotifSaved(false), 3000)
    } else {
      setNotifError(result.error)
    }
  }

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault()
    setProfileLoading(true)
    setProfileError('')
    const result = await updateProfile({ full_name: name, phone, profession })
    setProfileLoading(false)
    if (result.ok) {
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 3000)
    } else {
      setProfileError(result.error)
    }
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordLoading(true)
    setPasswordError('')
    const result = await updatePassword({ newPassword, confirmPassword })
    setPasswordLoading(false)
    if (result.ok) {
      setPasswordSaved(true)
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSaved(false), 3000)
    } else {
      setPasswordError(result.error)
    }
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-brand-black mb-1">Settings</h1>
        <p className="text-black/50">Menaxho profilin dhe preferencat tua.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
          <h2 className="font-semibold text-brand-black mb-5">Profili</h2>
          <form onSubmit={handleProfile} className="space-y-4 max-w-md">
            <Input label="Emri i plotë" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email" type="email" value={initialEmail} disabled className="opacity-50 cursor-not-allowed" />
            <Input label="Numri i telefonit" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Profesioni" value={profession} onChange={(e) => setProfession(e.target.value)} />
            {profileError && <p className="text-sm text-red-500">{profileError}</p>}
            <button
              type="submit"
              disabled={profileLoading}
              className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {profileSaved ? <><Check size={14} /> Ruajtur</> : profileLoading ? 'Duke ruajtur...' : 'Ruaj ndryshimet'}
            </button>
          </form>
        </div>

        {/* Password */}
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
          <h2 className="font-semibold text-brand-black mb-5">Ndrysho fjalëkalimin</h2>
          <form onSubmit={handlePassword} className="space-y-4 max-w-md">
            <Input label="Fjalëkalimi i ri" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Input label="Konfirmo fjalëkalimin e ri" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            <button
              type="submit"
              disabled={passwordLoading}
              className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {passwordSaved ? <><Check size={14} /> Ndryshuar</> : passwordLoading ? 'Duke ndryshuar...' : 'Ndrysho fjalëkalimin'}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
          <h2 className="font-semibold text-brand-black mb-5">Njoftimet</h2>
          <div className="max-w-md divide-y divide-black/6">
            {([
              { key: 'events', label: 'Evente dhe konfirmime', desc: 'Njoftohu për eventet e reja dhe statusin e aplikimeve.' },
              { key: 'content', label: 'Përmbajtje e re', desc: 'Kur shtohen video ose artikuj të rinj.' },
              { key: 'coaching', label: 'Coaching dhe sesione', desc: 'Kujtues për sesionet dhe materialet e reja.' },
              { key: 'newsletter', label: 'Newsletter javor', desc: 'Insights javore nga Alketa Vejsiu.' },
            ] as const).map(({ key, label, desc }) => (
              <label key={key} className="flex items-center justify-between gap-4 cursor-pointer py-3.5 first:pt-0">
                <div>
                  <p className="text-sm font-medium text-brand-black">{label}</p>
                  <p className="text-xs text-black/40 mt-0.5">{desc}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications[key]}
                  onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                  className={`relative shrink-0 h-6 w-11 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 ${
                    notifications[key] ? 'bg-brand-gold' : 'bg-black/15'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow-sm transition-transform ${
                      notifications[key] ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
          {notifError && <p className="text-sm text-red-500 mt-4">{notifError}</p>}
          <button
            type="button"
            onClick={handleNotifications}
            disabled={notifLoading}
            className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-50 mt-5"
          >
            {notifSaved ? <><Check size={14} /> Ruajtur</> : notifLoading ? 'Duke ruajtur...' : 'Ruaj preferencat'}
          </button>
        </div>

        {/* Danger zone */}
        <div className="bg-brand-white rounded-2xl border border-red-100 p-6">
          <h2 className="font-semibold text-red-500 mb-2">Zona e rrezikshme</h2>
          <p className="text-sm text-black/50 mb-4">Fshi llogarinë tënde përgjithmonë. Kjo veprim nuk mund të kthehet.</p>
          <button className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition-colors">
            Fshi llogarinë
          </button>
        </div>
      </div>
    </>
  )
}
