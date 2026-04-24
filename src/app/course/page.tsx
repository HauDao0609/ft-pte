import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Mic2, PenLine, BookOpen, Headphones, ArrowRight, Star, Users, Clock, Play, CheckCircle2 } from 'lucide-react'

const courses = [
  {
    id: 1, category: 'Speaking', icon: <Mic2 className="w-6 h-6" />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100',
    title: 'PTE Speaking Mastery',
    description: 'Master all 5 speaking question types with proven techniques. Improve your pronunciation, fluency, and content scores.',
    instructor: 'Expert PTE Trainer', rating: 4.9, students: 8400, duration: '12 hours',
    lessons: ['Read Aloud techniques', 'Repeat Sentence memory tricks', 'Describe Image templates', 'Re-tell Lecture note-taking', 'Answer Short Question shortcuts'],
    price: 'Free',
  },
  {
    id: 2, category: 'Writing', icon: <PenLine className="w-6 h-6" />, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100',
    title: 'PTE Writing Excellence',
    description: 'Learn how to write high-scoring essays and summaries. Templates and strategies that consistently deliver results.',
    instructor: 'PTE Writing Expert', rating: 4.8, students: 6200, duration: '8 hours',
    lessons: ['SWT key points identification', 'SWT grammar patterns', 'Essay structure templates', 'Grammar and vocabulary tips', 'Common essay topics'],
    price: 'Free',
  },
  {
    id: 3, category: 'Reading', icon: <BookOpen className="w-6 h-6" />, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100',
    title: 'PTE Reading Strategies',
    description: 'Time management and question-specific strategies for all reading question types. Focus on high-value FIB questions.',
    instructor: 'Reading Specialist', rating: 4.7, students: 5100, duration: '10 hours',
    lessons: ['FIB DnD strategies', 'FIB Dropdown techniques', 'Re-order paragraph logic', 'MCS & MCM approach', 'Time management mastery'],
    price: 'Free',
  },
  {
    id: 4, category: 'Listening', icon: <Headphones className="w-6 h-6" />, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100',
    title: 'PTE Listening Pro',
    description: 'Improve your listening accuracy and note-taking skills. WFD is worth the most points — master it first.',
    instructor: 'Listening Coach', rating: 4.9, students: 9800, duration: '9 hours',
    lessons: ['WFD memory techniques', 'SST note-taking system', 'HIW active listening', 'Listening FIB keywords', 'SMW prediction strategies'],
    price: 'Free',
  },
]

export default function CoursePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4">PTE Courses</h1>
            <p className="text-lg text-slate-300 mb-8">Expert-designed courses to maximize your PTE score. All courses are free.</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary-400" /> 30,000+ enrolled</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-400" /> 4.85 avg rating</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Always up to date</span>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className={`${course.bg} px-6 py-4 flex items-center gap-3 border-b ${course.border}`}>
                    <div className={course.color}>{course.icon}</div>
                    <span className={`text-sm font-bold ${course.color}`}>{course.category}</span>
                    <span className="ml-auto text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">{course.price}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-slate-800 mb-2">{course.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed">{course.description}</p>

                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-5">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {course.rating}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {course.students.toLocaleString()} students</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                    </div>

                    <div className="mb-5">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">What you'll learn</h4>
                      <ul className="space-y-1.5">
                        {course.lessons.map((lesson) => (
                          <li key={lesson} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-sm transition-all">
                        <Play className="w-4 h-4" /> Start Learning
                      </button>
                      <Link href={`/practice/read-alouds`}
                        className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50">
                        Practice <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
