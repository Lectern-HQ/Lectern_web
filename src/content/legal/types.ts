import type { ReactNode } from 'react'

export interface LegalSection {
  heading: string
  /** Paragraphs and lists; the layout spaces and styles them. */
  body: ReactNode
}

export interface LegalDocument {
  path: string
  /** Shown as the page heading and in the navigation */
  label: string
  /** Optional plain-language summary shown above the sections */
  summary?: ReactNode
  sections: readonly LegalSection[]
}
