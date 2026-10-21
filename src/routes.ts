export const ROUTES = {
  home: '/',
  privacy: '/privacy',
  terms: '/terms',
  legal: '/legal',
} as const

/** Element ids that links jump to */
export const SECTION_IDS = {
  main: 'main',
  top: 'top',
  how: 'how',
  privacy: 'privacy',
  faq: 'faq',
  download: 'download',
} as const

export function anchor(id: string): string {
  return `#${id}`
}

export const DOWNLOAD_FROM_ELSEWHERE = `${ROUTES.home}${anchor(SECTION_IDS.download)}`
