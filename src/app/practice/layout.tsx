import Navbar from '@/components/layout/Navbar'
import PracticeSidebar from '@/components/layout/PracticeSidebar'

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#09090b' }}>
      <Navbar />
      <div className="flex flex-1">
        <PracticeSidebar />
        <main className="flex-1 min-h-screen" style={{ background: '#09090b' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
