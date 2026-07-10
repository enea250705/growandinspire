import type { LucideIcon } from 'lucide-react'
import { BookOpen, Calendar, Download, FileText, LayoutDashboard, PlayCircle, Settings, Users } from 'lucide-react'

export interface DashboardNavItem {
  label: string
  href: string
  icon: LucideIcon
  exact?: boolean
}

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'My Membership', href: '/dashboard/membership', icon: Users },
  { label: 'Saved Content', href: '/dashboard/saved', icon: BookOpen },
  { label: 'Learning Hub', href: '/watch', icon: PlayCircle },
  { label: 'My Downloads', href: '/dashboard/downloads', icon: Download },
  { label: 'My Applications', href: '/dashboard/applications', icon: FileText },
  { label: 'Upcoming Events', href: '/dashboard/events', icon: Calendar },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]
