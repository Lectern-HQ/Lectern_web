import { LOST_KEY_COPY } from '../../content/lostKey'
import { ROUTES } from '../../routes'
import { TextLink } from '../ui/TextLink'

interface LostKeyLinkProps {
  /** Inside running text rather than on its own */
  inline?: boolean
  className?: string
}

/** The link to the lost key page, from the thank-you page, the FAQ and the footers */
export function LostKeyLink({ inline = false, className }: LostKeyLinkProps) {
  return (
    <TextLink inline={inline} href={ROUTES.lostKey} className={className}>
      {LOST_KEY_COPY.link}
    </TextLink>
  )
}
