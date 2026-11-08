import { useState } from 'react'
import { RELEASE } from '../../content/site'
import { THANKS_COPY } from '../../content/thanks'
import { activationLink } from '../../lib/licence'
import { ROUTES } from '../../routes'
import { ButtonLink } from '../ui/ButtonLink'
import { InfoIcon, OpenIcon } from '../ui/icons'
import { TextLink } from '../ui/TextLink'
import { Panel } from './parts'

interface OpenInLecternProps {
  licenceKey: string
}

/** After a press: the calm way out when Lectern did not open, with the download */
export function NotOpened() {
  return (
    <div role="status" className="text-[15px] leading-normal">
      <Panel>
        <InfoIcon size={20} className="mt-0.5 flex-none" />
        <p>
          {THANKS_COPY.notOpened}{' '}
          <TextLink inline href={RELEASE.downloadUrl ?? ROUTES.home}>
            {THANKS_COPY.download}
          </TextLink>
          {THANKS_COPY.notOpenedAfter}
        </p>
      </Panel>
    </div>
  )
}

/** The page's one solid button, opening Lectern with the key; once pressed, the way out if the app did not open */
export function OpenInLectern({ licenceKey }: OpenInLecternProps) {
  // The page cannot tell whether Lectern opened, so the hint shows after any press
  const [pressed, setPressed] = useState(false)

  return (
    <>
      <div className="flex flex-col items-start gap-4 max-compact:items-stretch">
        <ButtonLink size="large" href={activationLink(licenceKey)} onClick={() => setPressed(true)} className="w-fit max-compact:w-full">
          <OpenIcon size={20} />
          {THANKS_COPY.openInApp}
        </ButtonLink>
        <p className="max-w-[52ch] text-[15px] leading-normal text-pretty text-muted">{THANKS_COPY.openInAppNote}</p>
      </div>
      {pressed && <NotOpened />}
    </>
  )
}
