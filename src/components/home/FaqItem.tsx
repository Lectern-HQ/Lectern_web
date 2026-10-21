import type { ReactNode } from 'react'
import { ChevronIcon } from '../ui/icons'

interface FaqItemProps {
  question: string
  defaultOpen?: boolean
  children: ReactNode
}

export function FaqItem({ question, defaultOpen = false, children }: FaqItemProps) {
  return (
    <details
      open={defaultOpen}
      className="group -mx-6 rounded px-6 py-[18px] transition-colors duration-250 open:bg-mist"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 text-[clamp(20px,1.4vw_+_8px,26px)] leading-tight [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronIcon className="flex-none transition-transform duration-250 group-open:rotate-180" />
      </summary>
      <p className="mt-3.5 max-w-[52ch]">{children}</p>
    </details>
  )
}
