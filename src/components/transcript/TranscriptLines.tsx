import type { ReactNode } from 'react'
import { SAMPLE_LECTURE, pauseLabel } from '../../content/home'
import { cn } from '../../lib/cn'

interface TranscriptLinesProps {
  /** Show only the first entries */
  limit?: number
  /** A searched term, marked wherever it appears */
  highlight?: string
  /** Extra classes for each mark, such as the scroll story's animation */
  markClassName?: string
}

function withMarks(text: string, term: string | undefined, markClassName: string | undefined): ReactNode {
  if (!term) {
    return text
  }
  return text.split(term).flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <mark
            key={index}
            className={cn(
              'rounded-xs bg-selection px-0.5 text-inherit shadow-[0_0_0_1px_var(--color-focus)]',
              markClassName,
            )}
          >
            {term}
          </mark>,
          part,
        ],
  )
}

/** The sample transcript as the app shows it: a timestamp beside each passage, and the skipped break. */
export function TranscriptLines({ limit, highlight, markClassName }: TranscriptLinesProps) {
  return (
    <>
      {SAMPLE_LECTURE.entries.slice(0, limit).map((entry) =>
        entry.kind === 'pause' ? (
          <span
            key={`pause-${entry.minutes}`}
            className="mt-2.5 ml-[58px] self-start rounded bg-chip px-2.5 py-[5px] text-xs text-muted"
          >
            {pauseLabel(entry.minutes)}
          </span>
        ) : (
          <span key={entry.time} className="flex gap-4 pt-3">
            <span className="flex-none pt-[5px] text-[12.5px] text-subtle tabular-nums">{entry.time}</span>
            <span className="font-serif text-[17px] leading-[1.6]">
              {withMarks(entry.text, highlight, markClassName)}
            </span>
          </span>
        ),
      )}
    </>
  )
}
