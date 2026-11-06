import type { FormEvent } from 'react'
import { LOST_KEY_COPY } from '../../content/lostKey'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'

/** The names the form sends its two fields under */
const FIELD = { email: 'email', receiptNumber: 'receiptNumber' } as const

/** Whether a search is running, and what to call with the two fields */
interface LostKeyFormProps {
  /** While true the button waits, so one search runs at a time */
  sending: boolean
  /** Called with the email and receipt number as typed; the licence service tidies them */
  onSend: (email: string, receiptNumber: string) => void
}

/** The checkout email and the receipt number, sent together */
export function LostKeyForm({ sending, onSend }: LostKeyFormProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields = new FormData(event.currentTarget)
    onSend(String(fields.get(FIELD.email) ?? ''), String(fields.get(FIELD.receiptNumber) ?? ''))
  }

  return (
    <form onSubmit={submit} className="mt-10 flex max-w-[28rem] flex-col gap-6">
      <Field name={FIELD.email} label={LOST_KEY_COPY.emailLabel} type="email" autoComplete="email" />
      <Field
        name={FIELD.receiptNumber}
        label={LOST_KEY_COPY.receiptLabel}
        hint={LOST_KEY_COPY.receiptHint}
        autoComplete="off"
        spellCheck={false}
      />
      <Button type="submit" disabled={sending}>
        {LOST_KEY_COPY.submit}
      </Button>
    </form>
  )
}
