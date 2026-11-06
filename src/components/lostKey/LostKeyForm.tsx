import type { ComponentProps, FormEvent } from 'react'
import { LOST_KEY_COPY } from '../../content/lostKey'
import { Button } from '../ui/Button'

/** The names the form sends its two fields under */
const FIELD = { email: 'email', receiptNumber: 'receiptNumber' } as const

interface FieldProps extends ComponentProps<'input'> {
  name: string
  label: string
  /** A line under the field, read out with it */
  hint?: string
}

/** A labelled text field, with an optional hint tied to it */
function Field({ name, label, hint, ...input }: FieldProps) {
  const hintId = hint ? `${name}-hint` : undefined
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-semibold">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required
        aria-describedby={hintId}
        className="min-h-11 rounded border border-line bg-card px-4 text-base text-ink"
        {...input}
      />
      {hint && (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}

interface LostKeyFormProps {
  /** While true the button waits, so one search runs at a time */
  sending: boolean
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
