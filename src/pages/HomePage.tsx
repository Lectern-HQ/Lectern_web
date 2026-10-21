import { DownloadSection } from '../components/home/DownloadSection'
import { FaqSection } from '../components/home/FaqSection'
import { Hero } from '../components/home/Hero'
import { HomeFooter } from '../components/home/HomeFooter'
import { HowItWorks } from '../components/home/HowItWorks'
import { PrivacySection } from '../components/home/PrivacySection'
import { TimestampShowcase } from '../components/home/TimestampShowcase'
import { usePageTitle } from '../hooks/usePageTitle'
import { SECTION_IDS } from '../routes'

export function HomePage() {
  usePageTitle('download')

  return (
    <>
      <Hero />
      <main id={SECTION_IDS.main}>
        <HowItWorks />
        <TimestampShowcase />
        <PrivacySection />
        <FaqSection />
        <DownloadSection />
      </main>
      <HomeFooter />
    </>
  )
}
