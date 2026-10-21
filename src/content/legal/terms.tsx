import { TextLink } from '../../components/ui/TextLink'
import { ROUTES } from '../../routes'
import { PRICING, PROVIDERS, PUBLISHER, SITE, SPEECH_MODEL, formatPrice } from '../site'
import type { LegalDocument } from './types'

export const TERMS_OF_USE: LegalDocument = {
  path: ROUTES.terms,
  label: 'Terms of use',
  summary:
    'Lectern is for turning recordings you are allowed to download into transcripts for your own study. You are responsible for having the right to use those recordings. Speech recognition makes mistakes, so check important passages against the recording.',
  sections: [
    {
      heading: 'Agreement',
      body: (
        <p>
          These terms are between you and {PUBLISHER.name} ("we"). By installing or using Lectern
          you accept them. If you do not accept them, do not install the app.
        </p>
      ),
    },
    {
      heading: 'Your licence',
      body: (
        <p>
          We give you a personal, non-exclusive, non-transferable licence to install and use Lectern on your own
          computers [CONFIRM: how many]. You may not sell, rent, copy or share the app or your licence key, and you may
          not reverse engineer the app except where the law allows it.
        </p>
      ),
    },
    {
      heading: 'Your recordings',
      body: (
        <>
          <p>
            Lectern downloads recordings with the login you already have. You are responsible for what you download and
            transcribe. In particular:
          </p>
          <ul>
            <li>use only recordings you are entitled to access, and only your own login;</li>
            <li>follow your university's rules and the copyright of the teacher and the institution;</li>
            <li>
              use transcripts for your own study, and do not publish or share a recording or transcript where that is
              not allowed.
            </li>
          </ul>
          <p>
            Recordings and transcripts stay on your computer. We do not receive them, so we cannot recover them if you
            lose them.
          </p>
        </>
      ),
    },
    {
      heading: 'Accuracy of transcripts',
      body: (
        <p>
          Transcripts are produced by a speech model and can contain errors, especially with names, technical terms,
          accents and poor audio. Do not rely on a transcript where an error would matter without checking it against
          the recording.
        </p>
      ),
    },
    {
      heading: 'Speech model and other software',
      body: (
        <p>
          Lectern uses a speech model, {SPEECH_MODEL.name}, and other software made by third parties. Each comes under
          its own licence, listed in the{' '}
          <TextLink inline href={ROUTES.legal}>
            legal notice
          </TextLink>
          .
        </p>
      ),
    },
    {
      heading: 'Plans and payment',
      body: (
        <>
          <p>
            [CONFIRM: these plans are not built yet.] Your first {PRICING.freeLectures} lectures are free. After that you
            need a plan: Monthly at {formatPrice(PRICING.monthly)} per month, Yearly at {formatPrice(PRICING.yearly)}{' '}
            per year, or Lifetime at {formatPrice(PRICING.lifetime)} once. Prices include tax.
            You buy on our website, and {PROVIDERS.payment} handles the payment.
          </p>
          <p>
            Monthly and Yearly plans renew until you cancel. You can cancel at any time and keep the plan until the end
            of the period you paid for. Lifetime means [CONFIRM: for as long as we offer Lectern, or for the current
            major version]. Your transcripts stay yours whether or not you have a plan.
          </p>
        </>
      ),
    },
    {
      heading: 'Refunds and withdrawal',
      body: (
        <p>
          [CONFIRM before launch.] If you live in the EU, you have 14 days to withdraw from a purchase. For digital
          content you can lose that right once the download has begun, and only if you agreed to that at checkout and
          we confirmed it. Beyond what the law gives you, we offer [YOUR REFUND POLICY]. Write to {SITE.contactEmail} to
          ask for a refund.
        </p>
      ),
    },
    {
      heading: 'Updates and changes',
      body: (
        <p>
          We may update Lectern, change features, or stop offering it. When we find a new version, the app tells you
          and keeps working with your current version until you install it. We cannot promise that Lectern will work
          with every recording site, because sites change.
        </p>
      ),
    },
    {
      heading: 'Warranty and liability',
      body: (
        <>
          <p>
            Lectern is provided as it is, without a promise that it is free of errors or always available. To the
            extent the law allows, we are not liable for indirect loss, lost data, or loss caused by a transcript error,
            and our total liability is limited to what you paid us in the 12 months before the claim.
          </p>
          <p>
            Nothing in these terms limits rights you have as a consumer under mandatory law, or liability that the law
            does not allow us to limit.
          </p>
        </>
      ),
    },
    {
      heading: 'Ending this agreement',
      body: (
        <p>
          You can stop at any time by uninstalling Lectern. We may end your licence if you break these terms, for
          example by sharing your licence key. Sections that by their nature should continue, such as liability, will
          continue.
        </p>
      ),
    },
    {
      heading: 'Governing law',
      body: (
        <>
          <p>
            French law applies, and the French courts have jurisdiction. If you are a consumer,
            you keep the protection of the mandatory law of the country where you live and may bring a claim in the
            courts there.
          </p>
          <p>Questions about these terms: {SITE.contactEmail}.</p>
        </>
      ),
    },
  ],
}
