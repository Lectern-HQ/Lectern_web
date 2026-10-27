import { useLocation } from 'react-router'
import { DocumentPage } from '../components/layout/DocumentPage'
import { LicenceKeyBox } from '../components/thanks/LicenceKeyBox'
import { TextLink } from '../components/ui/TextLink'
import { SITE } from '../content/site'
import { THANKS_COPY } from '../content/thanks'
import { useLicence } from '../hooks/useLicence'
import { useNoIndex } from '../hooks/useNoIndex'
import { sessionIdFrom } from '../lib/licence'

function SupportLink() {
  return (
    <TextLink inline href={`mailto:${SITE.supportEmail}`}>
      {SITE.supportEmail}
    </TextLink>
  )
}

export function ThanksPage() {
  useNoIndex()
  const licence = useLicence(sessionIdFrom(useLocation().search))

  return (
    <DocumentPage title={THANKS_COPY.title} subtitle={<p className="text-lg">{THANKS_COPY.subtitle}</p>}>
      <div aria-live="polite" className="max-w-[62ch]">
        {licence.status === 'ready' ? (
          <>
            <LicenceKeyBox licenceKey={licence.key} />
            <p className="mt-6">{THANKS_COPY.saveNote}</p>
          </>
        ) : (
          <p className="mt-10">{THANKS_COPY[licence.status]}</p>
        )}
        <p className="mt-6 text-muted">
          {THANKS_COPY.lostKey} <SupportLink />.
        </p>
      </div>
    </DocumentPage>
  )
}
