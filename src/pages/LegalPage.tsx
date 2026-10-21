import { LegalFooter } from '../components/layout/LegalFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { LegalSectionRow } from '../components/legal/LegalSectionRow'
import { LegalSummary } from '../components/legal/LegalSummary'
import { Container } from '../components/ui/Container'
import { LEGAL_NAV, type LegalDocument } from '../content/legal'
import { LEGAL_UPDATED } from '../content/site'
import { usePageTitle } from '../hooks/usePageTitle'
import { DOWNLOAD_FROM_ELSEWHERE, ROUTES, SECTION_IDS } from '../routes'

interface LegalPageProps {
  doc: LegalDocument
}

export function LegalPage({ doc }: LegalPageProps) {
  usePageTitle(doc.label.toLowerCase())

  return (
    <>
      <Container className="px-8">
        <SiteHeader homeHref={ROUTES.home} links={LEGAL_NAV} downloadHref={DOWNLOAD_FROM_ELSEWHERE} />
      </Container>

      <Container as="main" id={SECTION_IDS.main} className="px-8 pt-16 pb-30 leading-[1.6]">
        <h1 className="type-page-title">{doc.label}</h1>
        <p className="mt-5 text-sm text-muted">Last updated {LEGAL_UPDATED}</p>
        <div className="mt-4">
          {doc.summary && <LegalSummary>{doc.summary}</LegalSummary>}
          {doc.sections.map((section) => (
            <LegalSectionRow key={section.heading} {...section} />
          ))}
        </div>
      </Container>

      <LegalFooter />
    </>
  )
}
