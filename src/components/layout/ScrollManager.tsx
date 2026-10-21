import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** On navigation, scroll to the URL's #anchor if it has one, otherwise to the top. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null
    if (target) {
      target.scrollIntoView()
    } else {
      // instant: a new page should open at the top, not glide there under the site-wide smooth scrolling
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
