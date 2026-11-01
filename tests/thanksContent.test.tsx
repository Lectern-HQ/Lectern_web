import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { ThanksContent } from '../src/components/thanks/ThanksContent'
import { CUSTOMER_PORTAL_URL, SITE } from '../src/content/site'
import { THANKS_COPY } from '../src/content/thanks'
import type { LicenceState } from '../src/lib/licence'

/** The thank-you page's content for `licence`, as HTML */
function render(licence: LicenceState): string {
  return renderToStaticMarkup(<ThanksContent licence={licence} />)
}

/** How many times `needle` occurs in `html` */
function count(html: string, needle: string): number {
  return html.split(needle).length - 1
}

describe('ThanksContent', () => {
  it('explains an expired link, with the portal link and the support address once', () => {
    const html = render({ status: 'expired' })

    expect(html).toContain(THANKS_COPY.expired)
    expect(html).toContain('role="alert"')
    expect(html).toContain(`href="${CUSTOMER_PORTAL_URL}"`)
    expect(count(html, `mailto:${SITE.supportEmail}`)).toBe(1)
    expect(html).not.toContain(THANKS_COPY.failed)
    expect(html).not.toContain(THANKS_COPY.lostKey)
  })

  it('keeps the generic message and the lost-key line for other failures', () => {
    const html = render({ status: 'failed' })

    expect(html).toContain(THANKS_COPY.failed)
    expect(html).toContain(THANKS_COPY.lostKey)
    expect(html).not.toContain(THANKS_COPY.expired)
  })
})
