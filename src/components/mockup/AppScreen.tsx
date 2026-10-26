import type { ReactNode } from 'react'
import { SITE } from '../../content/site'
import { cn } from '../../lib/cn'

const TRAFFIC_LIGHTS = ['bg-[#FF5F57]', 'bg-[#FEBC2E]', 'bg-[#28C840]'] as const

const SIDEBAR_ITEMS = ['Transcribe', 'History', 'Settings'] as const

interface AppScreenProps {
  /** Describes the whole screen for screen readers; the mockup itself is one image. */
  label: string
  children: ReactNode
}

/** A drawn Lectern window: macOS title bar, sidebar, and the screen's content. */
export function AppScreen({ label, children }: AppScreenProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative w-full max-w-[600px] overflow-hidden rounded-[10px] border border-frame bg-window text-left text-ink shadow-[0_22px_44px_-28px_rgba(18,22,24,.5)]"
    >
      <div className="relative flex h-[34px] items-center border-b border-rule bg-card px-3.5">
        <div className="flex gap-[7px]">
          {TRAFFIC_LIGHTS.map((color) => (
            <i key={color} className={cn('block size-[11px] rounded-full', color)} />
          ))}
        </div>
        <div className="absolute inset-x-0 text-center text-xs font-semibold text-muted">{SITE.name}</div>
      </div>
      <div className="flex min-h-[300px]">
        <div className="flex w-28 flex-none flex-col gap-0.5 bg-sand px-2 py-2.5 max-compact:hidden">
          {SIDEBAR_ITEMS.map((item, index) => (
            <div
              key={item}
              className={cn(
                'rounded px-2.5 py-[7px] text-[13px]',
                index === 0 ? 'bg-card font-semibold shadow-[inset_3px_0_0_var(--color-btn)]' : 'text-muted',
              )}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3 px-6 py-[22px]">{children}</div>
      </div>
    </div>
  )
}
