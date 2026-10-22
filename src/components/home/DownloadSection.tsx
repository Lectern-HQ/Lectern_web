import { RELEASE, formatDate, joinMeta } from '../../content/site'
import { SECTION_IDS } from '../../routes'
import { ReleaseLink } from '../changelog/ReleaseLink'
import { SystemRequirements } from '../changelog/SystemRequirements'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { DownloadPrompt } from './DownloadPrompt'

export function DownloadSection() {
  return (
    <SlantedSection
      id={SECTION_IDS.download}
      tone="accent"
      padTop={96}
      padBottom={64}
      className="flex min-h-[840px] flex-col justify-between gap-18"
    >
      <Container as="h2" className="reveal type-display text-balance">
        Drop in the next one.
      </Container>
      <Container>
        <DownloadPrompt
          lede="Install Lectern on your Mac and read your first transcript today."
          meta={joinMeta([`Version ${RELEASE.version}`, `released ${formatDate(RELEASE.publishedAt)}`, 'Windows planned'])}
          href={RELEASE.downloadUrl}
          tone="dark"
          metaUnder="lede"
        />
        <div className="mt-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-4 text-pale">
          <SystemRequirements />
          <ReleaseLink />
        </div>
      </Container>
    </SlantedSection>
  )
}
