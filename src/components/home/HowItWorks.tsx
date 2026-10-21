import { STEPS } from '../../content/home'
import { cn } from '../../lib/cn'
import { SECTION_IDS } from '../../routes'
import { LinkScreen } from '../mockup/LinkScreen'
import { ModelDownloadScreen } from '../mockup/ModelDownloadScreen'
import { ProgressScreen } from '../mockup/ProgressScreen'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { Statement } from '../ui/Statement'

const SCREENS = {
  link: LinkScreen,
  model: ModelDownloadScreen,
  progress: ProgressScreen,
} as const

export function HowItWorks() {
  return (
    <SlantedSection id={SECTION_IDS.how} tone="mist" padTop={100} padBottom={100}>
      <Container as="ol" className="flex flex-col gap-28">
        {STEPS.map((step, index) => {
          const Screen = SCREENS[step.screen]
          return (
            // Every other step puts its screen on the left
            <li
              key={step.title}
              className={cn('reveal flex flex-wrap items-center gap-x-18 gap-y-10', index % 2 === 1 && 'flex-row-reverse')}
            >
              <Statement
                title={step.title}
                size="subhead"
                className="flex-[1_1_320px] gap-3.5"
                titleClassName="text-balance"
                bodyClassName="max-w-[34ch]"
              >
                {step.body}
              </Statement>
              <div className="flex min-w-0 flex-[1.15_1_420px] justify-center">
                <Screen />
              </div>
            </li>
          )
        })}
      </Container>
    </SlantedSection>
  )
}
