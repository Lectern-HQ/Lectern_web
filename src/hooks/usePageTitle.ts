import { useEffect } from 'react'
import { SITE } from '../content/site'

/** Sets the tab title to "Lectern, <page>". */
export function usePageTitle(page: string): void {
  useEffect(() => {
    document.title = `${SITE.name}, ${page}`
  }, [page])
}
