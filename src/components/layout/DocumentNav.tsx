import { DOCUMENT_NAV } from '../../content/legal'
import { cn } from '../../lib/cn'
import { TextLink } from '../ui/TextLink'

interface DocumentNavProps {
  className?: string
}

/** Links to the legal pages and the changelog */
export function DocumentNav({ className }: DocumentNavProps) {
  return (
    <nav aria-label="Legal" className={cn('flex flex-wrap gap-x-7', className)}>
      {DOCUMENT_NAV.map(({ label, href }) => (
        <TextLink key={href} href={href}>
          {label}
        </TextLink>
      ))}
    </nav>
  )
}
