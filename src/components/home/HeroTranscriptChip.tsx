import { TranscriptLines } from '../transcript/TranscriptLines'

/** On narrow screens the chip becomes a still card with the first two passages. */
const COMPACT_ENTRIES = 2

/** A word-sized window in the headline where transcript lines slowly scroll past. */
export function HeroTranscriptChip() {
  return (
    <span
      role="img"
      aria-label="A transcript with timestamps scrolling past"
      className="relative mr-[0.12em] inline-block h-[0.8em] w-[2.7em] overflow-hidden rounded-[0.1em] bg-accent align-[-0.03em] text-paper max-compact:my-4 max-compact:mr-0 max-compact:block max-compact:h-auto max-compact:w-full max-compact:align-baseline"
    >
      <span
        aria-hidden="true"
        className="block animate-drift px-[0.12em] py-[0.09em] text-left font-serif text-[length:max(16px,0.1em)] leading-normal font-normal tracking-normal whitespace-normal max-compact:animate-none max-compact:px-4 max-compact:py-3.5 max-compact:text-base"
      >
        <TranscriptLines variant="chip" compactLimit={COMPACT_ENTRIES} />
      </span>
    </span>
  )
}
