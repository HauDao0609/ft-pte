import QuestionList from '@/components/practice/QuestionList'
import { writeDictationQuestions } from '@/data/questions'
import { Headphones } from 'lucide-react'

export default function WriteDictationPage() {
  return (
    <QuestionList
      questions={writeDictationQuestions}
      sectionTitle="Write From Dictation"
      sectionDescription="Listen to a sentence and type it exactly as you hear it."
      hasAI={false}
      detailBasePath="/practice/write-dictation"
      icon={<Headphones className="w-5 h-5 text-orange-600" />}
      color="bg-orange-50"
    />
  )
}
