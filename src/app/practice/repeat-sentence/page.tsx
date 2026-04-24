// Repeat Sentence
import QuestionList from '@/components/practice/QuestionList'
import { repeatSentenceQuestions } from '@/data/questions'
import { Volume2 } from 'lucide-react'

export default function RepeatSentencePage() {
  return (
    <QuestionList
      questions={repeatSentenceQuestions}
      sectionTitle="Repeat Sentence"
      sectionDescription="Listen to a sentence and repeat it exactly. Pronunciation and fluency are scored."
      hasAI={true}
      detailBasePath="/practice/repeat-sentence"
      icon={<Volume2 className="w-5 h-5 text-blue-600" />}
      color="bg-blue-50"
    />
  )
}
