'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/FormField'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    events: true,
    content: true,
    newsletter: false,
    coaching: true,
  })

  function handleProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3000)
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
            <Input label="Emri i plotë" defaultValue="Anisa Kola" required />
            <Input label="Email" type="email" defaultValue="anisa@example.com" required />
            <Input label="Numri i telefonit" type="tel" defaultValue="+355 69 123 4567" />
            <Input label="Profesioni" defaultValue="CEO, Kola Consulting" />
            <button
              type="submit"
              className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
            >
              {saved ? <><Check size={14} /> Ruajtur</> : 'Ruaj ndryshimet'}
            </button>
          </form>
        </div>

        {/* Password */}
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
          <h2 className="font-semibold text-brand-black mb-5">Ndrysho fjalëkalimin</h2>
          <form onSubmit={handlePassword} className="space-y-4 max-w-md">
            <Input label="Fjalëkalimi aktual" type="password" required />
            <Input label="Fjalëkalimi i ri" type="password" required />
            <Input label="Konfirmo fjalëkalimin e ri" type="password" required />
            <button
              type="submit"
              className="flex items-center gap-2 bg-brand-black text-brand-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-colors"
            >
              {passwordSaved ? <><Check size={14} /> Ndryshuar</> : 'Ndrysho fjalëkalimin'}
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-brand-white rounded-2xl border border-black/8 p-6">
          <h2 className="font-semibold text-brand-black mb-5">Njoftimet</h2>
          <div className="space-y-4 max-w-md">
            {([
              { key: 'events', label: 'Evente dhe konfirmacie', desc: 'Njoftohu për eventet e reja dhe statusin e aplikimeve.' },
              { key: 'content', label: 'Përmbajtje e re', desc: 'Kur shtohen video ose artikuj të rinj.' },
              { key: 'coaching', label: 'Coaching & sesione', desc: 'Kujtues për sesionte dhe materiale të reja.' },
              { key: 'newsletter', label: 'Newsletter javor', desc: 'Insights javore nga Alketa Vejsiu.' },
            ] as const).map(({ key, label, desc }) => (
              <label key={key} className="flex items-start justify-between gap-4 cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-brand-black">{label}</p>
                  <p className="text-xs text-black/40 mt-0.5">{desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                  className={`relative shrink-0 w-10 h-5.5 rounded-full transition-colors mt-0.5 ${
                    notifications[key] ? 'bg-brand-gold' : 'bg-black/15'
                  }`}
                  style={{ height: '22px', width: '40px' }}
                >
                  <span
                    className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
                      notifications[key] ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
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
