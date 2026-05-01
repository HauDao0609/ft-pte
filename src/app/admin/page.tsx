import {
  Users,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Activity,
  UserPlus,
  Upload,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from 'lucide-react'

const stats = [
  {
    label: 'Total Users',
    value: '12,480',
    change: '+8.2%',
    up: true,
    icon: Users,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    label: 'Active Today',
    value: '1,034',
    change: '+12.5%',
    up: true,
    icon: Activity,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    label: 'Total Questions',
    value: '2,340',
    change: '+3.1%',
    up: true,
    icon: ClipboardList,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    label: 'Lessons Uploaded',
    value: '186',
    change: '-1.4%',
    up: false,
    icon: BookOpen,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
]

const recentActivity = [
  { icon: UserPlus, color: 'text-indigo-400', bg: 'bg-indigo-500/10', text: 'New user registered', sub: 'minhnguyen@gmail.com', time: '2 min ago' },
  { icon: Upload, color: 'text-emerald-400', bg: 'bg-emerald-500/10', text: 'Lesson uploaded', sub: 'Read Aloud — Unit 12', time: '18 min ago' },
  { icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/10', text: 'Question marked predicted', sub: 'Describe Image #387', time: '45 min ago' },
  { icon: UserPlus, color: 'text-indigo-400', bg: 'bg-indigo-500/10', text: 'New user registered', sub: 'lethanhha@yahoo.com', time: '1 hr ago' },
  { icon: Upload, color: 'text-violet-400', bg: 'bg-violet-500/10', text: 'Test batch imported', sub: '24 Write Essay questions', time: '2 hr ago' },
  { icon: Upload, color: 'text-sky-400', bg: 'bg-sky-500/10', text: 'Audio uploaded', sub: 'Repeat Sentence #201-220', time: '3 hr ago' },
]

const quickActions = [
  { label: 'Add User', href: '/admin/users', icon: UserPlus, color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25 hover:bg-indigo-500/25' },
  { label: 'Upload Content', href: '/admin/content', icon: Upload, color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25 hover:bg-emerald-500/25' },
  { label: 'Add Question', href: '/admin/questions', icon: ClipboardList, color: 'bg-sky-500/15 text-sky-300 border-sky-500/25 hover:bg-sky-500/25' },
]

const skillBreakdown = [
  { skill: 'Speaking', count: 780, color: 'bg-emerald-500', pct: 33 },
  { skill: 'Writing', count: 460, color: 'bg-violet-500', pct: 20 },
  { skill: 'Reading', count: 590, color: 'bg-sky-500', pct: 25 },
  { skill: 'Listening', count: 510, color: 'bg-amber-500', pct: 22 },
]

export default function AdminOverviewPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Tổng quan hệ thống PTEUni</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, up, icon: Icon, color, bg, border }) => (
          <div key={label} className={`rounded-2xl p-5 border ${border}`} style={{ background: '#18181b' }}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${up ? 'text-emerald-400' : 'text-red-400'}`}>
                {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl border p-6 space-y-4" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Questions by Skill
            </h2>
            <span className="text-xs text-zinc-500">2,340 total</span>
          </div>
          <div className="space-y-4">
            {skillBreakdown.map(({ skill, count, color, pct }) => (
              <div key={skill}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-zinc-300 font-medium">{skill}</span>
                  <span className="text-zinc-500">{count} questions</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-6 space-y-4" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
          <h2 className="text-sm font-semibold text-white">Quick Actions</h2>
          <div className="space-y-2">
            {quickActions.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${color}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-6" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-400" />
          Recent Activity
        </h2>
        <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          {recentActivity.map(({ icon: Icon, color, bg, text, sub, time }, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-200 font-medium">{text}</p>
                <p className="text-xs text-zinc-500 truncate">{sub}</p>
              </div>
              <span className="text-xs text-zinc-600 shrink-0">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
