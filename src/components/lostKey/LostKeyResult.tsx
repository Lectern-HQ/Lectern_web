import { LOST_KEY_COPY } from '../../content/lostKey'
import type { LostKeyState } from '../../lib/licence'
import { Problem, ReadyKey, Spinner } from '../thanks/parts'

/** What the page shows for each step of the search */
function Status({ state }: { state: LostKeyState }) {
  switch (state.status) {
    case 'idle':
      return null
    case 'sending':
      return (
        <div role="status" className="flex items-center gap-4">
          <Spinner />
          <p>{LOST_KEY_COPY.sending}</p>
        </div>
      )
    case 'ready':
      return <ReadyKey licence={state} />
    case 'notFound':
      return <Problem text={LOST_KEY_COPY.notFound} />
    case 'failed':
      return <Problem text={LOST_KEY_COPY.failed} />
  }
}

/** Under the form: the key with Copy once found, or one message that never says which detail was wrong */
export function LostKeyResult({ state }: { state: LostKeyState }) {
  return (
    <div aria-live="polite" className="mt-10 flex max-w-[66ch] flex-col gap-5">
      <Status state={state} />
    </div>
  )
}
