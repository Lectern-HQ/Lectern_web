import type { ComponentProps } from 'react'
import { cn } from '../../lib/cn'

const VARIANTS = {
  solid: 'min-h-11 bg-btn px-5 text-on-btn',
  /** A quiet button beside a solid one: a grey outline that turns ink on hover */
  outline:
    'min-h-12 gap-2.5 bg-transparent px-[22px] text-base text-ink shadow-[inset_0_0_0_1.5px_var(--color-subtle)] transition-shadow duration-180 hover:shadow-[inset_0_0_0_1.5px_var(--color-ink)] touch-manipulation',
} as const

interface ButtonProps extends ComponentProps<'button'> {
  variant?: keyof typeof VARIANTS
}

/** The site's button, for actions on the page rather than links: solid by default, or an outline */
export function Button({ className, type = 'button', variant = 'solid', ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn('inline-flex w-fit items-center rounded font-semibold disabled:opacity-60', VARIANTS[variant], className)}
      {...rest}
    />
  )
}
