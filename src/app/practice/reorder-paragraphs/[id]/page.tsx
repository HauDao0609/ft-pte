'use client'
import { useState } from 'react'
import Link from 'next/link'
import { reorderQuestions } from '@/data/questions'
import { ChevronLeft, ArrowUp, ArrowDown, CheckCircle2, XCircle, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ReorderDetailPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id)
  const question = reorderQuestions.find(q => q.id === id)
  const [order, setOrder] = useState(question ? [...question.paragraphs].sort(() => Math.random() - 0.5) : [])
  const [submitted, setSubmitted] = useState(false)

  if (!question) return <div className="p-8 text-slate-500">Question not found</div>

  const moveUp = (index: number) => {
    if (index === 0) return
    const newOrder = [...order]
    ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    setOrder(newOrder)
  }

  const moveDown = (index: number) => {
    if (index === order.length - 1) return
    const newOrder = [...order]
    ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    setOrder(newOrder)
  }

  const isCorrect = order.map(p => p.id).join(',') === question.correctOrder.join(',')
  const score = order.reduce((acc, p, i) => acc + (p.id === question.correctOrder[i] ? 1 : 0), 0)

  const reset = () => {
    setOrder([...question.paragraphs].sort(() => Math.random() - 0.5))
    setSubmitted(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/practice/reorder-paragraphs" className="hover:text-primary-600 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Re-order Paragraphs
        </Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-slate-800">{question.title}</h1>
          <p className="text-sm text-slate-500 mt-1">Drag or use buttons to arrange paragraphs in correct order</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm text-blue-800">
        <strong>Instructions:</strong> The text boxes below have been placed in a random order. Restore the original order by dragging or using the arrow buttons.
      </div>

      {/* Source box */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Arrange the paragraphs</h3>
          <div className="space-y-3">
            {order.map((para, index) => (
              <div key={para.id}
                className={cn(
                  'border-2 rounded-xl p-4 bg-white transition-all',
                  submitted
                    ? para.id === question.correctOrder[index]
                      ? 'border-green-300 bg-green-50'
                      : 'border-red-300 bg-red-50'
                    : 'border-slate-200 hover:border-primary-300'
                )}>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1 mt-1 shrink-0">
                    <button onClick={() => moveUp(index)} disabled={index === 0 || submitted}
                      className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed">
                      <ArrowUp className="w-3 h-3 text-slate-500" />
                    </button>
                    <button onClick={() => moveDown(index)} disabled={index === order.length - 1 || submitted}
                      className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed">
                      <ArrowDown className="w-3 h-3 text-slate-500" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </span>
                      {submitted && (
                        para.id === question.correctOrder[index]
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          : <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{para.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answer area (correct order shown after submit) */}
        {submitted && (
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Correct Order</h3>
            <div className="space-y-3">
              {question.correctOrder.map((id, i) => {
                const para = question.paragraphs.find(p => p.id === id)!
                return (
                  <div key={id} className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-xs font-bold text-green-600">Para {id}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{para.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Score */}
      {submitted && (
        <div className={cn('rounded-2xl p-5 mb-6 border', isCorrect ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200')}>
          <div className="flex items-center gap-3">
            {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-yellow-600" />}
            <div>
              <p className="font-bold text-slate-800">Score: {score}/{question.paragraphs.length}</p>
              <p className="text-sm text-slate-600">
                {isCorrect ? '🎉 Perfect! All paragraphs in correct order.' : `${score} of ${question.paragraphs.length} paragraphs are in the correct position.`}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!submitted ? (
          <button onClick={() => setSubmitted(true)}
            className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all">
            Submit Answer
          </button>
        ) : (
          <button onClick={reset} className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-medium">
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
        )}
        <Link href="/practice/reorder-paragraphs" className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-white text-slate-600 rounded-xl text-sm font-medium">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
      </div>
    </div>
  )
}
