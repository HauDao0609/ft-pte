import QuestionList from '@/components/practice/QuestionList'
import { writeEssayQuestions } from '@/data/questions'
import { PenLine } from 'lucide-react'

export default function WriteEssayPage() {
  return (
    <QuestionList
      questions={writeEssayQuestions}
      sectionTitle="Write Essay"
      sectionDescription="Write an essay on the given topic in 20 minutes. 200-300 words required."
      hasAI={true}
      detailBasePath="/practice/write-essay"
      icon={<PenLine className="w-5 h-5 text-purple-600" />}
      color="bg-purple-50"
    />
  )
}
