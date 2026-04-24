# PTEUni — CLAUDE.md

## Project Overview

PTE Academic & PTE Core practice platform with AI scoring. Serves 100,000+ test takers with 2,000+ practice questions across all PTE question types (Speaking, Writing, Reading, Listening). Built as a redesigned alternative to apeuni.com with a completely different "Obsidian Dark" visual theme while preserving full functionality.

## Tech Stack

| Layer       | Technology |
|-------------|------------|
| Framework   | Next.js 14.2 (App Router) |
| UI Library  | React 18 + TypeScript 5 |
| Styling     | Tailwind CSS 3.4 (utility-first) |
| Icons       | lucide-react |
| Utilities   | clsx, tailwind-merge |
| Fonts       | Plus Jakarta Sans (headings), Inter (body) |

## Dev Commands

```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (no Navbar — each page imports it)
│   ├── page.tsx            # Homepage (dark hero, practice overview, guides)
│   ├── login/              # Auth page
│   ├── blog/               # Blog & guides
│   ├── course/             # Course catalog
│   ├── vocab/              # 12,000-word vocabulary tool
│   ├── study-center/       # User dashboard & AI score analysis
│   ├── study-materials/    # Downloadable resources
│   └── practice/
│       ├── layout.tsx      # Practice shell (Navbar + PracticeSidebar + main)
│       ├── read-alouds/
│       ├── repeat-sentence/
│       ├── describe-image/
│       ├── write-essay/
│       ├── summarize-written/
│       ├── reading-mcs/
│       ├── reorder-paragraphs/
│       ├── fib-dragdrop/
│       ├── fib-dropdown/
│       ├── write-dictation/
│       ├── highlight-incorrect/
│       └── [id]/           # Dynamic question detail
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Dark glass sticky navbar
│   │   ├── Footer.tsx          # Minimal dark footer
│   │   └── PracticeSidebar.tsx # Dark collapsible sidebar (neon skill colors)
│   └── practice/
│       └── QuestionList.tsx    # Reusable dark question list with search/filter
├── data/
│   └── questions.ts        # ALL static data: questions, practiceNav, weeklyPrediction, userStats
├── lib/
│   └── utils.ts            # cn(), getDifficultyColor(), formatNumber()
└── styles/
    └── globals.css         # Global dark theme, CSS variables, component classes
```

## Design System — "Obsidian Dark" Theme

The entire app uses a dark theme. Do NOT use light backgrounds (`bg-white`, `bg-slate-50`) anywhere.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `#09090b` (surface-950) | Near-black | Page backgrounds, main areas |
| `#0d0d10` (surface-900) | Dark navy | Section alternates |
| `#18181b` (surface-800) | Card background | Cards, panels, inputs |
| `#27272a` (surface-700) | Elevated surface | Hover states, modals |
| Primary `#6366f1` (indigo-500) | Indigo | Buttons, links, active states |
| Emerald `#10b981` | Speaking skill | Speaking section accents |
| Violet `#a78bfa` | Writing skill | Writing section accents |
| Sky `#38bdf8` | Reading skill | Reading section accents |
| Amber `#fbbf24` | Listening skill | Listening section accents |
| Pink `#f472b6` | AI features | AI badges, AI scoring indicators |

### CSS Variables (defined in globals.css)
```css
--primary, --primary-glow
--surface, --surface-2, --surface-3
--border, --border-bright
--text-primary, --text-muted
--skill-speaking, --skill-writing, --skill-reading, --skill-listening
```

### Tailwind Custom Classes
```css
/* Layout & glass */
.glass          /* rgba white backdrop-blur panel */
.card           /* dark surface-800 card with subtle border */
.bg-mesh        /* radial gradient mesh overlay */

/* Buttons */
.btn-primary    /* indigo filled, shadow glow */
.btn-ghost      /* translucent border, white text */
.btn-outline    /* indigo border, no fill */

/* Badges */
.badge-ai       /* pink — AI scoring indicator */
.badge-new      /* emerald — new questions */
.badge-predicted/* amber — predicted exam questions */

/* Navigation */
.sidebar-link   /* dark sidebar item (inactive) */
.sidebar-link.active /* indigo-tinted active item */

/* Typography */
.section-label  /* xs uppercase tracking-widest indigo-400 */
.text-gradient  /* indigo→violet→pink gradient text */

/* Progress */
.progress-bar / .progress-fill   /* indigo-violet gradient bar */

/* Skill borders (left border per section) */
.skill-border-speaking / -writing / -reading / -listening

/* Glow utilities */
.glow-primary / .glow-speaking / .glow-writing / .glow-reading / .glow-listening

/* Audio / recording */
.waveform-bar   /* animated height bars */
.recording-pulse /* red pulse ring */

/* Drag & drop */
.drag-item / .drop-zone.drag-over
```

### Skill Color Map
Use this consistently across Navbar, Sidebar, QuestionList, and page sections:
```ts
Speaking:  { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
Writing:   { color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20'  }
Reading:   { color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20'     }
Listening: { color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20'   }
AI/Extra:  { color: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/20'    }
```

## Component Patterns

### New Page (under `/practice/`)
Every practice page imports `QuestionList` and passes the questions array from `@/data/questions`:
```tsx
import QuestionList from '@/components/practice/QuestionList'
import { readAloudQuestions } from '@/data/questions'
import { Mic2 } from 'lucide-react'

export default function ReadAloudsPage() {
  return (
    <QuestionList
      questions={readAloudQuestions}
      sectionTitle="Read Aloud"
      sectionDescription="Read the text aloud in 30–40 seconds"
      hasAI
      detailBasePath="/practice/read-alouds"
      icon={<Mic2 className="w-5 h-5" />}
      color="bg-emerald-500/10 text-emerald-400"
    />
  )
}
```

### Card component
```tsx
<div className="card p-5 hover:border-white/[0.13]">
  {/* content */}
</div>
```

### Inline dark card (when `.card` is too generic)
```tsx
<div className="rounded-2xl p-5 border border-white/[0.07] hover:border-white/[0.13] transition-all"
  style={{ background: '#18181b' }}>
```

### Glass panel (for hero overlays)
```tsx
<div className="rounded-2xl p-6"
  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
```

### Hero orb (background glow blob)
```tsx
<div className="hero-orb w-96 h-96 opacity-20"
  style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', top: '-50px', left: '-100px' }} />
```

## Data Layer

All static data lives in `src/data/questions.ts`. Key exports:
- `practiceNav` — sidebar/navbar navigation structure (section → items[])
- `weeklyPrediction` — `{ newCount, predictCount, updateCount, repeatRate }`
- `readAloudQuestions`, `repeatSentenceQuestions`, ... — per-type question arrays
- `vocabWords` — vocabulary entries
- `userStats` — mock dashboard data

Each question conforms to:
```ts
interface Question {
  id: number
  title: string
  difficulty?: 'Easy' | 'Medium' | 'Hard'
  isPredicted?: boolean
  isNew?: boolean
  attemptCount?: number
  accuracy?: number
  tags?: string[]
}
```

## Coding Rules

1. **Dark theme always** — never introduce `bg-white`, `bg-slate-50`, `text-slate-800`, `border-slate-100` etc. All pages must stay on the dark palette.
2. **Skill colors are fixed** — Speaking=emerald, Writing=violet, Reading=sky, Listening=amber. Never swap them.
3. **No light mode toggle** — this is a single dark-mode app; don't add `darkMode: 'class'` switching.
4. **Data stays in `questions.ts`** — don't scatter mock data into page files.
5. **Components over inline duplication** — if the same card pattern appears 3+ times in a page, extract it.
6. **TypeScript strict** — no `any` types; define interfaces for all props.
7. **lucide-react only** — don't introduce additional icon libraries.
8. **cn() for conditional classes** — use `cn()` from `@/lib/utils` instead of template literals for conditional Tailwind.
9. **`style={}` for rgba/exact values** — use inline `style` when Tailwind's palette can't express the exact dark background color (e.g., `#18181b`, `rgba(255,255,255,0.03)`).
10. **No comments in JSX** — well-named components speak for themselves.

## Image Domains (next.config.js)
External images are allowed from:
- `cdn-g.apeuni.com`
- `dl26yht2ovo33.cloudfront.net`
