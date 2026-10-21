import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const TITLE_SIZES = {
  headline: 'type-headline',
  subhead: 'type-subhead',
} as const

interface StatementProps {
  title: string
  children: ReactNode
  size?: keyof typeof TITLE_SIZES
  className?: string
  titleClassName?: string
  bodyClassName?: string
}

/** A large headline with a short paragraph beneath it. */
export function Statement({
  title,
  children,
  size = 'headline',
  className,
  titleClassName,
  bodyClassName,
}: StatementProps) {
  return (
    <div className={cn('flex min-w-0 flex-col', className)}>
      <h2 className={cn(TITLE_SIZES[size], titleClassName)}>{title}</h2>
      <p className={bodyClassName}>{children}</p>
    </div>
  )
}
