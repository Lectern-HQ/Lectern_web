/** Every line of the lost key page, and the link to it */
export const LOST_KEY_COPY = {
  title: 'Lost your key?',
  subtitle: 'Get your licence key back with the details of your purchase.',
  emailLabel: 'Email used at checkout',
  receiptLabel: 'Receipt number',
  receiptHint: 'It is in the receipt email from Stripe, after "Receipt #", for example 1234-5678.',
  submit: 'Get my key',
  sending: 'Looking for your purchase…',
  notFound: 'We could not find a purchase with these details. Check the email and the receipt number, or write to',
  failed: 'We could not reach the licence service just now. Try again in a minute, or write to',
  /** The link from the thank-you page, the FAQ and the footers */
  link: 'Get your key back',
} as const
