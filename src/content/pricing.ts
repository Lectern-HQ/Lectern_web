import { CHECKOUT_LINKS, PRICING, SALES_OPEN, type PlanId, formatPrice } from './site'

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

const yearlyPerMonth = PRICING.yearly / MONTHS_PER_YEAR
const yearlySaving = PRICING.monthly * MONTHS_PER_YEAR - PRICING.yearly

const PLAN_DETAILS: readonly Omit<Plan, 'checkoutUrl'>[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    amount: PRICING.monthly,
    period: 'a month',
    blurb: 'Pay month by month and stop whenever you like.',
    buyLabel: 'Buy monthly',
    featured: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    amount: PRICING.yearly,
    period: 'a year',
    blurb: `That is ${formatPrice(yearlyPerMonth)} a month, paid once a year. It saves ${formatPrice(yearlySaving)} compared with paying monthly.`,
    buyLabel: 'Buy yearly',
    featured: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    amount: PRICING.lifetime,
    period: 'once',
    blurb: 'Pay once and never pay again. You get every update for as long as we make Lectern.',
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
