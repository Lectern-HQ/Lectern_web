import { CHECKOUT_LINKS, PRICING, type PlanId, formatPrice } from './site'

const MONTHS_PER_YEAR = 12

export interface Plan {
  id: PlanId
  name: string
  amount: number
  /** Shown after the price: "a month" */
  period: string
  blurb: string
  buyLabel: string
  checkoutUrl: string | null
  /** Set on the dark card */
  featured: boolean
}

const yearlyPerMonth = PRICING.yearly / MONTHS_PER_YEAR
const yearlySaving = PRICING.monthly * MONTHS_PER_YEAR - PRICING.yearly

export const PLANS: readonly Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    amount: PRICING.monthly,
    period: 'a month',
    blurb: 'Pay month by month and stop whenever you like.',
    buyLabel: 'Buy monthly',
    checkoutUrl: CHECKOUT_LINKS.monthly,
    featured: false,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    amount: PRICING.yearly,
    period: 'a year',
    blurb: `That is ${formatPrice(yearlyPerMonth)} a month, paid once a year. It saves ${formatPrice(yearlySaving)} compared with paying monthly.`,
    buyLabel: 'Buy yearly',
    checkoutUrl: CHECKOUT_LINKS.yearly,
    featured: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    amount: PRICING.lifetime,
    period: 'once',
    blurb: 'Pay once and never pay again. You get every update for as long as we make Lectern.',
    buyLabel: 'Buy lifetime',
    checkoutUrl: CHECKOUT_LINKS.lifetime,
    featured: false,
  },
]

export const PRICING_COPY = {
  lede: 'After that, pick the plan that fits how you study. They all work the same.',
  includes: [
    'Transcribe as many lectures as you like.',
    'Get every update while your plan runs.',
    'Your transcripts stay yours, even if you stop.',
  ],
  comingSoon: 'Coming soon',
} as const
