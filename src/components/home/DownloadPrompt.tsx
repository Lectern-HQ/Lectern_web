import { cn } from '../../lib/cn'
import { DownloadButton } from './DownloadButton'

/** Colors for a prompt on the light page ground or on the dark accent ground */
const TONES = {
  light: { meta: 'text-muted', button: 'solid' },
  dark: { meta: 'text-pale', button: 'inverse' },
} as const

interface DownloadPromptProps {
  lede: string
  /** Version and system requirements line */
  meta: string
  /** Optional short line shown just above the meta line */
  note?: string
  href: string
  tone: keyof typeof TONES
  /** Which side the note and meta line sit under */
  metaUnder: 'lede' | 'button'
  ledeClassName?: string
  actionClassName?: string
}

/** A short pitch on one side and the download button on the other. */
export function DownloadPrompt({
  lede,
  meta,
  note,
  href,
  tone,
  metaUnder,
  ledeClassName,
  actionClassName,
}: DownloadPromptProps) {
  const colors = TONES[tone]
  const details = (
    <>
      {note && <p className="text-[17px] font-medium">{note}</p>}
      <p className={cn('text-sm', colors.meta)}>{meta}</p>
    </>
  )

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
      <div className={cn('flex flex-col gap-3', ledeClassName)}>
        <p className="max-w-[30ch] type-lede">{lede}</p>
        {metaUnder === 'lede' && details}
      </div>
      <div className={cn('flex flex-col items-start gap-3', actionClassName)}>
        <DownloadButton href={href} variant={colors.button} />
        {metaUnder === 'button' && details}
      </div>
    </div>
  )
}
