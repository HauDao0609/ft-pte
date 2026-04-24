import Link from 'next/link'
import { Mail, Send, Sparkles, ExternalLink } from 'lucide-react'

const footerLinks = {
  'Pearson PTE': [
    { label: 'Official Website', href: 'https://pearsonpte.com/', external: true },
    { label: 'Mock Tests', href: 'https://www.ptepractice.com/', external: true },
    { label: 'Book PTE Tests', href: 'https://pearsonpte.com/book-now/', external: true },
    { label: 'Contact Pearson', href: 'https://pearsonpte.com/contact-us/', external: true },
  ],
  'PTE Course': [
    { label: 'Speaking Course', href: '/course?section=speaking' },
    { label: 'Writing Course', href: '/course?section=writing' },
    { label: 'Reading Course', href: '/course?section=reading' },
    { label: 'Listening Course', href: '/course?section=listening' },
  ],
  'Resources': [
    { label: 'Study Materials', href: '/study-materials' },
    { label: 'Vocab Book', href: '/vocab' },
    { label: 'Weekly Predictions', href: '/predictions' },
    { label: 'AI Score Report', href: '/study-center' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#070709', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}>
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                PTE<span className="text-gradient">Uni</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed mb-6 max-w-xs">
              Join 100,000 PTE test takers and practice with AI scoring.
              The most comprehensive PTE preparation platform.
            </p>
            <div className="space-y-2.5">
              <a href="mailto:support@pteuni.com"
                className="flex items-center gap-2.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                <Mail className="w-4 h-4 text-zinc-600" /> support@pteuni.com
              </a>
              <a href="https://t.me/pteuni"
                className="flex items-center gap-2.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                <Send className="w-4 h-4 text-zinc-600" /> t.me/pteuni
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">{section}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors group">
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <Link href={link.href}
                        className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">© 2026 PTEUni Edu. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-zinc-600">
            <Link href="/tos" className="hover:text-zinc-400 transition-colors">Terms of Use</Link>
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
