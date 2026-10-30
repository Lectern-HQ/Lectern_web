export const THANKS_COPY = {
  title: 'Your licence',
  subtitle: 'Thank you for buying Lectern.',
  loading: 'Fetching your licence key…',
  processing: 'Your payment is still going through. This page will show your key as soon as it clears.',
  missing: 'This page shows your licence key after you buy a plan. If you have just paid, use the link from the payment page.',
  expired:
    'This link has expired, so the page can no longer show the key. If you added it to Lectern, it is under Settings, Licence. If not, write to',
  failed: 'We could not fetch your key just now. Your payment is safe; reload the page in a minute, or write to us.',
  /** How to put the key into the app, in the app's own labels (Settings, Licence, Activate) */
  steps: [
    'Press Copy key.',
    'Open Lectern and go to Settings, then the Licence tab.',
    'Paste the key in the Licence key field and press Activate.',
  ],
  stepsTitle: 'Activate Lectern',
  saveNote: 'Keep a copy of this key somewhere safe, such as your password manager. You need it again on a new computer.',
  copy: 'Copy key',
  copied: 'Copied',
  manage: 'Manage or cancel your plan',
  lostKey: 'Lost your key later? Write to',
} as const
