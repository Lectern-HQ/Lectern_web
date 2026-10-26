interface LogoMarkProps {
  size: number
  /** Give a label when the mark stands alone; leave it out when the word "Lectern" sits beside it. */
  label?: string
}

export function LogoMark({ size, label }: LogoMarkProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" {...a11y}>
      <rect width="64" height="64" rx="14" className="fill-btn" />
      <polygon points="10,54 54,28 54,54" className="fill-on-btn" />
      <rect x="10" y="11" width="32" height="7" rx="3.5" className="fill-on-btn" />
      <rect x="10" y="22" width="20" height="7" rx="3.5" className="fill-on-btn" opacity=".6" />
    </svg>
  )
}
