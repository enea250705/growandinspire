import type { LucideIcon } from 'lucide-react'
import { BookOpen, Calendar, Download, FileText, GraduationCap, LayoutDashboard, Settings, Users } from 'lucide-react'

export interface DashboardNavItem {
  key: string
  href: string
  icon: LucideIcon
  exact?: boolean
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { key: 'dash.nav.dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { key: 'dash.nav.learning', href: '/watch', icon: GraduationCap },
  { key: 'dash.nav.saved', href: '/dashboard/saved', icon: BookOpen },
  { key: 'dash.nav.downloads', href: '/dashboard/downloads', icon: Download },
  { key: 'dash.nav.applications', href: '/dashboard/applications', icon: FileText },
  { key: 'dash.nav.events', href: '/dashboard/events', icon: Calendar },
  { key: 'dash.nav.settings', href: '/dashboard/settings', icon: Settings },
]
