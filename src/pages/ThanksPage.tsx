import { DocumentPage } from '../components/layout/DocumentPage'
import { ThanksContent } from '../components/thanks/ThanksContent'
import { THANKS_COPY } from '../content/thanks'
import { useCheckoutSession } from '../hooks/useCheckoutSession'
import { useLicence } from '../hooks/useLicence'
import { useNoIndex } from '../hooks/useNoIndex'

export function ThanksPage() {
  useNoIndex()
  const licence = useLicence(useCheckoutSession())

  return (
    <DocumentPage title={THANKS_COPY.title} subtitle={<p className="text-lg">{THANKS_COPY.subtitle}</p>}>
      <ThanksContent licence={licence} />
    </DocumentPage>
  )
}
