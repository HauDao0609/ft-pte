import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'PTE Practice - AI Scoring Platform',
  description: 'Practice PTE Academic & PTE Core with AI Scorings for FREE. Join 100,000 PTE test takers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
