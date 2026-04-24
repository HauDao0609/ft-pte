'use client'
import { useState } from 'react'
import Link from 'next/link'
import { reorderQuestions } from '@/data/questions'
import { ArrowUpDown, ChevronLeft, CheckCircle2, XCircle, RotateCcw, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import QuestionList from '@/components/practice/QuestionList'

export default function ReorderPage() {
  return (
    <QuestionList
      questions={reorderQuestions}
      sectionTitle="Re-order Paragraphs"
      sectionDescription="Drag and drop paragraphs into the correct order."
      hasAI={false}
      detailBasePath="/practice/reorder-paragraphs"
      icon={<ArrowUpDown className="w-5 h-5 text-green-600" />}
      color="bg-green-50"
    />
  )
}
