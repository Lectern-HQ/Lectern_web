import type { ReactNode } from 'react'
import { LEGAL_NAV } from '../../content/legal'
import { usePageTitle } from '../../hooks/usePageTitle'
import { DOWNLOAD_FROM_ELSEWHERE, ROUTES, SECTION_IDS } from '../../routes'
import { Container } from '../ui/Container'
import { LegalFooter } from './LegalFooter'
import { SiteHeader } from './SiteHeader'

interface DocumentPageProps {
  title: string
  /** Short line under the title, such as the date it was last updated */
  subtitle: ReactNode
  children: ReactNode
}

/** A text page away from home: header, large title, content, footer. */
export function DocumentPage({ title, subtitle, children }: DocumentPageProps) {
  usePageTitle(title.toLowerCase())

  return (
    <>
      <Container className="px-8">
        <SiteHeader homeHref={ROUTES.home} links={LEGAL_NAV} downloadHref={DOWNLOAD_FROM_ELSEWHERE} />
      </Container>

      <Container as="main" id={SECTION_IDS.main} className="px-8 pt-16 pb-30 leading-[1.6]">
        <h1 className="type-page-title">{title}</h1>
        <p className="mt-5 text-sm text-muted">{subtitle}</p>
        <div className="mt-4">{children}</div>
      </Container>

      <LegalFooter />
    </>
  )
}
