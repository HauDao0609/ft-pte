import QuestionList from '@/components/practice/QuestionList'
import { fibDropdownQuestions } from '@/data/questions'
import { ChevronDown } from 'lucide-react'

export default function FIBDropdownPage() {
  return (
    <QuestionList
      questions={fibDropdownQuestions}
      sectionTitle="Fill in the Blanks (Dropdown)"
      sectionDescription="Select the most appropriate word from the dropdown to fill each blank."
      hasAI={false}
      detailBasePath="/practice/fib-dropdown"
      icon={<ChevronDown className="w-5 h-5 text-green-600" />}
      color="bg-green-50"
    />
  )
}
