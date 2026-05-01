'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Eye, EyeOff, AlertCircle } from 'lucide-react'

const ADMIN_EMAIL = 'admin@pteuni.com'
const ADMIN_PASSWORD = 'admin123'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('admin_authed') === 'true') {
      router.replace('/admin')
    }
  }, [router])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('admin_authed', 'true')
        router.replace('/admin')
      } else {
        setError('Email hoặc mật khẩu không đúng.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#09090b' }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-base font-bold text-white leading-none">PTEUni</p>
            <p className="text-xs text-indigo-400 mt-0.5">Admin Panel</p>
          </div>
        </div>

        <div className="rounded-2xl border p-7 space-y-5" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-white">Sign in to Admin</h1>
            <p className="text-sm text-zinc-500 mt-1">Chỉ dành cho quản trị viên</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@pteuni.com"
                required
                className="w-full px-4 py-2.5 rounded-xl text-sm text-zinc-200 outline-none border focus:border-indigo-500/60 transition-all placeholder:text-zinc-700"
                style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.08)' }}
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 pr-10 rounded-xl text-sm text-zinc-200 outline-none border focus:border-indigo-500/60 transition-all placeholder:text-zinc-700"
                  style={{ background: '#27272a', borderColor: 'rgba(255,255,255,0.08)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-red-400 bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}
            >
              {loading ? 'Đang đăng nhập…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
