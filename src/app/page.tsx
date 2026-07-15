import { Hero } from '@/components/home/Hero'
import { ELearningSection } from '@/components/home/ELearningSection'
import { DinnerSection } from '@/components/home/DinnerSection'
import { RetreatSection } from '@/components/home/RetreatSection'
import { ConferenceSection } from '@/components/home/ConferenceSection'
import { CoachingSection } from '@/components/home/CoachingSection'
import { AngelInvestorSection } from '@/components/home/AngelInvestorSection'
import { CommunitySection } from '@/components/home/CommunitySection'
import { FounderQuote } from '@/components/home/FounderQuote'

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
      <CommunitySection />
      <FounderQuote />
    </>
  )
}
