import { FaqSection } from '../components/home/FaqSection'
import { Hero } from '../components/home/Hero'
import { PricingSection } from '../components/home/PricingSection'
import { HomeFooter } from '../components/home/HomeFooter'
import { YoursSection } from '../components/home/YoursSection'
import { SiteHeader } from '../components/layout/SiteHeader'
import { ScrollStory } from '../components/story/ScrollStory'
import { HOME_NAV } from '../content/home'
import { RELEASE } from '../content/site'
import { usePageTitle } from '../hooks/usePageTitle'
import { SECTION_IDS, anchor } from '../routes'

export function HomePage() {
  usePageTitle('download')

  return (
    <>
      <div className="sticky top-0 z-20 bg-glass px-8 backdrop-blur-[10px] max-compact:px-4">
        <SiteHeader
          homeHref={anchor(SECTION_IDS.top)}
          links={HOME_NAV}
          downloadHref={RELEASE.downloadUrl}
          downloadLabel="Download for Mac"
          compactOnNarrow
        />
      </div>
      <Hero />
      <main id={SECTION_IDS.main}>
        <ScrollStory />
        <PricingSection />
        <YoursSection />
        <FaqSection />
      </main>
      <HomeFooter />
    </>
  )
}
