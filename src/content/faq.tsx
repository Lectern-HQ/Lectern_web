import type { ReactNode } from 'react'
import { TextLink } from '../components/ui/TextLink'
import { ROUTES } from '../routes'
import { LANGUAGES, PRICING, RELEASE, SPEECH_MODEL, formatList, formatPrice } from './site'

export interface FaqEntry {
  question: string
  answer: ReactNode
}

export const FAQ: readonly FaqEntry[] = [
  {
    question: 'Does anything leave my computer?',
    answer: (
      <>
        Your lectures, transcripts and logins stay on your computer. Lectern goes online for three things only: it
        downloads the recording from the lecture's own site, it downloads the speech model once, and it checks for
        updates without sending anything that identifies you. The details are in the{' '}
        <TextLink inline href={ROUTES.privacy}>
          privacy policy
        </TextLink>
        .
      </>
    ),
  },
  {
    question: 'Which computers does it run on?',
    answer: `Macs with ${RELEASE.chip} (M1 or later), on macOS ${RELEASE.minMacOS} or later. Intel Macs are not supported. A Windows version is planned and is not available yet.`,
  },
  {
    question: 'How big is the speech model?',
    answer: `About ${SPEECH_MODEL.size}. Lectern downloads it one time, the first time you use the app, and keeps it on your Mac. You need ${SPEECH_MODEL.size} of free space.`,
  },
  {
    question: 'What does it cost?',
    answer: `Your first ${PRICING.freeLectures} lectures are free. After that you choose a plan: ${formatPrice(PRICING.monthly)} a month, ${formatPrice(PRICING.yearly)} a year, or ${formatPrice(PRICING.lifetime)} once. Your transcripts stay yours either way.`,
  },
  {
    question: 'How does it get my lecture?',
    answer:
      "Lectern uses the login you already have in your browser, such as Chrome, Edge, Brave, Dia or Safari, so you never type a password into Lectern. It reads the login for the lecture's site only, uses it for the download, and deletes its private copy right after. You can also drop in a cookies.txt file. Safari needs one extra permission, so another browser is simpler.",
  },
  {
    question: 'Which languages can it transcribe?',
    answer: `${formatList(LANGUAGES)}.`,
  },
]
