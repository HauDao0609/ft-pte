import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Download, FileText, BookOpen, Headphones, Mic2, PenLine, Star, Clock } from 'lucide-react'

const materials = [
  {
    category: 'Speaking',
    icon: <Mic2 className="w-5 h-5" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    items: [
      { title: 'Read Aloud Top 100 Predictions', type: 'PDF', size: '2.3 MB', downloads: 45000, updated: '2024-12-10' },
      { title: 'Describe Image Templates & Tips', type: 'PDF', size: '1.8 MB', downloads: 32000, updated: '2024-12-08' },
      { title: 'Repeat Sentence 200+ Practice Set', type: 'PDF', size: '3.1 MB', downloads: 28000, updated: '2024-12-05' },
    ]
  },
  {
    category: 'Writing',
    icon: <PenLine className="w-5 h-5" />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    items: [
      { title: 'Essay Templates - All Categories', type: 'PDF', size: '1.5 MB', downloads: 51000, updated: '2024-12-12' },
      { title: 'SWT Sample Answers Collection', type: 'PDF', size: '2.0 MB', downloads: 23000, updated: '2024-11-28' },
    ]
  },
  {
    category: 'Reading',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'text-green-600',
    bg: 'bg-green-50',
    items: [
      { title: 'FIB Word Lists & Practice', type: 'PDF', size: '2.7 MB', downloads: 38000, updated: '2024-12-01' },
      { title: 'Reorder Paragraphs Strategy Guide', type: 'PDF', size: '1.2 MB', downloads: 19000, updated: '2024-11-20' },
    ]
  },
  {
    category: 'Listening',
    icon: <Headphones className="w-5 h-5" />,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    items: [
      { title: 'Write from Dictation 300+ Sentences', type: 'PDF', size: '1.9 MB', downloads: 72000, updated: '2024-12-14' },
      { title: 'Highlight Incorrect Words Practice', type: 'PDF', size: '2.4 MB', downloads: 21000, updated: '2024-11-15' },
    ]
  },
]

export default function StudyMaterialsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary-700 to-primary-500 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl font-black mb-3">PTE Study Materials</h1>
            <p className="text-primary-200 text-lg">Curated by expert PTE teachers. Updated weekly with the latest predictions.</p>
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            {materials.map((section) => (
              <div key={section.category}>
                <div className={`flex items-center gap-2 ${section.color} font-bold mb-4`}>
                  {section.icon} {section.category}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {section.items.map((item) => (
                    <div key={item.title} className="bg-white rounded-2xl border border-slate-100 p-5 hover:border-primary-200 hover:shadow-sm transition-all group">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-10 h-10 ${section.bg} rounded-xl flex items-center justify-center shrink-0`}>
                          <FileText className={`w-5 h-5 ${section.color}`} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-primary-700">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                            <span>{item.type}</span>
                            <span>·</span>
                            <span>{item.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Download className="w-3 h-3" /> {item.downloads.toLocaleString()} downloads
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="w-3 h-3" /> {item.updated}
                        </div>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl text-sm transition-all">
                        <Download className="w-3.5 h-3.5" /> Download Free
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
