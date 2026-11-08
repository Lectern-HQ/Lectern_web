import { ROUTES } from '../../routes'
import {
  HOST_DETAILS,
  PAYMENT_DETAILS,
  PRICING,
  PURCHASE_RECORD_YEARS,
  PROVIDERS,
  PUBLISHER,
  SITE,
  SPEECH_MODEL,
  formatList,
} from '../site'
import type { LegalDocument } from './types'

export const PRIVACY_POLICY: LegalDocument = {
  path: ROUTES.privacy,
  label: 'Privacy policy',
  summary:
    'Your lectures, transcripts and logins stay on your computer. Lectern has no accounts, so we hold no profile of you. The app goes online only to download your lecture from its own site, to download the speech model once, to check for updates, to activate your licence key once when you enter it and free your Mac when you remove it, to list and free your Macs when you open them in Settings, and, on a Monthly or Yearly plan, to renew your licence.',
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
            <li>the speech model, about {SPEECH_MODEL.size}.</li>
          </ul>
          <p>We cannot see any of it. Nothing is uploaded to us.</p>
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
              <strong>Our licence service, licence.{SITE.domain}.</strong> When you enter your licence key, Lectern
              sends it, once, your licence number and a random identifier made for this computer, so the service can
              count the Macs your key is active on. When you remove the key, Lectern sends the same two to free this
              computer. On a Monthly or Yearly plan, it sends your licence number alone near the end of each paid
              period to renew it. Only when you open Your Macs in Settings, Licence does Lectern send the key itself,
              which contains your email address, to list the Macs it is active on and free the one you choose, as the
              Your Macs page on this website does; the service checks the key and keeps nothing of it. Lectern sends
              the key nowhere else.
            </li>
            <li>
              <strong>Our website.</strong> If you choose Buy, Lectern opens our website in your browser. See "This
              website" below.
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
            {SITE.domain}. Our host, {PROVIDERS.hosting}, logs
            your IP address to keep the site secure and keeps those logs under its own privacy statement; we cannot
            see them.
          </p>
          <p>
            If you buy a plan, {PROVIDERS.payment} ({PAYMENT_DETAILS.company}, in {PAYMENT_DETAILS.country}) processes
            your payment and tells us your name, your email address, your billing country and what you bought, and it
            emails you your receipt. We do not receive your card details.
          </p>
          <p>
            Our licence service at licence.{SITE.domain}, which runs on {PROVIDERS.licences}, asks {PROVIDERS.payment}{' '}
            whether a purchase is paid and signs your licence key, which contains your email address and your plan.
            For each licence number, it keeps the random identifiers of the computers the key is activated on and the
            date each was activated, until that computer is freed or the key is revoked. For a revoked key, it keeps the
            licence number, the date and the reason, so the key stays refused. It keeps no email address and no key.
            If you lost your key, the lost key page sends it the email address and receipt number you type, so it can ask {PROVIDERS.payment} for the matching purchase; it
            keeps neither. The Your Macs page, and Your Macs in the app's Settings, send it the licence key, to list the
            Macs the key is active on and free the one you choose; it checks the key and keeps nothing of it. For each
            Mac freed there, it keeps the licence number and the date for one year, so a key can free only{' '}
            {PRICING.remoteFreesPerYear} Macs a year that way.
          </p>
        </>
      ),
    },
    {
      heading: 'Why we may use this data',
      body: (
        <p>
          Server logs and the update check: our legitimate interest in running and securing the service (article
          6(1)(f) GDPR). Payments and licences: to carry out our contract with you (article 6(1)(b) GDPR). We also
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
          Server logs: we keep none; our host keeps its own, as described above. Purchase records: {PURCHASE_RECORD_YEARS}{' '}
          years after the purchase, as French accounting law requires, then deleted. Activations: the licence number,
          the computer's random identifier and the date, until you remove the key on that computer while it is online, you free it on the Your
          Macs page or in the app's Settings, we free it at your request, or the key is revoked. Macs freed on the Your Macs page or in the app's Settings: the licence
          number and the date, for one year. Revoked keys: the licence number, the date and the reason, for as long as the
          key must stay refused. Everything the app stores on your computer stays there until you delete it.
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
            delete the speech model, and uninstall Lectern.
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
