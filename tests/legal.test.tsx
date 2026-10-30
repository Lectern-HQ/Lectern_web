import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { PRIVACY_POLICY } from '../src/content/legal/privacy'
import { TERMS_OF_USE } from '../src/content/legal/terms'
import type { LegalDocument } from '../src/content/legal/types'
import { CUSTOMER_PORTAL_URL, LICENCE, LICENCE_SERVICE_URL, MEDIATOR, PRICING } from '../src/content/site'

/** The whole document as HTML, as the legal page would render its summary and sections */
function render(document: LegalDocument): string {
  return renderToStaticMarkup(
    <MemoryRouter>
      {document.summary}
      {document.sections.map(({ heading, body }) => (
        <section key={heading}>
          <h2>{heading}</h2>
          {body}
        </section>
      ))}
    </MemoryRouter>,
  )
}

/** The body of the section headed `heading`, as HTML */
function section(document: LegalDocument, heading: string): string {
  const found = document.sections.find((candidate) => candidate.heading === heading)
  if (!found) throw new Error(`no section "${heading}"`)
  return renderToStaticMarkup(<MemoryRouter>{found.body}</MemoryRouter>)
}

const licenceHost = new URL(LICENCE_SERVICE_URL).host
const portalHost = new URL(CUSTOMER_PORTAL_URL).host

describe('privacy policy', () => {
  const sent = section(PRIVACY_POLICY, 'What Lectern sends over the internet')

  it('names the licence service and says renewing sends only the licence number', () => {
    expect(sent).toContain(licenceHost)
    expect(sent).toContain('your licence number and nothing else')
    expect(sent).toContain(`${LICENCE.renewalGraceDays} days`)
  })

  it('says the key is checked on the Mac and the free lectures are counted in the Keychain', () => {
    const local = section(PRIVACY_POLICY, 'What stays on your computer')

    expect(local).toContain('your licence key')
    expect(local).toContain('Keychain')
    expect(local).toContain(`${PRICING.freeLectures} free lectures`)
  })

  it('says the app opens Stripe for buying and for the customer portal', () => {
    expect(sent).toContain('Stripe')
    expect(section(PRIVACY_POLICY, 'This website')).toContain(portalHost)
  })

  it('says how the thank-you page handles the payment reference', () => {
    const website = section(PRIVACY_POLICY, 'This website')

    expect(website).toContain('checkout session')
    expect(website).toContain('until you close it')
  })

  it('covers the IP address the licence service sees, in the legal basis and the retention', () => {
    expect(section(PRIVACY_POLICY, 'Why we may use this data')).toContain('licence service')
    expect(section(PRIVACY_POLICY, 'How long we keep it')).toContain('licence service')
  })
})

describe('terms of use', () => {
  it('links the customer portal for managing and cancelling a plan', () => {
    expect(section(TERMS_OF_USE, 'Plans and payment')).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
  })

  it('says how a Monthly or Yearly key is renewed and what happens if it is not', () => {
    const licence = section(TERMS_OF_USE, 'Your licence')

    expect(licence).toContain('checked on your Mac')
    expect(licence).toContain(`${LICENCE.renewalGraceDays} days`)
  })

  it('names the consumer mediator', () => {
    expect(render(TERMS_OF_USE)).toContain(MEDIATOR.name)
  })
})
