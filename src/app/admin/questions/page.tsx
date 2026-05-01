'use client'

import { useState, type ComponentType } from 'react'
import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  Edit2,
  Trash2,
  Star,
  Sparkles,
  Upload,
  X,
  Check,
  Mic2,
  PenLine,
  BookOpen,
  Headphones,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Question {
  id: number
  title: string
  type: string
  skill: 'Speaking' | 'Writing' | 'Reading' | 'Listening'
  difficulty: 'Easy' | 'Medium' | 'Hard'
  isPredicted: boolean
  isNew: boolean
  attempts: number
  accuracy: number
}

const mockQuestions: Question[] = [
  { id: 1, title: 'Climate Change and Global Warming Effects', type: 'Read Aloud', skill: 'Speaking', difficulty: 'Medium', isPredicted: true, isNew: false, attempts: 1240, accuracy: 74 },
  { id: 2, title: 'Describe the bar chart showing economic growth', type: 'Describe Image', skill: 'Speaking', difficulty: 'Hard', isPredicted: false, isNew: true, attempts: 890, accuracy: 61 },
  { id: 3, title: 'The Importance of Renewable Energy Sources', type: 'Write Essay', skill: 'Writing', difficulty: 'Hard', isPredicted: true, isNew: false, attempts: 670, accuracy: 58 },
  { id: 4, title: 'Australia wildlife conservation efforts', type: 'Summarize Written', skill: 'Writing', difficulty: 'Medium', isPredicted: false, isNew: false, attempts: 430, accuracy: 81 },
  { id: 5, title: 'Fill in the blanks — Academic vocabulary', type: 'FIB Dropdown', skill: 'Reading', difficulty: 'Easy', isPredicted: false, isNew: true, attempts: 2100, accuracy: 88 },
  { id: 6, title: 'Re-order: The Industrial Revolution paragraph', type: 'Reorder Paragraphs', skill: 'Reading', difficulty: 'Hard', isPredicted: true, isNew: false, attempts: 560, accuracy: 45 },
  { id: 7, title: 'Write from dictation — short sentence 12', type: 'Write Dictation', skill: 'Listening', difficulty: 'Easy', isPredicted: false, isNew: false, attempts: 3400, accuracy: 92 },
  { id: 8, title: 'Highlight incorrect words — Science passage', type: 'Highlight Incorrect', skill: 'Listening', difficulty: 'Medium', isPredicted: true, isNew: true, attempts: 780, accuracy: 67 },
  { id: 9, title: 'Repeat sentence — Academic context 34', type: 'Repeat Sentence', skill: 'Speaking', difficulty: 'Medium', isPredicted: false, isNew: false, attempts: 5200, accuracy: 79 },
  { id: 10, title: 'Multiple choice — Reading comprehension', type: 'Reading MCS', skill: 'Reading', difficulty: 'Hard', isPredicted: false, isNew: false, attempts: 320, accuracy: 52 },
]

const skillIcons: Record<Question['skill'], ComponentType<{ className?: string }>> = {
  Speaking: Mic2,
  Writing: PenLine,
  Reading: BookOpen,
  Listening: Headphones,
}

const skillColors: Record<Question['skill'], string> = {
  Speaking: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Writing: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Reading: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Listening: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}

const difficultyColors: Record<Question['difficulty'], string> = {
  Easy: 'text-emerald-400 bg-emerald-500/10',
  Medium: 'text-amber-400 bg-amber-500/10',
  Hard: 'text-red-400 bg-red-500/10',
}

const SKILLS = ['All', 'Speaking', 'Writing', 'Reading', 'Listening'] as const
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'] as const

type SkillFilter = typeof SKILLS[number]
type DiffFilter = typeof DIFFICULTIES[number]

export default function QuestionsPage() {
  const [search, setSearch] = useState('')
  const [skill, setSkill] = useState<SkillFilter>('All')
  const [diff, setDiff] = useState<DiffFilter>('All')
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ title: '', type: 'Read Aloud', skill: 'Speaking', difficulty: 'Medium', isPredicted: false, isNew: false })

  const filtered = mockQuestions.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.type.toLowerCase().includes(search.toLowerCase())
    const matchSkill = skill === 'All' || q.skill === skill
    const matchDiff = diff === 'All' || q.difficulty === diff
    return matchSearch && matchSkill && matchDiff
  })

  function openAdd() {
    setEditId(null)
    setForm({ title: '', type: 'Read Aloud', skill: 'Speaking', difficulty: 'Medium', isPredicted: false, isNew: true })
    setShowModal(true)
  }

  function openEdit(q: Question) {
    setEditId(q.id)
    setForm({ title: q.title, type: q.type, skill: q.skill, difficulty: q.difficulty, isPredicted: q.isPredicted, isNew: q.isNew })
    setShowModal(true)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Questions</h1>
          <p className="text-sm text-zinc-500 mt-1">Quản lý câu hỏi và bài test</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-300 border border-white/[0.08] hover:bg-white/[0.05] transition-all">
            <Upload className="w-4 h-4" />
            Import CSV
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}>
            <Plus className="w-4 h-4" />
            Add Question
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-200 outline-none border focus:border-indigo-500/50 transition-all"
            style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <select
              value={skill}
              onChange={e => setSkill(e.target.value as SkillFilter)}
              className="pl-8 pr-8 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
              style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {SKILLS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Skills' : s}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={diff}
              onChange={e => setDiff(e.target.value as DiffFilter)}
              className="pl-4 pr-8 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
              style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {DIFFICULTIES.map(d => <option key={d} value={d}>{d === 'All' ? 'All Levels' : d}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Question</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Skill</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Level</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Attempts</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Accuracy</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Tags</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {filtered.map(q => {
                const SkillIcon = skillIcons[q.skill]
                return (
                  <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-zinc-200 font-medium truncate">{q.title}</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{q.type}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border', skillColors[q.skill])}>
                        <SkillIcon className="w-2.5 h-2.5" />
                        {q.skill}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', difficultyColors[q.difficulty])}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-zinc-400">{q.attempts.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={cn('font-semibold text-sm', q.accuracy >= 79 ? 'text-emerald-400' : q.accuracy >= 65 ? 'text-amber-400' : 'text-red-400')}>
                        {q.accuracy}%
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-1.5">
                        {q.isPredicted && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20">
                            <Star className="w-2.5 h-2.5" />
                            Predicted
                          </span>
                        )}
                        {q.isNew && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20">
                            <Sparkles className="w-2.5 h-2.5" />
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button onClick={() => openEdit(q)} className="p-1.5 rounded-lg text-zinc-600 hover:text-indigo-400 hover:bg-indigo-500/10 transition-all">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-600 text-sm">No questions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-zinc-500">Showing {filtered.length} of {mockQuestions.length} questions</p>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">Prev</button>
            <button className="px-3 py-1.5 rounded-lg text-xs text-white bg-indigo-500/20 border border-indigo-500/30">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-lg rounded-2xl border p-6 space-y-5" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.10)' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">{editId ? 'Edit Question' : 'Add Question'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Question Title</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Enter question title…"
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-zinc-200 outline-none border focus:border-indigo-500/50 transition-all"
                  style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.08)' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Skill</label>
                  <div className="relative">
                    <select
                      value={form.skill}
                      onChange={e => setForm(f => ({ ...f, skill: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
                      style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      {['Speaking', 'Writing', 'Reading', 'Listening'].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5">Difficulty</label>
                  <div className="relative">
                    <select
                      value={form.difficulty}
                      onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
                      style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      {['Easy', 'Medium', 'Hard'].map(d => <option key={d}>{d}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Question Type</label>
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
                    style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    {['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Write Essay', 'Summarize Written', 'FIB Dropdown', 'FIB Dragdrop', 'Reorder Paragraphs', 'Reading MCS', 'Write Dictation', 'Highlight Incorrect'].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, isPredicted: !f.isPredicted }))}
                    className={cn('w-5 h-5 rounded-md flex items-center justify-center border transition-all', form.isPredicted ? 'bg-amber-500 border-amber-500' : 'border-white/[0.15] bg-transparent')}
                  >
                    {form.isPredicted && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-sm text-zinc-300">Predicted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, isNew: !f.isNew }))}
                    className={cn('w-5 h-5 rounded-md flex items-center justify-center border transition-all', form.isNew ? 'bg-emerald-500 border-emerald-500' : 'border-white/[0.15] bg-transparent')}
                  >
                    {form.isNew && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <span className="text-sm text-zinc-300">New</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}>
                {editId ? 'Save Changes' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
