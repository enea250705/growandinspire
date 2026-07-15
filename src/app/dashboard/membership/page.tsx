import { redirect } from 'next/navigation'

// Membership is hidden until pricing/plans are finalised.
export default function DashboardMembershipPage() {
  redirect('/dashboard')
}
