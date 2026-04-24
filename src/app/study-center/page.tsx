'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { userStats } from '@/data/questions'
import {
  BarChart3, Target, Flame, Clock, Mic2, PenLine, BookOpen, Headphones,
  TrendingUp, Star, Calendar, CheckCircle2, Zap, Download
} from 'lucide-react'
import { cn, getScoreColor, getScoreBg } from '@/lib/utils'
import Link from 'next/link'

const tabs = ['Overview', 'AI Analysis', 'History', 'Study Plan']

const skillConfig = [
  { key: 'speaking', label: 'Speaking', icon: <Mic2 className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'writing', label: 'Writing', icon: <PenLine className="w-4 h-4" />, color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'reading', label: 'Reading', icon: <BookOpen className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-50' },
  { key: 'listening', label: 'Listening', icon: <Headphones className="w-4 h-4" />, color: 'text-orange-600', bg: 'bg-orange-50' },
]

const activityTypeLabels: Record<string, string> = {
  read_aloud: 'Read Aloud', write_dictation: 'Write from Dictation',
  write_essay: 'Write Essay', repeat_sentence: 'Repeat Sentence'
}

export default function StudyCenterPage() {
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between py-6">
              <div>
                <h1 className="text-2xl font-black text-slate-800">Study Center</h1>
                <p className="text-slate-500 text-sm mt-0.5">Track your progress and analyze your performance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-xl text-orange-600 text-sm font-bold border border-orange-100">
                  <Flame className="w-4 h-4" /> {userStats.streak} day streak
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              {tabs.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={cn('px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2',
                    activeTab === tab ? 'text-primary-600 border-primary-600' : 'text-slate-500 border-transparent hover:text-slate-700')}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Overview Tab */}
          {activeTab === 'Overview' && (
            <div>
              {/* Score Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="card p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <BarChart3 className="w-3.5 h-3.5" /> Total Practice
                  </div>
                  <div className="text-3xl font-black text-slate-800">{userStats.totalPractice}</div>
                  <div className="text-xs text-green-600 font-medium mt-1">+12 this week</div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Target className="w-3.5 h-3.5" /> Target Score
                  </div>
                  <div className="text-3xl font-black text-slate-800">{userStats.targetScore}</div>
                  <div className="text-xs text-slate-400 mt-1">PTE Overall</div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Estimated Score
                  </div>
                  <div className={cn('text-3xl font-black', getScoreColor(userStats.estimatedScore))}>{userStats.estimatedScore}</div>
                  <div className="text-xs text-primary-600 font-medium mt-1">+3 from last week</div>
                </div>
                <div className="card p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Flame className="w-3.5 h-3.5" /> Study Streak
                  </div>
                  <div className="text-3xl font-black text-orange-500">{userStats.streak}</div>
                  <div className="text-xs text-slate-400 mt-1">days in a row</div>
                </div>
              </div>

              {/* Skill Scores */}
              <div className="card p-6 mb-6">
                <h2 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary-600" /> Skill Scores
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {skillConfig.map((skill) => {
                    const score = userStats.skillScores[skill.key as keyof typeof userStats.skillScores]
                    return (
                      <div key={skill.key} className="text-center">
                        <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3', skill.bg, skill.color)}>
                          {skill.icon}
                        </div>
                        <div className={cn('text-3xl font-black', getScoreColor(score))}>{score}</div>
                        <div className="text-sm text-slate-500 mt-1">{skill.label}</div>
                        <div className="progress-bar mt-2">
                          <div className="progress-fill" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card p-6">
                <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary-600" /> Recent Activity
                </h2>
                <div className="space-y-3">
                  {userStats.recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">
                          {activity.count}x
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{activityTypeLabels[activity.type] || activity.type}</p>
                          <p className="text-xs text-slate-400">{activity.date}</p>
                        </div>
                      </div>
                      <div className={cn('text-sm font-bold', getScoreColor(activity.accuracy))}>
                        {activity.accuracy}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Analysis Tab */}
          {activeTab === 'AI Analysis' && (
            <div>
              <div className="card p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-800">AI Score Report Analysis</h2>
                    <p className="text-sm text-slate-500">Upload your official PTE score report for detailed AI analysis</p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-primary-300 transition-colors cursor-pointer group">
                  <Download className="w-10 h-10 text-slate-300 mx-auto mb-3 group-hover:text-primary-400 transition-colors" />
                  <p className="font-semibold text-slate-600 group-hover:text-primary-600">Upload Score Report</p>
                  <p className="text-sm text-slate-400 mt-1">PDF or image file</p>
                </div>
              </div>

              {/* Sample Analysis */}
              <div className="card p-6">
                <h2 className="font-bold text-slate-800 mb-4">Sample AI Analysis</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { skill: 'Speaking', issues: ['Pronunciation of consonant clusters', 'Unnatural pauses mid-sentence'], tips: ['Practice tongue twisters', 'Shadow native speakers daily'] },
                    { skill: 'Writing', issues: ['Repetitive vocabulary', 'Weak conclusion paragraphs'], tips: ['Learn 5 new synonyms daily', 'Practice essay endings'] },
                  ].map((item) => (
                    <div key={item.skill} className="bg-slate-50 rounded-2xl p-5">
                      <h3 className="font-bold text-slate-700 mb-3">{item.skill}</h3>
                      <div className="mb-3">
                        <p className="text-xs font-bold text-red-500 uppercase mb-2">Areas to Improve</p>
                        {item.issues.map((issue, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />{issue}
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-600 uppercase mb-2">Recommendations</p>
                        {item.tips.map((tip, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />{tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Study Plan Tab */}
          {activeTab === 'Study Plan' && (
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">AI Study Plan</h2>
                  <p className="text-sm text-slate-500">Personalized 4-week plan to reach your target score</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, wi) => (
                  <div key={week} className={cn('rounded-2xl p-4 border', wi === 0 ? 'border-primary-200 bg-primary-50' : 'border-slate-100 bg-white')}>
                    <h3 className="font-bold text-slate-700 mb-3">{week}</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {[
                        ['Read Aloud', '10/day'],
                        ['Write Dictation', '15/day'],
                        ['Vocab', '20 words'],
                      ].map(([task, count]) => (
                        <li key={task} className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            {wi === 0 && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
                            {task}
                          </span>
                          <span className="text-xs text-slate-400">{count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
