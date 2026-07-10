import { redirect } from 'next/navigation'

// Placeholder feature. The previous page rendered five hardcoded rows with
// invented file sizes and a download button wired to nothing — there is no
// downloads bucket and no downloads table. Redirect until it is built, so a
// bookmarked link can't reach a dead UI.
export default function DownloadsPage() {
  redirect('/dashboard')
}
