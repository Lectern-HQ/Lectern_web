import type { ReactNode } from 'react'
import { DocumentPage } from '../components/layout/DocumentPage'
import { LicenceKeyBox } from '../components/thanks/LicenceKeyBox'
import { TextLink } from '../components/ui/TextLink'
import { CUSTOMER_PORTAL_URL, SITE } from '../content/site'
import { THANKS_COPY } from '../content/thanks'
import { useCheckoutSession } from '../hooks/useCheckoutSession'
import { useLicence } from '../hooks/useLicence'
import { useNoIndex } from '../hooks/useNoIndex'
import { hasManageLink } from '../lib/checkoutSession'
import type { LicenceState } from '../lib/licence'

function SupportLink() {
  return (
    <TextLink inline href={`mailto:${SITE.supportEmail}`}>
      {SITE.supportEmail}
    </TextLink>
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

/** A tinted box for the states that need attention: still clearing, or failed */
function Panel({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-4 rounded-lg bg-mist px-6 py-5">{children}</div>
}

function LicenceStatus({ licence }: { licence: LicenceState }) {
  switch (licence.status) {
    case 'ready':
      return (
        <>
          <LicenceKeyBox licenceKey={licence.key} />
          <p>{THANKS_COPY.saveNote}</p>
          {hasManageLink(licence.plan) && (
            <p>
              <TextLink href={CUSTOMER_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                {THANKS_COPY.manage}
              </TextLink>
            </p>
          )}
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

export function ThanksPage() {
  useNoIndex()
  const licence = useLicence(useCheckoutSession())

  return (
    <DocumentPage title={THANKS_COPY.title} subtitle={<p className="text-lg">{THANKS_COPY.subtitle}</p>}>
      <div aria-live="polite" className="mt-10 flex max-w-[66ch] flex-col gap-5">
        <LicenceStatus licence={licence} />
        <p className="text-muted">
          {THANKS_COPY.lostKey} <SupportLink />.
        </p>
      </div>
    </DocumentPage>
  )
}
