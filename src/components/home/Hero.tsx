import { HERO } from '../../content/home'
import { freeTrialNote, releaseSummary } from '../../content/site'
import { SECTION_IDS } from '../../routes'
import { HeroFlow } from './HeroFlow'

export function Hero() {
  return (
    <section className="relative flex min-h-[860px] flex-col px-8 pb-[calc(var(--slant)+48px)]">
      <div id={SECTION_IDS.top} className="flex flex-1 flex-col justify-center py-10">
        <h1 className="max-w-[11ch] animate-rise type-display">{HERO.title}</h1>
        <HeroFlow />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
        <p className="max-w-[36ch] animate-rise type-lede [animation-delay:.25s]">{HERO.lede}</p>
        <div className="flex animate-rise flex-col items-start gap-3 [animation-delay:.4s]">
          <span className="text-[17px] font-medium">{freeTrialNote()}</span>
          <span className="text-sm text-muted">{releaseSummary()}</span>
        </div>
      </div>
    </section>
  )
}
