import { cn } from '../../lib/cn'
import { SmartLink, type SmartLinkProps } from './SmartLink'

interface TextLinkProps extends SmartLinkProps {
  /** Inline links sit inside running text; the default is a standalone link with a 44px touch target. */
  inline?: boolean
}

export function TextLink({ inline = false, className, ...rest }: TextLinkProps) {
  return (
    <SmartLink
      className={cn(
        'underline decoration-[1.5px] underline-offset-[5px] transition-[text-decoration-thickness] duration-150 hover:decoration-4',
        !inline && 'inline-flex min-h-11 items-center',
        className,
      )}
      {...rest}
    />
  )
}
