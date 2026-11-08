import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { ThanksContent } from '../src/components/thanks/ThanksContent'
import { LOST_KEY_COPY } from '../src/content/lostKey'
import { CUSTOMER_PORTAL_URL, SITE } from '../src/content/site'
import { THANKS_COPY } from '../src/content/thanks'
import type { LicenceState } from '../src/lib/licence'
import { ROUTES } from '../src/routes'

/** The thank-you page's content for `licence`, as HTML */
function render(licence: LicenceState): string {
  return renderToStaticMarkup(
    <MemoryRouter>
      <ThanksContent licence={licence} />
    </MemoryRouter>,
  )
}

/** How many times `needle` occurs in `html` */
function count(html: string, needle: string): number {
  return html.split(needle).length - 1
}

describe('ThanksContent', () => {
  it('explains an expired link, with the portal link, the lost key page and the support address once', () => {
    const html = render({ status: 'expired' })

    expect(html).toContain(THANKS_COPY.expired)
    expect(html).toContain('role="alert"')
    expect(html).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
    expect(html).toContain(`href="${ROUTES.lostKey}"`)
    expect(count(html, `mailto:${SITE.supportEmail}`)).toBe(1)
    expect(html).not.toContain(THANKS_COPY.failed)
  })

  it('keeps the generic message and the lost key line for other failures', () => {
    const html = render({ status: 'failed' })

    expect(html).toContain(THANKS_COPY.failed)
    expect(html).toContain(THANKS_COPY.lostKey)
    expect(html).toContain(LOST_KEY_COPY.link)
    expect(html).not.toContain(THANKS_COPY.expired)
  })

  it('shows the key with Copy and the portal link for a plan that renews', () => {
    const html = render({ status: 'ready', key: 'a.b', plan: 'monthly', expires: null })

    expect(html).toContain('a.b')
    expect(html).toContain(THANKS_COPY.copy)
    expect(html).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
  })

  it('offers Open in Lectern with the key in the link, above the paste steps', () => {
    const html = render({ status: 'ready', key: 'a.b+c', plan: 'lifetime', expires: null })

    expect(html).toContain('href="lectern://activate?key=a.b%2Bc"')
    expect(html).toContain(THANKS_COPY.openInApp)
    expect(html).toContain(THANKS_COPY.openInAppNote)
    expect(html.indexOf(THANKS_COPY.openInApp)).toBeLessThan(html.indexOf(THANKS_COPY.stepsTitle))
  })

  it.each<LicenceState>([
    { status: 'missing' },
    { status: 'loading' },
    { status: 'processing' },
    { status: 'expired' },
    { status: 'failed' },
  ])('shows no Open in Lectern while the key is not ready ($status)', (licence) => {
    const html = render(licence)

    expect(html).not.toContain('lectern://')
    expect(html).not.toContain(THANKS_COPY.openInApp)
  })
})
