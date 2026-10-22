import type { ComponentProps } from 'react'
import { NavLink } from 'react-router'

export type SmartLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string }

/** A file served as is, such as "/licenses/OFL-newsreader.txt" */
const STATIC_FILE = /\.\w+$/

/** Routes app paths ("/privacy") through the router; files, anchors, mailto and external URLs stay plain links. */
export function SmartLink({ href, ...rest }: SmartLinkProps) {
  if (href.startsWith('/') && !STATIC_FILE.test(href)) {
    return <NavLink to={href} end {...rest} />
  }
  return <a href={href} {...rest} />
}
