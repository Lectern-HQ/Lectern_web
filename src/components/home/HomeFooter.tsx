import { SITE } from '../../content/site'
import { SECTION_IDS, anchor } from '../../routes'
import { DocumentNav } from '../layout/DocumentNav'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { TextLink } from '../ui/TextLink'
import { Wordmark } from '../ui/Wordmark'

export function HomeFooter() {
  return (
    <SlantedSection
      as="footer"
      tone="mist"
      padTop={40}
      padBottom={40}
      followedBySlant={false}
      className="flex min-h-[420px] flex-col justify-between gap-18"
    >
      <Container className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 text-base">
        <Wordmark size="sm" />
        <span className="text-muted">{SITE.owner}</span>
        <TextLink href={anchor(SECTION_IDS.top)}>Back to top</TextLink>
      </Container>

      <Container className="flex flex-col gap-8">
        <TextLink
          inline
          href={`mailto:${SITE.contactEmail}`}
          className="text-[clamp(28px,4.6vw,68px)] leading-none font-bold tracking-[-0.04em] wrap-anywhere"
        >
          {SITE.contactEmail}
        </TextLink>
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-2 text-sm text-muted">
          <DocumentNav className="text-ink" />
          <span>
            {SITE.name}, {new Date().getFullYear()}
          </span>
          <span>{SITE.country}</span>
        </div>
      </Container>
    </SlantedSection>
  )
}
