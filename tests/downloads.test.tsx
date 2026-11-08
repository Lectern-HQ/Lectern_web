import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DOWNLOADS_CLOSED_LABEL, SiteHeader } from '../src/components/layout/SiteHeader'
import { checkDownloadEntry } from '../src/content/faq'
import { DOWNLOADS_OPEN, RELEASE, downloadSha256For, downloadUrlFor } from '../src/content/site'

const DMG_URL = 'https://github.com/Lectern-HQ/Lectern_web/releases/download/v0.2.0/Lectern_0.2.0_aarch64.dmg'
const DMG_SHA256 = 'a3a1787b9ed71e5a6af9b0a5e1e190a474aebd14e1cfaa249cb3414094280966'

/** The header as the home page draws it, with `downloadHref` */
function headerWith(downloadHref: string | null): string {
  return renderToStaticMarkup(
    <SiteHeader homeHref="#top" links={[]} downloadHref={downloadHref} downloadLabel="Download for Mac" />,
  )
}

describe('downloadUrlFor', () => {
  it('gives no link while downloads are closed', () => {
    expect(downloadUrlFor(false, DMG_URL)).toBeNull()
  })

  it("gives the DMG's link once downloads are open", () => {
    expect(downloadUrlFor(true, DMG_URL)).toBe(DMG_URL)
  })

  it('is what the site uses', () => {
    expect(RELEASE.downloadUrl).toBe(downloadUrlFor(DOWNLOADS_OPEN))
  })
})

describe('downloadSha256For', () => {
  it('gives no hash while downloads are closed', () => {
    expect(downloadSha256For(false, DMG_SHA256)).toBeNull()
  })

  it("gives the DMG's hash once downloads are open", () => {
    expect(downloadSha256For(true, DMG_SHA256)).toBe(DMG_SHA256)
  })

  it('is what the site uses', () => {
    expect(RELEASE.downloadSha256).toBe(downloadSha256For(DOWNLOADS_OPEN))
  })
})

describe('the FAQ answer on checking the download', () => {
  it('gives the command and the hash to compare with', () => {
    const html = renderToStaticMarkup(<>{checkDownloadEntry(DMG_SHA256).answer}</>)

    expect(html).toContain('shasum -a 256')
    expect(html).toContain(DMG_SHA256)
  })
})

describe('the header', () => {
  it('shows Coming soon and no DMG link while downloads are closed', () => {
    const html = headerWith(null)

    expect(html).toContain(DOWNLOADS_CLOSED_LABEL)
    expect(html).not.toContain('.dmg')
  })

  it('links to the DMG once downloads are open', () => {
    const html = headerWith(DMG_URL)

    expect(html).toContain(`href="${DMG_URL}"`)
    expect(html).toContain('Download for Mac')
  })
})
