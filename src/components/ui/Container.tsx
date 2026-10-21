import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ContainerProps {
  as?: ElementType
  id?: string
  className?: string
  children: ReactNode
}

/** Centers content at the page's maximum width. */
export function Container({ as: Tag = 'div', id, className, children }: ContainerProps) {
  return (
    <Tag id={id} className={cn('mx-auto w-full max-w-page', className)}>
      {children}
    </Tag>
  )
}
