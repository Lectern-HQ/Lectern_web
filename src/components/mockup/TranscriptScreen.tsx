import { SAMPLE_LECTURE, SAMPLE_SEARCH, pauseLabel } from '../../content/home'
import { joinMeta } from '../../content/site'
import { TranscriptLines } from '../transcript/TranscriptLines'
import { AppScreen } from './AppScreen'
import { MockButton, ScreenHint } from './parts'

/** The window shows the passages up to and just after the break. */
const VISIBLE_ENTRIES = 4

export function TranscriptScreen() {
  return (
    <AppScreen label={`The Lectern transcript screen searching for ${SAMPLE_SEARCH.term}, ${SAMPLE_SEARCH.position} matches, with timestamps beside each passage`}>
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
        <span className="flex flex-[1_1_150px] justify-between rounded border-2 border-ink bg-card px-3 py-2 text-[13px]">
          <span className="a-type">{SAMPLE_SEARCH.term}</span>
          <span className="a-fade text-muted">{SAMPLE_SEARCH.position}</span>
        </span>
        <MockButton variant="outline">Copy all</MockButton>
        <MockButton variant="outline">Export</MockButton>
      </div>
      <TranscriptLines limit={VISIBLE_ENTRIES} highlight={SAMPLE_SEARCH.term} markClassName="a-hit" />
    </AppScreen>
  )
}
