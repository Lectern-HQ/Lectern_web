import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import type { ReleaseInfo } from '../src/content/releaseInfo.ts'

/** Written by the app's scripts/publish-update.sh; the app's updater reads it, so its path and format stay as they are. */
const FEED_PATH = 'public/updates/latest.json'
const PLATFORM = 'darwin-aarch64'
const UPDATE_ARCHIVE_SUFFIX = '.app.tar.gz'
const DMG_SUFFIX = '.dmg'
/** The DMG's link, which the app's release script writes next to the archive's url */
const DMG_URL_FIELD = 'dmg_url'

const MODULE_ID = 'virtual:release'
const RESOLVED_ID = `\0${MODULE_ID}`

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/** For an older feed without dmg_url: the release publishes the DMG next to the updater archive, under the same name. */
function dmgUrlFor(archiveUrl: string): string {
  if (!archiveUrl.endsWith(UPDATE_ARCHIVE_SUFFIX)) {
    throw new Error(`${FEED_PATH}: ${PLATFORM} url does not end in ${UPDATE_ARCHIVE_SUFFIX}`)
  }
  return archiveUrl.slice(0, -UPDATE_ARCHIVE_SUFFIX.length) + DMG_SUFFIX
}

/** The DMG's link from the feed's platform entry, or the guess from the archive's when it has none; a bad one fails the build. */
function dmgUrlFrom(platform: Record<string, unknown>, archiveUrl: string): string {
  const dmgUrl = platform[DMG_URL_FIELD]
  if (dmgUrl === undefined) return dmgUrlFor(archiveUrl)
  if (typeof dmgUrl !== 'string' || !URL.canParse(dmgUrl) || new URL(dmgUrl).protocol !== 'https:') {
    throw new Error(`${FEED_PATH}: platforms.${PLATFORM}.${DMG_URL_FIELD} must be an https link`)
  }
  return dmgUrl
}

/** Turns the parsed update feed into what the site shows; throws on anything missing. */
export function parseRelease(feed: unknown): ReleaseInfo {
  if (!isRecord(feed) || typeof feed.version !== 'string' || typeof feed.pub_date !== 'string') {
    throw new Error(`${FEED_PATH}: missing version or pub_date`)
  }
  const platform = isRecord(feed.platforms) ? feed.platforms[PLATFORM] : undefined
  if (!isRecord(platform) || typeof platform.url !== 'string') {
    throw new Error(`${FEED_PATH}: missing platforms.${PLATFORM}.url`)
  }
  return { version: feed.version, publishedAt: feed.pub_date, dmgUrl: dmgUrlFrom(platform, platform.url) }
}

/** Reads and checks the feed file at `feedFile`. */
function readRelease(feedFile: string): ReleaseInfo {
  return parseRelease(JSON.parse(readFileSync(feedFile, 'utf8')))
}

/** Exposes the published release as `import release from 'virtual:release'`; a broken feed fails the build. */
export function releaseFeed(): Plugin {
  let feedFile = FEED_PATH

  return {
    name: 'release-feed',
    configResolved(config) {
      feedFile = resolve(config.root, FEED_PATH)
    },
    resolveId(id) {
      return id === MODULE_ID ? RESOLVED_ID : undefined
    },
    load(id) {
      if (id !== RESOLVED_ID) return undefined
      this.addWatchFile(feedFile)
      return `export default ${JSON.stringify(readRelease(feedFile))}`
    },
  }
}
