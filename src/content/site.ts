import release from 'virtual:release'

/**
 * Every fact the site repeats across pages. Bracketed values are placeholders
 * to fill in before launch; change them here and every page follows.
 */

export const SITE = {
  name: 'Lectern',
  domain: 'lecternstudy.com',
  owner: 'Luca Martinet',
  contactEmail: 'hello@lecternstudy.com',
  country: 'France',
} as const

export const PUBLISHER = {
  name: 'Luca Martinet',
  tradingName: 'Luca Martinet EI',
  legalForm: 'entrepreneur individuel (sole trader) registered in France',
  siren: '131 955 395',
  address: '377 rue du Riondel, 01210 Ornex, France',
} as const

/** Version, date and download come from the published update feed, so each release updates the site. */
export const RELEASE = {
  version: release.version,
  publishedAt: release.publishedAt,
  downloadUrl: release.dmgUrl,
  minMacOS: '13 Ventura',
  chip: 'Apple Silicon',
} as const

export const SPEECH_MODEL = {
  name: 'Whisper large-v3-turbo',
  size: '1.6 GB',
} as const

export const LANGUAGES = ['English', 'French', 'German', 'Italian'] as const

export const PRICING = {
  currency: 'EUR',
  freeLectures: 3,
  monthly: 15,
  yearly: 100,
  lifetime: 200,
  /** Macs one licence covers */
  macsPerLicence: 1,
} as const

export const PROVIDERS = {
  hosting: 'GitHub Pages',
  payment: 'Stripe',
  modelHost: 'Hugging Face',
  updateHost: SITE.domain,
} as const

/** The company Stripe contracts with sellers in Europe */
export const PAYMENT_DETAILS = {
  company: 'Stripe Payments Europe, Limited',
  country: 'Ireland',
} as const

/** Where plans are sold; other countries would bring their own VAT rules from the first sale */
export const SALES_REGIONS = ['France', 'the rest of the European Union', 'Switzerland'] as const

export const HOST_DETAILS = {
  company: 'GitHub, Inc.',
  address: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States',
  website: 'github.com',
} as const

/** French accounting law keeps sales records for 10 years (Code de commerce, article L123-22) */
export const PURCHASE_RECORD_YEARS = 10

export const LEGAL_UPDATED = '26 October 2026'

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

/** 15 → "€15" */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: PRICING.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

/** "2026-10-22" or a full ISO timestamp → "22 Oct 2026" */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(isoDate),
  )
}

export function formatList(items: readonly string[]): string {
  return new Intl.ListFormat('en-GB', { type: 'conjunction' }).format(items)
}
