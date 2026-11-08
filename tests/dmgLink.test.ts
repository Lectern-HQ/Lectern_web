import { describe, expect, it } from 'vitest'
import { parseRelease } from '../build/releaseFeed'

/** Where the release keeps the archive and the DMG */
const RELEASE_URL = 'https://github.com/Lectern-HQ/Lectern_web/releases/download/v0.2.0'

/** A well-formed SHA-256, as the feed gives the DMG's */
const DMG_SHA256 = 'a3a1787b9ed71e5a6af9b0a5e1e190a474aebd14e1cfaa249cb3414094280966'

/** A feed shaped like public/updates/latest.json, with `extra` fields in its platform entry */
function feedWith(extra: Record<string, unknown>) {
  return {
    version: '0.2.0',
    pub_date: '2026-10-29T12:00:00Z',
    platforms: {
      'darwin-aarch64': {
        url: `${RELEASE_URL}/Lectern_0.2.0_aarch64.app.tar.gz`,
        signature: 'sig',
        dmg_sha256: DMG_SHA256,
        ...extra,
      },
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

describe('the DMG hash', () => {
  it('is read with the version, date and link', () => {
    expect(parseRelease(feedWith({}))).toEqual({
      version: '0.2.0',
      publishedAt: '2026-10-29T12:00:00Z',
      dmgUrl: `${RELEASE_URL}/Lectern_0.2.0_aarch64.dmg`,
      dmgSha256: DMG_SHA256,
    })
  })

  it.each([
    ['missing', undefined],
    ['too short', DMG_SHA256.slice(1)],
    ['too long', `${DMG_SHA256}0`],
    ['upper case', DMG_SHA256.toUpperCase()],
    ['prefixed', `sha256:${DMG_SHA256}`],
    ['not hex', `${DMG_SHA256.slice(1)}g`],
    ['not a string', 42],
  ])('fails the build when dmg_sha256 is %s', (_case, hash) => {
    expect(() => parseRelease(feedWith({ dmg_sha256: hash }))).toThrow(/dmg_sha256/)
  })
})
