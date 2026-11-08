import { LICENCE_SERVICE_URL } from '../content/site'

/** The payment has not cleared yet; ask again */
const PROCESSING_STATUS = 202
/** The checkout is too old for the service to show its key again (`session_expired`) */
const EXPIRED_STATUS = 410
/** The lost key page's details match no purchase; the service never says which part was wrong */
const NO_MATCH_STATUS = 404

/** A key the licence service gave, with its plan */
export type ReadyLicence = { status: 'ready'; key: string; plan: string }

/** Where the thank-you page is with fetching the key */
export type LicenceState =
  | { status: 'missing' }
  | { status: 'loading' }
  | { status: 'processing' }
  | ReadyLicence
  | { status: 'expired' }
  | { status: 'failed' }

/** Where the lost key page is with getting the key back */
export type LostKeyState = { status: 'idle' } | { status: 'sending' } | ReadyLicence | { status: 'notFound' } | { status: 'failed' }

/** The key in a successful answer from the licence service; any other answer is a failure */
async function readKey(response: Response): Promise<ReadyLicence | { status: 'failed' }> {
  if (!response.ok) return { status: 'failed' }
  const body = (await response.json()) as { key?: unknown; plan?: unknown }
  if (typeof body.key !== 'string' || typeof body.plan !== 'string') return { status: 'failed' }
  return { status: 'ready', key: body.key, plan: body.plan }
}

/** Posts `body` as JSON to `path` on the licence service; throws when `fetcher` does, so callers catch */
export function postToService(path: string, body: object, fetcher: typeof fetch): Promise<Response> {
  return fetcher(`${LICENCE_SERVICE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

/** Asks the licence service for the key of a paid checkout. Never throws. */
export async function fetchLicence(sessionId: string, fetcher: typeof fetch = fetch): Promise<LicenceState> {
  try {
    const response = await fetcher(`${LICENCE_SERVICE_URL}/key?session_id=${encodeURIComponent(sessionId)}`)
    if (response.status === PROCESSING_STATUS) return { status: 'processing' }
    if (response.status === EXPIRED_STATUS) return { status: 'expired' }
    return await readKey(response)
  } catch {
    return { status: 'failed' }
  }
}

/** Asks the licence service for a lost key by the checkout email and Stripe's receipt number. Never throws. */
export async function recoverLicence(email: string, receiptNumber: string, fetcher: typeof fetch = fetch): Promise<LostKeyState> {
  try {
    const response = await postToService('/recover', { email, receiptNumber }, fetcher)
    if (response.status === NO_MATCH_STATUS) return { status: 'notFound' }
    return await readKey(response)
  } catch {
    return { status: 'failed' }
  }
}
