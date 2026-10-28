import { describe, expect, it } from 'vitest'
import { parseRelease } from '../build/releaseFeed'

const SHA256 = 'a3a1787b9ed71e5a6af9b0a5e1e190a474aebd14e1cfaa249cb3414094280966'

/** A feed shaped like public/updates/latest.json, with the DMG's hash set to `dmgSha256` */
function feedWith(dmgSha256: unknown) {
  return {
    version: '0.1.0',
    pub_date: '2026-10-22T13:42:40Z',
    platforms: {
      'darwin-aarch64': {
        url: 'https://github.com/Lectern-HQ/Lectern_web/releases/download/v0.1.0/Lectern_0.1.0_aarch64.app.tar.gz',
        signature: 'sig',
        dmg_sha256: dmgSha256,
      },
    },
  }
}

describe('parseRelease', () => {
  it('reads the version, date, DMG link and the DMG hash', () => {
    expect(parseRelease(feedWith(SHA256))).toEqual({
      version: '0.1.0',
      publishedAt: '2026-10-22T13:42:40Z',
      dmgUrl: 'https://github.com/Lectern-HQ/Lectern_web/releases/download/v0.1.0/Lectern_0.1.0_aarch64.dmg',
      dmgSha256: SHA256,
    })
  })

  it('fails the build when the feed has no DMG hash', () => {
    expect(() => parseRelease(feedWith(undefined))).toThrow(/dmg_sha256/)
  })

  it.each([
    ['too short', SHA256.slice(1)],
    ['too long', `${SHA256}0`],
    ['upper case', SHA256.toUpperCase()],
    ['prefixed', `sha256:${SHA256}`],
    ['not hex', `${SHA256.slice(1)}g`],
    ['not a string', 42],
  ])('fails the build on a hash that is %s', (_case, hash) => {
    expect(() => parseRelease(feedWith(hash))).toThrow(/dmg_sha256/)
  })
})
