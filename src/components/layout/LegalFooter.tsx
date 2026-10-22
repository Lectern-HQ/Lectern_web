import { ROUTES } from '../../routes'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { ReleaseLink } from '../changelog/ReleaseLink'
import { TextLink } from '../ui/TextLink'
import { LegalNav } from './LegalNav'

export function LegalFooter() {
  return (
    <SlantedSection
      as="footer"
      tone="accent"
      padTop={48}
      padBottom={48}
      overlap={false}
      followedBySlant={false}
      className="[--slant:5vw]"
    >
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-base">
        <TextLink href={ROUTES.home}>Back to Lectern</TextLink>
        <ReleaseLink />
        <LegalNav />
      </Container>
    </SlantedSection>
  )
}
