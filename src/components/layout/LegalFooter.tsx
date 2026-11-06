import { ROUTES } from '../../routes'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { LostKeyLink } from '../lostKey/LostKeyLink'
import { YourMacsLink } from '../yourMacs/YourMacsLink'
import { TextLink } from '../ui/TextLink'
import { DocumentNav } from './DocumentNav'

/** The footer of the pages away from home: back home, the legal pages, the lost key page and Your Macs */
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
        <div className="flex flex-wrap gap-x-7">
          <DocumentNav />
          <LostKeyLink />
          <YourMacsLink />
        </div>
      </Container>
    </SlantedSection>
  )
}
