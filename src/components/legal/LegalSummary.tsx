import type { ReactNode } from 'react'

interface LegalSummaryProps {
  children: ReactNode
}

export function LegalSummary({ children }: LegalSummaryProps) {
  return (
    <div className="mt-10 mb-6 flex max-w-[880px] flex-col gap-3 rounded bg-mist p-8">
      <h2 className="type-title">In short</h2>
      <p className="max-w-[62ch]">{children}</p>
    </div>
  )
}
