import { DocumentPage } from '../components/layout/DocumentPage'
import { LostKeyForm } from '../components/lostKey/LostKeyForm'
import { LostKeyResult } from '../components/lostKey/LostKeyResult'
import { YourMacsLink } from '../components/yourMacs/YourMacsLink'
import { LOST_KEY_COPY } from '../content/lostKey'
import { useLostKey } from '../hooks/useLostKey'

/** Gets a lost licence key back from the checkout email and Stripe's receipt number */
export function LostKeyPage() {
  const { state, send } = useLostKey()

  return (
    <DocumentPage title={LOST_KEY_COPY.title} subtitle={<p className="text-lg">{LOST_KEY_COPY.subtitle}</p>}>
      <LostKeyForm sending={state.status === 'sending'} onSend={send} />
      <LostKeyResult state={state} />
      <p className="mt-10">
        {LOST_KEY_COPY.yourMacs} <YourMacsLink inline />.
      </p>
    </DocumentPage>
  )
}
