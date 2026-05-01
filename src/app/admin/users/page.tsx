'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  Crown,
  ShieldOff,
  Trash2,
  Eye,
  ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface User {
  id: number
  name: string
  email: string
  plan: 'Free' | 'Premium'
  score: number
  joined: string
  status: 'Active' | 'Banned'
  lastSeen: string
  attempts: number
}

const mockUsers: User[] = [
  { id: 1, name: 'Nguyễn Minh Anh', email: 'minhanh@gmail.com', plan: 'Premium', score: 82, joined: '2025-01-12', status: 'Active', lastSeen: '2 min ago', attempts: 340 },
  { id: 2, name: 'Trần Lê Hoàng', email: 'hoang.tran@yahoo.com', plan: 'Free', score: 65, joined: '2025-02-20', status: 'Active', lastSeen: '1 hr ago', attempts: 120 },
  { id: 3, name: 'Phạm Thu Hà', email: 'thuha.pham@gmail.com', plan: 'Premium', score: 79, joined: '2024-11-05', status: 'Active', lastSeen: '3 hr ago', attempts: 520 },
  { id: 4, name: 'Lê Quang Huy', email: 'quanghuy@outlook.com', plan: 'Free', score: 58, joined: '2025-03-14', status: 'Banned', lastSeen: '2 days ago', attempts: 45 },
  { id: 5, name: 'Võ Thị Lan', email: 'vothilan@gmail.com', plan: 'Premium', score: 90, joined: '2024-09-01', status: 'Active', lastSeen: '5 min ago', attempts: 890 },
  { id: 6, name: 'Đặng Văn Phúc', email: 'phuc.dang@gmail.com', plan: 'Free', score: 71, joined: '2025-04-02', status: 'Active', lastSeen: '20 min ago', attempts: 200 },
  { id: 7, name: 'Bùi Khánh Linh', email: 'khanhlinhb@gmail.com', plan: 'Premium', score: 85, joined: '2025-01-28', status: 'Active', lastSeen: '1 day ago', attempts: 430 },
  { id: 8, name: 'Hoàng Ngọc Tuấn', email: 'tuanhn@yahoo.com', plan: 'Free', score: 42, joined: '2025-03-30', status: 'Banned', lastSeen: '5 days ago', attempts: 30 },
]

const PLAN_FILTERS = ['All', 'Free', 'Premium'] as const
const STATUS_FILTERS = ['All', 'Active', 'Banned'] as const

type PlanFilter = typeof PLAN_FILTERS[number]
type StatusFilter = typeof STATUS_FILTERS[number]

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState<PlanFilter>('All')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [openMenu, setOpenMenu] = useState<number | null>(null)

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchPlan = planFilter === 'All' || u.plan === planFilter
    const matchStatus = statusFilter === 'All' || u.status === statusFilter
    return matchSearch && matchPlan && matchStatus
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-sm text-zinc-500 mt-1">Quản lý tài khoản người dùng</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}>
          <UserPlus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-200 outline-none transition-all border focus:border-indigo-500/50"
            style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <select
              value={planFilter}
              onChange={e => setPlanFilter(e.target.value as PlanFilter)}
              className="pl-8 pr-8 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
              style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {PLAN_FILTERS.map(f => <option key={f} value={f}>{f === 'All' ? 'All Plans' : f}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as StatusFilter)}
              className="pl-4 pr-8 py-2.5 rounded-xl text-sm text-zinc-300 outline-none border appearance-none cursor-pointer"
              style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {STATUS_FILTERS.map(f => <option key={f} value={f}>{f === 'All' ? 'All Status' : f}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border overflow-hidden" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <th className="text-left px-5 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">User</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Plan</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Score</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Attempts</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Joined</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Seen</th>
                <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}
                      >
                        {user.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
                      user.plan === 'Premium'
                        ? 'text-amber-300 bg-amber-500/10 border-amber-500/20'
                        : 'text-zinc-400 bg-white/[0.04] border-white/[0.08]'
                    )}>
                      {user.plan === 'Premium' && <Crown className="w-2.5 h-2.5" />}
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      'font-semibold',
                      user.score >= 79 ? 'text-emerald-400' : user.score >= 65 ? 'text-amber-400' : 'text-red-400'
                    )}>
                      {user.score}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-400">{user.attempts}</td>
                  <td className="px-4 py-4 text-zinc-500">{user.joined}</td>
                  <td className="px-4 py-4 text-zinc-500">{user.lastSeen}</td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                      user.status === 'Active'
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-red-400 bg-red-500/10'
                    )}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', user.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400')} />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.06] transition-all"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openMenu === user.id && (
                        <div
                          className="absolute right-0 top-8 z-10 w-44 rounded-xl border py-1 shadow-xl"
                          style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.1)' }}
                        >
                          <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-zinc-300 hover:bg-white/[0.06] transition-colors">
                            <Eye className="w-3.5 h-3.5 text-zinc-500" />
                            View Profile
                          </button>
                          <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-zinc-300 hover:bg-white/[0.06] transition-colors">
                            <ShieldOff className="w-3.5 h-3.5 text-amber-500" />
                            {user.status === 'Active' ? 'Ban User' : 'Unban User'}
                          </button>
                          <div className="my-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }} />
                          <button className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-zinc-600 text-sm">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-zinc-500">Showing {filtered.length} of {mockUsers.length} users</p>
          <div className="flex gap-1.5">
            <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">Prev</button>
            <button className="px-3 py-1.5 rounded-lg text-xs text-white bg-indigo-500/20 border border-indigo-500/30">1</button>
            <button className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
