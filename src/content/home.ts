import { SECTION_IDS, anchor } from '../routes'

export interface NavItem {
  label: string
  href: string
}

export const HOME_NAV: readonly NavItem[] = [
  { label: 'How it works', href: anchor(SECTION_IDS.how) },
  { label: 'Privacy', href: anchor(SECTION_IDS.privacy) },
  { label: 'Questions', href: anchor(SECTION_IDS.faq) },
]

/** Each step is shown beside a mockup of the app screen named by `screen`. */
export const STEPS = [
  {
    title: 'First, get the recording.',
    body: "Download your lecture from your university's site, the way you already do. Then paste its link into Lectern.",
    screen: 'link',
  },
  {
    title: 'Then add the speech model, once.',
    body: 'Lectern downloads it the first time you use the app. That is the only setup.',
    screen: 'model',
  },
  {
    title: 'Then press start.',
    body: 'Choose the language and let it run on your computer. You see each step as it happens.',
    screen: 'progress',
  },
] as const

export const PRIVACY_PROMISES = ['No account.', 'No cloud.', 'Nothing uploaded.'] as const

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
