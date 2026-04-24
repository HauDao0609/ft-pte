import QuestionList from '@/components/practice/QuestionList'
import { summarizeWrittenQuestions } from '@/data/questions'
import { PenLine } from 'lucide-react'

export default function SummarizeWrittenPage() {
  return (
    <QuestionList
      questions={summarizeWrittenQuestions}
      sectionTitle="Summarize Written Text"
      sectionDescription="Read a passage and write a one-sentence summary in 5-75 words within 10 minutes."
      hasAI={true}
      detailBasePath="/practice/summarize-written"
      icon={<PenLine className="w-5 h-5 text-purple-600" />}
      color="bg-purple-50"
    />
  )
}
