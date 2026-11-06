import type { FormEvent } from 'react'
import { YOUR_MACS_COPY } from '../../content/yourMacs'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'

/** The name the form sends the key under */
const KEY_FIELD = 'key'

/** Whether a lookup is running, and what to call with the key */
interface YourMacsFormProps {
  /** While true the button waits, so one lookup runs at a time */
  sending: boolean
  /** Called with the key as pasted; the licence service checks it */
  onSend: (key: string) => void
}

/** The licence key, sent to list its Macs */
export function YourMacsForm({ sending, onSend }: YourMacsFormProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSend(String(new FormData(event.currentTarget).get(KEY_FIELD) ?? '').trim())
  }

  return (
    <form onSubmit={submit} className="mt-10 flex max-w-[36rem] flex-col gap-6">
      <Field
        name={KEY_FIELD}
        label={YOUR_MACS_COPY.keyLabel}
        hint={YOUR_MACS_COPY.keyHint}
        autoComplete="off"
        spellCheck={false}
        className="min-h-11 rounded border border-line bg-card px-4 font-mono text-sm text-ink"
      />
      <Button type="submit" disabled={sending}>
        {YOUR_MACS_COPY.submit}
      </Button>
    </form>
  )
}
