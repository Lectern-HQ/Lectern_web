import { CHECKOUT_LINKS, PRICING, SALES_OPEN, type PlanId, formatPrice } from './site'
import { appPlan } from './appFiles'

export interface Plan {
  id: PlanId
  name: string
  amount: number
  /** Shown after the price: "a month", "every 6 months" */
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
 * over its months and `{saving}` what it saves against paying monthly for as many months.
 */
function planNote(id: PlanId): string {
  const { amount, months, note } = appPlan(id)
  const fields: Record<string, string> = {
    perMonth: formatPrice(amount / months),
    saving: formatPrice(PRICING.monthly * months - amount),
  }
  return note.replace(NOTE_FIELD, (field, name: string) => fields[name] ?? field)
}

/** Plan `id` as its card shows it, with the name, price and period from the app */
function planDetails(id: PlanId, buyLabel: string, featured: boolean): Omit<Plan, 'checkoutUrl'> {
  const { name, amount, per } = appPlan(id)
  return { id, name, amount, period: per, blurb: planNote(id), buyLabel, featured }
}

/** The cards in order; Yearly, the best value, is the dark one */
const PLAN_DETAILS: readonly Omit<Plan, 'checkoutUrl'>[] = [
  planDetails('monthly', 'Buy monthly', false),
  planDetails('semester', 'Buy semester', false),
  planDetails('yearly', 'Buy yearly', true),
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
