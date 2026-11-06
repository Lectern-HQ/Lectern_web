import type { ComponentProps } from 'react'

/** A text input with the name the form sends it under and the label it shows */
interface FieldProps extends ComponentProps<'input'> {
  name: string
  label: string
  /** A line under the field, read out with it */
  hint?: string
}

/** A labelled text field, with an optional hint tied to it */
export function Field({ name, label, hint, ...input }: FieldProps) {
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
