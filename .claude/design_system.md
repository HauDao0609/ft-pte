---
name: Design System — Obsidian Dark Theme
description: Complete color palette, CSS classes, skill color map, and component patterns for the dark theme
type: project
originSessionId: 85bf65ab-b6ea-4aed-9239-95c58dca3690
---
The entire app is dark mode. There is no light mode. Never add bg-white or bg-slate-*.

**Why:** User explicitly requested interface "completely different" from apeuni.com, which uses bright blue/white corporate style. The answer was a dark "Obsidian" aesthetic.

**How to apply:** Every new component, page, or section must follow these rules.

## Background Layers

| Surface | Hex | When to use |
|---------|-----|-------------|
| `#09090b` | surface-950 | Main page background, section backgrounds |
| `#0d0d10` | surface-900 | Alternating sections |
| `#18181b` | surface-800 | Cards, panels, inputs |
| `#27272a` | surface-700 | Hover states, elevated elements |

Use `style={{ background: '#18181b' }}` for cards when Tailwind's built-in zinc-800 (#27272a) is too light.

## Primary / Accent Colors

- **Primary:** Indigo `#6366f1` (primary-500) — buttons, active states, links
- **Glow:** `rgba(99,102,241,0.35)` for box-shadow glow on primary elements

## Skill Colors (fixed, never change)

| Skill | Color | Tailwind | Usage |
|-------|-------|----------|-------|
| Speaking | `#10b981` Emerald | `text-emerald-400 / bg-emerald-500/10 / border-emerald-500/20` | Speaking sections |
| Writing | `#a78bfa` Violet | `text-violet-400 / bg-violet-500/10 / border-violet-500/20` | Writing sections |
| Reading | `#38bdf8` Sky | `text-sky-400 / bg-sky-500/10 / border-sky-500/20` | Reading sections |
| Listening | `#fbbf24` Amber | `text-amber-400 / bg-amber-500/10 / border-amber-500/20` | Listening sections |
| AI/Extra | `#f472b6` Pink | `text-pink-400 / bg-pink-500/10 / border-pink-500/20` | AI badges, scoring |

## Key CSS Classes (from globals.css)

```
.card              — dark bg-surface-800 card with white/7% border
.glass             — rgba(255,255,255,0.04) + backdrop-blur-16px
.btn-primary       — indigo-500 filled button with glow shadow
.btn-ghost         — translucent border button
.btn-outline       — indigo border, no fill
.badge-ai          — pink AI indicator
.badge-new         — emerald new question badge
.badge-predicted   — amber predicted question badge
.sidebar-link      — dark sidebar nav item
.sidebar-link.active — indigo-tinted active item
.section-label     — xs uppercase tracking-widest indigo-400 eyebrow text
.text-gradient     — indigo→violet→pink gradient text (for logo, headings)
.bg-mesh           — multi-radial gradient overlay for hero sections
.hero-orb          — position:absolute blob with filter:blur(80px)
.progress-bar / .progress-fill  — indigo-violet gradient bar
.skill-border-speaking/writing/reading/listening — colored left border
.glow-primary/speaking/writing/reading/listening — box-shadow glow
.waveform-bar / .recording-pulse — audio UI animations
.drag-item / .drop-zone.drag-over — drag & drop states
```

## Standard Card Pattern

```tsx
// Simple card
<div className="card p-5">...</div>

// Specific dark color (when .card is too generic)
<div className="rounded-2xl p-5 border border-white/[0.07]" style={{ background: '#18181b' }}>

// Glass panel (hero overlays, stat cards)
<div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
```

## Hero Orb Pattern

```tsx
<div className="hero-orb w-[500px] h-[500px] opacity-25"
  style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', top: '-100px', left: '-100px' }} />
```

## Gradient Text

```tsx
<span className="text-gradient">PTEUni</span>
// renders indigo→violet→pink gradient on text
```
