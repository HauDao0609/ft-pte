'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Zap, Search, Filter, Star, TrendingUp, ChevronRight, Users } from 'lucide-react'
import { cn, getDifficultyColor, formatNumber } from '@/lib/utils'

interface QuestionListItem {
  id: number
  title: string
  isPredicted?: boolean
  isNew?: boolean
  difficulty?: string
  attemptCount?: number
  accuracy?: number
  tags?: string[]
}

interface QuestionListProps {
  questions: QuestionListItem[]
  sectionTitle: string
  sectionDescription: string
  hasAI?: boolean
  detailBasePath: string
  icon: React.ReactNode
  color: string
}

const difficultyStyle: Record<string, string> = {
  Easy:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
  Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  Hard:   'bg-red-500/15 text-red-400 border-red-500/25',
}

export default function QuestionList({
  questions, sectionTitle, sectionDescription, hasAI, detailBasePath, icon, color
}: QuestionListProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'predicted' | 'new'>('all')

  const filtered = questions.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all'       ? true :
      filter === 'predicted' ? q.isPredicted :
      filter === 'new'       ? q.isNew : true
    return matchSearch && matchFilter
  })

  return (
    <div className="p-6 lg:p-8" style={{ background: '#09090b', minHeight: '100vh' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {sectionTitle}
            </h1>
            <p className="text-sm text-zinc-500">{sectionDescription}</p>
          </div>
        </div>

        {hasAI && (
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.2)', color: '#f9a8d4' }}>
            <Zap className="w-3.5 h-3.5" />
            AI Scoring Available — Get instant feedback on your performance
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl text-zinc-300 placeholder-zinc-600 focus:outline-none transition-all"
            style={{
              background: '#18181b',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'predicted', 'new'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all capitalize',
                filter === f
                  ? 'bg-primary-500/20 text-primary-300 border-primary-500/40'
                  : 'text-zinc-500 border-white/[0.07] hover:border-white/[0.14] hover:text-zinc-300'
              )}
              style={{ background: filter === f ? undefined : '#18181b' }}>
              {f === 'predicted' ? '🔥 Predicted' : f === 'new' ? '✨ New' : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-4 mb-6 text-sm text-zinc-600">
        <span className="font-semibold text-zinc-400">{filtered.length}</span> questions
        <span>·</span>
        <span className="flex items-center gap-1 text-amber-500/70">
          <TrendingUp className="w-3.5 h-3.5" /> {questions.filter(q => q.isPredicted).length} predicted
        </span>
        <span>·</span>
        <span className="text-emerald-500/70 font-medium">{questions.filter(q => q.isNew).length} new this week</span>
      </div>

      {/* Question List */}
      <div className="space-y-2">
        {filtered.map((q, index) => (
          <Link key={q.id} href={`${detailBasePath}/${q.id}`}
            className="flex items-start justify-between gap-4 px-5 py-4 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all group"
            style={{ background: '#18181b' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1e1e22')}
            onMouseLeave={e => (e.currentTarget.style.background = '#18181b')}>
            <div className="flex items-start gap-4 min-w-0">
              {/* Index */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-600 shrink-0 group-hover:text-primary-400 transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)' }}>
                {index + 1}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-zinc-200 group-hover:text-white transition-colors text-sm">
                    {q.title}
                  </h3>
                  {q.isPredicted && (
                    <span className="badge-predicted">🔥 Predicted</span>
                  )}
                  {q.isNew && (
                    <span className="badge-new">✨ New</span>
                  )}
                  {q.difficulty && (
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-semibold rounded-full border',
                      difficultyStyle[q.difficulty] ?? 'bg-zinc-800 text-zinc-400 border-zinc-700'
                    )}>
                      {q.difficulty}
                    </span>
                  )}
                </div>

                {q.tags && (
                  <div className="flex gap-1.5 mb-1.5">
                    {q.tags.map(tag => (
                      <span key={tag} className="text-[11px] text-zinc-600 px-2 py-0.5 rounded"
                        style={{ background: 'rgba(255,255,255,0.04)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  {q.attemptCount && (
                    <span className="text-xs text-zinc-600 flex items-center gap-1">
                      <Users className="w-3 h-3" /> {formatNumber(q.attemptCount)} attempts
                    </span>
                  )}
                  {q.accuracy && (
                    <span className="text-xs text-zinc-600 flex items-center gap-1">
                      <Star className="w-3 h-3" /> {q.accuracy}% accuracy
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {hasAI && <span className="badge-ai"><Zap className="w-2.5 h-2.5" />AI</span>}
              <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-primary-400 transition-colors" />
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-8 h-8 mx-auto mb-3 text-zinc-700" />
            <p className="font-medium text-zinc-500">No questions match your filters</p>
            <button
              onClick={() => { setSearch(''); setFilter('all') }}
              className="mt-3 text-sm text-primary-400 hover:text-primary-300 transition-colors">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
