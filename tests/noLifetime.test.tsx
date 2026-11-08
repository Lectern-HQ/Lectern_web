import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { FaqSection } from '../src/components/home/FaqSection'
import { PricingSection } from '../src/components/home/PricingSection'
import appPlans from '../src/content/app-plans.json'
import { FAQ } from '../src/content/faq'
import { PRIVACY_POLICY } from '../src/content/legal/privacy'
import { TERMS_OF_USE } from '../src/content/legal/terms'
import type { LegalDocument } from '../src/content/legal/types'

/** Every section of `document`, as HTML */
function documentHtml(document: LegalDocument): string {
  return renderToStaticMarkup(<MemoryRouter>{document.sections.map((section) => section.body)}</MemoryRouter>)
}

/** `node` rendered inside a router, as HTML */
function html(node: React.ReactNode): string {
  return renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>)
}

describe('the Lifetime plan', () => {
  it.each([
    ['the app plans', JSON.stringify(appPlans)],
    ['the pricing section', html(<PricingSection />)],
    ['the FAQ', html(<FaqSection />)],
    ['the terms of use', documentHtml(TERMS_OF_USE)],
    ['the privacy policy', documentHtml(PRIVACY_POLICY)],
  ])('is gone from %s', (_place, text) => {
    expect(text).not.toMatch(/lifetime/i)
  })
})

describe('the prices in words', () => {
  it('lists the three plans in the FAQ', () => {
    expect(FAQ[0].answer).toBe(
      'Your first 3 lectures are free. After that you choose a plan: €10 a month, €50 every 6 months or €90 a year. Your transcripts stay yours either way.',
    )
  })

  it('lists the three plans, and that they all renew, in the terms', () => {
    const plans = html(TERMS_OF_USE.sections.find((section) => section.heading === 'Plans and payment')?.body)

    expect(plans).toContain('Monthly at €10 per month, Semester at €50 every 6 months, or Yearly at €90 per year.')
    expect(plans).toContain('Monthly, Semester and Yearly plans renew until you cancel.')
  })
})
