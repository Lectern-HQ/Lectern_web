/** The released app version, read at build time from public/updates/latest.json. */
export interface ReleaseInfo {
  version: string
  /** ISO date and time the release was published */
  publishedAt: string
  /** The DMG on the GitHub release */
  dmgUrl: string
}
