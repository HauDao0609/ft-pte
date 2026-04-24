'use client'
import { useState } from 'react'
import Link from 'next/link'
import { readingMCSQuestions } from '@/data/questions'
import { ChevronLeft, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ReadingMCSDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const question = readingMCSQuestions.find(q => q.id === id)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  if (!question) return <div className="p-8 text-slate-500">Question not found</div>

  const isCorrect = selected === question.correctAnswer
  const reset = () => { setSelected(null); setSubmitted(false) }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/practice/reading-mcs" className="hover:text-primary-600 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Multiple Choice (Single)
        </Link>
      </div>

      <h1 className="text-xl font-black text-slate-800 mb-6">{question.title}</h1>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-blue-800">
        <strong>Instructions:</strong> Read the text and answer the question by selecting all the correct responses. Only one response is correct.
      </div>

      {/* Passage */}
      <div className="card p-6 mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Reading Passage</h3>
        <p className="text-slate-700 leading-relaxed">{question.passage}</p>
      </div>

      {/* Question & Options */}
      <div className="card p-6 mb-6">
        <h3 className="font-bold text-slate-800 mb-4">{question.question}</h3>
        <div className="space-y-3">
          {question.options.map((option, i) => {
            let style = 'border-slate-200 bg-white hover:border-primary-300 hover:bg-primary-50'
            if (submitted) {
              if (i === question.correctAnswer) style = 'border-green-400 bg-green-50'
              else if (i === selected && i !== question.correctAnswer) style = 'border-red-400 bg-red-50'
              else style = 'border-slate-200 bg-slate-50 opacity-60'
            } else if (selected === i) {
              style = 'border-primary-500 bg-primary-50'
            }

            return (
              <button
                key={i}
                onClick={() => !submitted && setSelected(i)}
                disabled={submitted}
                className={cn('w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all', style)}>
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold',
                  submitted && i === question.correctAnswer ? 'border-green-500 bg-green-500 text-white' :
                  submitted && i === selected ? 'border-red-500 bg-red-500 text-white' :
                  selected === i ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 text-slate-500'
                )}>
                  {submitted && i === question.correctAnswer ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                   submitted && i === selected && i !== question.correctAnswer ? <XCircle className="w-3.5 h-3.5" /> :
                   String.fromCharCode(65 + i)}
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">{option}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Result */}
      {submitted && (
        <div className={cn('rounded-2xl p-4 mb-6 flex items-center gap-3', isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200')}>
          {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
          <p className={cn('font-semibold text-sm', isCorrect ? 'text-green-800' : 'text-red-800')}>
            {isCorrect ? '✓ Correct! Well done.' : `✗ Incorrect. The correct answer is: "${question.options[question.correctAnswer]}"`}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button onClick={() => setSubmitted(true)} disabled={selected === null}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all">
            Submit Answer
          </button>
        ) : (
          <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-slate-50">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        )}
        <Link href="/practice/reading-mcs" className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm hover:bg-white">
          <ChevronLeft className="w-4 h-4" /> Back to list
        </Link>
      </div>
    </div>
  )
}
