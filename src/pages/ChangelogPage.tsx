import { ReleaseEntry } from '../components/changelog/ReleaseEntry'
import { SystemRequirements } from '../components/changelog/SystemRequirements'
import { DownloadButton } from '../components/home/DownloadButton'
import { DocumentPage } from '../components/layout/DocumentPage'
import { CHANGELOG } from '../content/changelog'
import { RELEASE, formatDate, joinMeta } from '../content/site'

export function ChangelogPage() {
  return (
    <DocumentPage
      title="Changelog"
      subtitle={joinMeta([`Latest version ${RELEASE.version}`, `released ${formatDate(RELEASE.publishedAt)}`])}
    >
      <div className="mt-10 mb-6 flex max-w-[880px] flex-wrap items-start justify-between gap-8 rounded bg-mist p-8">
        <SystemRequirements />
        <DownloadButton href={RELEASE.downloadUrl} />
      </div>
      {CHANGELOG.map((release) => (
        <ReleaseEntry key={release.version} release={release} />
      ))}
    </DocumentPage>
  )
}
