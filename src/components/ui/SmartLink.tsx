import type { ComponentProps } from 'react'
import { NavLink } from 'react-router'

export type SmartLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string }

/** Routes app paths ("/privacy") through the router; anchors, mailto and external URLs stay plain links. */
export function SmartLink({ href, ...rest }: SmartLinkProps) {
  if (href.startsWith('/')) {
    return <NavLink to={href} end {...rest} />
  }
  return <a href={href} {...rest} />
}
