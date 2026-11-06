import { PRICING } from './site'

/** "1 more Mac" or "2 more Macs" */
function moreMacs(count: number): string {
  return count === 1 ? '1 more Mac' : `${count} more Macs`
}

/** Every line of the Your Macs page, and the link to it */
export const YOUR_MACS_COPY = {
  title: 'Your Macs',
  subtitle: 'See the Macs your licence key is active on, and free one you no longer have.',
  keyLabel: 'Licence key',
  keyHint: 'Paste the key from your thank-you page or from Lectern, Settings, Licence. It is only used to find your Macs, and it is not kept.',
  submit: 'Show my Macs',
  loading: 'Looking for your Macs…',
  activated: (date: string) => `Activated ${date}`,
  free: 'Free',
  confirm: 'Free this Mac?',
  confirmFree: 'Yes, free it',
  cancel: 'Cancel',
  freeing: 'Freeing…',
  none: 'Your key is not active on any Mac. Enter it in Lectern to activate it.',
  freesLeft: (count: number) =>
    `You can free ${moreMacs(count)} from here this year (${PRICING.remoteFreesPerYear} a year). Removing the key in Lectern, Settings, Licence frees a Mac without counting.`,
  noFreesLeft: (date: string) =>
    `You have freed ${PRICING.remoteFreesPerYear} Macs from here this year; the next one is possible on ${date}. Until then, remove the key in Lectern on that Mac, or write to`,
  stillWorks:
    'Freeing makes room for another Mac. A freed Mac that is still in use keeps working offline until the key is removed on it.',
  invalid: 'We could not read this key. Check that you pasted all of it, or write to',
  revoked: 'This key is no longer valid. If you think this is a mistake, write to',
  failed: 'We could not reach the licence service just now. Try again in a minute, or write to',
  /** The link from the lost key page, the FAQ, the terms and the footers */
  link: 'Your Macs',
} as const
