import { useEffect, useState } from 'react'
import { type LicenceState, fetchLicence } from '../lib/licence'

/** How often to ask again while a payment clears, and for how long */
const RETRY_MS = 3000
const MAX_TRIES = 20

/** Fetches the key for a checkout, asking again while the payment is still processing */
export function useLicence(sessionId: string | null): LicenceState {
  const [state, setState] = useState<LicenceState>(sessionId ? { status: 'loading' } : { status: 'missing' })

  useEffect(() => {
    if (!sessionId) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined

    async function attempt(tries: number) {
      const next = await fetchLicence(sessionId!)
      if (cancelled) return
      const giveUp = next.status === 'processing' && tries >= MAX_TRIES
      setState(giveUp ? { status: 'failed' } : next)
      if (next.status === 'processing' && !giveUp) timer = setTimeout(() => attempt(tries + 1), RETRY_MS)
    }

    attempt(1)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [sessionId])

  return state
}
