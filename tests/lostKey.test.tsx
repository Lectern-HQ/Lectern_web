import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { HomeFooter } from '../src/components/home/HomeFooter'
import { LegalFooter } from '../src/components/layout/LegalFooter'
import { LostKeyForm } from '../src/components/lostKey/LostKeyForm'
import { LostKeyResult } from '../src/components/lostKey/LostKeyResult'
import { FAQ } from '../src/content/faq'
import { LOST_KEY_COPY } from '../src/content/lostKey'
import { CUSTOMER_PORTAL_URL, SITE } from '../src/content/site'
import { THANKS_COPY } from '../src/content/thanks'
import type { LostKeyState } from '../src/lib/licence'
import { LostKeyPage } from '../src/pages/LostKeyPage'
import { ROUTES } from '../src/routes'

/** `node` as HTML, inside a router so the site's links can draw */
function html(node: React.ReactNode): string {
  return renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>)
}

/** The result area for `state`, as HTML */
function result(state: LostKeyState): string {
  return html(<LostKeyResult state={state} />)
}

/** What the form draws while `sending` */
function form(sending: boolean): string {
  return html(<LostKeyForm sending={sending} onSend={() => {}} />)
}

describe('LostKeyForm', () => {
  it('asks for the checkout email and the receipt number, saying where the number is', () => {
    const page = form(false)

    expect(page).toContain(`<label for="email"`)
    expect(page).toContain('type="email"')
    expect(page).toContain(`<label for="receiptNumber"`)
    expect(page).toContain('aria-describedby="receiptNumber-hint"')
    expect(page).toContain(LOST_KEY_COPY.receiptHint.replace(/"/g, '&quot;'))
    expect(page).toContain(LOST_KEY_COPY.submit)
    expect(page).not.toContain('disabled=""')
  })

  it('waits while a search runs', () => {
    expect(form(true)).toContain('disabled=""')
  })
})

describe('LostKeyResult', () => {
  it('shows nothing before the first search', () => {
    expect(result({ status: 'idle' })).not.toContain('<p')
  })

  it('says it is looking while the search runs', () => {
    const page = result({ status: 'sending' })

    expect(page).toContain('role="status"')
    expect(page).toContain(LOST_KEY_COPY.sending)
  })

  it('shows the key with Copy, the steps, and the portal link for a plan that renews', () => {
    const page = result({ status: 'ready', key: 'k.sig', plan: 'yearly' })

    expect(page).toContain('k.sig')
    expect(page).toContain(THANKS_COPY.copy)
    expect(page).toContain(THANKS_COPY.stepsTitle)
    expect(page).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
  })

  it.each<[LostKeyState, string]>([
    [{ status: 'notFound' }, LOST_KEY_COPY.notFound],
    [{ status: 'failed' }, LOST_KEY_COPY.failed],
  ])('gives one message with the support address for %j', (state, text) => {
    const page = result(state)

    expect(page).toContain('role="alert"')
    expect(page).toContain(text)
    expect(page).toContain(`mailto:${SITE.supportEmail}`)
  })
})

describe('the lost key page', () => {
  it('has its title, the form and an empty result area', () => {
    const page = html(<LostKeyPage />)

    expect(page).toContain(LOST_KEY_COPY.title)
    expect(page).toContain('<form')
    expect(page).toContain('aria-live="polite"')
  })

  it('is linked from both footers and the FAQ', () => {
    const faq = FAQ.map(({ answer }) => html(<>{answer}</>)).join('')

    for (const page of [html(<HomeFooter />), html(<LegalFooter />), faq]) {
      expect(page).toContain(`href="${ROUTES.lostKey}"`)
    }
  })
})
