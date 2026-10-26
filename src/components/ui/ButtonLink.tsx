import { cn } from '../../lib/cn'
import { SmartLink, type SmartLinkProps } from './SmartLink'

export function ButtonLink({ className, ...rest }: SmartLinkProps) {
  return (
    <SmartLink
      className={cn(
        'inline-flex items-center rounded font-semibold no-underline transition-transform duration-180 ease-spring hover:-translate-y-[3px] active:translate-y-0 active:scale-[.98]',
        'min-h-11 bg-btn px-5 text-base text-on-btn',
        className,
      )}
      {...rest}
    />
  )
}
