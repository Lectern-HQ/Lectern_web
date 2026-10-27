import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { rememberCheckoutSession } from '../lib/checkoutSession'

function tabStorage(): Storage | null {
  try {
    return window.sessionStorage
  } catch {
    return null
  }
}

/**
 * The Checkout Session id for the thank-you page. Anyone holding the id can fetch the key, so it is
 * taken out of the address bar (and so out of history, bookmarks and copied links) as soon as it is read.
 */
export function useCheckoutSession(): string | null {
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [sessionId] = useState(() => rememberCheckoutSession(search, tabStorage()))

  useEffect(() => {
    if (search) navigate(pathname, { replace: true })
  }, [navigate, pathname, search])

  return sessionId
}
