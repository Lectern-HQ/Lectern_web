import release from 'virtual:release'
import { APP_LANGUAGE_NAMES, APP_PLANS, appPlan } from './appFiles'

/**
 * Every fact the site repeats across pages. Bracketed values are placeholders
 * to fill in before launch; change them here and every page follows.
 */

export const SITE = {
  name: 'Lectern',
  domain: 'lecternstudy.com',
  owner: 'Luca Martinet',
  contactEmail: 'hello@lecternstudy.com',
  /** For purchases and licence keys, as the app gives it */
  supportEmail: APP_PLANS.support,
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

/** The languages the app transcribes, from the app's own list */
export const LANGUAGES = APP_LANGUAGE_NAMES

/** Prices come from the app's plans, so the site and the app ask the same */
export const PRICING = {
  currency: APP_PLANS.currency,
  freeLectures: 3,
  monthly: appPlan('monthly').amount,
  yearly: appPlan('yearly').amount,
  lifetime: appPlan('lifetime').amount,
  /** Macs one licence covers */
  macsPerLicence: 1,
} as const

/** What the prices include, as the app says it */
export const VAT_NOTE = APP_PLANS.vatNote

export type PlanId = 'monthly' | 'yearly' | 'lifetime'

/**
 * The one switch for selling. While false, every plan shows "Coming soon" and no payment link is
 * on the page. Set it to true once the app release that takes licence keys is out.
 */
export const SALES_OPEN = false

/**
 * Stripe payment links; each sends the buyer back to the thank-you page with the session id. They
 * stay null while sales are closed, so the live site carries no link at all. Fill them in the same
 * commit that sets SALES_OPEN to true.
 */
export const CHECKOUT_LINKS: Record<PlanId, string | null> = {
  monthly: null,
  yearly: null,
  lifetime: null,
}

/** Stripe's customer portal: buyers sign in with their email to change card or cancel; the app opens the same page */
export const CUSTOMER_PORTAL_URL = APP_PLANS.manage

/** The Worker that turns a paid checkout into a licence key */
export const LICENCE_SERVICE_URL = 'https://licence.lecternstudy.com'

export const LICENCE = {
  /** Days a Monthly or Yearly key keeps working after the period paid for, while the app renews it */
  renewalGraceDays: 7,
} as const

export const PROVIDERS = {
  hosting: 'GitHub Pages',
  payment: 'Stripe',
  licences: 'Cloudflare',
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

/** How long emails to us are kept; the owner's choice */
export const EMAIL_RETENTION = '[CONFIRM: how long emails to us are kept, for example 3 years after the last reply]'

/** The consumer mediator French law requires sellers to name (Code de la consommation, article L616-1) */
export const MEDIATOR = {
  name: '[CONFIRM: name of the consumer mediator]',
  website: '[CONFIRM: website of the consumer mediator]',
} as const

/** Set to the day the legal texts are merged, so the date at the top matches what is live */
export const LEGAL_UPDATED = '28 October 2026'

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

function priceFormat(amount: number): Intl.NumberFormat {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: PRICING.currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

/** 15 → "€15", 100 / 12 → "€8.33" */
export function formatPrice(amount: number): string {
  return priceFormat(amount).format(amount)
}

/** 15 → { symbol: "€", value: "15" }, for prices set with a small currency sign */
export function priceParts(amount: number): { symbol: string; value: string } {
  const parts = priceFormat(amount).formatToParts(amount)
  return {
    symbol: parts.find(({ type }) => type === 'currency')?.value ?? '',
    value: parts
      .filter(({ type }) => type !== 'currency')
      .map(({ value }) => value)
      .join(''),
  }
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
