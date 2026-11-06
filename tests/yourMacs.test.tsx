import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { HomeFooter } from '../src/components/home/HomeFooter'
import { LegalFooter } from '../src/components/layout/LegalFooter'
import { MacRow } from '../src/components/yourMacs/MacRow'
import { YourMacsForm } from '../src/components/yourMacs/YourMacsForm'
import { YourMacsResult } from '../src/components/yourMacs/YourMacsResult'
import { FAQ } from '../src/content/faq'
import { TERMS_OF_USE } from '../src/content/legal/terms'
import { LICENCE_SERVICE_URL, SITE } from '../src/content/site'
import { YOUR_MACS_COPY } from '../src/content/yourMacs'
import { afterAnswer, freeMac, listMacs, type MacList, type YourMacsState } from '../src/lib/macs'
import { LostKeyPage } from '../src/pages/LostKeyPage'
import { YourMacsPage } from '../src/pages/YourMacsPage'
import { ROUTES } from '../src/routes'

/** 6 November 2026 at noon UTC, in Unix seconds */
const NOV_6 = Date.UTC(2026, 10, 6, 12) / 1000
const MAC = { machineId: '0f1e2d3c-4b5a-4968-8776-655443322111', activatedAt: NOV_6 }
const LIST: MacList = { macs: [MAC], freesLeft: 2, nextFreeAt: null }

/** A fetch that answers `status` with `body` */
function respond(status: number, body: unknown = {}) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status }))
}

/** `node` as HTML, inside a router so the site's links can draw */
function html(node: React.ReactNode): string {
  return renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>)
}

/** The result area for `state`, as HTML */
function result(state: YourMacsState): string {
  return html(<YourMacsResult state={state} onFree={() => {}} />)
}

/** The page's state with `list` shown */
function listed(list: MacList, more: Partial<Extract<YourMacsState, { status: 'listed' }>> = {}): YourMacsState {
  return { status: 'listed', list, freeing: null, freeFailed: false, ...more }
}

describe('listMacs and freeMac', () => {
  it('posts the key and reads the list', async () => {
    const fetcher = respond(200, LIST)

    expect(await listMacs('k.sig', fetcher)).toEqual({ status: 'listed', ...LIST })
    expect(fetcher).toHaveBeenCalledWith(`${LICENCE_SERVICE_URL}/macs`, expect.objectContaining({ method: 'POST', body: JSON.stringify({ key: 'k.sig' }) }))
  })

  it('posts the key and the Mac to free', async () => {
    const fetcher = respond(200, { macs: [], freesLeft: 0, nextFreeAt: NOV_6 })

    expect(await freeMac('k.sig', MAC.machineId, fetcher)).toEqual({ status: 'listed', macs: [], freesLeft: 0, nextFreeAt: NOV_6 })
    expect(fetcher).toHaveBeenCalledWith(`${LICENCE_SERVICE_URL}/macs/free`, expect.objectContaining({ body: JSON.stringify({ key: 'k.sig', machineId: MAC.machineId }) }))
  })

  it.each<[string, ReturnType<typeof respond>, string]>([
    ['a key the service did not sign', respond(400, { error: 'invalid_key' }), 'invalid'],
    ['a revoked licence', respond(403, { error: 'revoked' }), 'revoked'],
    ['the free limit', respond(429, { error: 'free_limit', nextFreeAt: NOV_6 }), 'freeLimit'],
    ['the rate limit', respond(429, { error: 'too_many_requests' }), 'failed'],
    ['a malformed request', respond(400, { error: 'invalid_request' }), 'failed'],
    ['a list with a broken Mac', respond(200, { macs: [{ machineId: 1 }], freesLeft: 1 }), 'failed'],
    ['a body that is not JSON', vi.fn(async () => new Response('oops', { status: 502 })), 'failed'],
  ])('reads %s', async (_case, fetcher, status) => {
    expect(await listMacs('k', fetcher)).toMatchObject({ status })
  })

  it('fails on a network failure', async () => {
    expect(await listMacs('k', vi.fn(async () => Promise.reject(new Error('offline'))) as unknown as typeof fetch)).toEqual({ status: 'failed' })
  })
})

describe('afterAnswer', () => {
  it('shows a new list', () => {
    expect(afterAnswer({ status: 'listed', ...LIST }, null)).toEqual(listed(LIST))
  })

  it('keeps the list when a free fails, and shows no frees left at the limit', () => {
    expect(afterAnswer({ status: 'failed' }, LIST)).toEqual(listed(LIST, { freeFailed: true }))
    expect(afterAnswer({ status: 'freeLimit', nextFreeAt: NOV_6 }, LIST)).toEqual(listed({ ...LIST, freesLeft: 0, nextFreeAt: NOV_6 }))
  })

  it('reports a failure, a bad key and a revoked one when nothing was shown', () => {
    expect(afterAnswer({ status: 'failed' }, null)).toEqual({ status: 'failed' })
    expect(afterAnswer({ status: 'freeLimit', nextFreeAt: NOV_6 }, null)).toEqual({ status: 'failed' })
    expect(afterAnswer({ status: 'invalid' }, LIST)).toEqual({ status: 'invalid' })
  })
})

describe('the Your Macs page', () => {
  it('asks for the key, saying it is not kept', () => {
    const form = html(<YourMacsForm sending={false} onSend={() => {}} />)

    expect(form).toContain('<label for="key"')
    expect(form).toContain('aria-describedby="key-hint"')
    expect(form).toContain(YOUR_MACS_COPY.submit)
    expect(html(<YourMacsForm sending onSend={() => {}} />)).toContain('disabled=""')
  })

  it('shows each Mac by its activation date with Free, the frees left and what freeing does', () => {
    const page = result(listed(LIST))

    expect(page).toContain('Activated 6 November 2026')
    expect(page).toContain(`>${YOUR_MACS_COPY.free}<`)
    expect(page).toContain(YOUR_MACS_COPY.freesLeft(2))
    expect(YOUR_MACS_COPY.freesLeft(1)).toContain('1 more Mac from')
    expect(page).toContain(YOUR_MACS_COPY.stillWorks)
    expect(page).not.toContain('disabled=""')
  })

  it('says when the next free is possible and turns Free off once none are left', () => {
    const page = result(listed({ ...LIST, freesLeft: 0, nextFreeAt: NOV_6 }))

    expect(page).toContain(YOUR_MACS_COPY.noFreesLeft('6 November 2026'))
    expect(page).toContain(`mailto:${SITE.supportEmail}`)
    expect(page).toContain('disabled=""')
  })

  it('says it is freeing, and keeps the list with a message when a free failed', () => {
    expect(result(listed(LIST, { freeing: MAC.machineId }))).toContain(YOUR_MACS_COPY.freeing)
    expect(result(listed(LIST, { freeFailed: true }))).toContain(YOUR_MACS_COPY.failed)
  })

  it('says when the key is on no Mac', () => {
    expect(result(listed({ ...LIST, macs: [] }))).toContain(YOUR_MACS_COPY.none)
  })

  it.each<[YourMacsState, string]>([
    [{ status: 'invalid' }, YOUR_MACS_COPY.invalid],
    [{ status: 'revoked' }, YOUR_MACS_COPY.revoked],
    [{ status: 'failed' }, YOUR_MACS_COPY.failed],
  ])('gives one message with the support address for %j', (state, text) => {
    const page = result(state)

    expect(page).toContain('role="alert"')
    expect(page).toContain(text)
    expect(page).toContain(`mailto:${SITE.supportEmail}`)
  })

  it('shows nothing before a key, and waits while looking', () => {
    expect(result({ status: 'idle' })).not.toContain('<p')
    expect(result({ status: 'loading' })).toContain(YOUR_MACS_COPY.loading)
  })

  it('has its title, the form and an empty result area', () => {
    const page = html(<YourMacsPage />)

    expect(page).toContain(YOUR_MACS_COPY.title)
    expect(page).toContain('<form')
    expect(page).toContain('aria-live="polite"')
  })

  it('is linked from both footers, the FAQ, the terms and the lost key page', () => {
    const faq = FAQ.map(({ answer }) => html(<>{answer}</>)).join('')
    const terms = TERMS_OF_USE.sections.map(({ body }) => html(<>{body}</>)).join('')

    for (const page of [html(<HomeFooter />), html(<LegalFooter />), faq, terms, html(<LostKeyPage />)]) {
      expect(page).toContain(`href="${ROUTES.yourMacs}"`)
    }
    expect(terms).toContain(SITE.supportEmail)
  })
})

describe('MacRow', () => {
  it('names the Mac on its Free button for screen readers', () => {
    expect(html(<MacRow mac={MAC} canFree freeing={false} onFree={() => {}} />)).toContain('aria-label="Free: Activated 6 November 2026"')
  })
})
