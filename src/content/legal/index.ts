import type { NavItem } from '../home'
import { LEGAL_NOTICE } from './notice'
import { PRIVACY_POLICY } from './privacy'
import { TERMS_OF_USE } from './terms'
import type { LegalDocument } from './types'

export type { LegalDocument, LegalSection } from './types'

export const LEGAL_DOCUMENTS: readonly LegalDocument[] = [PRIVACY_POLICY, TERMS_OF_USE, LEGAL_NOTICE]

export const LEGAL_NAV: readonly NavItem[] = LEGAL_DOCUMENTS.map(({ label, path }) => ({ label, href: path }))
