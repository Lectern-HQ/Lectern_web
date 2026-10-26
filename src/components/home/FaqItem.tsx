import type { ReactNode } from 'react'
import { ChevronIcon } from '../ui/icons'

/** Opening one question closes the others, as the browser does for <details> that share a name */
const GROUP_NAME = 'faq'

interface FaqItemProps {
  question: string
  defaultOpen?: boolean
  children: ReactNode
}

export function FaqItem({ question, defaultOpen = false, children }: FaqItemProps) {
  return (
    <details
      name={GROUP_NAME}
      open={defaultOpen}
      className="faq-item group border-t border-line last-of-type:border-b"
    >
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-[22px] text-[clamp(20px,1.4vw_+_8px,26px)] leading-tight [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronIcon className="flex-none transition-transform duration-300 ease-spring group-open:rotate-180" />
      </summary>
      <p className="max-w-[52ch] pr-16 pb-7">{children}</p>
    </details>
  )
}
