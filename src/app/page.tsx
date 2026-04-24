import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { weeklyPrediction, practiceNav } from '@/data/questions'
import {
  ArrowRight, Zap, TrendingUp, BookOpen, Volume2, PenLine,
  Headphones, Star, CheckCircle2, Users, Award, Brain, Download,
  Mic2, BarChart3, Flame, Sparkles, ChevronRight
} from 'lucide-react'

const stats = [
  { label: 'Active Users',        value: '100K+',  accent: 'text-primary-400' },
  { label: 'Practice Questions',  value: '2,000+', accent: 'text-emerald-400' },
  { label: 'AI Scorings Daily',   value: '50K+',   accent: 'text-violet-400' },
  { label: 'Score Improvement',   value: '+12pts', accent: 'text-amber-400' },
]

const whyPTE = [
  { icon: '⏱️', title: 'Single 2-hour test', desc: 'Complete everything in one sitting without multiple test dates', color: 'border-primary-500/20 hover:border-primary-500/40' },
  { icon: '⚡', title: 'Results in 48 hours', desc: 'Get your scores typically within 48 hours of the test', color: 'border-emerald-500/20 hover:border-emerald-500/40' },
  { icon: '🤖', title: 'Computer-based scoring', desc: 'Fair and impartial AI scoring eliminates human bias', color: 'border-violet-500/20 hover:border-violet-500/40' },
  { icon: '🌍', title: 'Accepted worldwide', desc: 'Recognized by governments and universities globally', color: 'border-sky-500/20 hover:border-sky-500/40' },
]

const tools = [
  { icon: <BookOpen className="w-5 h-5" />, title: 'Vocab Book', desc: 'Contains 90% exam vocabularies', href: '/vocab', tag: '12,000 words', gradient: 'from-sky-500/20 to-sky-600/10', iconColor: 'text-sky-400', border: 'border-sky-500/20' },
  { icon: <Volume2 className="w-5 h-5" />, title: 'Shadowing', desc: 'Improve Read Aloud in 14 days', href: '/practice/read-alouds?mode=shadowing', tag: 'Proven method', gradient: 'from-emerald-500/20 to-emerald-600/10', iconColor: 'text-emerald-400', border: 'border-emerald-500/20' },
  { icon: <Brain className="w-5 h-5" />, title: 'AI Study Plan', desc: 'Personalized study schedule', href: '/study-center', tag: 'Personalized', gradient: 'from-violet-500/20 to-violet-600/10', iconColor: 'text-violet-400', border: 'border-violet-500/20' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Score Analysis', desc: 'Accurate AI score report', href: '/study-center?tab=analysis', tag: 'Detailed', gradient: 'from-amber-500/20 to-amber-600/10', iconColor: 'text-amber-400', border: 'border-amber-500/20' },
]

const skillMeta = {
  Speaking:  { icon: <Mic2 className="w-5 h-5" />,       color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'hover:shadow-emerald-500/10', bar: 'bg-emerald-400', label: 'skill-border-speaking' },
  Writing:   { icon: <PenLine className="w-5 h-5" />,    color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20',  glow: 'hover:shadow-violet-500/10',  bar: 'bg-violet-400',  label: 'skill-border-writing'  },
  Reading:   { icon: <BookOpen className="w-5 h-5" />,   color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     glow: 'hover:shadow-sky-500/10',     bar: 'bg-sky-400',     label: 'skill-border-reading'  },
  Listening: { icon: <Headphones className="w-5 h-5" />, color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   glow: 'hover:shadow-amber-500/10',   bar: 'bg-amber-400',   label: 'skill-border-listening' },
}

const pteGuides = [
  { section: 'PTE Academic Guide', color: 'text-primary-400', border: 'border-primary-500/20', items: ['What is PTE Academic?', 'PTE vs IELTS comparison', 'How PTE is scored', 'How to book PTE exams', 'How to prepare for PTE'] },
  { section: 'PTE Speaking Guide', color: 'text-emerald-400', border: 'border-emerald-500/20', items: ['Read Aloud exam tips', 'Repeat Sentence tips', 'Describe Image tips', 'Re-tell Lecture tips', 'Answer Short Question tips'] },
  { section: 'PTE Writing Guide', color: 'text-violet-400', border: 'border-violet-500/20', items: ['Summarize Written Text tips', 'Write Essay tips', 'Essay templates', 'Grammar essentials'] },
  { section: 'PTE Listening Guide', color: 'text-amber-400', border: 'border-amber-500/20', items: ['Summarize Spoken Text tips', 'Write from Dictation tips', 'Highlight Incorrect Words tips', 'Fill in the Blanks tips'] },
]

const aiFeatures = [
  { label: 'Pronunciation Analysis', score: 95, desc: 'Phoneme-level feedback',   color: 'from-emerald-500 to-teal-500' },
  { label: 'Fluency Detection',      score: 92, desc: 'Pace and rhythm scoring',   color: 'from-sky-500 to-blue-500' },
  { label: 'Grammar Check',          score: 98, desc: 'Advanced grammar analysis', color: 'from-violet-500 to-purple-500' },
  { label: 'Content Scoring',        score: 88, desc: 'Key point identification',  color: 'from-primary-500 to-indigo-500' },
  { label: 'Spelling Check',         score: 99, desc: 'Real-time spell check',     color: 'from-amber-500 to-orange-500' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-950">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: '#09090b' }}>
        {/* Orb glows */}
        <div className="hero-orb w-[500px] h-[500px] opacity-25"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
        <div className="hero-orb w-[400px] h-[400px] opacity-15"
          style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)', top: '50px', right: '-80px' }} />
        <div className="hero-orb w-[300px] h-[300px] opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', bottom: '0', left: '40%' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8"
                style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                PTE Academic &amp; PTE Core Practice
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.08] mb-6"
                style={{ fontFamily: 'Plus Jakarta Sans', letterSpacing: '-0.02em' }}>
                Practice PTE with
                <br />
                <span className="text-gradient">AI Scoring</span>
                <br />
                for FREE
              </h1>

              <p className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-md">
                Join 100,000 PTE test takers. Practice all question types with instant AI feedback to maximize your score.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/practice/read-alouds"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-400 transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40">
                  Start Practicing <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/login?type=signup" className="btn-ghost px-7 py-3.5">
                  Sign Up Free
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className={`text-2xl font-black ${s.accent} mb-0.5`}>{s.value}</div>
                    <div className="text-[11px] text-zinc-600 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Weekly Prediction card */}
            <div className="animate-slide-up space-y-4">
              <div className="rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary-400" />
                  <h3 className="text-white font-bold">Weekly Prediction</h3>
                </div>
                <p className="text-zinc-500 text-xs mb-6">Updated every week with real exam frequency data</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { val: weeklyPrediction.newCount,     label: 'New Questions',  color: 'text-emerald-400', dot: 'bg-emerald-400' },
                    { val: weeklyPrediction.predictCount, label: 'Predicted',      color: 'text-primary-400', dot: 'bg-primary-400' },
                    { val: weeklyPrediction.updateCount,  label: 'Updated',        color: 'text-amber-400',   dot: 'bg-amber-400'   },
                    { val: `${weeklyPrediction.repeatRate}%`, label: 'Repeat Rate', color: 'text-sky-400',    dot: 'bg-sky-400'     },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl p-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className={`text-3xl font-black ${item.color}`}>{item.val}</div>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                        <span className="text-[11px] text-zinc-500 font-medium">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/practice/read-alouds"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all bg-primary-500/15 text-primary-300 border border-primary-500/25 hover:bg-primary-500/25">
                  View All Predictions <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* AI chip */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                style={{ background: 'rgba(244,114,182,0.08)', border: '1px solid rgba(244,114,182,0.18)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-pink-500/15 shrink-0">
                  <Zap className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Speaking &amp; Writing AI Scoring</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">Evaluate pronunciation, fluency, grammar and spelling instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practice Types ── */}
      <section className="py-20" style={{ background: '#0d0d10' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">All Question Types</p>
            <h2 className="text-3xl font-black text-white">Practice every PTE skill</h2>
            <p className="text-zinc-500 mt-2">AI-powered feedback across all 4 sections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {practiceNav.map((section) => {
              const meta = skillMeta[section.section as keyof typeof skillMeta]
              return (
                <div key={section.section}
                  className={`rounded-2xl p-5 border transition-all duration-300 hover:shadow-xl ${meta.border} ${meta.glow}`}
                  style={{ background: '#18181b' }}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${meta.bg}`}>
                    <span className={meta.color}>{meta.icon}</span>
                  </div>
                  <h3 className={`font-bold text-sm mb-1 ${meta.color}`}>{section.section}</h3>
                  <p className="text-zinc-600 text-xs mb-4">{section.items.length} question types</p>

                  <ul className="space-y-1.5">
                    {section.items.slice(0, 5).map((item) => (
                      <li key={item.label}>
                        <Link href={item.href}
                          className="flex items-center justify-between text-xs text-zinc-500 hover:text-zinc-200 py-1 transition-colors group">
                          <span className="truncate">{item.label}</span>
                          <div className="flex items-center gap-1 shrink-0 ml-2">
                            {item.hasAI && <Zap className="w-2.5 h-2.5 text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            <ChevronRight className="w-3 h-3 text-zinc-700 group-hover:text-zinc-400 transition-colors" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link href={section.items[0].href}
                    className={`mt-4 text-xs font-semibold flex items-center gap-1 transition-colors ${meta.color} opacity-70 hover:opacity-100`}>
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AI Scoring + Why PTE ── */}
      <section className="py-20 bg-mesh" style={{ background: '#09090b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Why PTE */}
            <div>
              <p className="section-label mb-3">Why Choose PTE?</p>
              <h2 className="text-3xl font-black text-white mb-4">
                Accepted by governments &amp; universities worldwide
              </h2>
              <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
                PTE Academic is a computer-based English proficiency test trusted by thousands of institutions globally.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {whyPTE.map((item) => (
                  <div key={item.title}
                    className={`rounded-2xl p-5 border transition-all duration-200 ${item.color}`}
                    style={{ background: '#18181b' }}>
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h4 className="font-bold text-white text-sm mb-1.5">{item.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <a href="https://www.pearsonpte.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
                Learn more about PTE <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* AI Features */}
            <div className="rounded-2xl p-7"
              style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-2 mb-7">
                <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center">
                  <Award className="w-4 h-4 text-pink-400" />
                </div>
                <h3 className="font-bold text-white">AI Scoring Capabilities</h3>
              </div>
              <div className="space-y-5">
                {aiFeatures.map((feature) => (
                  <div key={feature.label}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-sm font-semibold text-zinc-200">{feature.label}</span>
                        <span className="text-xs text-zinc-600 ml-2">{feature.desc}</span>
                      </div>
                      <span className="text-sm font-bold text-zinc-300">{feature.score}%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${feature.color} transition-all duration-700`}
                        style={{ width: `${feature.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Study Tools ── */}
      <section className="py-20" style={{ background: '#0d0d10' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Study Tools</p>
            <h2 className="text-3xl font-black text-white">Everything you need to ace PTE</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {tools.map((tool) => (
              <Link key={tool.title} href={tool.href}
                className={`rounded-2xl p-6 border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group ${tool.border}`}
                style={{ background: `linear-gradient(135deg, ${tool.gradient.replace('from-', '').replace('to-', '')})`, backgroundColor: '#18181b' }}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${tool.gradient}`}>
                  <span className={tool.iconColor}>{tool.icon}</span>
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-2">{tool.tag}</span>
                <h3 className={`font-bold text-white text-sm group-hover:${tool.iconColor} transition-colors`}>{tool.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Download Banner ── */}
      <section className="py-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #0f172a 100%)' }}>
        <div className="hero-orb w-72 h-72 opacity-30"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', top: '-50px', right: '10%' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-300 mb-2">Free Resources</p>
              <h2 className="text-3xl font-black text-white mb-2">Download PTE Study Materials</h2>
              <p className="text-primary-300/70 text-sm">Templates, tips and prediction files from PTE teaching experts.</p>
            </div>
            <Link href="/study-materials"
              className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all shadow-lg whitespace-nowrap">
              <Download className="w-4 h-4" /> Download Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── Knowledge Base ── */}
      <section className="py-20" style={{ background: '#09090b' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Knowledge Base</p>
            <h2 className="text-3xl font-black text-white">PTE Exam Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pteGuides.map((guide) => (
              <div key={guide.section}
                className={`rounded-2xl p-5 border ${guide.border} transition-all`}
                style={{ background: '#18181b' }}>
                <h3 className={`font-bold text-sm mb-4 ${guide.color}`}>{guide.section}</h3>
                <ul className="space-y-2.5">
                  {guide.items.map((item) => (
                    <li key={item}>
                      <Link href="/blog"
                        className="flex items-start gap-2 text-xs text-zinc-500 hover:text-zinc-200 transition-colors group">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-40 group-hover:opacity-80 transition-opacity" />
                        <span className="leading-relaxed group-hover:underline underline-offset-2">{item}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial + CTA ── */}
      <section className="py-20 relative overflow-hidden" style={{ background: '#0d0d10' }}>
        <div className="hero-orb w-96 h-96 opacity-20"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <blockquote className="text-2xl font-bold text-white mb-4 leading-snug">
            "PTEUni's AI scoring helped me improve my speaking score from 65 to 82 in just 3 weeks!"
          </blockquote>
          <p className="text-zinc-500 text-sm mb-14">— Sarah Chen, scored 86 overall</p>

          <div className="rounded-2xl p-10"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="w-12 h-12 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-3">Ready to get your target score?</h2>
            <p className="text-zinc-500 mb-8 text-sm">Start practicing for free today. No credit card required.</p>
            <Link href="/login?type=signup"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary-500 text-white font-bold rounded-2xl hover:bg-primary-400 transition-all shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 text-base">
              Start Practicing Free <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
