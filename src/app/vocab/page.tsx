'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { vocabWords } from '@/data/questions'
import { BookOpen, Search, Volume2, Star, CheckCircle2, ChevronRight, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = ['All', 'Academic', 'Medical', 'Science']
const difficulties = ['all', 'easy', 'medium', 'hard'] as const

export default function VocabPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState<typeof difficulties[number]>('all')
  const [learned, setLearned] = useState<Record<number, boolean>>({})
  const [selectedWord, setSelectedWord] = useState<typeof vocabWords[0] | null>(null)
  const [mode, setMode] = useState<'list' | 'flashcard'>('list')

  const filtered = vocabWords.filter(w => {
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase()) || w.definition.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || w.category === category
    const matchDiff = difficulty === 'all' || w.difficulty === difficulty
    return matchSearch && matchCat && matchDiff
  })

  const learnedCount = Object.values(learned).filter(Boolean).length + vocabWords.filter(w => w.learned).length

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h1 className="text-2xl font-black text-slate-800">Vocab Book</h1>
                </div>
                <p className="text-slate-500 text-sm">Master high-frequency PTE vocabulary. Contains 90% of exam vocabs.</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-primary-600">{learnedCount}</div>
                <div className="text-xs text-slate-400">words learned</div>
                <div className="progress-bar mt-2 w-24">
                  <div className="progress-fill" style={{ width: `${(learnedCount / vocabWords.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search words or definitions..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary-200" />
            </div>
            <div className="flex gap-2">
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={cn('px-3 py-2 text-sm rounded-xl border transition-all',
                    category === c ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-600 border-slate-200')}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {difficulties.map(d => (
                <button key={d} onClick={() => setDifficulty(d)}
                  className={cn('px-3 py-2 text-sm rounded-xl border transition-all capitalize',
                    difficulty === d ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-600 border-slate-200')}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-500 mb-4"><strong className="text-slate-700">{filtered.length}</strong> words</p>

          {/* Word Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((word) => {
              const isLearned = learned[word.id] !== undefined ? learned[word.id] : word.learned
              return (
                <div key={word.id}
                  onClick={() => setSelectedWord(word)}
                  className="card p-5 cursor-pointer group hover:border-primary-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-primary-700 transition-colors">{word.word}</h3>
                      <span className="text-xs text-slate-400 italic">{word.partOfSpeech}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-semibold',
                        word.difficulty === 'easy' ? 'bg-green-50 text-green-600' :
                        word.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-red-50 text-red-600')}>
                        {word.difficulty}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setLearned(prev => ({ ...prev, [word.id]: !isLearned })) }}
                        className={cn('w-7 h-7 rounded-full flex items-center justify-center transition-all',
                          isLearned ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400 hover:bg-green-100')}>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">{word.definition}</p>
                  <p className="text-xs text-slate-400 mt-2 italic line-clamp-1">&ldquo;{word.example}&rdquo;</p>
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Word Detail Modal */}
      {selectedWord && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedWord(null)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-black text-slate-800">{selectedWord.word}</h2>
                <p className="text-sm text-slate-400 italic">{selectedWord.partOfSpeech} · {selectedWord.category}</p>
              </div>
              <button className="p-2 bg-blue-50 rounded-xl text-blue-600 hover:bg-blue-100 transition-colors">
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 mb-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Definition</h3>
              <p className="text-slate-700">{selectedWord.definition}</p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4 mb-4">
              <h3 className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-2">Example</h3>
              <p className="text-slate-700 italic">&ldquo;{selectedWord.example}&rdquo;</p>
            </div>
            <button
              onClick={() => {
                setLearned(prev => ({ ...prev, [selectedWord.id]: true }))
                setSelectedWord(null)
              }}
              className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all">
              Mark as Learned ✓
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
