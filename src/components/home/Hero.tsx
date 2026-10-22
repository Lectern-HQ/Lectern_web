import { HOME_NAV } from '../../content/home'
import { RELEASE, freeTrialNote, releaseSummary } from '../../content/site'
import { SECTION_IDS, anchor } from '../../routes'
import { SiteHeader } from '../layout/SiteHeader'
import { DownloadPrompt } from './DownloadPrompt'
import { HeroTranscriptChip } from './HeroTranscriptChip'

export function Hero() {
  return (
    <section className="relative flex min-h-[860px] flex-col px-8 pb-[calc(var(--slant)+48px)]">
      <SiteHeader
        homeHref={anchor(SECTION_IDS.top)}
        links={HOME_NAV}
        downloadHref={anchor(SECTION_IDS.download)}
        hideLinksWhenCompact
      />

      <div id={SECTION_IDS.top} className="flex flex-1 flex-col justify-center pt-10 pb-14">
        <h1 className="animate-rise type-display">
          <span className="block whitespace-nowrap">Lecture in.</span>
          <span className="block whitespace-nowrap">
            <HeroTranscriptChip />
            out.
          </span>
        </h1>
      </div>

      <DownloadPrompt
        lede="Lectern turns a recorded lecture into a transcript with timestamps. It runs on your Mac. No account, nothing uploaded."
        meta={releaseSummary()}
        note={freeTrialNote()}
        href={RELEASE.downloadUrl}
        tone="light"
        metaUnder="button"
        ledeClassName="animate-rise [animation-delay:.25s]"
        actionClassName="animate-rise [animation-delay:.4s]"
      />
    </section>
  )
}
