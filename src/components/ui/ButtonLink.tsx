import { cn } from '../../lib/cn'
import { SmartLink, type SmartLinkProps } from './SmartLink'

const VARIANTS = {
  /** Dark button on a light ground */
  solid: 'bg-accent text-paper',
  /** Light button on the dark accent ground */
  inverse: 'bg-paper text-accent',
} as const

const SIZES = {
  sm: 'min-h-11 px-5 text-base',
  lg: 'min-h-15 gap-3 px-[30px] text-[19px]',
} as const

interface ButtonLinkProps extends SmartLinkProps {
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
}

export function ButtonLink({ variant = 'solid', size = 'sm', className, ...rest }: ButtonLinkProps) {
  return (
    <SmartLink
      className={cn(
        'inline-flex items-center rounded font-semibold no-underline transition-transform duration-180 ease-spring hover:-translate-y-[3px] active:translate-y-0 active:scale-[.98]',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    />
  )
}
