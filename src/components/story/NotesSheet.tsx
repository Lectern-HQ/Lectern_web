import { NOTES_PAGE } from '../../content/home'
import { cn } from '../../lib/cn'

const HANDWRITING = 'font-serif text-xl italic leading-[34px] whitespace-nowrap'

/** A ruled page of lecture notes with gaps; as you scroll, each gap fills with a line from the transcript. */
export function NotesSheet() {
  return (
    <div
      role="img"
      aria-label="A page of lecture notes with two gaps. As you scroll, the gaps fill in with sentences from the transcript, each with its timestamp."
      className="w-full max-w-[560px] -rotate-[1.2deg] rounded-md border border-rule bg-card bg-[repeating-linear-gradient(var(--color-card)_0_33px,var(--color-ruled)_33px_34px)] px-[30px] pt-[26px] pb-[30px] shadow-[0_22px_44px_-28px_rgba(18,22,24,.5)]"
    >
      <div className="font-serif text-[23px] leading-[34px] font-medium">{NOTES_PAGE.title}</div>
      <div className={HANDWRITING}>{NOTES_PAGE.subtitle}</div>
      {NOTES_PAGE.gaps.map(({ prompt, time, fill }, step) => (
        <div key={time}>
          <div className={HANDWRITING}>{prompt}</div>
          <div className="relative ml-[22px] h-[34px]">
            <div
              className={cn(
                'a-gap absolute inset-x-0 top-1.5 bottom-1.5 flex items-end border-b-2 border-dashed border-control text-[13px] text-subtle',
                `a-step-${step}`,
              )}
            >
              <span className="pb-[3px]">missed it</span>
            </div>
            <div className={cn('a-fill absolute inset-0 flex items-center gap-2.5', `a-step-${step}`)}>
              <span className="text-xs text-subtle tabular-nums">{time}</span>
              <span className="rounded-xs bg-selection px-1.5 font-serif text-xl shadow-[0_0_0_1px_var(--color-focus)]">
                {fill}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
