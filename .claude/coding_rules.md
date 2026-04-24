---
name: Coding Rules & Conventions
description: Hard rules for every coding session on this project — dark theme, skill colors, data layer, TypeScript
type: feedback
originSessionId: 85bf65ab-b6ea-4aed-9239-95c58dca3690
---
Rules established during the initial redesign session (2026-04-24). Apply without exception.

**Why:** These prevent regressions and keep the codebase consistent across sessions.

**How to apply:** Before writing any new component or modifying existing code, check against this list.

## Theme Rules

1. **Dark always** — Never use `bg-white`, `bg-slate-50`, `bg-gray-100`, `text-slate-800`, `border-slate-100`. Every surface must use the dark palette (`#09090b`, `#18181b`, etc.).
2. **No light mode toggle** — `tailwind.config.js` must NOT have `darkMode: 'class'`. The app is permanently dark.
3. **Use inline `style={}` for exact rgba values** — Tailwind can't express `rgba(255,255,255,0.03)` or `#18181b` precisely. Use `style={{ background: '...' }}` for those; save Tailwind for spacing, flex, typography.

## Skill Color Rules

4. **Skill colors are immutable** — Speaking=emerald, Writing=violet, Reading=sky, Listening=amber. Never swap or use a different color for a skill section.
5. **AI features = pink** — All AI-scoring indicators, badges, and callouts use pink (`text-pink-400`, `bg-pink-500/10`).

## Code Quality Rules

6. **`cn()` for conditional classes** — Always import `cn` from `@/lib/utils` and use it for conditional Tailwind classes. No template literals with ternaries for className.
7. **TypeScript: no `any`** — Define explicit interfaces for all component props. Use the existing `Question` interface from `data/questions.ts`.
8. **lucide-react only** — No other icon libraries. All icons come from `lucide-react`.
9. **No comments in JSX** — Component and variable names should be self-descriptive. Only add a comment when the WHY is non-obvious (hidden constraint, workaround).

## Data Rules

10. **Data stays in `questions.ts`** — All mock/static data (questions, nav, stats, predictions) must live in `src/data/questions.ts`. Do not create new data files or inline large arrays in page files.
11. **Import from `@/data/questions`** — Always use the path alias, never relative paths like `../../data/questions`.

## Component Rules

12. **QuestionList for all practice pages** — Every `/practice/*` page that lists questions must use `<QuestionList>` from `@/components/practice/QuestionList`. Never build a custom list inline.
13. **Extract after 3 repetitions** — If the same JSX pattern appears 3+ times in a file, extract it into a local `const` or new component.
14. **No half-finished features** — Don't leave `TODO` comments or placeholder `<div>` stubs. Either implement fully or omit entirely.

## Dev Workflow

15. **Run `npm run build` before declaring done** — TypeScript errors only surface at build time in this project. Always verify after significant changes.
16. **No `--no-verify` on commits** — Follow hooks and lint rules.
