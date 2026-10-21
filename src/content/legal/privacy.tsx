import { ROUTES } from '../../routes'
import { LOG_RETENTION_DAYS, PROVIDERS, PUBLISHER, SITE, SPEECH_MODEL } from '../site'
import type { LegalDocument } from './types'

export const PRIVACY_POLICY: LegalDocument = {
  path: ROUTES.privacy,
  label: 'Privacy policy',
  summary:
    'Your lectures, transcripts and logins stay on your computer. Lectern has no accounts, so we hold no profile of you. The app goes online only to download your lecture from its own site, to download the speech model once, and to check for updates.',
  sections: [
    {
      heading: 'Who is responsible',
      body: (
        <p>
          {PUBLISHER.name}, {PUBLISHER.address}, {SITE.contactEmail}. This policy covers the Lectern app and this
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
              <strong>Our update server, {PROVIDERS.updateHost}.</strong> The update check asks for the latest version
              and sends nothing that identifies you. [CONFIRM: state exactly what the request contains, for example the
              app version and macOS version.]
            </li>
            <li>
              <strong>Our website.</strong> If you choose Buy, Lectern opens our website in your browser. See "This
              website" below.
            </li>
          </ul>
          <p>Lectern sends no analytics, no crash reports, no recordings and no transcripts. [CONFIRM]</p>
        </>
      ),
    },
    {
      heading: 'This website',
      body: (
        <>
          <p>
            This website uses no cookies and no analytics. [CONFIRM] Our host, {PROVIDERS.hosting}, keeps server logs
            with your IP address, the time and the page requested for {LOG_RETENTION_DAYS} days, to keep the site
            secure.
          </p>
          <p>
            If you buy a plan, {PROVIDERS.payment} processes your payment and tells us [CONFIRM: your email address and
            the licence key it issues]. We do not receive your card details.
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
            Only the services named above, each for the job described: {PROVIDERS.hosting}, {PROVIDERS.payment},{' '}
            {PROVIDERS.modelHost} and {PROVIDERS.updateHost}. We do not sell data and we do not show ads.
          </p>
          <p>
            [CONFIRM: if any of them is outside the EU, the EEA or Switzerland, name it and the safeguard that covers
            the transfer.]
          </p>
        </>
      ),
    },
    {
      heading: 'How long we keep it',
      body: (
        <p>
          Server logs: {LOG_RETENTION_DAYS} days. Purchase records: for as long as accounting law requires, [CONFIRM:
          the period that applies to you]. Everything the app stores on your computer stays there until you delete it.
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
