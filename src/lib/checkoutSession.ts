import type { PlanId } from '../content/site'

/** Same shape the licence service accepts, capped at 255 characters after the prefix as it is; anything else is never stored or sent */
const SESSION_ID = /^cs_(test|live)_[A-Za-z0-9]{1,255}$/

/** Where the tab keeps the id once it is gone from the address bar, so a reload still finds the key */
export const SESSION_STORAGE_KEY = 'lectern.checkoutSession'

type SessionStore = Pick<Storage, 'getItem' | 'setItem'>

export function isCheckoutSessionId(value: string | null): value is string {
  return value !== null && SESSION_ID.test(value)
}

/**
 * The Checkout Session id from Stripe's redirect (`?session_id=cs_…`), or the one this tab saved
 * before the address bar was cleaned. Storage can be missing or blocked; then only the URL counts.
 */
export function rememberCheckoutSession(search: string, store: SessionStore | null): string | null {
  const fromUrl = new URLSearchParams(search).get('session_id')
  if (isCheckoutSessionId(fromUrl)) {
    try {
      store?.setItem(SESSION_STORAGE_KEY, fromUrl)
    } catch {
      // Storage blocked: the key still shows, a reload just cannot find it again
    }
    return fromUrl
  }
  try {
    const saved = store?.getItem(SESSION_STORAGE_KEY) ?? null
    return isCheckoutSessionId(saved) ? saved : null
  } catch {
    return null
  }
}

const RENEWING_PLANS: readonly string[] = ['monthly', 'yearly'] satisfies PlanId[]

/** Monthly and Yearly renew through Stripe, so only they get the customer portal link */
export function hasManageLink(plan: string): boolean {
  return RENEWING_PLANS.includes(plan)
}
