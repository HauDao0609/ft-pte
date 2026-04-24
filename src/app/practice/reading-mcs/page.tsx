import QuestionList from '@/components/practice/QuestionList'
import { readingMCSQuestions } from '@/data/questions'
import { BookOpen } from 'lucide-react'

export default function ReadingMCSPage() {
  return (
    <QuestionList
      questions={readingMCSQuestions}
      sectionTitle="Multiple Choice (Single Answer)"
      sectionDescription="Read the passage and select the single best answer."
      hasAI={false}
      detailBasePath="/practice/reading-mcs"
      icon={<BookOpen className="w-5 h-5 text-green-600" />}
      color="bg-green-50"
    />
  )
}
