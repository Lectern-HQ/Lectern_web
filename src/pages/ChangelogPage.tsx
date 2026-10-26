import { ReleaseEntry } from '../components/changelog/ReleaseEntry'
import { DocumentPage } from '../components/layout/DocumentPage'
import { CHANGELOG } from '../content/changelog'
import { CHANGELOG_LABEL } from '../content/legal'

export function ChangelogPage() {
  return (
    <DocumentPage
      title={CHANGELOG_LABEL}
      subtitle={
        <p className="max-w-[52ch] text-lg text-muted">
          Every version of Lectern, newest first. Lectern tells you when an update is ready, and you can also check any
          time in Settings.
        </p>
      }
    >
      <div className="mt-14 border-b border-line">
        {CHANGELOG.map((release) => (
          <ReleaseEntry key={release.version} release={release} />
        ))}
      </div>
    </DocumentPage>
  )
}
