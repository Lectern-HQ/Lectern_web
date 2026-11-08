import { cn } from '../../lib/cn'
import { SmartLink, type SmartLinkProps } from './SmartLink'

const SIZES = {
  default: 'min-h-11 px-5 text-base transition-transform hover:-translate-y-[3px]',
  /** The one main action of a page: taller, with the buy button's lift, shadow and brightness on hover */
  large:
    'min-h-14 justify-center gap-2.5 px-7 text-lg touch-manipulation transition-[transform,box-shadow,filter] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-12px_rgba(18,22,24,.6)] hover:brightness-[1.12] active:shadow-none',
} as const

interface ButtonLinkProps extends SmartLinkProps {
  size?: keyof typeof SIZES
}

export function ButtonLink({ className, size = 'default', ...rest }: ButtonLinkProps) {
  return (
    <SmartLink
      className={cn(
        'inline-flex items-center rounded bg-btn font-semibold text-on-btn no-underline duration-180 ease-spring active:translate-y-0 active:scale-[.98]',
        SIZES[size],
        className,
      )}
      {...rest}
    />
  )
}
