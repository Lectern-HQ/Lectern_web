import { YOURS } from '../../content/home'
import { ROUTES, SECTION_IDS } from '../../routes'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { TextLink } from '../ui/TextLink'

export function YoursSection() {
  return (
    <SlantedSection id={SECTION_IDS.yours} tone="accent" padTop={120} padBottom={120}>
      <Container className="flex flex-wrap items-end justify-between gap-16">
        <div className="reveal flex min-w-0 flex-[1_1_380px] flex-col gap-6">
          <h2 className="type-headline text-balance">{YOURS.title}</h2>
          <p className="max-w-[38ch] text-haze">
            Your lectures and transcripts live on your Mac, in a folder you choose. Nobody has to sign up, and nobody
            else reads them. The details are in the{' '}
            <TextLink inline href={ROUTES.privacy} className="text-on-accent">
              privacy policy
            </TextLink>
            .
          </p>
        </div>
        <ul className="reveal flex min-w-0 flex-[1_1_340px] flex-col gap-8">
          {YOURS.actions.map(({ title, body }) => (
            <li key={title} className="flex flex-col gap-1.5">
              <span className="text-[clamp(32px,3.6vw,56px)] leading-none font-semibold tracking-[-0.035em]">
                {title}
              </span>
              <span className="max-w-[34ch] text-haze">{body}</span>
            </li>
          ))}
        </ul>
      </Container>
    </SlantedSection>
  )
}
