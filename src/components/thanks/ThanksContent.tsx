import type { ReactNode } from 'react'
import { CUSTOMER_PORTAL_URL, SITE } from '../../content/site'
import { THANKS_COPY } from '../../content/thanks'
import { hasManageLink } from '../../lib/checkoutSession'
import type { LicenceState } from '../../lib/licence'
import { TextLink } from '../ui/TextLink'
import { LicenceKeyBox } from './LicenceKeyBox'

function SupportLink() {
  return (
    <TextLink inline href={`mailto:${SITE.supportEmail}`}>
      {SITE.supportEmail}
    </TextLink>
  )
}

/** Stripe's customer portal, where a buyer manages or cancels a plan */
function ManageLink() {
  return (
    <p>
      <TextLink href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
        {THANKS_COPY.manage}
      </TextLink>
    </p>
  )
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-[22px] flex-none animate-spin rounded-full border-3 border-line border-t-ink motion-reduce:animate-none"
    />
  )
}

function WarningIcon() {
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
function Panel({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-4 rounded-lg bg-mist px-6 py-5">{children}</div>
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

function LicenceStatus({ licence }: { licence: LicenceState }) {
  switch (licence.status) {
    case 'ready':
      return (
        <>
          <LicenceKeyBox licenceKey={licence.key} />
          <ActivationSteps />
          <p>{THANKS_COPY.saveNote}</p>
          {hasManageLink(licence.plan) && <ManageLink />}
        </>
      )
    case 'loading':
      return (
        <div role="status" className="flex items-center gap-4">
          <Spinner />
          <p>{THANKS_COPY.loading}</p>
        </div>
      )
    case 'processing':
      return (
        <div role="status">
          <Panel>
            <Spinner />
            <p>{THANKS_COPY.processing}</p>
          </Panel>
        </div>
      )
    case 'expired':
      return (
        <>
          <div role="alert">
            <Panel>
              <WarningIcon />
              <p>
                {THANKS_COPY.expired} <SupportLink />.
              </p>
            </Panel>
          </div>
          <ManageLink />
        </>
      )
    case 'failed':
      return (
        <div role="alert">
          <Panel>
            <WarningIcon />
            <p>{THANKS_COPY.failed}</p>
          </Panel>
        </div>
      )
    case 'missing':
      return <p>{THANKS_COPY.missing}</p>
  }
}

/** The thank-you page's body for `licence`; the expired message already gives the support address. */
export function ThanksContent({ licence }: { licence: LicenceState }) {
  return (
    <div aria-live="polite" className="mt-10 flex max-w-[66ch] flex-col gap-5">
      <LicenceStatus licence={licence} />
      {licence.status !== 'expired' && (
        <p className="text-muted">
          {THANKS_COPY.lostKey} <SupportLink />.
        </p>
      )}
    </div>
  )
}
