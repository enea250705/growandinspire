import { redirect } from 'next/navigation'

// Membership is hidden until pricing/plans are finalised. Anyone landing here
// is sent to sign up. Restore the previous page from git history to bring it back.
export default function MembershipPage() {
  redirect('/login')
}
