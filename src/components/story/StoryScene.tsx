import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const TITLE_SIZES = {
  /** The first and last scenes open and close the story */
  large: 'text-[clamp(36px,5.6vw,88px)]',
  medium: 'text-[clamp(30px,4.2vw,64px)]',
} as const

interface StorySceneProps {
  /** Position in the story; it picks the scroll range the scene shows in */
  index: number
  title: string
  body: string
  titleSize: keyof typeof TITLE_SIZES
  /** Put the picture on the left */
  reversed?: boolean
  picture: ReactNode
  children?: ReactNode
}

/** One scene: a headline and paragraph beside a picture. */
export function StoryScene({ index, title, body, titleSize, reversed = false, picture, children }: StorySceneProps) {
  return (
    <div className={cn('story-scene', `story-scene-${index}`)}>
      <div
        className={cn(
          'mx-auto flex w-full max-w-page flex-wrap items-center gap-x-18 gap-y-7',
          reversed && 'flex-row-reverse',
        )}
      >
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
          <h2 className={cn('leading-none font-bold tracking-[-0.04em] text-balance', TITLE_SIZES[titleSize])}>
            {title}
          </h2>
          <p className="max-w-[38ch]">{body}</p>
        </div>
        <div className="story-picture flex min-w-0 flex-[1.15_1_420px] justify-center">{picture}</div>
      </div>
      {children}
    </div>
  )
}
