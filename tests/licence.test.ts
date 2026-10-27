import { describe, expect, it, vi } from 'vitest'
import { LICENCE_SERVICE_URL } from '../src/content/site'
import { fetchLicence } from '../src/lib/licence'

function respond(status: number, body: unknown = {}) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status }))
}

describe('fetchLicence', () => {
  it('returns the key, plan and expiry from the licence service', async () => {
    const fetcher = respond(200, { key: 'a.b', plan: 'yearly', expires: '2027-01-01T00:00:00.000Z' })

    const state = await fetchLicence('cs_test_1', fetcher)

    expect(state).toEqual({ status: 'ready', key: 'a.b', plan: 'yearly', expires: '2027-01-01T00:00:00.000Z' })
    expect(fetcher).toHaveBeenCalledWith(`${LICENCE_SERVICE_URL}/key?session_id=cs_test_1`)
  })

  it('treats a missing expiry as a lifetime key', async () => {
    expect(await fetchLicence('cs', respond(200, { key: 'a.b', plan: 'lifetime', expires: null }))).toMatchObject({ expires: null })
  })

  it('reports a payment that is still clearing', async () => {
    expect(await fetchLicence('cs', respond(202))).toEqual({ status: 'processing' })
  })

  it.each([
    ['an error status', respond(404)],
    ['a body without a key', respond(200, { plan: 'monthly' })],
    ['a network failure', vi.fn(async () => Promise.reject(new Error('offline')))],
  ])('fails on %s', async (_case, fetcher) => {
    expect(await fetchLicence('cs', fetcher as unknown as typeof fetch)).toEqual({ status: 'failed' })
  })
})
