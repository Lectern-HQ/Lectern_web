import { useState } from 'react'
import { THANKS_COPY } from '../../content/thanks'

const COPIED_MS = 2000

interface LicenceKeyBoxProps {
  licenceKey: string
}

/** The key in a selectable box, with a copy button */
export function LicenceKeyBox({ licenceKey }: LicenceKeyBoxProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(licenceKey)
      setCopied(true)
      setTimeout(() => setCopied(false), COPIED_MS)
    } catch {
      // Clipboard blocked: the key stays selectable in the box
    }
  }

  return (
    <div className="flex max-w-[880px] flex-col gap-4 rounded bg-mist p-8">
      <code className="block break-all font-mono text-sm select-all">{licenceKey}</code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 w-fit items-center rounded bg-btn px-5 font-semibold text-on-btn"
      >
        {copied ? THANKS_COPY.copied : THANKS_COPY.copy}
      </button>
    </div>
  )
}
