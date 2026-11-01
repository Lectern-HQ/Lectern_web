import type { NavItem } from '../../content/home'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/ButtonLink'
import { SmartLink } from '../ui/SmartLink'
import { TextLink } from '../ui/TextLink'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Wordmark } from '../ui/Wordmark'

/** What the download button says while downloads are closed */
export const DOWNLOADS_CLOSED_LABEL = 'Coming soon'

/** The button's smaller size on the home page's one-line bar */
const COMPACT_BUTTON = 'max-compact:px-3.5 max-compact:text-[15px] max-[380px]:px-2.5 max-[380px]:text-sm'

interface SiteHeaderProps {
  homeHref: string
  links: readonly NavItem[]
  /** Null while downloads are closed: the button becomes a plain "Coming soon" label */
  downloadHref: string | null
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
        {downloadHref ? (
          <ButtonLink href={downloadHref} className={cn(compactOnNarrow && COMPACT_BUTTON)}>
            {downloadLabel}
          </ButtonLink>
        ) : (
          <span
            className={cn(
              'inline-flex min-h-11 items-center rounded border border-line px-5 text-base font-semibold text-muted',
              compactOnNarrow && COMPACT_BUTTON,
            )}
          >
            {DOWNLOADS_CLOSED_LABEL}
          </span>
        )}
      </nav>
    </header>
  )
}
