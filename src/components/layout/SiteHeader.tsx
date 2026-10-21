import type { NavItem } from '../../content/home'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/ButtonLink'
import { SmartLink } from '../ui/SmartLink'
import { TextLink } from '../ui/TextLink'
import { Wordmark } from '../ui/Wordmark'

interface SiteHeaderProps {
  homeHref: string
  links: readonly NavItem[]
  downloadHref: string
  /** On narrow screens keep only the logo and Download, for links that just jump down the page */
  hideLinksWhenCompact?: boolean
  className?: string
}

export function SiteHeader({ homeHref, links, downloadHref, hideLinksWhenCompact = false, className }: SiteHeaderProps) {
  return (
    <header className={cn('flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5', className)}>
      <SmartLink href={homeHref} className="flex min-h-11 items-center no-underline">
        <Wordmark size="lg" />
      </SmartLink>
      <nav aria-label="Main" className="flex flex-wrap items-center gap-x-7">
        {links.map(({ label, href }) => (
          <TextLink
            key={href}
            href={href}
            className={cn('text-base aria-[current=page]:font-bold', hideLinksWhenCompact && 'max-compact:hidden')}
          >
            {label}
          </TextLink>
        ))}
        <ButtonLink href={downloadHref}>Download</ButtonLink>
      </nav>
    </header>
  )
}
