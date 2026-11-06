import type { ReactNode } from 'react'
import { YOUR_MACS_COPY } from '../../content/yourMacs'
import { ROUTES } from '../../routes'
import { TextLink } from '../ui/TextLink'

/** Where the link sits, and what it says when not the page's name */
interface YourMacsLinkProps {
  /** Inside running text rather than on its own */
  inline?: boolean
  children?: ReactNode
}

/** The link to the Your Macs page, from the lost key page, the FAQ, the terms and the footers */
export function YourMacsLink({ inline = false, children = YOUR_MACS_COPY.link }: YourMacsLinkProps) {
  return (
    <TextLink inline={inline} href={ROUTES.yourMacs}>
      {children}
    </TextLink>
  )
}
