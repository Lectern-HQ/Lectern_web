import { TextLink } from '../../components/ui/TextLink'
import { ROUTES } from '../../routes'
import {
  CUSTOMER_PORTAL_URL,
  LICENCE,
  MEDIATOR,
  PRICING,
  PROVIDERS,
  PUBLISHER,
  SALES_REGIONS,
  SITE,
  SPEECH_MODEL,
  VAT_NOTE,
  formatList,
  formatPrice,
} from '../site'
import type { LegalDocument } from './types'

const portalHost = new URL(CUSTOMER_PORTAL_URL).host

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
          These terms are between you and {PUBLISHER.tradingName}, {PUBLISHER.legalForm}, {PUBLISHER.address} ("we"). By installing or using Lectern
          you accept them. If you do not accept them, do not install the app.
        </p>
      ),
    },
    {
      heading: 'Your licence',
      body: (
        <>
          <p>
            We give you a personal, non-exclusive, non-transferable licence to install and use Lectern on{' '}
            {PRICING.macsPerLicence === 1 ? 'one Mac' : `${PRICING.macsPerLicence} Macs`} that you own or control. You may not sell, rent, copy or share the app or your licence key, and you may
            not reverse engineer the app except where the law allows it.
          </p>
          <p>
            Your licence key is checked on your Mac. A Monthly or Yearly key keeps working for{' '}
            {LICENCE.renewalGraceDays} days after the end of the period you paid for, and Lectern renews it online
            during that time, as the{' '}
            <TextLink inline href={ROUTES.privacy}>
              privacy policy
            </TextLink>{' '}
            explains. If the key cannot be renewed, because the plan was cancelled or not paid or because your Mac
            stayed offline, Lectern goes back to any free lectures you have left once the key ends, until the key is
            renewed or you buy a plan. Lectern counts your free lectures on your Mac.
          </p>
        </>
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
            per year, or Lifetime at {formatPrice(PRICING.lifetime)} once. {VAT_NOTE}{' '}
            You buy through {PROVIDERS.payment}, from our website or from the app. Plans are sold to customers in{' '}
            {formatList(SALES_REGIONS)}.
          </p>
          <p>
            Monthly and Yearly plans renew until you cancel. You can cancel at any time and keep the plan until the end
            of the period you paid for. To change your card or cancel, sign in to {PROVIDERS.payment}'s customer
            portal at{' '}
            <TextLink inline href={CUSTOMER_PORTAL_URL}>
              {portalHost}
            </TextLink>{' '}
            with the email address you paid with. After you pay, your licence key appears on screen; paste it into
            Lectern under Settings, Licence. Lifetime means you pay once and never pay again: you get every update for as
            long as we make Lectern, and the version you have keeps working after that. Your transcripts stay yours
            whether or not you have a plan.
          </p>
        </>
      ),
    },
    {
      heading: 'Refunds and withdrawal',
      body: (
        <p>
          Sales are final and we do not offer refunds, except where the law requires one. Your first{' '}
          {PRICING.freeLectures} lectures are free so you can try Lectern before you pay. If you live in the EU, you
          normally have 14 days to withdraw from a purchase. Because a plan gives you access straight away, at checkout
          you are asked to agree that it starts at once and that you lose this right; without that agreement, you keep
          it. If Lectern does not work as described, your legal rights to have it fixed or to get your money back still
          apply. Write to {SITE.supportEmail}.
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
          <p>
            If you are a consumer and a dispute is not settled after you have written to us, you can take it to a
            consumer mediator free of charge: {MEDIATOR.name}, {MEDIATOR.website}.
          </p>
          <p>Questions about these terms: {SITE.contactEmail}.</p>
        </>
      ),
    },
  ],
}
