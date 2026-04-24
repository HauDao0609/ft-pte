---
name: PTEUni Project Context
description: What this project is, tech stack, origin, and redesign intent
type: project
originSessionId: 85bf65ab-b6ea-4aed-9239-95c58dca3690
---
PTEUni is a PTE Academic & PTE Core practice platform — a redesigned clone of https://www.apeuni.com/ with completely different UI/UX while preserving all original functionality.

**Why:** User wants a distinct visual identity, not a copy of apeuni.com.

**How to apply:** When adding any feature or page, match the existing dark "Obsidian" design system — never reference or copy styles from apeuni.com.

## Stack

- Next.js 14.2 (App Router) + React 18 + TypeScript 5
- Tailwind CSS 3.4 (utility-first, no CSS modules)
- lucide-react for all icons
- clsx + tailwind-merge (`cn()` helper in `src/lib/utils.ts`)
- Fonts: Plus Jakarta Sans (headings), Inter (body) — loaded via Google Fonts in globals.css

## Key Files

- `src/data/questions.ts` — single source of truth for ALL data (questions, nav, stats, vocab)
- `src/styles/globals.css` — CSS variables, dark component classes, animations
- `tailwind.config.js` — extended with `surface`, `skill`, `neon` color tokens
- `CLAUDE.md` — full project documentation (read first every session)

## Routes

- `/` — Homepage
- `/practice/*` — Practice hub (uses `practice/layout.tsx` with sidebar)
- `/vocab` — Vocabulary tool
- `/study-center` — Dashboard
- `/course`, `/blog`, `/study-materials`, `/login` — Supporting pages

## Not Yet Done (as of 2026-04-24)

- Individual question detail pages (`/practice/[id]`)
- Login/auth page redesign
- Blog, Course, Vocab, Study Center, Study Materials page redesigns
- Real backend / API integration (currently all static data)
