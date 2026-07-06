import { requireAdmin } from '@/lib/admin'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()

  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          <AdminSidebar email={user.email ?? ''} />
          <main>{children}</main>
        </div>
      </div>
    </div>
  )
}
