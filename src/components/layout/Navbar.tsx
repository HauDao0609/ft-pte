'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Zap, BookOpen, Headphones, PenTool, Mic2, Sparkles } from 'lucide-react'
import { practiceNav } from '@/data/questions'

const sectionMeta: Record<string, { icon: React.ReactNode; color: string; glow: string }> = {
  Speaking:  { icon: <Mic2 className="w-3.5 h-3.5" />,       color: 'text-emerald-400', glow: 'hover:text-emerald-300' },
  Writing:   { icon: <PenTool className="w-3.5 h-3.5" />,    color: 'text-violet-400',  glow: 'hover:text-violet-300' },
  Reading:   { icon: <BookOpen className="w-3.5 h-3.5" />,   color: 'text-sky-400',     glow: 'hover:text-sky-300' },
  Listening: { icon: <Headphones className="w-3.5 h-3.5" />, color: 'text-amber-400',   glow: 'hover:text-amber-300' },
}

const sectionBg: Record<string, string> = {
  Speaking:  'hover:bg-emerald-500/10 hover:border-emerald-500/20',
  Writing:   'hover:bg-violet-500/10 hover:border-violet-500/20',
  Reading:   'hover:bg-sky-500/10 hover:border-sky-500/20',
  Listening: 'hover:bg-amber-500/10 hover:border-amber-500/20',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [practiceOpen, setPracticeOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07]"
      style={{ background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              PTE<span className="text-gradient">Uni</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Home
            </Link>

            {/* Practice Dropdown */}
            <div className="relative"
              onMouseEnter={() => setPracticeOpen(true)}
              onMouseLeave={() => setPracticeOpen(false)}>
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                Practice
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${practiceOpen ? 'rotate-180' : ''}`} />
              </button>

              {practiceOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[680px] rounded-2xl p-5 grid grid-cols-2 gap-5"
                  style={{
                    background: 'rgba(18,18,22,0.97)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
                  }}>
                  {practiceNav.map((section) => {
                    const meta = sectionMeta[section.section]
                    return (
                      <div key={section.section}>
                        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3 ${meta.color}`}>
                          {meta.icon} {section.section}
                        </div>
                        <ul className="space-y-0.5">
                          {section.items.map((item) => (
                            <li key={item.label}>
                              <Link href={item.href}
                                className={`flex items-center justify-between px-3 py-2 text-sm text-zinc-400 hover:text-white rounded-xl transition-all border border-transparent ${sectionBg[section.section]} group`}>
                                <span>{item.label}</span>
                                {item.hasAI && (
                                  <span className="badge-ai opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap className="w-2.5 h-2.5" /> AI
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <Link href="/course"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Course
            </Link>
            <Link href="/vocab"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Vocab
            </Link>
            <Link href="/study-center"
              className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Dashboard
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login"
              className="px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Login
            </Link>
            <Link href="/login?type=signup" className="btn-primary text-sm px-5 py-2">
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.07] px-4 py-4 space-y-1"
          style={{ background: 'rgba(9,9,11,0.97)' }}>
          <Link href="/" className="block px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5">
            Home
          </Link>
          {practiceNav.map((section) => {
            const meta = sectionMeta[section.section]
            return (
              <div key={section.section}>
                <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${meta.color}`}>
                  {meta.icon} {section.section}
                </div>
                {section.items.map((item) => (
                  <Link key={item.label} href={item.href}
                    className="block px-6 py-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                    {item.label}
                  </Link>
                ))}
              </div>
            )
          })}
          <div className="pt-3 flex gap-2 border-t border-white/[0.07] mt-3">
            <Link href="/login"
              className="flex-1 text-center py-2.5 text-sm font-semibold border border-white/10 text-zinc-300 rounded-xl hover:bg-white/5 transition-all">
              Login
            </Link>
            <Link href="/login?type=signup"
              className="flex-1 text-center py-2.5 text-sm font-semibold bg-primary-500 text-white rounded-xl hover:bg-primary-400 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
