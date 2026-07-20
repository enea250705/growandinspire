import { DinnerSection } from '@/components/home/DinnerSection'
// --- Temporarily hidden (NOT removed) -------------------------------------
// For now the homepage shows only the Dinner with Alketa section. To bring the
// full homepage back, restore these imports and the JSX below.
// import { Hero } from '@/components/home/Hero'
// import { ELearningSection } from '@/components/home/ELearningSection'
// import { RetreatSection } from '@/components/home/RetreatSection'
// import { ConferenceSection } from '@/components/home/ConferenceSection'
// import { CoachingSection } from '@/components/home/CoachingSection'
// import { AngelInvestorSection } from '@/components/home/AngelInvestorSection'
// import { CommunitySection } from '@/components/home/CommunitySection'
// import { FounderQuote } from '@/components/home/FounderQuote'
// import { DinnerPopup } from '@/components/home/DinnerPopup'
// --------------------------------------------------------------------------

export const revalidate = 60

export default function Home() {
  return (
    <>
      <DinnerSection />
      {/* Hidden for now - restore to show the full homepage again:
      <DinnerPopup />
      <Hero />
      <ELearningSection />
      <RetreatSection />
      <ConferenceSection />
      <CoachingSection />
      <AngelInvestorSection />
      <CommunitySection />
      <FounderQuote />
      */}
    </>
  )
}
