import { formatDate } from '../../content/site'
import { YOUR_MACS_COPY } from '../../content/yourMacs'
import type { MacList, YourMacsState } from '../../lib/macs'
import { Problem, Spinner, SupportLink } from '../thanks/parts'
import { MacRow } from './MacRow'

const MS_PER_SECOND = 1000

/** The key's Macs, a Free button on each, and how many frees are left */
interface MacsProps {
  list: MacList
  /** The Mac being freed, if any */
  freeing: string | null
  freeFailed: boolean
  onFree: (machineId: string) => void
}

/** How many frees are left, or when the next one is possible */
function FreesLeft({ list }: { list: MacList }) {
  if (list.nextFreeAt === null || list.freesLeft > 0) return <p>{YOUR_MACS_COPY.freesLeft(list.freesLeft)}</p>
  const date = formatDate(new Date(list.nextFreeAt * MS_PER_SECOND), 'long')
  return (
    <p>
      {YOUR_MACS_COPY.noFreesLeft(date)} <SupportLink />.
    </p>
  )
}

/** The list, or a line saying the key is on no Mac */
function Macs({ list, freeing, freeFailed, onFree }: MacsProps) {
  if (list.macs.length === 0) return <p>{YOUR_MACS_COPY.none}</p>
  const canFree = list.freesLeft > 0 && freeing === null
  return (
    <>
      <ul className="rounded-lg bg-mist px-6">
        {list.macs.map((mac) => (
          <MacRow key={mac.machineId} mac={mac} canFree={canFree} freeing={freeing === mac.machineId} onFree={onFree} />
        ))}
      </ul>
      {freeFailed && <Problem text={YOUR_MACS_COPY.failed} />}
      <FreesLeft list={list} />
      <p className="text-muted">{YOUR_MACS_COPY.stillWorks}</p>
    </>
  )
}

/** What the page shows for each step */
function Status({ state, onFree }: { state: YourMacsState; onFree: (machineId: string) => void }) {
  switch (state.status) {
    case 'idle':
      return null
    case 'loading':
      return (
        <div role="status" className="flex items-center gap-4">
          <Spinner />
          <p>{YOUR_MACS_COPY.loading}</p>
        </div>
      )
    case 'listed':
      return <Macs list={state.list} freeing={state.freeing} freeFailed={state.freeFailed} onFree={onFree} />
    case 'invalid':
      return <Problem text={YOUR_MACS_COPY.invalid} />
    case 'revoked':
      return <Problem text={YOUR_MACS_COPY.revoked} />
    case 'failed':
      return <Problem text={YOUR_MACS_COPY.failed} />
  }
}

/** Under the form: the key's Macs with Free, or one message */
export function YourMacsResult({ state, onFree }: { state: YourMacsState; onFree: (machineId: string) => void }) {
  return (
    <div aria-live="polite" className="mt-10 flex max-w-[66ch] flex-col gap-5">
      <Status state={state} onFree={onFree} />
    </div>
  )
}
