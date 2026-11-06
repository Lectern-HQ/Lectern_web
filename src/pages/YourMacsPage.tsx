import { DocumentPage } from '../components/layout/DocumentPage'
import { YourMacsForm } from '../components/yourMacs/YourMacsForm'
import { YourMacsResult } from '../components/yourMacs/YourMacsResult'
import { YOUR_MACS_COPY } from '../content/yourMacs'
import { useYourMacs } from '../hooks/useYourMacs'

/** Lists the Macs a licence key is active on, and frees one the buyer no longer has */
export function YourMacsPage() {
  const { state, show, free } = useYourMacs()

  return (
    <DocumentPage title={YOUR_MACS_COPY.title} subtitle={<p className="text-lg">{YOUR_MACS_COPY.subtitle}</p>}>
      <YourMacsForm sending={state.status === 'loading'} onSend={show} />
      <YourMacsResult state={state} onFree={free} />
    </DocumentPage>
  )
}
