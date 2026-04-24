'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { readAloudQuestions } from '@/data/questions'
import { Mic2, ChevronLeft, ChevronRight, Zap, Play, Square, Volume2, RotateCcw, Star, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react'
import { getDifficultyColor, cn, getScoreColor } from '@/lib/utils'

// Mock AI score response
const mockAIScore = {
  overall: 78,
  pronunciation: 80,
  fluency: 75,
  content: 85,
  feedback: [
    { type: 'good', text: 'Good pronunciation of most phonemes' },
    { type: 'good', text: 'Natural pacing and rhythm' },
    { type: 'improve', text: "Slight hesitation on the word 'irreversible'" },
    { type: 'improve', text: 'Could improve stress on multi-syllable academic words' },
  ]
}

interface Props {
  params: { id: string }
}

export default function ReadAloudDetailPage({ params }: Props) {
  const id = parseInt(params.id)
  const currentIndex = readAloudQuestions.findIndex(q => q.id === id)
  const question = readAloudQuestions[currentIndex]
  const prevQ = readAloudQuestions[currentIndex - 1]
  const nextQ = readAloudQuestions[currentIndex + 1]

  const [stage, setStage] = useState<'prep' | 'recording' | 'done'>('prep')
  const [timeLeft, setTimeLeft] = useState(35) // prep time
  const [recording, setRecording] = useState(false)
  const [showScore, setShowScore] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  if (!question) return <div className="p-8 text-center text-slate-500">Question not found</div>

  const startRecording = () => {
    setRecording(true)
    setStage('recording')
    setTimeout(() => {
      setRecording(false)
      setStage('done')
    }, 5000)
  }

  const stopRecording = () => {
    setRecording(false)
    setStage('done')
  }

  const reset = () => {
    setStage('prep')
    setTimeLeft(35)
    setShowScore(false)
    setRecording(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/practice/read-alouds" className="hover:text-primary-600 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Read Aloud
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-medium">#{question.id}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-black text-slate-800">{question.title}</h1>
            {question.isPredicted && (
              <span className="px-2 py-0.5 text-xs font-bold bg-orange-50 text-orange-600 rounded-full border border-orange-100">🔥 Predicted</span>
            )}
            {question.isNew && (
              <span className="px-2 py-0.5 text-xs font-bold bg-green-50 text-green-600 rounded-full border border-green-100">✨ New</span>
            )}
            {question.difficulty && (
              <span className={cn('px-2 py-0.5 text-xs font-semibold rounded-full', getDifficultyColor(question.difficulty))}>
                {question.difficulty}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>{question.attemptCount?.toLocaleString()} attempts</span>
            <span>·</span>
            <span>{question.accuracy}% accuracy</span>
          </div>
        </div>
        <span className="badge-ai"><Zap className="w-3 h-3" /> AI Score</span>
      </div>

      {/* Instruction Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Volume2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>Instructions:</strong> Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible. You have 35 seconds to read aloud.
        </div>
      </div>

      {/* Main Card */}
      <div className="card p-6 mb-6">
        {/* Status Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-3 h-3 rounded-full',
              stage === 'prep' ? 'bg-yellow-400 animate-pulse' :
              stage === 'recording' ? 'bg-red-500 recording-pulse' :
              'bg-green-500'
            )} />
            <span className="text-sm font-semibold text-slate-600">
              {stage === 'prep' ? 'Prepare to read' : stage === 'recording' ? 'Recording...' : 'Recording complete'}
            </span>
          </div>
          {stage === 'recording' && (
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="waveform-bar w-1 bg-red-500 rounded-full" />
              ))}
            </div>
          )}
        </div>

        {/* Text to Read */}
        <div className="bg-slate-50 rounded-xl p-6 mb-6">
          <p className="text-lg leading-9 text-slate-700 font-medium tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            {question.text}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {stage === 'prep' && (
              <button onClick={startRecording}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md">
                <Mic2 className="w-4 h-4" /> Start Recording
              </button>
            )}
            {stage === 'recording' && (
              <button onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all">
                <Square className="w-4 h-4" /> Stop Recording
              </button>
            )}
            {stage === 'done' && (
              <>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm">
                  <Play className="w-4 h-4" /> Play Back
                </button>
                <button onClick={reset} className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition-all text-sm">
                  <RotateCcw className="w-4 h-4" /> Re-record
                </button>
                <button onClick={() => setShowScore(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all text-sm">
                  <Zap className="w-4 h-4" /> Get AI Score
                </button>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-medium">{question.text.split(' ').length}</span> words
          </div>
        </div>
      </div>

      {/* AI Score Result */}
      {showScore && (
        <div className="card p-6 mb-6 border-primary-100">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary-600" /> AI Score Analysis
          </h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Overall', score: mockAIScore.overall },
              { label: 'Pronunciation', score: mockAIScore.pronunciation },
              { label: 'Fluency', score: mockAIScore.fluency },
              { label: 'Content', score: mockAIScore.content },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={cn('text-3xl font-black', getScoreColor(item.score))}>{item.score}</div>
                <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                <div className="progress-bar mt-2">
                  <div className="progress-fill" style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Detailed Feedback</h4>
            {mockAIScore.feedback.map((f, i) => (
              <div key={i} className={cn('flex items-start gap-2 text-sm p-3 rounded-lg',
                f.type === 'good' ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800')}>
                {f.type === 'good' ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                {f.text}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevQ ? (
          <Link href={`/practice/read-alouds/${prevQ.id}`}
            className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-sm font-medium transition-all">
            <ChevronLeft className="w-4 h-4" /> Previous
          </Link>
        ) : <div />}
        {nextQ && (
          <Link href={`/practice/read-alouds/${nextQ.id}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-sm font-semibold transition-all">
            Next <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
