'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { writeEssayQuestions } from '@/data/questions'
import { PenLine, ChevronLeft, ChevronRight, Zap, Clock, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react'
import { cn, getScoreColor } from '@/lib/utils'

const mockEssayScore = {
  overall: 71,
  grammar: 78,
  vocabulary: 72,
  structure: 68,
  content: 70,
  feedback: [
    { type: 'good', text: 'Clear thesis statement in the introduction' },
    { type: 'good', text: 'Good use of linking words and transitions' },
    { type: 'improve', text: 'Need more supporting examples in body paragraphs' },
    { type: 'improve', text: 'Conclusion could better summarize the main points' },
    { type: 'improve', text: 'Some repetition of vocabulary - vary your word choice' },
  ]
}

export default function WriteEssayDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const question = writeEssayQuestions.find(q => q.id === id)
  const [essay, setEssay] = useState('')
  const [timeLeft, setTimeLeft] = useState(20 * 60)
  const [timerActive, setTimerActive] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!timerActive) return
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  if (!question) return <div className="p-8 text-center text-slate-500">Question not found</div>

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0
  const inRange = wordCount >= question.wordLimit.min && wordCount <= question.wordLimit.max
  const minutesLeft = Math.floor(timeLeft / 60)
  const secondsLeft = timeLeft % 60

  const handleSubmit = () => {
    setSubmitted(true)
    setTimerActive(false)
    setShowScore(true)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/practice/write-essay" className="hover:text-primary-600 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Write Essay
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">#{question.id}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-slate-800 mb-1">{question.title}</h1>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{question.attemptCount?.toLocaleString()} attempts</span>
            <span>·</span>
            <span>Word limit: {question.wordLimit.min}–{question.wordLimit.max}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn('flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold',
            timeLeft <= 120 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-700')}>
            <Clock className="w-4 h-4" />
            {minutesLeft}:{secondsLeft.toString().padStart(2, '0')}
          </div>
          <span className="badge-ai"><Zap className="w-3 h-3" /> AI Score</span>
        </div>
      </div>

      {/* Prompt */}
      <div className="card p-6 mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Essay Prompt</h3>
        <p className="text-slate-700 leading-relaxed">{question.prompt}</p>
      </div>

      {/* Editor */}
      <div className="card mb-6 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
          <span className="text-sm font-semibold text-slate-600">Your Essay</span>
          <div className="flex items-center gap-3">
            {!timerActive && !submitted && (
              <button onClick={() => setTimerActive(true)}
                className="text-xs text-primary-600 font-semibold hover:underline flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Start Timer
              </button>
            )}
            <span className={cn('text-sm font-bold', inRange ? 'text-green-600' : wordCount > question.wordLimit.max ? 'text-red-500' : 'text-slate-500')}>
              {wordCount} / {question.wordLimit.min}–{question.wordLimit.max} words
            </span>
          </div>
        </div>
        <textarea
          value={essay}
          onChange={e => setEssay(e.target.value)}
          disabled={submitted}
          placeholder="Begin writing your essay here..."
          className="w-full h-64 p-6 text-slate-700 leading-relaxed resize-none focus:outline-none text-sm disabled:bg-slate-50"
        />
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-100">
          <div className="flex gap-2">
            {!submitted && (
              <button onClick={() => setEssay('')} className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1">
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
          {!submitted && (
            <button onClick={handleSubmit} disabled={wordCount < question.wordLimit.min}
              className="flex items-center gap-2 px-5 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all">
              <Zap className="w-3.5 h-3.5" /> Submit & Get AI Score
            </button>
          )}
        </div>
      </div>

      {/* AI Score */}
      {showScore && (
        <div className="card p-6 mb-6 border-primary-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary-600" /> AI Score Analysis
          </h3>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[
              { label: 'Overall', score: mockEssayScore.overall },
              { label: 'Grammar', score: mockEssayScore.grammar },
              { label: 'Vocabulary', score: mockEssayScore.vocabulary },
              { label: 'Structure', score: mockEssayScore.structure },
              { label: 'Content', score: mockEssayScore.content },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={cn('text-2xl font-black', getScoreColor(item.score))}>{item.score}</div>
                <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                <div className="progress-bar mt-2">
                  <div className="progress-fill" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {mockEssayScore.feedback.map((f, i) => (
              <div key={i} className={cn('flex items-start gap-2 text-sm p-3 rounded-lg',
                f.type === 'good' ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800')}>
                {f.type === 'good' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                {f.text}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Link href="/practice/write-essay" className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-sm font-medium transition-all">
          <ChevronLeft className="w-4 h-4" /> Back to list
        </Link>
      </div>
    </div>
  )
}
