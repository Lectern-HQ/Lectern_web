import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

/** The site's solid button, for actions on the page rather than links */
export function Button({ className, type = 'button', ...rest }: ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex min-h-11 w-fit items-center rounded bg-btn px-5 font-semibold text-on-btn disabled:opacity-60',
        className,
      )}
      {...rest}
    />
  )
}
