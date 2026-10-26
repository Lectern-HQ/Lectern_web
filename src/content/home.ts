import { SECTION_IDS, anchor } from '../routes'

export interface NavItem {
  label: string
  href: string
}

export const HOME_NAV: readonly NavItem[] = [
  { label: 'How it works', href: anchor(SECTION_IDS.how) },
  { label: 'Pricing', href: anchor(SECTION_IDS.pricing) },
  { label: 'Questions', href: anchor(SECTION_IDS.faq) },
]

export const HERO = {
  title: 'Your lecture, written down.',
  lede: 'Give Lectern the recording. It writes down everything your teacher said, with the time next to every passage. Search it, skim it, quote it.',
  recording: { title: 'Macroeconomics, week 6', duration: '1 h 45 min' },
  /** Bar heights of the drawn waveform, in percent */
  waveform: [
    18, 34, 22, 48, 30, 60, 40, 26, 52, 36, 20, 44, 58, 32, 24, 46, 38, 28, 54, 42, 22, 36, 50, 30, 18, 40, 56, 34, 26,
    48, 38, 22,
  ],
  transcript: [
    { time: '0:38:41', text: 'The key addition is the exchange rate.' },
    { time: '0:39:36', text: 'If the government spends more, income rises.' },
    { time: '0:59:15', text: 'Higher spending pushes up the interest rate.' },
  ],
} as const

/** The scroll story: each scene is a headline and a short paragraph beside a picture. */
export const STORY = {
  notes: {
    title: 'You can listen or you can write.',
    body: 'In the lecture hall you cannot do both. So the notes have holes, and the recording is two hours long. Lectern fills the holes.',
  },
  link: {
    title: 'Get the recording.',
    body: "Download your lecture from your university's site, the way you already do. Paste its link into Lectern.",
  },
  model: {
    title: 'Add the speech model.',
    body: 'Lectern downloads it the first time you use the app. You only do this once.',
  },
  progress: {
    title: 'Press start.',
    body: 'Choose the language and let it run. You see each step as it happens.',
  },
  search: {
    title: 'Type a word. Land on the minute.',
    body: 'Search for a term and see every time it came up, each with its timestamp. Jump to that moment in the recording, or just read. Long breaks are skipped and marked, so the page reads like notes.',
  },
} as const

/** The notebook page in the first scene; each gap is filled by a transcript line as you scroll */
export const NOTES_PAGE = {
  title: 'Open economy, week 7',
  subtitle: 'IS-LM, now with the exchange rate',
  gaps: [
    { prompt: 'Fixed rate, spending goes up:', time: '0:39:36', fill: 'income rises.' },
    { prompt: 'Floating rate, spending goes up:', time: '0:59:15', fill: 'capital flows in.' },
  ],
} as const

/** The term searched in the transcript mockup */
export const SAMPLE_SEARCH = { term: 'exchange rate', position: '3 of 12' } as const

export const YOURS = {
  title: 'Yours to keep.',
  actions: [
    { title: 'Copy it.', body: 'Paste a passage straight into your notes.' },
    { title: 'Export it.', body: 'As plain text or as subtitles.' },
    { title: 'Keep it.', body: 'Saved on your Mac, with the date and the language.' },
  ],
} as const

export type TranscriptEntry =
  | { kind: 'speech'; time: string; text: string }
  | { kind: 'pause'; minutes: number }

const SAMPLE_PAUSE_MINUTES = 17

/** The sample lecture shown in the hero and in the app mockups. */
export const SAMPLE_LECTURE = {
  title: 'Macroeconomics II, Lecture 7',
  language: 'English',
  date: '13 Oct 2026',
  duration: '1h 45min',
  pauseMinutes: SAMPLE_PAUSE_MINUTES,
  entries: [
    {
      kind: 'speech',
      time: '0:38:41',
      text: 'The Mandel-Fleming model extends the IS-LM framework to an open economy. The key addition is the exchange rate.',
    },
    {
      kind: 'speech',
      time: '0:39:36',
      text: 'Let us start with a fixed exchange rate. If the government spends more, income rises.',
    },
    { kind: 'pause', minutes: SAMPLE_PAUSE_MINUTES },
    { kind: 'speech', time: '0:58:07', text: 'Welcome back. Now the second case, a floating exchange rate.' },
    { kind: 'speech', time: '0:59:15', text: 'Higher spending pushes up the interest rate. Capital flows in.' },
  ] satisfies readonly TranscriptEntry[],
}

export function pauseLabel(minutes: number): string {
  return `Break skipped, ${minutes} min`
}
