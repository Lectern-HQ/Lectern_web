import { useState } from 'react'
import { formatDate } from '../../content/site'
import { YOUR_MACS_COPY } from '../../content/yourMacs'
import type { Mac } from '../../lib/macs'
import { Button } from '../ui/Button'

const MS_PER_SECOND = 1000

/** One Mac of the list, and what can be done with it */
interface MacRowProps {
  mac: Mac
  /** False while no frees are left or another free runs */
  canFree: boolean
  /** True while this Mac is being freed */
  freeing: boolean
  onFree: (machineId: string) => void
}

/** "Activated 6 November 2026" with Free, which asks once more before freeing */
export function MacRow({ mac, canFree, freeing, onFree }: MacRowProps) {
  const [confirming, setConfirming] = useState(false)
  const activated = YOUR_MACS_COPY.activated(formatDate(new Date(mac.activatedAt * MS_PER_SECOND), 'long'))

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line py-4 last:border-b-0">
      <span className="font-semibold">{activated}</span>
      {freeing ? (
        <span role="status">{YOUR_MACS_COPY.freeing}</span>
      ) : confirming ? (
        <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>{YOUR_MACS_COPY.confirm}</span>
          <Button onClick={() => onFree(mac.machineId)} disabled={!canFree}>
            {YOUR_MACS_COPY.confirmFree}
          </Button>
          <button type="button" onClick={() => setConfirming(false)} className="min-h-11 underline underline-offset-[5px]">
            {YOUR_MACS_COPY.cancel}
          </button>
        </span>
      ) : (
        <Button onClick={() => setConfirming(true)} disabled={!canFree} aria-label={`${YOUR_MACS_COPY.free}: ${activated}`}>
          {YOUR_MACS_COPY.free}
        </Button>
      )}
    </li>
  )
}
