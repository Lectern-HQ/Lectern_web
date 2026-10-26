import { ROUTES } from '../../routes'
import type { NavItem } from '../home'
import { LEGAL_NOTICE } from './notice'
import { PRIVACY_POLICY } from './privacy'
import { TERMS_OF_USE } from './terms'
import type { LegalDocument } from './types'

export type { LegalDocument, LegalSection } from './types'

export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [PRIVACY_POLICY, TERMS_OF_USE, LEGAL_NOTICE]

export const CHANGELOG_LABEL = 'What’s new'

/** The pages away from home: the legal documents, then the changelog */
export const DOCUMENT_NAV: readonly NavItem[] = [
  ...LEGAL_DOCUMENTS.map(({ label, path }) => ({ label, href: path })),
  { label: CHANGELOG_LABEL, href: ROUTES.changelog },
]
