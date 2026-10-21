import { SAMPLE_LECTURE } from '../../content/home'
import { AppScreen } from './AppScreen'
import { CheckBadge, MockButton, ScreenHint } from './parts'

export function LinkScreen() {
  return (
    <AppScreen label="The Lectern main screen with a lecture link pasted and the message The link looks fine">
      <ScreenHint>Open the lecture in your browser, copy its address from the top bar, and paste it here.</ScreenHint>
      <div className="truncate border-b-2 border-ink py-1.5 text-base font-medium">
        https://mediaserver.unige.ch/play/311754
      </div>
      <ScreenHint className="flex items-center gap-1.5">
        <CheckBadge />
        The link looks fine.
      </ScreenHint>
      <ScreenHint>
        Using your Dia login <u>Change</u>
      </ScreenHint>
      <div className="mt-auto flex justify-end gap-2.5">
        <MockButton variant="select">{SAMPLE_LECTURE.language} &#8964;</MockButton>
        <MockButton variant="solid">Transcribe</MockButton>
      </div>
    </AppScreen>
  )
}
