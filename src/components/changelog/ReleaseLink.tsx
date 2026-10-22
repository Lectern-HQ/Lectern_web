import { RELEASE } from '../../content/site'
import { ROUTES } from '../../routes'
import { TextLink } from '../ui/TextLink'

/** "What's new in 0.1.0", linking to the changelog */
export function ReleaseLink() {
  return <TextLink href={ROUTES.changelog}>What’s new in {RELEASE.version}</TextLink>
}
