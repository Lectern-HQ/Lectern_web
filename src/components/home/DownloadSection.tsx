import { RELEASE, releaseSummary } from '../../content/site'
import { SECTION_IDS } from '../../routes'
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
          meta={releaseSummary('Windows planned')}
          href={RELEASE.downloadUrl}
          tone="dark"
          metaUnder="lede"
        />
      </Container>
    </SlantedSection>
  )
}
