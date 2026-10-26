import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const TONES = {
  paper: 'bg-paper',
  mist: 'bg-mist',
  accent: 'bg-accent text-on-accent',
} as const

interface SlantedSectionProps {
  as?: 'section' | 'footer'
  id?: string
  tone: keyof typeof TONES
  /** Space between the slanted edge and the content, in px */
  padTop: number
  padBottom: number
  /** Slide up under the previous block so the slant cuts into it */
  overlap?: boolean
  /** Reserve room at the bottom for the next block's slant */
  followedBySlant?: boolean
  className?: string
  children: ReactNode
}

function withSlant(px: number, slanted: boolean): string {
  return slanted ? `calc(var(--slant) + ${px}px)` : `${px}px`
}

export function SlantedSection({
  as: Tag = 'section',
  id,
  tone,
  padTop,
  padBottom,
  overlap = true,
  followedBySlant = true,
  className,
  children,
}: SlantedSectionProps) {
  return (
    <Tag
      id={id}
      className={cn('slant relative px-8', overlap && '-mt-[var(--slant)]', TONES[tone], className)}
      style={{ paddingTop: withSlant(padTop, true), paddingBottom: withSlant(padBottom, followedBySlant) }}
    >
      {children}
    </Tag>
  )
}
