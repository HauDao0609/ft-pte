'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    const authed = localStorage.getItem('admin_authed') === 'true'
    if (!authed && !isLoginPage) {
      router.replace('/admin/login')
    } else {
      setChecked(true)
    }
  }, [isLoginPage, router])

  if (!checked) return null

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#09090b' }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
