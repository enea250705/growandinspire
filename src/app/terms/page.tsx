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
    title: 'Terms of Service',
    updated: 'Last updated: June 2026',
    sections: [
      { h: '1. Acceptance of Terms', p: 'By accessing or using Grow and Inspire, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.' },
      { h: '2. Membership', p: 'Memberships are billed monthly or annually as selected. You may cancel at any time; access continues until the end of the current billing period. Refunds are not provided for partial periods.' },
      { h: '3. Content Access', p: 'Premium content is available only to active members with the appropriate membership tier. Content is for personal use only. Sharing login credentials or content with non-members is prohibited.' },
      { h: '4. Applications', p: 'Submission of an application (Dinner with Alketa, job, guest, or investment) does not guarantee acceptance. All applications are reviewed manually and at our sole discretion.' },
      { h: '5. Intellectual Property', p: 'All content on this platform - videos, articles, guides, and materials - is the intellectual property of Grow and Inspire / Class Media. Reproduction or redistribution without written permission is prohibited.' },
      { h: '6. Limitation of Liability', p: 'Grow and Inspire is provided "as is." We make no warranties regarding uninterrupted availability or fitness for a particular purpose. Our liability is limited to the amount paid for the current billing period.' },
      { h: '7. Contact', p: <>Questions about these terms? Contact us at{' '}<a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>.</> },
    ],
  },
  sq: {
    legal: 'Ligjore',
    title: 'Kushtet e Shërbimit',
    updated: 'Përditësuar së fundmi: Qershor 2026',
    sections: [
      { h: '1. Pranimi i Kushteve', p: 'Duke aksesuar ose përdorur Grow and Inspire, ju pranoni të jeni të lidhur me këto Kushte Shërbimi. Nëse nuk pajtoheni me këto kushte, ju lutemi mos e përdorni platformën tonë.' },
      { h: '2. Anëtarësimi', p: 'Anëtarësimet faturohen mujore ose vjetore sipas zgjedhjes. Mund ta anuloni në çdo kohë; aksesi vazhdon deri në fund të periudhës aktuale të faturimit. Nuk ofrohen rimbursime për periudha të pjesshme.' },
      { h: '3. Aksesi në Përmbajtje', p: 'Përmbajtja premium është e disponueshme vetëm për anëtarët aktivë me nivelin e duhur të anëtarësimit. Përmbajtja është vetëm për përdorim personal. Ndarja e kredencialeve të hyrjes ose e përmbajtjes me jo-anëtarë është e ndaluar.' },
      { h: '4. Aplikimet', p: 'Dorëzimi i një aplikimi (Dinner with Alketa, punë, i ftuar, ose investim) nuk garanton pranimin. Të gjitha aplikimet shqyrtohen manualisht dhe sipas gjykimit tonë të vetëm.' },
      { h: '5. Prona Intelektuale', p: 'E gjithë përmbajtja në këtë platformë - video, artikuj, udhëzues dhe materiale - është pronë intelektuale e Grow and Inspire / Class Media. Riprodhimi ose rishpërndarja pa leje me shkrim është e ndaluar.' },
      { h: '6. Kufizimi i Përgjegjësisë', p: 'Grow and Inspire ofrohet "siç është". Ne nuk japim garanci për disponueshmëri të pandërprerë ose përshtatshmëri për një qëllim të caktuar. Përgjegjësia jonë kufizohet në shumën e paguar për periudhën aktuale të faturimit.' },
      { h: '7. Kontakti', p: <>Pyetje rreth këtyre kushteve? Na kontaktoni te{' '}<a href="mailto:info@growinspire.al" className="text-brand-gold hover:underline">info@growinspire.al</a>.</> },
    ],
  },
}

export default async function TermsPage() {
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
