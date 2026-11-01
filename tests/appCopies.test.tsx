import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { PlanCard } from '../src/components/home/PlanCard'
import appLanguages from '../src/content/app-languages.json'
import appPlans from '../src/content/app-plans.json'
import { PLANS } from '../src/content/pricing'
import { CUSTOMER_PORTAL_URL, LANGUAGES, PRICING, SITE, VAT_NOTE } from '../src/content/site'

/** The plan notes as the design writes them, the yearly one worked out from the prices */
const DESIGN_NOTES = {
  monthly: 'Pay month by month and stop whenever you like.',
  yearly: '€8.33 a month, saves €80.',
  lifetime: 'Pay once. You get every update for as long as we make Lectern.',
}

describe("the copy of the app's plans", () => {
  it('has the shape the site reads, and no payment link', () => {
    expect(Object.keys(appPlans).sort()).toEqual(['currency', 'manage', 'plans', 'support', 'vatNote'])
    expect(appPlans.currency).toBe('EUR')
    expect(appPlans.support).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]+$/)
    expect(new URL(appPlans.manage).origin).toBe('https://billing.stripe.com')
    expect(appPlans.plans.map((plan) => plan.id)).toEqual(['monthly', 'yearly', 'lifetime'])
    for (const plan of appPlans.plans) {
      expect(Object.keys(plan).every((key) => ['id', 'name', 'badge', 'amount', 'per', 'note'].includes(key))).toBe(true)
      expect(plan.amount).toBeTypeOf('number')
      expect(plan.amount).toBeGreaterThan(0)
      expect(plan.note).toBeTypeOf('string')
    }
    expect(JSON.stringify(appPlans)).not.toMatch(/"link"|buy\.stripe\.com/)
  })

  it('gives the site its prices, VAT note, support address and portal link', () => {
    const amount = (id: string) => appPlans.plans.find((plan) => plan.id === id)?.amount
    expect(PRICING).toMatchObject({
      currency: appPlans.currency,
      monthly: amount('monthly'),
      yearly: amount('yearly'),
      lifetime: amount('lifetime'),
    })
    expect(VAT_NOTE).toBe(appPlans.vatNote)
    expect(SITE.supportEmail).toBe(appPlans.support)
    expect(CUSTOMER_PORTAL_URL).toBe(appPlans.manage)
  })
})

describe("the copy of the app's languages", () => {
  it('has the shape the site reads', () => {
    expect(appLanguages.languages.length).toBeGreaterThan(1)
    for (const language of appLanguages.languages) {
      expect(language.code).toMatch(/^[a-z]+$/)
      expect(language.label).toBeTypeOf('string')
    }
  })

  it('gives the site the languages by name, without automatic detection', () => {
    expect(LANGUAGES).toEqual(['English', 'French', 'German', 'Italian'])
  })
})

describe('the plans on the site', () => {
  it("carry the design's notes", () => {
    expect(Object.fromEntries(PLANS.map((plan) => [plan.id, plan.blurb]))).toEqual(DESIGN_NOTES)
  })

  it.each(PLANS)('show the $name note on its card', (plan) => {
    const html = renderToStaticMarkup(<PlanCard plan={plan} />)

    expect(html).toContain(`>${DESIGN_NOTES[plan.id]}</p>`)
  })
})
