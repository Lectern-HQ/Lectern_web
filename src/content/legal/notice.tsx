import { TextLink } from '../../components/ui/TextLink'
import { ROUTES } from '../../routes'
import { HOST_DETAILS, PROVIDERS, PUBLISHER, SITE, SPEECH_MODEL } from '../site'
import type { LegalDocument } from './types'

export const LEGAL_NOTICE: LegalDocument = {
  path: ROUTES.legal,
  label: 'Legal notice',
  sections: [
    {
      heading: 'Publisher',
      body: (
        <>
          <p>
            This website and the Lectern app are published by {PUBLISHER.name}, {PUBLISHER.legalForm},{' '}
            {PUBLISHER.address}.
          </p>
          <p>Contact: {SITE.contactEmail}. [PHONE, if you want to give one]</p>
          <p>Director of publication: {PUBLISHER.name}. [VAT number, if you have one.]</p>
        </>
      ),
    },
    {
      heading: 'Hosting',
      body: (
        <p>
          This website is hosted by {PROVIDERS.hosting}, a service of {HOST_DETAILS.company}, {HOST_DETAILS.address},{' '}
          {HOST_DETAILS.website}.
        </p>
      ),
    },
    {
      heading: 'Intellectual property',
      body: (
        <>
          <p>
            The name Lectern, the logo, the app and the text and design of this website belong to the publisher. You
            may not copy them without written permission, except where the law allows it.
          </p>
          <p>
            Lectern is not affiliated with, or endorsed by, any university or recording platform. Their names belong to
            them.
          </p>
        </>
      ),
    },
    {
      heading: 'Third-party software and licences',
      body: (
        <>
          <p>Lectern is built with software made by others, and its licences are respected here.</p>
          <ul>
            <li>
              Speech model: {SPEECH_MODEL.name}, by OpenAI, under the MIT licence, in the ggml format of the
              whisper.cpp project.
            </li>
            <li>Voice detection: Silero VAD, under the MIT licence.</li>
            <li>Speech engine: whisper.cpp, under the MIT licence.</li>
            <li>Recording download: yt-dlp, released into the public domain under the Unlicense.</li>
            <li>Audio conversion: FFmpeg, under the GNU LGPL version 2.1.</li>
            <li>Application framework: Tauri, under the MIT or Apache 2.0 licence.</li>
            <li>Interface: React, under the MIT licence.</li>
          </ul>
          <p>
            Fonts on this website: Bricolage Grotesque and Newsreader, under the SIL Open Font Licence, served by Google
            Fonts. [CONFIRM: self-host them if you want no request to Google; see the privacy policy.]
          </p>
        </>
      ),
    },
    {
      heading: 'Complaints and disputes',
      body: (
        <>
          <p>
            If something here is wrong or you think content infringes your rights, write to {SITE.contactEmail} and we
            will answer promptly.
          </p>
          <p>
            See also the{' '}
            <TextLink inline href={ROUTES.privacy}>
              privacy policy
            </TextLink>{' '}
            and the{' '}
            <TextLink inline href={ROUTES.terms}>
              terms of use
            </TextLink>
            .
          </p>
        </>
      ),
    },
  ],
}
