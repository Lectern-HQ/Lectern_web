import type { ReactNode } from 'react'
import { CUSTOMER_PORTAL_URL, SITE } from '../../content/site'
import { THANKS_COPY } from '../../content/thanks'
import type { ReadyLicence } from '../../lib/licence'
import { TextLink } from '../ui/TextLink'
import { LicenceKeyBox } from './LicenceKeyBox'

/** The support address as a mail link, inside running text */
export function SupportLink() {
  return (
    <TextLink inline href={`mailto:${SITE.supportEmail}`}>
      {SITE.supportEmail}
    </TextLink>
  )
}

/** Stripe's customer portal, where a buyer manages or cancels a plan */
export function ManageLink() {
  return (
    <p>
      <TextLink href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
        {THANKS_COPY.manage}
      </TextLink>
    </p>
  )
}

/** A turning ring while the licence service answers */
export function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-[22px] flex-none animate-spin rounded-full border-3 border-line border-t-ink motion-reduce:animate-none"
    />
  )
}

/** A warning triangle for messages that need attention */
export function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 size-[22px] flex-none"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l10 18H2z" />
      <path d="M12 10v5M12 18.2v.1" />
    </svg>
  )
}

/** A tinted box for the states that need attention: still clearing, expired, or failed */
export function Panel({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-4 rounded-lg bg-mist px-6 py-5">{children}</div>
}

/** One message in the tinted box, ending with the support address */
export function Problem({ text }: { text: string }) {
  return (
    <div role="alert">
      <Panel>
        <WarningIcon />
        <p>
          {text} <SupportLink />.
        </p>
      </Panel>
    </div>
  )
}

/** The three steps from the copied key to an activated app */
function ActivationSteps() {
  return (
    <div>
      <h2 className="font-semibold">{THANKS_COPY.stepsTitle}</h2>
      <ol className="mt-2 list-decimal space-y-1 pl-6">
        {THANKS_COPY.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  )
}

/** A key from the licence service: the box with Copy, how to activate it, and the portal link, since every plan renews */
export function ReadyKey({ licence }: { licence: ReadyLicence }) {
  return (
    <>
      <LicenceKeyBox licenceKey={licence.key} />
      <ActivationSteps />
      <p>{THANKS_COPY.saveNote}</p>
      <ManageLink />
    </>
  )
}
