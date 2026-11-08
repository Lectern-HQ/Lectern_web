import { useState } from 'react'
import { THANKS_COPY } from '../../content/thanks'
import { Button } from '../ui/Button'
import { CopyIcon, DoneIcon } from '../ui/icons'

const COPIED_MS = 2000

interface LicenceKeyBoxProps {
  licenceKey: string
}

/** The key in a selectable box, with an outline copy button under it */
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
    <div className="flex flex-col gap-3">
      <code
        translate="no"
        className="block rounded-lg border border-line bg-mist px-5 py-4 font-mono text-sm leading-[1.55] break-all select-all"
      >
        {licenceKey}
      </code>
      <Button variant="outline" onClick={copy}>
        {copied ? <DoneIcon size={18} /> : <CopyIcon size={18} />}
        {copied ? THANKS_COPY.copied : THANKS_COPY.copy}
      </Button>
    </div>
  )
}
