import { SITE } from '../../content/site'
import { cn } from '../../lib/cn'
import { LogoMark } from './LogoMark'

const SIZES = {
  /** Header: the mark is announced as the logo */
  lg: { mark: 32, className: 'gap-2.5 text-2xl tracking-[-0.03em]', label: `${SITE.name} logo` },
  /** Footer: the mark is decorative */
  sm: { mark: 24, className: 'gap-2', label: undefined },
} as const

interface WordmarkProps {
  size: keyof typeof SIZES
}

/** The logo mark followed by the name. */
export function Wordmark({ size }: WordmarkProps) {
  const { mark, className, label } = SIZES[size]
  return (
    <span className={cn('flex items-center font-bold', className)}>
      <LogoMark size={mark} label={label} />
      <span>{SITE.name}</span>
    </span>
  )
}
