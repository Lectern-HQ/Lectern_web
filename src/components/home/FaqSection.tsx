import { FAQ } from '../../content/faq'
import { SECTION_IDS } from '../../routes'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { FaqItem } from './FaqItem'

export function FaqSection() {
  return (
    <SlantedSection id={SECTION_IDS.faq} tone="paper" padTop={120} padBottom={120}>
      <Container className="flex flex-wrap items-start gap-x-20 gap-y-14">
        <h2 className="reveal flex-[1_1_320px] type-headline text-balance">Questions before you download.</h2>
        <div className="flex min-w-0 flex-[1.3_1_480px] flex-col">
          {FAQ.map(({ question, answer }, index) => (
            // The first answer starts open so the list reads as answers, not a menu
            <FaqItem key={question} question={question} defaultOpen={index === 0}>
              {answer}
            </FaqItem>
          ))}
        </div>
      </Container>
    </SlantedSection>
  )
}
