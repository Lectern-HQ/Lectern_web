import { describe, expect, it } from 'vitest'
import { parseRelease } from '../build/releaseFeed'

/** Where the release keeps the archive and the DMG */
const RELEASE_URL = 'https://github.com/Lectern-HQ/Lectern_web/releases/download/v0.2.0'

/** A feed shaped like public/updates/latest.json, with `extra` fields in its platform entry */
function feedWith(extra: Record<string, unknown>) {
  return {
    version: '0.2.0',
    pub_date: '2026-10-29T12:00:00Z',
    platforms: {
      'darwin-aarch64': { url: `${RELEASE_URL}/Lectern_0.2.0_aarch64.app.tar.gz`, signature: 'sig', ...extra },
    },
  }
}

describe('the download link', () => {
  it('is the dmg_url the feed gives', () => {
    const dmgUrl = `${RELEASE_URL}/Lectern-0.2.0.dmg`

    expect(parseRelease(feedWith({ dmg_url: dmgUrl })).dmgUrl).toBe(dmgUrl)
  })

  it('is guessed from the archive name in an older feed without dmg_url', () => {
    expect(parseRelease(feedWith({})).dmgUrl).toBe(`${RELEASE_URL}/Lectern_0.2.0_aarch64.dmg`)
  })

  it.each([
    ['not a string', 42],
    ['empty', ''],
    ['not https', 'http://example.com/Lectern.dmg'],
    ['not a link', 'Lectern.dmg'],
  ])('fails the build when dmg_url is %s', (_case, dmgUrl) => {
    expect(() => parseRelease(feedWith({ dmg_url: dmgUrl }))).toThrow(/dmg_url/)
  })
})
