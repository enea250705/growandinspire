import { getLang } from '@/lib/i18n-server'
import type { Lang } from '@/lib/i18n'

const CONTENT: Record<Lang, {
  legal: string
  title: string
  updated: string
  sections: { h: string; p: React.ReactNode }[]
}> = {
  en: {
    legal: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: June 2026',
    sections: [
      { h: '1. Information We Collect', p: 'We collect information you provide when you create an account, purchase a membership, submit applications (Dinner with Alketa, job/guest/investment), or contact us via our sponsorship form. This includes name, email address, phone number, and professional information.' },
      { h: '2. How We Use Your Information', p: 'We use your information to manage your membership, communicate about events and content, process payments through Stripe, and review your applications. We do not sell your personal data to third parties.' },
      { h: '3. Data Storage', p: 'Your data is stored securely using Supabase infrastructure hosted in the EU. Payment information is handled exclusively by Stripe and is never stored on our servers.' },
      { h: '4. Your Rights', p: <>You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at <a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>.</> },
      { h: '5. Cookies', p: 'We use session cookies for authentication and basic analytics. No third-party tracking cookies are used.' },
      { h: '6. Contact', p: <>Grow and Inspire / Class Media<br />Tirana, Albania<br /><a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a></> },
    ],
  },
  sq: {
    legal: 'Ligjore',
    title: 'Politika e Privatësisë',
    updated: 'Përditësuar së fundmi: Qershor 2026',
    sections: [
      { h: '1. Informacioni që Mbledhim', p: 'Mbledhim informacionin që jepni kur krijoni një llogari, blini një anëtarësim, dorëzoni aplikime (Dinner with Alketa, punë/i ftuar/investim), ose na kontaktoni përmes formularit të sponsorizimit. Kjo përfshin emrin, adresën e email-it, numrin e telefonit dhe informacionin profesional.' },
      { h: '2. Si e Përdorim Informacionin', p: 'Ne e përdorim informacionin tuaj për të menaxhuar anëtarësimin tuaj, për të komunikuar rreth eventeve dhe përmbajtjes, për të përpunuar pagesat përmes Stripe dhe për të shqyrtuar aplikimet tuaja. Ne nuk i shesim të dhënat tuaja personale palëve të treta.' },
      { h: '3. Ruajtja e të Dhënave', p: 'Të dhënat tuaja ruhen në mënyrë të sigurt duke përdorur infrastrukturën Supabase të mbajtur në BE. Informacioni i pagesës trajtohet ekskluzivisht nga Stripe dhe nuk ruhet kurrë në serverët tanë.' },
      { h: '4. Të Drejtat Tuaja', p: <>Ju keni të drejtë të aksesoni, korrigjoni ose fshini të dhënat tuaja personale në çdo kohë. Për t&apos;i ushtruar këto të drejta, na kontaktoni te <a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>.</> },
      { h: '5. Cookies', p: 'Ne përdorim cookies të sesionit për autentikim dhe analitikë bazë. Nuk përdoren cookies gjurmuese të palëve të treta.' },
      { h: '6. Kontakti', p: <>Grow and Inspire / Class Media<br />Tiranë, Shqipëri<br /><a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a></> },
    ],
  },
}

export default async function PrivacyPage() {
  const lang = await getLang()
  const c = CONTENT[lang]
  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-brand-cream">
      <section className="bg-brand-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">{c.legal}</p>
          <h1 className="font-serif text-5xl font-bold text-brand-white">{c.title}</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-black/70 space-y-6">
            <p className="text-black/50 text-sm">{c.updated}</p>
            {c.sections.map((s) => (
              <div key={s.h} className="space-y-6">
                <h2 className="font-serif text-2xl font-bold text-brand-black">{s.h}</h2>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
