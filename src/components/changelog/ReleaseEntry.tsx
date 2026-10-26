import type { ChangelogRelease } from '../../content/changelog'
import { formatDate } from '../../content/site'
import { InlineMarkdown } from './InlineMarkdown'

interface ReleaseEntryProps {
  release: ChangelogRelease
}

/** One version: its number and date on the left, then its summary and each group of changes. */
export function ReleaseEntry({ release }: ReleaseEntryProps) {
  return (
    <section className="flex flex-wrap gap-x-16 gap-y-4 border-t border-line pt-14 pb-10">
      <div className="flex-[1_1_240px]">
        <h2 className="type-title">Version {release.version}</h2>
        <p className="mt-1.5 text-sm text-muted">
          <time dateTime={release.date}>{formatDate(release.date)}</time>
        </p>
      </div>
      <div className="flex max-w-[66ch] min-w-0 flex-[2_1_420px] flex-col gap-3.5">
        {release.summary.map((line) => (
          <p key={line}>
            <InlineMarkdown text={line} />
          </p>
        ))}
        {release.groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h3 className="font-bold">{group.title}</h3>
            <ul className="flex list-disc flex-col gap-2 pl-[22px]">
              {group.items.map((item) => (
                <li key={item}>
                  <InlineMarkdown text={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
