import { HERO } from '../../content/home'
import { ArrowRightIcon } from '../ui/icons'

/** A drawn recording, an arrow, and the transcript it becomes. Stacks vertically on narrow screens. */
export function HeroFlow() {
  return (
    <div className="mt-[clamp(32px,5vw,64px)] flex animate-rise items-center gap-7 [animation-delay:.15s] max-[820px]:flex-col max-[820px]:items-stretch max-[820px]:gap-4">
      <div className="min-w-0 flex-[1_1_0] rounded-[14px] bg-mist px-6 py-[22px]">
        <div className="mb-3.5 text-sm text-muted">Recording</div>
        <div className="text-[clamp(18px,1.2vw_+_10px,22px)] leading-tight font-semibold">
          {HERO.recording.title}
        </div>
        <div className="mt-1 mb-[18px] text-[15px] text-muted">{HERO.recording.duration}</div>
        <div aria-hidden="true" className="flex items-center gap-3.5">
          <span className="grid size-11 flex-none place-items-center rounded-full bg-btn">
            <svg width="16" height="16" viewBox="0 0 16 16" className="fill-on-btn">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          </span>
          <span className="flex h-14 flex-1 items-center gap-[3px]">
            {HERO.waveform.map((height, index) => (
              <span
                key={index}
                className="max-w-[7px] min-w-[3px] flex-1 rounded-[3px] bg-control"
                style={{ height: `${height}%` }}
              />
            ))}
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="grid size-14 flex-none place-items-center rounded-full bg-btn text-on-btn max-[820px]:size-11 max-[820px]:rotate-90 max-[820px]:self-center"
      >
        <ArrowRightIcon />
      </div>

      <div className="min-w-0 flex-[1_1_0] rounded-[14px] bg-accent px-6 py-[22px] text-on-accent">
        <div className="mb-2 text-sm text-pale">Transcript</div>
        <div className="font-serif text-[clamp(17px,0.6vw_+_12px,20px)] leading-[1.45]">
          {HERO.transcript.map(({ time, text }) => (
            <div key={time} className="flex gap-5 py-[9px]">
              <span className="w-[4.6em] flex-none pt-[3px] text-sm text-pale tabular-nums">{time}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
