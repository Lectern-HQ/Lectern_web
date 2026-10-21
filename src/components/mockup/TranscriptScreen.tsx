import { SAMPLE_LECTURE, pauseLabel } from '../../content/home'
import { joinMeta } from '../../content/site'
import { TranscriptLines } from '../transcript/TranscriptLines'
import { AppScreen } from './AppScreen'
import { MockButton, ScreenHint } from './parts'

/** The window shows the passages up to and just after the break. */
const VISIBLE_ENTRIES = 4

export function TranscriptScreen() {
  return (
    <AppScreen label="The Lectern transcript screen: title, search box, Copy all and Export buttons, and passages with timestamps">
      <div className="font-serif text-[22px] leading-[1.15] font-medium">{SAMPLE_LECTURE.title}</div>
      <ScreenHint className="text-xs">
        {joinMeta([
          SAMPLE_LECTURE.language,
          SAMPLE_LECTURE.date,
          SAMPLE_LECTURE.duration,
          pauseLabel(SAMPLE_LECTURE.pauseMinutes),
        ])}
      </ScreenHint>
      <div className="flex flex-wrap gap-2">
        <span className="flex-[1_1_150px] rounded border border-control bg-white px-3 py-2 text-[13px] text-subtle">
          Search in transcript
        </span>
        <MockButton variant="outline">Copy all</MockButton>
        <MockButton variant="outline">Export</MockButton>
      </div>
      <TranscriptLines variant="window" limit={VISIBLE_ENTRIES} />
    </AppScreen>
  )
}
