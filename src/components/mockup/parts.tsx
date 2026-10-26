import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { CheckIcon } from '../ui/icons'

/** Drawn controls for the app mockups. They are pictures, not working buttons. */

const BUTTON_VARIANTS = {
  solid: 'bg-btn px-4 font-semibold text-on-btn',
  outline: 'border border-control bg-card px-4 font-semibold',
  select: 'border border-control bg-card px-3.5',
} as const

interface MockButtonProps {
  variant: keyof typeof BUTTON_VARIANTS
  children: ReactNode
}

export function MockButton({ variant, children }: MockButtonProps) {
  return <span className={cn('inline-block rounded py-[9px] text-[13px]', BUTTON_VARIANTS[variant])}>{children}</span>
}

export function CheckBadge() {
  return (
    <span className="inline-flex size-4 flex-none items-center justify-center rounded-full bg-btn text-on-btn">
      <CheckIcon size={10} />
    </span>
  )
}

interface ScreenTextProps {
  children: ReactNode
  className?: string
}

export function ScreenTitle({ children }: ScreenTextProps) {
  return <div className="text-lg font-bold tracking-[-0.02em]">{children}</div>
}

export function ScreenHint({ children, className }: ScreenTextProps) {
  return <div className={cn('text-[12.5px] text-muted', className)}>{children}</div>
}

interface ProgressBarProps {
  percent: number
  start: string
  end: string
}

/** A bar with a caption on each side beneath it. */
export function ProgressBar({ percent, start, end }: ProgressBarProps) {
  return (
    <div>
      <div className="h-2 overflow-hidden rounded bg-sand">
        <div className="a-grow h-full origin-left bg-btn" style={{ width: `${percent}%` }} />
      </div>
      <ScreenHint className="mt-1.5 flex justify-between">
        <span>{start}</span>
        <span>{end}</span>
      </ScreenHint>
    </div>
  )
}
