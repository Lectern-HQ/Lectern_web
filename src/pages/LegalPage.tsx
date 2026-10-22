import { DocumentPage } from '../components/layout/DocumentPage'
import { LegalSectionRow } from '../components/legal/LegalSectionRow'
import { LegalSummary } from '../components/legal/LegalSummary'
import type { LegalDocument } from '../content/legal'
import { LEGAL_UPDATED } from '../content/site'

interface LegalPageProps {
  doc: LegalDocument
}

export function LegalPage({ doc }: LegalPageProps) {
  return (
    <DocumentPage title={doc.label} subtitle={`Last updated ${LEGAL_UPDATED}`}>
      {doc.summary && <LegalSummary>{doc.summary}</LegalSummary>}
      {doc.sections.map((section) => (
        <LegalSectionRow key={section.heading} {...section} />
      ))}
    </DocumentPage>
  )
}
