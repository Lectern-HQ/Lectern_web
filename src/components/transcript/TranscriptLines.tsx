import { SAMPLE_LECTURE, pauseLabel } from '../../content/home'
import { cn } from '../../lib/cn'

/** Two looks for the same transcript: a tiny ticker inside the hero headline, and the app window. */
const VARIANTS = {
  chip: {
    row: 'flex gap-[1.4em] pb-[0.7em]',
    time: 'flex-none pt-[0.25em] font-sans text-[0.8em] text-pale tabular-nums',
    text: '',
    pause: 'block pb-[0.7em] pl-[4.6em] font-sans text-[0.8em] text-pale',
  },
  window: {
    row: 'flex gap-4 pt-3',
    time: 'flex-none pt-[5px] text-[12.5px] text-subtle tabular-nums',
    text: 'font-serif text-[17px] leading-[1.6]',
    pause: 'mt-2.5 ml-[58px] self-start rounded bg-mist px-2.5 py-[5px] text-xs text-muted',
  },
} as const

interface TranscriptLinesProps {
  variant: keyof typeof VARIANTS
  /** Show only the first entries */
  limit?: number
  /** On narrow screens, show only this many entries */
  compactLimit?: number
}

export function TranscriptLines({ variant, limit, compactLimit }: TranscriptLinesProps) {
  const styles = VARIANTS[variant]
  const hiddenWhenCompact = (index: number) => compactLimit !== undefined && index >= compactLimit && 'max-compact:hidden'

  return (
    <>
      {SAMPLE_LECTURE.entries.slice(0, limit).map((entry, index) =>
        entry.kind === 'pause' ? (
          <span key={`pause-${entry.minutes}`} className={cn(styles.pause, hiddenWhenCompact(index))}>
            {pauseLabel(entry.minutes)}
          </span>
        ) : (
          <span key={entry.time} className={cn(styles.row, hiddenWhenCompact(index))}>
            <span className={styles.time}>{entry.time}</span>
            <span className={styles.text}>{entry.text}</span>
          </span>
        ),
      )}
    </>
  )
}
