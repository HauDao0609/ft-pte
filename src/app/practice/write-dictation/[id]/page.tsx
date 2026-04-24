'use client'
import { useState } from 'react'
import Link from 'next/link'
import { writeDictationQuestions } from '@/data/questions'
import { ChevronLeft, ChevronRight, Play, Volume2, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function WriteDictationDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const currentIdx = writeDictationQuestions.findIndex(q => q.id === id)
  const question = writeDictationQuestions[currentIdx]
  const [answer, setAnswer] = useState('')
  const [played, setPlayed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [playing, setPlaying] = useState(false)

  if (!question) return <div className="p-8 text-slate-500">Question not found</div>

  const prevQ = writeDictationQuestions[currentIdx - 1]
  const nextQ = writeDictationQuestions[currentIdx + 1]

  const playAudio = () => {
    setPlaying(true)
    setPlayed(true)
    // Simulate audio playing
    setTimeout(() => setPlaying(false), question.duration * 1000)
  }

  const checkAnswer = () => {
    setSubmitted(true)
  }

  const getWordResults = () => {
    const correctWords = question.transcript.toLowerCase().split(' ')
    const userWords = answer.trim().toLowerCase().split(' ')
    return correctWords.map((word, i) => ({
      word,
      correct: word === userWords[i]
    }))
  }

  const score = submitted ? (() => {
    const correct = question.transcript.toLowerCase().split(' ')
    const user = answer.trim().toLowerCase().split(' ')
    return correct.filter((w, i) => w === user[i]).length
  })() : 0
  const total = question.transcript.split(' ').length

  const reset = () => {
    setAnswer('')
    setPlayed(false)
    setSubmitted(false)
    setPlaying(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/practice/write-dictation" className="hover:text-primary-600 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Write From Dictation
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-slate-800">{question.title}</h1>
          <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
            {question.isPredicted && <span className="text-orange-500 font-semibold">🔥 Predicted</span>}
            <span>{question.attemptCount?.toLocaleString()} attempts</span>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-sm text-orange-800">
        <strong>Instructions:</strong> You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.
      </div>

      {/* Audio Player */}
      <div className="card p-6 mb-6 text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Volume2 className={cn('w-8 h-8 text-orange-500', playing && 'animate-pulse')} />
          </div>
          {playing && (
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="waveform-bar w-1 bg-orange-400 rounded-full" />
              ))}
            </div>
          )}
          {played && !playing && <p className="text-xs text-slate-400 mb-3">Audio played. {!submitted ? 'Type what you heard below.' : ''}</p>}
        </div>
        <button
          onClick={playAudio}
          disabled={playing || submitted}
          className={cn(
            'flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm mx-auto transition-all',
            playing || submitted ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
          )}>
          <Play className="w-4 h-4" /> {played ? 'Replay Audio' : 'Play Audio'}
        </button>
        <p className="text-xs text-slate-400 mt-2">Audio duration: ~{question.duration} seconds</p>
      </div>

      {/* Answer Input */}
      <div className="card p-6 mb-6">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">Your Answer</label>
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          disabled={submitted || !played}
          placeholder={played ? 'Type the sentence here...' : 'Play audio first to enable input'}
          className="w-full h-24 border border-slate-200 rounded-xl p-4 text-slate-700 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 disabled:bg-slate-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Result */}
      {submitted && (
        <div className="card p-6 mb-6">
          <h3 className="font-bold text-slate-700 mb-4">Results</h3>
          {/* Word by word comparison */}
          <div className="mb-4">
            <p className="text-xs text-slate-400 mb-2">Correct Answer:</p>
            <div className="flex flex-wrap gap-1">
              {getWordResults().map((result, i) => (
                <span key={i} className={cn(
                  'px-2 py-0.5 rounded text-sm font-medium',
                  result.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700 line-through'
                )}>
                  {result.word}
                </span>
              ))}
            </div>
          </div>
          <div className={cn('rounded-xl p-4 flex items-center gap-3', score === total ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200')}>
            {score === total ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-yellow-600" />}
            <div>
              <p className="font-bold text-slate-800">Score: {score}/{total} words correct</p>
              <p className="text-sm text-slate-600">{Math.round(score / total * 100)}% accuracy</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          {!submitted ? (
            <button onClick={checkAnswer} disabled={!answer.trim() || !played}
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-all">
              Submit Answer
            </button>
          ) : (
            <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {prevQ && <Link href={`/practice/write-dictation/${prevQ.id}`} className="flex items-center gap-1 px-3 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-white"><ChevronLeft className="w-4 h-4" />Prev</Link>}
          {nextQ && <Link href={`/practice/write-dictation/${nextQ.id}`} className="flex items-center gap-1 px-3 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold hover:bg-primary-700">Next<ChevronRight className="w-4 h-4" /></Link>}
        </div>
      </div>
    </div>
  )
}
