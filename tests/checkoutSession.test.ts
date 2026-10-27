import { describe, expect, it } from 'vitest'
import { CUSTOMER_PORTAL_URL } from '../src/content/site'
import {
  SESSION_STORAGE_KEY,
  hasManageLink,
  isCheckoutSessionId,
  rememberCheckoutSession,
} from '../src/lib/checkoutSession'

function memoryStore(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    data,
  }
}

const blockedStore = {
  getItem: () => {
    throw new Error('blocked')
  },
  setItem: () => {
    throw new Error('blocked')
  },
}

describe('isCheckoutSessionId', () => {
  it.each(['cs_test_a1B2', 'cs_live_a1B2c3'])('accepts %s', (id) => {
    expect(isCheckoutSessionId(id)).toBe(true)
  })

  it.each([null, '', 'cs_', 'sub_123', 'cs_live_a1/../x', 'cs_live_<script>', 'cs_live_a b'])('rejects %s', (id) => {
    expect(isCheckoutSessionId(id)).toBe(false)
  })
})

describe('rememberCheckoutSession', () => {
  it('returns the id from the address bar and saves it for a reload', () => {
    const store = memoryStore()

    const id = rememberCheckoutSession('?session_id=cs_live_abc', store)

    expect(id).toBe('cs_live_abc')
    expect(store.data.get(SESSION_STORAGE_KEY)).toBe('cs_live_abc')
  })

  it('finds the saved id after the address bar was cleaned', () => {
    expect(rememberCheckoutSession('', memoryStore({ [SESSION_STORAGE_KEY]: 'cs_live_abc' }))).toBe('cs_live_abc')
  })

  it('prefers a new id in the address bar over an old saved one', () => {
    const store = memoryStore({ [SESSION_STORAGE_KEY]: 'cs_live_old' })

    expect(rememberCheckoutSession('?session_id=cs_live_new', store)).toBe('cs_live_new')
    expect(store.data.get(SESSION_STORAGE_KEY)).toBe('cs_live_new')
  })

  it('never saves or returns something that is not a session id', () => {
    const store = memoryStore()

    expect(rememberCheckoutSession('?session_id=javascript:alert(1)', store)).toBeNull()
    expect(store.data.size).toBe(0)
  })

  it('ignores a tampered saved value', () => {
    expect(rememberCheckoutSession('', memoryStore({ [SESSION_STORAGE_KEY]: 'not-an-id' }))).toBeNull()
  })

  it('still works from the address bar when storage is blocked', () => {
    expect(rememberCheckoutSession('?session_id=cs_test_1', blockedStore)).toBe('cs_test_1')
    expect(rememberCheckoutSession('', blockedStore)).toBeNull()
    expect(rememberCheckoutSession('', null)).toBeNull()
  })
})

describe('hasManageLink', () => {
  it('shows the portal link for plans that renew', () => {
    expect(hasManageLink('monthly')).toBe(true)
    expect(hasManageLink('yearly')).toBe(true)
  })

  it('hides it for lifetime and anything unknown', () => {
    expect(hasManageLink('lifetime')).toBe(false)
    expect(hasManageLink('')).toBe(false)
  })

  it('points at Stripe over https', () => {
    expect(new URL(CUSTOMER_PORTAL_URL).origin).toBe('https://billing.stripe.com')
  })
})
