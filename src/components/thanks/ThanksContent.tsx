import { THANKS_COPY } from '../../content/thanks'
import type { LicenceState } from '../../lib/licence'
import { LostKeyLink } from '../lostKey/LostKeyLink'
import { ManageLink, Panel, ReadyKey, Spinner, SupportLink, WarningIcon } from './parts'

/** What the page shows for each step of fetching the key */
function LicenceStatus({ licence }: { licence: LicenceState }) {
  switch (licence.status) {
    case 'ready':
      return <ReadyKey licence={licence} />
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
              <p>{THANKS_COPY.expired}</p>
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

/** The thank-you page's body for `licence`, ending with where to get a lost key back */
export function ThanksContent({ licence }: { licence: LicenceState }) {
  return (
    <div aria-live="polite" className="mt-10 flex max-w-[66ch] flex-col gap-5">
      <LicenceStatus licence={licence} />
      <p className="text-muted">
        {THANKS_COPY.lostKey} <LostKeyLink inline />, {THANKS_COPY.orWrite} <SupportLink />.
      </p>
    </div>
  )
}
