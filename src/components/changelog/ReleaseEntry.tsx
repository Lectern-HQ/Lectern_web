import type { ChangelogRelease } from '../../content/changelog'
import { formatDate } from '../../content/site'
import { LegalSectionRow } from '../legal/LegalSectionRow'
import { InlineMarkdown } from './InlineMarkdown'

interface ReleaseEntryProps {
  release: ChangelogRelease
}

/** One version: its date and summary, then each group of changes. */
export function ReleaseEntry({ release }: ReleaseEntryProps) {
  return (
    <LegalSectionRow
      heading={`Version ${release.version}`}
      body={
        <>
          <p className="text-sm text-muted">
            <time dateTime={release.date}>{formatDate(release.date)}</time>
          </p>
          {release.summary.map((line) => (
            <p key={line}>
              <InlineMarkdown text={line} />
            </p>
          ))}
          {release.groups.map((group) => (
            <div key={group.title} className="mt-3 flex flex-col gap-2">
              <h3 className="font-bold">{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <InlineMarkdown text={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      }
    />
  )
}
