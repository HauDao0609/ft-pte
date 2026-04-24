import QuestionList from '@/components/practice/QuestionList'
import { fibDragDropQuestions } from '@/data/questions'
import { MoveHorizontal } from 'lucide-react'

export default function FIBDragDropPage() {
  return (
    <QuestionList
      questions={fibDragDropQuestions}
      sectionTitle="Fill in the Blanks (Drag & Drop)"
      sectionDescription="Drag words from the box to fill the blanks in the passage."
      hasAI={false}
      detailBasePath="/practice/fib-dragdrop"
      icon={<MoveHorizontal className="w-5 h-5 text-green-600" />}
      color="bg-green-50"
    />
  )
}
