import type { ReactNode } from 'react'

interface IconProps {
  size?: number
  className?: string
}

interface StrokeIconProps extends IconProps {
  strokeWidth: number
  children: ReactNode
}

/** Decorative line icon that takes the current text color. */
function StrokeIcon({ size = 24, strokeWidth, className, children }: StrokeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={1.75} {...props}>
      <path d="M12 4v11" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 20h14" />
    </StrokeIcon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={4} {...props}>
      <path d="M5 12l5 5 9-10" />
    </StrokeIcon>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <path d="M5 9l7 7" />
      <path d="M19 9l-7 7" />
    </StrokeIcon>
  )
}
