import { TextLink } from '../../components/ui/TextLink'
import { ROUTES } from '../../routes'
import {
  CUSTOMER_PORTAL_URL,
  EMAIL_RETENTION,
  HOST_DETAILS,
  LICENCE,
  LICENCE_SERVICE_URL,
  PAYMENT_DETAILS,
  PRICING,
  PURCHASE_RECORD_YEARS,
  PROVIDERS,
  PUBLISHER,
  SITE,
  SPEECH_MODEL,
  formatList,
} from '../site'

const licenceHost = new URL(LICENCE_SERVICE_URL).host
const portalHost = new URL(CUSTOMER_PORTAL_URL).host
import type { LegalDocument } from './types'

export const PRIVACY_POLICY: LegalDocument = {
  path: ROUTES.privacy,
  label: 'Privacy policy',
  summary:
    'Your lectures, transcripts and logins stay on your computer. Lectern has no accounts, so we hold no profile of you. The app goes online only to download your lecture from its own site, to download the speech model once, to check for updates, and, on a Monthly or Yearly plan, to renew your licence.',
  sections: [
    {
      heading: 'Who is responsible',
      body: (
        <p>
          {PUBLISHER.tradingName}, {PUBLISHER.legalForm}, {PUBLISHER.address}, {SITE.contactEmail}. This policy covers the Lectern app and this
          website. "We" means the person or company named here.
        </p>
      ),
    },
    {
      heading: 'What stays on your computer',
      body: (
        <>
          <p>Lectern works on your computer. These things are saved there and nowhere else:</p>
          <ul>
            <li>the lecture recordings you download, kept only while the setting "Keep the downloaded media" is on;</li>
            <li>your transcripts and the list of past transcripts;</li>
            <li>your settings, such as the default language and the browser you chose;</li>
            <li>
              your licence key, if you have one, which holds your email address, your plan, its end date and your
              licence number;
            </li>
            <li>
              how many of your {PRICING.freeLectures} free lectures you have used, and the latest time Lectern has
              seen on your Mac's clock, kept in your macOS Keychain so that reinstalling the app does not reset them;
            </li>
            <li>the speech model, about {SPEECH_MODEL.size}.</li>
          </ul>
          <p>
            We cannot see any of it. Nothing is uploaded to us. Lectern checks your licence key on your Mac, so
            pasting or checking a key sends nothing.
          </p>
        </>
      ),
    },
    {
      heading: 'Your logins',
      body: (
        <>
          <p>
            To download a lecture from your university's site, Lectern needs the login that site already gave your
            browser. When you transcribe, Lectern reads the login for that one site from the browser you chose, copies
            it into a private file, uses it for the download, and deletes the file right after.
          </p>
          <p>
            If you drop a cookies.txt file into Lectern instead, it uses only the lecture site's cookies. With the
            setting "Delete a dropped cookies.txt after use" on, which is the default, Lectern deletes that file
            permanently once the lecture is downloaded.
          </p>
          <p>
            Lectern never sends your logins to anyone except the lecture's own site. You never type a password into
            Lectern. If macOS asks for your Mac password, that dialog comes from macOS and Lectern never sees what you
            type.
          </p>
        </>
      ),
    },
    {
      heading: 'What Lectern sends over the internet',
      body: (
        <>
          <ul>
            <li>
              <strong>The lecture's own site.</strong> Lectern asks it for the recording, using your login. That site's
              own privacy policy applies to what it records.
            </li>
            <li>
              <strong>The speech model host, {PROVIDERS.modelHost}.</strong> It serves the model file once. Like any
              server, it sees your IP address and the time of the request.
            </li>
            <li>
              <strong>Our update server, {PROVIDERS.updateHost}.</strong> Each time Lectern opens, and when you press check in
              Settings, it downloads a small file listing the latest version. The request carries no version number,
              no device or install identifier, no licence key and no cookie; like any request, it shows your IP address
              and the time. If you install an update, Lectern downloads it from the address that file lists and checks
              its signature first.
            </li>
            <li>
              <strong>Our licence service, {licenceHost}.</strong> Only on a Monthly or Yearly plan. Your key keeps
              working for {LICENCE.renewalGraceDays} days after the end of the period you paid for. From the end of that
              period, while Lectern is open, it asks the service for your renewed key, at most once an hour, until it
              gets one or you remove the key. The request carries your licence number and nothing else about you or your Mac;
              like any request, it shows your IP address and the time. A Lifetime key never asks.
            </li>
            <li>
              <strong>{PROVIDERS.payment}.</strong> If you choose a plan, or choose to manage or cancel one, Lectern
              opens {PROVIDERS.payment}'s payment page or customer portal in your browser. See "This website" below.
            </li>
          </ul>
          <p>Lectern sends no analytics, no crash reports, no recordings and no transcripts. When Lectern opens, macOS may run its own security checks
            with Apple; those come from macOS, not from Lectern.</p>
        </>
      ),
    },
    {
      heading: 'This website',
      body: (
        <>
          <p>
            This website uses no cookies and no analytics, and loads nothing from other sites: its fonts are served from{' '}
            {SITE.domain}. Only the thank-you page keeps anything in your browser, as described below. Our host, {PROVIDERS.hosting}, logs
            your IP address to keep the site secure and keeps those logs under its own privacy statement; we cannot
            see them.
          </p>
          <p>
            If you buy a plan, {PROVIDERS.payment} ({PAYMENT_DETAILS.company}, in {PAYMENT_DETAILS.country}) processes
            your payment and tells us your name, your email address, your billing country and what you bought, and it
            emails you your receipt. We do not receive your card details. To change your card or cancel a Monthly or
            Yearly plan, you sign in to {PROVIDERS.payment}'s customer portal at{' '}
            <TextLink inline href={CUSTOMER_PORTAL_URL}>
              {portalHost}
            </TextLink>{' '}
            with your email address; {PROVIDERS.payment}'s own privacy policy covers it.
          </p>
          <p>
            After you pay, {PROVIDERS.payment} sends you back to our thank-you page with the reference of your
            checkout session. The page takes the reference out of the address bar and keeps it only in that browser
            tab until you close it, so that reloading still shows your key. It sends the reference to our licence
            service at {licenceHost}, which runs on {PROVIDERS.licences}. The service asks {PROVIDERS.payment} whether
            the purchase is paid and signs your licence key, which contains your email address, your plan, its end date
            and your licence number ({PROVIDERS.payment}'s id for your subscription or purchase). It has no database
            and we keep no logs of it. It uses your IP address only to limit how many requests one address can make;{' '}
            {PROVIDERS.licences} handles that address under its own privacy policy.
          </p>
        </>
      ),
    },
    {
      heading: 'Why we may use this data',
      body: (
        <p>
          Server logs, the update check and the limit on requests to the licence service: our legitimate interest in
          running and securing the service (article 6(1)(f) GDPR). Payments, licence keys and their renewal: to carry
          out our contract with you (article 6(1)(b) GDPR). We also
          follow the Swiss Federal Act on Data Protection.
        </p>
      ),
    },
    {
      heading: 'Who receives it',
      body: (
        <>
          <p>
            Only the services named above, each for the job described: {formatList(Object.values(PROVIDERS))}. We do
            not sell data and we do not show ads.
          </p>
          <p>
            {HOST_DETAILS.company}, which runs {PROVIDERS.hosting}, and Hugging Face, Inc. are based in the United
            States. GitHub is certified under the EU-US and Swiss-US Data Privacy Frameworks, which the European
            Commission and Switzerland recognise as giving adequate protection. We send Hugging Face no data: the app
            downloads the model from it directly, and its own privacy policy covers that request. {PROVIDERS.payment}{' '}
            processes payments in the European Union. Cloudflare, Inc., which runs our licence service, is based in the
            United States and is also certified under the EU-US and Swiss-US Data Privacy Frameworks.
          </p>
        </>
      ),
    },
    {
      heading: 'How long we keep it',
      body: (
        <p>
          Server logs: we keep none, for this website or the licence service; {PROVIDERS.hosting} and{' '}
          {PROVIDERS.licences} keep their own, as described above. Purchase records: {PURCHASE_RECORD_YEARS} years after
          the purchase, as French accounting law requires, then deleted. Emails you send us: {EMAIL_RETENTION}.
          Everything the app stores on your computer stays there until you delete it.
        </p>
      ),
    },
    {
      heading: 'Your rights',
      body: (
        <>
          <p>
            You can ask us for access to the data we hold about you, ask us to correct or delete it, restrict or object
            to its use, and receive a copy. Write to {SITE.contactEmail}. We answer within one month.
          </p>
          <p>
            You can also complain to a data protection authority, such as the CNIL in France, the FDPIC in Switzerland,
            or the authority where you live.
          </p>
          <p>
            Because the app keeps your data on your computer, you can delete it yourself: remove transcripts in the app,
            remove your licence key under Settings, Licence, delete the speech model, and uninstall Lectern. The count
            of free lectures stays in your Keychain after you uninstall.
          </p>
        </>
      ),
    },
    {
      heading: 'Changes to this policy',
      body: <p>When this policy changes we post the new version here and update the date at the top.</p>,
    },
  ],
}
