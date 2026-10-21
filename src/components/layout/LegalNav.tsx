import { LEGAL_NAV } from '../../content/legal'
import { cn } from '../../lib/cn'
import { TextLink } from '../ui/TextLink'

interface LegalNavProps {
  className?: string
}

export function LegalNav({ className }: LegalNavProps) {
  return (
    <nav aria-label="Legal" className={cn('flex flex-wrap gap-x-7', className)}>
      {LEGAL_NAV.map(({ label, href }) => (
        <TextLink key={href} href={href}>
          {label}
        </TextLink>
      ))}
    </nav>
  )
}
