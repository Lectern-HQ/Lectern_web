import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { PlanCard } from '../src/components/home/PlanCard'
import { PLANS, PRICING_COPY, plansFor } from '../src/content/pricing'
import { CHECKOUT_LINKS, SALES_OPEN, type PlanId } from '../src/content/site'

const STRIPE_CHECKOUT_ORIGIN = 'https://buy.stripe.com'

/** Stand-in payment links, so the open state is tested before the real ones are filled in */
const TEST_LINKS: Record<PlanId, string> = {
  monthly: `${STRIPE_CHECKOUT_ORIGIN}/test-monthly`,
  semester: `${STRIPE_CHECKOUT_ORIGIN}/test-semester`,
  yearly: `${STRIPE_CHECKOUT_ORIGIN}/test-yearly`,
}

describe('PLANS', () => {
  it('offers Monthly, Semester and Yearly in that order, with Yearly on the dark card', () => {
    expect(PLANS.map(({ name, period, featured }) => [name, period, featured])).toEqual([
      ['Monthly', 'a month', false],
      ['Semester', 'every 6 months', false],
      ['Yearly', 'a year', true],
    ])
  })

  it('shows the Semester card with its price, period and saving', () => {
    const semester = PLANS.find((plan) => plan.id === 'semester')
    const html = renderToStaticMarkup(<PlanCard plan={semester!} />)

    expect(html).toContain('>Semester</h3>')
    expect(html).toContain('>50</span>')
    expect(html).toContain('every 6 months')
    expect(html).toContain('€8.33 a month, saves €10.')
  })
})

describe('plansFor', () => {
  it('gives no plan a payment link while sales are closed, even with links filled in', () => {
    expect(plansFor(false, TEST_LINKS).map((plan) => plan.checkoutUrl)).toEqual([null, null, null])
  })

  it('gives each plan its own payment link once sales open', () => {
    const plans = plansFor(true, TEST_LINKS)

    expect(plans.map((plan) => plan.checkoutUrl)).toEqual([TEST_LINKS.monthly, TEST_LINKS.semester, TEST_LINKS.yearly])
  })

  it('follows the one sales switch', () => {
    expect(PLANS).toEqual(plansFor(SALES_OPEN))
  })
})

describe('CHECKOUT_LINKS', () => {
  it('holds a link for every plan once sales are open, and none while they are closed', () => {
    const links = Object.values(CHECKOUT_LINKS)

    expect(links.every((link) => (SALES_OPEN ? link !== null : link === null))).toBe(true)
  })

  it('points every filled-in link at Stripe Checkout over https', () => {
    for (const link of Object.values(CHECKOUT_LINKS)) {
      if (link !== null) expect(new URL(link).origin).toBe(STRIPE_CHECKOUT_ORIGIN)
    }
  })
})

describe('PlanCard', () => {
  it.each(plansFor(true, TEST_LINKS))('links $name to its payment page by name', (plan) => {
    const html = renderToStaticMarkup(<PlanCard plan={plan} />)

    expect(html).toContain(`<a href="${plan.checkoutUrl}"`)
    expect(html).toContain(`>${plan.buyLabel}</a>`)
    expect(html).not.toContain(PRICING_COPY.comingSoon)
  })

  it.each(plansFor(false, TEST_LINKS))('shows $name as coming soon, with nothing to click', (plan) => {
    const html = renderToStaticMarkup(<PlanCard plan={plan} />)

    expect(html).not.toContain('<a')
    expect(html).toContain(PRICING_COPY.comingSoon)
  })
})
