import type { NavItem } from '../../content/home'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/ButtonLink'
import { SmartLink } from '../ui/SmartLink'
import { TextLink } from '../ui/TextLink'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Wordmark } from '../ui/Wordmark'

interface SiteHeaderProps {
  homeHref: string
  links: readonly NavItem[]
  downloadHref: string
  downloadLabel: string
  /**
   * The home page's bar stays on one line: on narrow screens its links, which only jump down the page, hide and
   * the logo and button shrink. Other pages let the links wrap instead.
   */
  compactOnNarrow?: boolean
}

export function SiteHeader({ homeHref, links, downloadHref, downloadLabel, compactOnNarrow = false }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between gap-x-6 gap-y-2 py-5',
        compactOnNarrow ? 'flex-nowrap' : 'flex-wrap',
      )}
    >
      <SmartLink href={homeHref} className="flex min-h-11 items-center text-ink no-underline">
        <Wordmark
          size="lg"
          className={cn(compactOnNarrow && 'max-compact:gap-2 max-compact:text-[21px] max-[380px]:text-[19px]')}
        />
      </SmartLink>
      <nav
        aria-label="Main"
        className={cn(
          'flex items-center gap-x-7',
          compactOnNarrow ? 'flex-none flex-nowrap max-compact:gap-x-1' : 'flex-wrap',
        )}
      >
        {links.map(({ label, href }) => (
          <TextLink
            key={href}
            href={href}
            className={cn('text-base aria-[current=page]:font-bold', compactOnNarrow && 'max-compact:hidden')}
          >
            {label}
          </TextLink>
        ))}
        <ThemeToggle />
        <ButtonLink
          href={downloadHref}
          className={cn(
            compactOnNarrow &&
              'max-compact:px-3.5 max-compact:text-[15px] max-[380px]:px-2.5 max-[380px]:text-sm',
          )}
        >
          {downloadLabel}
        </ButtonLink>
      </nav>
    </header>
  )
}
