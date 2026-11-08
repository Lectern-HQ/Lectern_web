import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { PRIVACY_POLICY } from '../src/content/legal/privacy'
import { TERMS_OF_USE } from '../src/content/legal/terms'
import type { LegalDocument } from '../src/content/legal/types'
import { CUSTOMER_PORTAL_URL, EMAIL_RETENTION, LICENCE, PRICING } from '../src/content/site'

/** The body of the section headed `heading`, as HTML */
function section(document: LegalDocument, heading: string): string {
  const found = document.sections.find((candidate) => candidate.heading === heading)
  if (!found) throw new Error(`no section "${heading}"`)
  return renderToStaticMarkup(<MemoryRouter>{found.body}</MemoryRouter>)
}

const portalHost = new URL(CUSTOMER_PORTAL_URL).host

describe('privacy policy', () => {
  const sent = section(PRIVACY_POLICY, 'What Lectern sends over the internet')
  const website = section(PRIVACY_POLICY, 'This website')

  it('says the key and the free lecture count stay on the Mac, the count in the Keychain', () => {
    const local = section(PRIVACY_POLICY, 'What stays on your computer')

    expect(local).toContain('your licence key')
    expect(local).toContain('Keychain')
    expect(local).toContain(`${PRICING.freeLectures} free lectures`)
    expect(local).toContain('checking it sends nothing')
  })

  it('says renewing sends the licence number alone, at most once an hour, within the grace days', () => {
    expect(sent).toContain('licence number alone, at most once an hour')
    expect(sent).toContain(`${LICENCE.renewalGraceDays} days`)
  })

  it('says the app opens Stripe, not this website, to buy or manage a plan', () => {
    expect(sent).toContain('payment page or customer portal in your browser')
    expect(sent).not.toContain('opens our website')
  })

  it('names the customer portal and how the thank-you page keeps the checkout reference', () => {
    expect(website).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
    expect(website).toContain(portalHost)
    expect(website).toContain('until you close it')
    expect(website).toContain('light or dark choice')
  })

  it('says the licence service uses the IP address only for its limit, in the text and the legal basis', () => {
    expect(website).toContain('only to limit how many requests')
    expect(section(PRIVACY_POLICY, 'Why we may use this data')).toContain('limit on requests to the licence service')
  })

  it('says how long emails to us are kept', () => {
    expect(section(PRIVACY_POLICY, 'How long we keep it')).toContain(`Emails you send us: ${EMAIL_RETENTION}`)
  })
})

describe('terms of use', () => {
  it('links the customer portal for changing the card or cancelling', () => {
    expect(section(TERMS_OF_USE, 'Plans and payment')).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
  })

  it('says a Monthly or Yearly key is renewed within the grace days, and falls back to the free lectures', () => {
    const licence = section(TERMS_OF_USE, 'Your licence')

    expect(licence).toContain('checked on your Mac')
    expect(licence).toContain(`${LICENCE.renewalGraceDays} days`)
    expect(licence).toContain('free lectures you have left')
  })
})
