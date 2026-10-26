import { SAMPLE_LECTURE, pauseLabel } from '../../content/home'
import { cn } from '../../lib/cn'
import { AppScreen } from './AppScreen'
import { CheckBadge, ProgressBar, ScreenHint, ScreenTitle } from './parts'

const TRANSCRIBED_PERCENT = 62

type StepStatus = 'done' | 'active' | 'pending'

const STEPS: ReadonlyArray<{ label: string; status: StepStatus; detail: string }> = [
  { label: 'Checking your login', status: 'done', detail: 'Done' },
  { label: 'Downloading', status: 'done', detail: '1.1 GB, 38 s' },
  { label: 'Preparing audio', status: 'done', detail: 'Done in 6 s' },
  { label: 'Skipping silence and the break', status: 'done', detail: pauseLabel(SAMPLE_LECTURE.pauseMinutes) },
  { label: 'Transcribing', status: 'active', detail: `${TRANSCRIBED_PERCENT}%` },
  { label: 'Saving', status: 'pending', detail: '' },
]

const RING = 'inline-block size-4 flex-none rounded-full border-2 border-frame'

function StepIcon({ status }: { status: StepStatus }) {
  if (status === 'done') {
    return <CheckBadge />
  }
  return <span className={cn(RING, status === 'active' ? 'border-t-btn' : 'border-dashed')} />
}

export function ProgressScreen() {
  return (
    <AppScreen label={`The Lectern progress screen with six steps, transcribing at ${TRANSCRIBED_PERCENT} percent`}>
      <ScreenTitle>Transcribing your lecture</ScreenTitle>
      <ScreenHint>{SAMPLE_LECTURE.title}</ScreenHint>
      <ProgressBar percent={TRANSCRIBED_PERCENT} start={`${TRANSCRIBED_PERCENT}%`} end="About 2 min left" />
      {STEPS.map(({ label, status, detail }) => (
        <div key={label} className={cn('flex items-center gap-2.5 text-[13px]', status === 'pending' && 'text-subtle')}>
          <StepIcon status={status} />
          <span className="font-semibold">{label}</span>
          <span className="text-xs text-muted">{detail}</span>
        </div>
      ))}
    </AppScreen>
  )
}
