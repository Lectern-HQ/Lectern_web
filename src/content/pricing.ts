import { CHECKOUT_LINKS, PRICING, SALES_OPEN, type PlanId, formatPrice } from './site'
import { appPlan } from './appFiles'

const MONTHS_PER_YEAR = 12

export interface Plan {
  id: PlanId
  name: string
  amount: number
  /** Shown after the price: "a month" */
  period: string
  blurb: string
  buyLabel: string
  /** Null while sales are closed, so the card shows "Coming soon" */
  checkoutUrl: string | null
  /** Set on the dark card */
  featured: boolean
}

/** A `{field}` in a note from the app */
const NOTE_FIELD = /\{(\w+)\}/g

/**
 * The app's note for plan `id`, as its Plans screen shows it. `{perMonth}` is the plan's price
 * over a year's months and `{saving}` what it saves against paying monthly for a year.
 */
function planNote(id: PlanId): string {
  const { amount, note } = appPlan(id)
  const fields: Record<string, string> = {
    perMonth: formatPrice(amount / MONTHS_PER_YEAR),
    saving: formatPrice(PRICING.monthly * MONTHS_PER_YEAR - amount),
  }
  return note.replace(NOTE_FIELD, (field, name: string) => fields[name] ?? field)
}

const PLAN_DETAILS: readonly Omit<Plan, 'checkoutUrl'>[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    amount: PRICING.monthly,
    period: 'a month',
    blurb: planNote('monthly'),
    buyLabel: 'Buy monthly',
    featured: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    amount: PRICING.yearly,
    period: 'a year',
    blurb: planNote('yearly'),
    buyLabel: 'Buy yearly',
    featured: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    amount: PRICING.lifetime,
    period: 'once',
    blurb: planNote('lifetime'),
    buyLabel: 'Buy lifetime',
    featured: false,
  },
]

/** The plans with their payment `links`, or with none while `salesOpen` is false */
export function plansFor(salesOpen: boolean, links: Record<PlanId, string | null> = CHECKOUT_LINKS): readonly Plan[] {
  return PLAN_DETAILS.map((plan) => ({ ...plan, checkoutUrl: salesOpen ? links[plan.id] : null }))
}

export const PLANS = plansFor(SALES_OPEN)

export const PRICING_COPY = {
  lede: 'After that, pick the plan that fits how you study. They all work the same.',
  includes: [
    'Transcribe as many lectures as you like.',
    'Get every update while your plan runs.',
    'Your transcripts stay yours, even if you stop.',
  ],
  comingSoon: 'Coming soon',
} as const
