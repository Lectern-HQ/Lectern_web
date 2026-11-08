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

export function ArrowRightIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </StrokeIcon>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
    </StrokeIcon>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </StrokeIcon>
  )
}

/** A box with an arrow leaving it, for links that open another app */
export function OpenIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </StrokeIcon>
  )
}

/** Two stacked sheets, for copying */
export function CopyIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </StrokeIcon>
  )
}

/** A light tick, for a copy that worked */
export function DoneIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2.4} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </StrokeIcon>
  )
}

/** An "i" in a circle, for a calm hint */
export function InfoIcon(props: IconProps) {
  return (
    <StrokeIcon strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.1" />
    </StrokeIcon>
  )
}
