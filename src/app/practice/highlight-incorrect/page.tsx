import QuestionList from '@/components/practice/QuestionList'
import { highlightIncorrectQuestions } from '@/data/questions'
import { Highlighter } from 'lucide-react'

export default function HighlightIncorrectPage() {
  return (
    <QuestionList
      questions={highlightIncorrectQuestions}
      sectionTitle="Highlight Incorrect Words"
      sectionDescription="Listen to the recording and click on the words that differ from what the speaker says."
      hasAI={false}
      detailBasePath="/practice/highlight-incorrect"
      icon={<Highlighter className="w-5 h-5 text-orange-600" />}
      color="bg-orange-50"
    />
  )
}
