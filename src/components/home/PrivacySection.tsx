import { PRIVACY_PROMISES } from '../../content/home'
import { SECTION_IDS } from '../../routes'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { Statement } from '../ui/Statement'

export function PrivacySection() {
  return (
    <SlantedSection id={SECTION_IDS.privacy} tone="accent" padTop={128} padBottom={128}>
      <Container className="flex flex-wrap items-end justify-between gap-16">
        <Statement
          title="Everything stays on your computer."
          className="reveal flex-[1_1_380px] gap-6"
          titleClassName="text-balance"
          bodyClassName="max-w-[36ch] text-haze"
        >
          Lectern is an app you install, not a site you upload to. Your recordings and your transcripts are never sent
          anywhere.
        </Statement>
        <ul className="reveal flex min-w-0 flex-[1_1_340px] flex-col gap-7">
          {PRIVACY_PROMISES.map((promise) => (
            <li key={promise} className="text-[clamp(32px,3.6vw,56px)] leading-none font-semibold tracking-[-0.035em]">
              {promise}
            </li>
          ))}
        </ul>
      </Container>
    </SlantedSection>
  )
}
