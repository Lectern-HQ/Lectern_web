import { LICENCE_SERVICE_URL } from '../content/site'

/** Where the thank-you page is with fetching the key */
export type LicenceState =
  | { status: 'missing' }
  | { status: 'loading' }
  | { status: 'processing' }
  | { status: 'ready'; key: string; plan: string; expires: string | null }
  | { status: 'failed' }

/** Reads the Checkout Session id Stripe puts in the thank-you link */
export function sessionIdFrom(search: string): string | null {
  return new URLSearchParams(search).get('session_id')
}

/** Asks the licence service for the key of a paid checkout. Never throws. */
export async function fetchLicence(sessionId: string, fetcher: typeof fetch = fetch): Promise<LicenceState> {
  try {
    const response = await fetcher(`${LICENCE_SERVICE_URL}/key?session_id=${encodeURIComponent(sessionId)}`)
    if (response.status === 202) return { status: 'processing' }
    if (!response.ok) return { status: 'failed' }
    const body = (await response.json()) as { key?: unknown; plan?: unknown; expires?: unknown }
    if (typeof body.key !== 'string' || typeof body.plan !== 'string') return { status: 'failed' }
    return { status: 'ready', key: body.key, plan: body.plan, expires: typeof body.expires === 'string' ? body.expires : null }
  } catch {
    return { status: 'failed' }
  }
}
