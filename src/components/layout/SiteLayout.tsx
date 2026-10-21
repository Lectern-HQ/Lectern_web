import { Outlet } from 'react-router'
import { ScrollManager } from './ScrollManager'
import { SkipLink } from './SkipLink'

export function SiteLayout() {
  return (
    // clip, not hidden: hidden would make this a scroll container and stall the scroll-driven reveals
    <div className="relative overflow-x-clip">
      <ScrollManager />
      <SkipLink />
      <Outlet />
    </div>
  )
}
