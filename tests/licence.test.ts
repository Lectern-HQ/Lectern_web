import { describe, expect, it, vi } from 'vitest'
import { LICENCE_SERVICE_URL } from '../src/content/site'
import { fetchLicence, postToService, recoverLicence } from '../src/lib/licence'

function respond(status: number, body: unknown = {}) {
  return vi.fn(async () => new Response(JSON.stringify(body), { status }))
}

describe('fetchLicence', () => {
  it('returns the key and plan from the licence service', async () => {
    const fetcher = respond(200, { key: 'a.b', plan: 'yearly', expires: '2027-01-01T00:00:00.000Z' })

    const state = await fetchLicence('cs_test_1', fetcher)

    expect(state).toEqual({ status: 'ready', key: 'a.b', plan: 'yearly' })
    expect(fetcher).toHaveBeenCalledWith(`${LICENCE_SERVICE_URL}/key?session_id=cs_test_1`)
  })

  it('reports a payment that is still clearing', async () => {
    expect(await fetchLicence('cs', respond(202))).toEqual({ status: 'processing' })
  })

  it('reports a checkout link that has expired', async () => {
    expect(await fetchLicence('cs', respond(410, { error: 'session_expired' }))).toEqual({ status: 'expired' })
  })

  it.each([
    ['an error status', respond(404)],
    ['a body without a key', respond(200, { plan: 'monthly' })],
    ['a network failure', vi.fn(async () => Promise.reject(new Error('offline')))],
  ])('fails on %s', async (_case, fetcher) => {
    expect(await fetchLicence('cs', fetcher as unknown as typeof fetch)).toEqual({ status: 'failed' })
  })
})

describe('recoverLicence', () => {
  it('sends the email and receipt number to the licence service and returns the key', async () => {
    const fetcher = respond(200, { key: 'a.b', plan: 'semester', expires: '2027-05-08T00:00:00.000Z' })

    const state = await recoverLicence('a@b.c', '1234-5678', fetcher)

    expect(state).toEqual({ status: 'ready', key: 'a.b', plan: 'semester' })
    expect(fetcher).toHaveBeenCalledWith(`${LICENCE_SERVICE_URL}/recover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a@b.c', receiptNumber: '1234-5678' }),
    })
  })

  it('reports details that match no purchase', async () => {
    expect(await recoverLicence('a@b.c', '1', respond(404, { error: 'not_found' }))).toEqual({ status: 'notFound' })
  })

  it.each([
    ['a refusal for the purchase', respond(409, { error: 'payment_reversed' })],
    ['a body without a key', respond(200, { plan: 'monthly' })],
    ['a network failure', vi.fn(async () => Promise.reject(new Error('offline')))],
  ])('fails on %s', async (_case, fetcher) => {
    expect(await recoverLicence('a@b.c', '1234-5678', fetcher as unknown as typeof fetch)).toEqual({ status: 'failed' })
  })
})

describe('postToService', () => {
  it('posts the body as JSON to the path on the licence service and answers the response', async () => {
    const fetcher = respond(200, { ok: true })

    const response = await postToService('/macs', { key: 'a.b' }, fetcher)

    expect(response.status).toBe(200)
    expect(fetcher).toHaveBeenCalledWith(`${LICENCE_SERVICE_URL}/macs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'a.b' }),
    })
  })

  it('leaves a network failure to the caller', async () => {
    const fetcher = vi.fn(async () => Promise.reject(new Error('offline')))

    await expect(postToService('/macs', {}, fetcher as unknown as typeof fetch)).rejects.toThrow('offline')
  })
})
