import QuestionList from '@/components/practice/QuestionList'
import { describeImageQuestions } from '@/data/questions'
import { Image } from 'lucide-react'

export default function DescribeImagePage() {
  return (
    <QuestionList
      questions={describeImageQuestions}
      sectionTitle="Describe Image"
      sectionDescription="Describe the image in 25 seconds. Content, pronunciation, and fluency are scored."
      hasAI={true}
      detailBasePath="/practice/describe-image"
      icon={<Image className="w-5 h-5 text-blue-600" />}
      color="bg-blue-50"
    />
  )
}
