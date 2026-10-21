import { TranscriptScreen } from '../mockup/TranscriptScreen'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { Statement } from '../ui/Statement'

export function TimestampShowcase() {
  return (
    <SlantedSection tone="paper" padTop={120} padBottom={120}>
      <Container className="flex flex-wrap items-center gap-x-16 gap-y-18">
        <Statement
          title="A timestamp on every passage."
          className="reveal flex-[1_1_340px] gap-6"
          titleClassName="text-balance"
          bodyClassName="max-w-[36ch]"
        >
          Find the minute in the recording without scrubbing for it. Long breaks are skipped and marked, so the page
          reads like notes.
        </Statement>

        <div className="reveal relative min-w-0 flex-[1.35_1_480px] pt-14 pl-10">
          <div
            aria-hidden="true"
            className="absolute top-0 -right-8 -bottom-10 left-0 bg-accent [clip-path:polygon(0_0,100%_14%,100%_100%,0_100%)]"
          />
          <TranscriptScreen />
        </div>
      </Container>
    </SlantedSection>
  )
}
