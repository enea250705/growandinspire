import { Hero } from '@/components/home/Hero'
import { ELearningSection } from '@/components/home/ELearningSection'
import { DinnerSection } from '@/components/home/DinnerSection'
import { RetreatSection } from '@/components/home/RetreatSection'
import { ConferenceSection } from '@/components/home/ConferenceSection'
import { CoachingSection } from '@/components/home/CoachingSection'
import { AngelInvestorSection } from '@/components/home/AngelInvestorSection'

export const revalidate = 60

export default function Home() {
  return (
    <>
      <Hero />
      <ELearningSection />
      <DinnerSection />
      <RetreatSection />
      <ConferenceSection />
      <CoachingSection />
      <AngelInvestorSection />
    </>
  )
}
