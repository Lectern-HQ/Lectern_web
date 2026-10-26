export const ROUTES = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  legal: '/legal',
  changelog: '/changelog',
} as const

/** Element ids that links jump to */
export const SECTION_IDS = {
  main: 'main',
  top: 'top',
  how: 'how',
  pricing: 'pricing',
  yours: 'yours',
  faq: 'faq',
} as const

export function anchor(id: string): string {
  return `#${id}`
}
