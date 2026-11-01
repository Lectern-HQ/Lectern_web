import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { DOWNLOADS_CLOSED_LABEL, SiteHeader } from '../src/components/layout/SiteHeader'
import { DOWNLOADS_OPEN, RELEASE, downloadUrlFor } from '../src/content/site'

const DMG_URL = 'https://github.com/Lectern-HQ/Lectern_web/releases/download/v0.2.0/Lectern_0.2.0_aarch64.dmg'

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
