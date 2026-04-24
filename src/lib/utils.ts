import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export function getScoreColor(score: number): string {
  if (score >= 79) return 'text-green-600'
  if (score >= 65) return 'text-yellow-600'
  return 'text-red-500'
}

export function getScoreBg(score: number): string {
  if (score >= 79) return 'bg-green-50 border-green-200'
  if (score >= 65) return 'bg-yellow-50 border-yellow-200'
  return 'bg-red-50 border-red-200'
}

export function getDifficultyColor(d: string): string {
  if (d === 'easy') return 'text-green-600 bg-green-50'
  if (d === 'medium') return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}
