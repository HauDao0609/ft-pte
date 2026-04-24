'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap, BookOpen, Headphones, PenTool, Mic2, ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { practiceNav } from '@/data/questions'
import { cn } from '@/lib/utils'

const sectionMeta: Record<string, {
  icon: React.ReactNode
  color: string
  activeBg: string
  border: string
  dot: string
}> = {
  Speaking: {
    icon: <Mic2 className="w-3.5 h-3.5" />,
    color: 'text-emerald-400',
    activeBg: 'bg-emerald-500/10 border-emerald-500/20',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  Writing: {
    icon: <PenTool className="w-3.5 h-3.5" />,
    color: 'text-violet-400',
    activeBg: 'bg-violet-500/10 border-violet-500/20',
    border: 'border-violet-500/30',
    dot: 'bg-violet-400',
  },
  Reading: {
    icon: <BookOpen className="w-3.5 h-3.5" />,
    color: 'text-sky-400',
    activeBg: 'bg-sky-500/10 border-sky-500/20',
    border: 'border-sky-500/30',
    dot: 'bg-sky-400',
  },
  Listening: {
    icon: <Headphones className="w-3.5 h-3.5" />,
    color: 'text-amber-400',
    activeBg: 'bg-amber-500/10 border-amber-500/20',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
}

const activeItemColors: Record<string, string> = {
  Speaking:  'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20',
  Writing:   'bg-violet-500/10 text-violet-300 border border-violet-500/20',
  Reading:   'bg-sky-500/10 text-sky-300 border border-sky-500/20',
  Listening: 'bg-amber-500/10 text-amber-300 border border-amber-500/20',
}

interface PracticeSidebarProps {
  currentType?: string
}

export default function PracticeSidebar({ currentType }: PracticeSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (section: string) =>
    setCollapsed(prev => ({ ...prev, [section]: !prev[section] }))

  return (
    <aside className="w-60 shrink-0 min-h-screen sticky top-16 overflow-y-auto"
      style={{ background: '#0d0d10', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="p-3 pt-5">
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4 px-2">
          Practice Questions
        </p>

        <nav className="space-y-1.5">
          {practiceNav.map((section) => {
            const meta = sectionMeta[section.section]
            const isOpen = collapsed[section.section] !== true

            return (
              <div key={section.section}>
                {/* Section header */}
                <button
                  onClick={() => toggle(section.section)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all',
                    meta.color, 'hover:bg-white/5'
                  )}>
                  <div className="flex items-center gap-2">
                    <span className={cn('w-1.5 h-1.5 rounded-full', meta.dot)} />
                    {meta.icon}
                    {section.section}
                  </div>
                  {isOpen
                    ? <ChevronDown className="w-3 h-3 opacity-50" />
                    : <ChevronRight className="w-3 h-3 opacity-50" />}
                </button>

                {isOpen && (
                  <ul className="mt-0.5 ml-2 space-y-0.5 pl-2"
                    style={{ borderLeft: `1px solid rgba(255,255,255,0.06)` }}>
                    {section.items.map((item) => {
                      const isActive = pathname === item.href
                      return (
                        <li key={item.label}>
                          <Link
                            href={item.href}
                            className={cn(
                              'flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg transition-all group',
                              isActive
                                ? activeItemColors[section.section]
                                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]'
                            )}>
                            <span className="truncate">{item.label}</span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-1">
                              {item.hasAI && (
                                <Zap className={cn(
                                  'w-2.5 h-2.5 transition-opacity',
                                  isActive ? 'opacity-70' : 'opacity-0 group-hover:opacity-40'
                                )} />
                              )}
                              <span className={cn(
                                'text-[10px] font-mono',
                                isActive ? 'opacity-60' : 'text-zinc-600'
                              )}>
                                {item.count}
                              </span>
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
