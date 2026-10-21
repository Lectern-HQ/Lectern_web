/**
 * Every fact the site repeats across pages. Bracketed values are placeholders
 * to fill in before launch; change them here and every page follows.
 */

export const SITE = {
  name: 'Lectern',
  domain: 'lecternstudy.com',
  owner: 'Luca Martinet',
  contactEmail: '[CONTACT EMAIL]',
  country: 'France',
} as const

export const PUBLISHER = {
  name: 'Luca Martinet',
  legalForm: 'an individual based in France',
} as const

export const RELEASE = {
  version: '0.1.0',
  minMacOS: '13 Ventura',
  chip: 'Apple Silicon',
  downloadUrl: '[DOWNLOAD URL]',
} as const

export const SPEECH_MODEL = {
  name: 'Whisper large-v3-turbo',
  size: '1.6 GB',
} as const

export const LANGUAGES = ['English', 'French', 'German', 'Italian'] as const

export const PRICING = {
  currency: 'CHF',
  freeLectures: 3,
  monthly: 10,
  yearly: 30,
  lifetime: 100,
} as const

export const PROVIDERS = {
  hosting: 'GitHub Pages',
  payment: '[PAYMENT PROVIDER]',
  modelHost: 'Hugging Face (huggingface.co)',
  updateHost: SITE.domain,
} as const

export const HOST_DETAILS = {
  company: 'GitHub, Inc.',
  address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States',
  website: 'github.com',
} as const

export const LOG_RETENTION_DAYS = '[N]'

export const LEGAL_UPDATED = '[DATE]'

const META_SEPARATOR = ' · '

/** Joins short facts into one line: "English · 13 Oct 2026 · 1h 45min" */
export function joinMeta(parts: readonly string[]): string {
  return parts.join(META_SEPARATOR)
}

export function releaseSummary(...extra: string[]): string {
  return joinMeta([
    `Version ${RELEASE.version}`,
    `macOS ${RELEASE.minMacOS} or later`,
    `${RELEASE.chip} only`,
    ...extra,
  ])
}

export function freeTrialNote(): string {
  return `Free for your first ${PRICING.freeLectures} lectures.`
}

export function formatPrice(amount: number): string {
  return `${PRICING.currency} ${amount}`
}

export function formatList(items: readonly string[]): string {
  return new Intl.ListFormat('en-GB', { type: 'conjunction' }).format(items)
}
