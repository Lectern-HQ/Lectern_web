import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { PlanCard } from '../src/components/home/PlanCard'
import { PLANS, PRICING_COPY, plansFor } from '../src/content/pricing'
import { CHECKOUT_LINKS, SALES_OPEN } from '../src/content/site'

const STRIPE_CHECKOUT_ORIGIN = 'https://buy.stripe.com'

describe('plansFor', () => {
  it('gives no plan a payment link while sales are closed', () => {
    expect(plansFor(false).map((plan) => plan.checkoutUrl)).toEqual([null, null, null])
  })

  it('gives each plan its own Stripe payment link once sales open', () => {
    const plans = plansFor(true)

    expect(plans.map((plan) => plan.checkoutUrl)).toEqual([
      CHECKOUT_LINKS.monthly,
      CHECKOUT_LINKS.yearly,
      CHECKOUT_LINKS.lifetime,
    ])
    expect(new Set(plans.map((plan) => plan.checkoutUrl)).size).toBe(plans.length)
  })

  it('stays closed until the owner opens sales', () => {
    expect(SALES_OPEN).toBe(false)
    expect(PLANS.every((plan) => plan.checkoutUrl === null)).toBe(true)
  })
})

describe('CHECKOUT_LINKS', () => {
  it.each(Object.entries(CHECKOUT_LINKS))('points %s at Stripe Checkout over https', (_plan, link) => {
    expect(new URL(link).origin).toBe(STRIPE_CHECKOUT_ORIGIN)
  })
})

describe('PlanCard', () => {
  it.each(plansFor(true))('links $name to its payment page by name', (plan) => {
    const html = renderToStaticMarkup(<PlanCard plan={plan} />)

    expect(html).toContain(`<a href="${plan.checkoutUrl}"`)
    expect(html).toContain(`>${plan.buyLabel}</a>`)
    expect(html).not.toContain(PRICING_COPY.comingSoon)
  })

  it.each(plansFor(false))('shows $name as coming soon, with nothing to click', (plan) => {
    const html = renderToStaticMarkup(<PlanCard plan={plan} />)

    expect(html).not.toContain('<a')
    expect(html).toContain(PRICING_COPY.comingSoon)
  })
})
