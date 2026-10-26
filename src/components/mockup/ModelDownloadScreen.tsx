import { SPEECH_MODEL } from '../../content/site'
import { AppScreen } from './AppScreen'
import { MockButton, ProgressBar, ScreenHint, ScreenTitle } from './parts'

const DOWNLOADED_PERCENT = 58

export function ModelDownloadScreen() {
  return (
    <AppScreen label={`The Lectern screen for downloading the speech model, ${DOWNLOADED_PERCENT} percent done`}>
      <ScreenTitle>Download the speech model</ScreenTitle>
      <ScreenHint>Lectern needs it to turn speech into text. It downloads once and stays on this Mac.</ScreenHint>
      <div className="rounded-md border border-rule bg-card px-4 py-3.5">
        <ProgressBar percent={DOWNLOADED_PERCENT} start={`0.9 GB of ${SPEECH_MODEL.size}`} end="About 3 min left" />
      </div>
      <div className="mt-auto flex items-center justify-between gap-3">
        <ScreenHint className="text-xs">Your computer stays awake while Lectern downloads.</ScreenHint>
        <MockButton variant="outline">Pause</MockButton>
      </div>
    </AppScreen>
  )
}
