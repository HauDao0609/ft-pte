import QuestionList from '@/components/practice/QuestionList'
import { readAloudQuestions } from '@/data/questions'
import { Mic2 } from 'lucide-react'

export default function ReadAloudPage() {
  return (
    <QuestionList
      questions={readAloudQuestions}
      sectionTitle="Read Aloud"
      sectionDescription="Read the text aloud. Your pronunciation, fluency, and content will be scored."
      hasAI={true}
      detailBasePath="/practice/read-alouds"
      icon={<Mic2 className="w-5 h-5 text-blue-600" />}
      color="bg-blue-50"
    />
  )
}
