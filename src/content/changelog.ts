import source from './CHANGELOG.md?raw'

/**
 * The app's CHANGELOG.md (Keep a Changelog format), copied here when a release
 * is published. Only released versions are shown; [Unreleased] is skipped.
 */

export interface ChangeGroup {
  /** "Added", "Fixed", "Security"… */
  title: string
  items: string[]
}

export interface ChangelogRelease {
  version: string
  /** "2026-10-22" */
  date: string
  summary: string[]
  groups: ChangeGroup[]
}

const RELEASE_HEADING = /^## \[(.+?)\](?: - (\d{4}-\d{2}-\d{2}))?\s*$/
const GROUP_HEADING = /^### (.+?)\s*$/
const LIST_ITEM = /^- (.+)$/
const LINK_DEFINITION = /^\[[^\]]+\]: \S+/

export function parseChangelog(markdown: string): ChangelogRelease[] {
  const releases: ChangelogRelease[] = []
  let current: ChangelogRelease | undefined

  for (const rawLine of markdown.split('\n')) {
    const line = rawLine.trim()
    const release = RELEASE_HEADING.exec(line)
    if (release) {
      const [, version, date] = release
      current = date ? { version, date, summary: [], groups: [] } : undefined
      if (current) releases.push(current)
      continue
    }
    if (!current || line === '' || LINK_DEFINITION.test(line)) continue

    const group = GROUP_HEADING.exec(line)
    const item = LIST_ITEM.exec(line)
    const lastGroup = current.groups.at(-1)
    if (group) {
      current.groups.push({ title: group[1], items: [] })
    } else if (item && lastGroup) {
      lastGroup.items.push(item[1])
    } else if (lastGroup && lastGroup.items.length > 0) {
      // A wrapped list item continues on the next line
      lastGroup.items[lastGroup.items.length - 1] += ` ${line}`
    } else {
      current.summary.push(line)
    }
  }
  return releases
}

export const CHANGELOG: readonly ChangelogRelease[] = parseChangelog(source)
