'use client'

import { useState, type ComponentType } from 'react'
import {
  Upload,
  FileAudio,
  FileText,
  Video,
  ImageIcon,
  CheckCircle2,
  X,
  Plus,
  Folder,
  Trash2,
  Download,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentItem {
  id: number
  name: string
  type: 'Audio' | 'PDF' | 'Video' | 'Image'
  category: string
  size: string
  uploaded: string
  status: 'Published' | 'Draft'
}

const mockContent: ContentItem[] = [
  { id: 1, name: 'ReadAloud_Unit01_Audio.mp3', type: 'Audio', category: 'Speaking', size: '4.2 MB', uploaded: '2025-04-28', status: 'Published' },
  { id: 2, name: 'WritingGuide_Essay_Tips.pdf', type: 'PDF', category: 'Writing', size: '1.8 MB', uploaded: '2025-04-25', status: 'Published' },
  { id: 3, name: 'RepeatSentence_Batch12.mp3', type: 'Audio', category: 'Speaking', size: '6.1 MB', uploaded: '2025-04-22', status: 'Published' },
  { id: 4, name: 'ReadingStrategies_FIB.pdf', type: 'PDF', category: 'Reading', size: '2.3 MB', uploaded: '2025-04-20', status: 'Draft' },
  { id: 5, name: 'ListeningComprehension_Unit5.mp3', type: 'Audio', category: 'Listening', size: '8.5 MB', uploaded: '2025-04-18', status: 'Published' },
  { id: 6, name: 'DescribeImage_Charts_Intro.mp4', type: 'Video', category: 'Speaking', size: '45.2 MB', uploaded: '2025-04-15', status: 'Published' },
  { id: 7, name: 'PTE_Score_Guide_2025.pdf', type: 'PDF', category: 'General', size: '3.7 MB', uploaded: '2025-04-10', status: 'Published' },
  { id: 8, name: 'SampleCharts_DescribeImage.zip', type: 'Image', category: 'Speaking', size: '12.4 MB', uploaded: '2025-04-08', status: 'Draft' },
]

const typeIcons: Record<ContentItem['type'], ComponentType<{ className?: string }>> = {
  Audio: FileAudio,
  PDF: FileText,
  Video: Video,
  Image: ImageIcon,
}

const typeColors: Record<ContentItem['type'], string> = {
  Audio: 'text-emerald-400 bg-emerald-500/10',
  PDF: 'text-sky-400 bg-sky-500/10',
  Video: 'text-violet-400 bg-violet-500/10',
  Image: 'text-amber-400 bg-amber-500/10',
}

const categoryColors: Record<string, string> = {
  Speaking: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  Writing: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  Reading: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  Listening: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  General: 'text-zinc-400 bg-white/[0.05] border-white/[0.08]',
}

interface UploadFile {
  name: string
  size: string
  progress: number
  done: boolean
}

export default function ContentPage() {
  const [search, setSearch] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [uploads, setUploads] = useState<UploadFile[]>([])
  const [category, setCategory] = useState('Speaking')
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published')

  const filtered = mockContent.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  )

  function simulateUpload(files: FileList | null) {
    if (!files) return
    const newUploads: UploadFile[] = Array.from(files).map(f => ({
      name: f.name,
      size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
      progress: 0,
      done: false,
    }))
    setUploads(prev => [...prev, ...newUploads])
    newUploads.forEach((_, i) => {
      let p = 0
      const interval = setInterval(() => {
        p += Math.random() * 20
        if (p >= 100) {
          p = 100
          clearInterval(interval)
          setUploads(prev =>
            prev.map(u => u.name === newUploads[i].name ? { ...u, progress: 100, done: true } : u)
          )
        } else {
          setUploads(prev =>
            prev.map(u => u.name === newUploads[i].name ? { ...u, progress: Math.round(p) } : u)
          )
        }
      }, 200)
    })
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Content</h1>
        <p className="text-sm text-zinc-500 mt-1">Upload và quản lý bài học, tài liệu, audio</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-1 space-y-4">
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); simulateUpload(e.dataTransfer.files) }}
            className={cn(
              'rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer',
              dragOver ? 'border-indigo-500/60 bg-indigo-500/10' : 'border-white/[0.10] hover:border-indigo-500/40 hover:bg-indigo-500/5'
            )}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: 'rgba(99,102,241,0.12)' }}>
              <Upload className="w-5 h-5 text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-zinc-300">Drop files here</p>
            <p className="text-xs text-zinc-600 mt-1">or click to browse</p>
            <p className="text-xs text-zinc-700 mt-3">MP3, MP4, PDF, ZIP — max 100 MB</p>
            <input id="file-input" type="file" multiple hidden onChange={e => simulateUpload(e.target.files)} />
          </div>

          <div className="rounded-2xl border p-5 space-y-4" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
            <h3 className="text-sm font-semibold text-white">Upload Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Speaking', 'Writing', 'Reading', 'Listening', 'General'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-xs font-medium border transition-all',
                        category === cat
                          ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                          : 'text-zinc-500 border-white/[0.06] hover:text-zinc-300 hover:bg-white/[0.04]'
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5">Publish Status</label>
                <div className="flex gap-2">
                  {(['Published', 'Draft'] as const).map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-xs font-medium border transition-all',
                        status === s
                          ? s === 'Published'
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30'
                          : 'text-zinc-500 border-white/[0.06] hover:text-zinc-300 hover:bg-white/[0.04]'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl text-sm font-medium text-white transition-all" style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)' }}>
              <Plus className="w-4 h-4 inline mr-2" />
              Upload Files
            </button>
          </div>

          {uploads.length > 0 && (
            <div className="rounded-2xl border p-4 space-y-3" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Uploading</h3>
              {uploads.map((u, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-zinc-300 truncate max-w-[160px]">{u.name}</p>
                    {u.done
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      : <button onClick={() => setUploads(prev => prev.filter((_, j) => j !== i))}><X className="w-3.5 h-3.5 text-zinc-600" /></button>
                    }
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                      className={cn('h-full rounded-full transition-all', u.done ? 'bg-emerald-500' : 'bg-indigo-500')}
                      style={{ width: `${u.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search content…"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-200 outline-none border focus:border-indigo-500/50 transition-all"
                style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.08)' }}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-zinc-400 border border-white/[0.08] hover:bg-white/[0.05] transition-all">
              <Folder className="w-4 h-4" />
              Browse
            </button>
          </div>

          <div className="rounded-2xl border overflow-hidden" style={{ background: '#18181b', borderColor: 'rgba(255,255,255,0.07)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <th className="text-left px-5 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">File</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Size</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Uploaded</th>
                  <th className="text-left px-4 py-3.5 text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                {filtered.map(item => {
                  const Icon = typeIcons[item.type]
                  return (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', typeColors[item.type].split(' ')[1])}>
                            <Icon className={cn('w-3.5 h-3.5', typeColors[item.type].split(' ')[0])} />
                          </div>
                          <p className="text-zinc-200 text-xs font-medium truncate max-w-[180px]">{item.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', categoryColors[item.category])}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-zinc-500">{item.size}</td>
                      <td className="px-4 py-3.5 text-xs text-zinc-500">{item.uploaded}</td>
                      <td className="px-4 py-3.5">
                        <span className={cn(
                          'flex items-center gap-1.5 text-xs font-medium w-fit',
                          item.status === 'Published' ? 'text-emerald-400' : 'text-zinc-500'
                        )}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', item.status === 'Published' ? 'bg-emerald-400' : 'bg-zinc-600')} />
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 justify-end">
                          <button className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/[0.06] transition-all">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-zinc-600 text-sm">No content found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
