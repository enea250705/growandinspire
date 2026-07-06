import { Hero } from '@/components/home/Hero'
import { ELearningSection } from '@/components/home/ELearningSection'
import { DinnerSection } from '@/components/home/DinnerSection'
import { RetreatSection } from '@/components/home/RetreatSection'
import { ConferenceSection } from '@/components/home/ConferenceSection'
import { CoachingSection } from '@/components/home/CoachingSection'
import { AngelInvestorSection } from '@/components/home/AngelInvestorSection'
import { getSettings } from '@/lib/settings'

export const revalidate = 60

export default async function Home() {
  const s = await getSettings()
  return (
    <>
      <Hero />
      <ELearningSection />
      <DinnerSection />
      <RetreatSection />
      <ConferenceSection priceEarly={s.conference_price_early} priceStandard={s.conference_price_standard} />
      <CoachingSection />
      <AngelInvestorSection />
    </>
  )
}
