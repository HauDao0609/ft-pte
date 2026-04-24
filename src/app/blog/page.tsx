import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { BookOpen, ArrowRight, Clock, Tag } from 'lucide-react'

const blogPosts = [
  { id: 1, slug: 'what-is-pte', title: 'What is PTE Academic? Complete Guide 2024', excerpt: 'PTE Academic is a computer-based English language test. Learn everything about the test format, scoring, and how to prepare effectively.', category: 'PTE Guide', readTime: '8 min', date: '2024-12-10', tags: ['Overview', 'Beginner'] },
  { id: 2, slug: 'pte-vs-ielts', title: 'PTE vs IELTS: Which is Right for You?', excerpt: 'Compare PTE Academic and IELTS in terms of format, difficulty, acceptance, cost, and preparation time to make the right choice.', category: 'Comparison', readTime: '6 min', date: '2024-12-08', tags: ['PTE', 'IELTS'] },
  { id: 3, slug: 'read-aloud-tips', title: 'Read Aloud Exam Tips: Score 90 Every Time', excerpt: 'Read Aloud is one of the highest-scoring question types. Master pronunciation, fluency, and content with these proven strategies.', category: 'Speaking', readTime: '5 min', date: '2024-12-05', tags: ['Speaking', 'Tips'] },
  { id: 4, slug: 'write-from-dictation', title: 'Write from Dictation: The Secret to 90 Listening', excerpt: 'WFD contributes the most to your listening score. Learn memory techniques and practice strategies to maximize your WFD score.', category: 'Listening', readTime: '7 min', date: '2024-12-01', tags: ['Listening', 'WFD'] },
  { id: 5, slug: 'essay-templates', title: 'PTE Essay Templates That Actually Work', excerpt: 'Use proven essay structures and templates to write high-scoring essays in 20 minutes. Includes 10 ready-to-use templates.', category: 'Writing', readTime: '10 min', date: '2024-11-28', tags: ['Writing', 'Templates'] },
  { id: 6, slug: 'pte-scoring', title: 'How PTE is Scored: Complete Breakdown', excerpt: 'Understand exactly how PTE scores are calculated for each question type and skill area, so you can prioritize your preparation.', category: 'PTE Guide', readTime: '9 min', date: '2024-11-20', tags: ['Scoring', 'Strategy'] },
]

const categoryColors: Record<string, string> = {
  'PTE Guide': 'bg-blue-50 text-blue-700',
  'Comparison': 'bg-purple-50 text-purple-700',
  'Speaking': 'bg-green-50 text-green-700',
  'Listening': 'bg-orange-50 text-orange-700',
  'Writing': 'bg-pink-50 text-pink-700',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white border-b border-slate-100 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-black text-slate-800 mb-3">PTE Knowledge Base</h1>
            <p className="text-slate-500">Expert guides, tips and strategies to ace your PTE exam.</p>
          </div>
        </section>

        <section className="bg-slate-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-primary-200 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-slate-100 text-slate-600'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-bold text-slate-800 mb-2 group-hover:text-primary-700 transition-colors leading-snug">{post.title}</h2>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{tag}</span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
