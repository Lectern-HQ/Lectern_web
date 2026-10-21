import { ButtonLink } from '../ui/ButtonLink'
import { DownloadIcon } from '../ui/icons'

interface DownloadButtonProps {
  href: string
  variant?: 'solid' | 'inverse'
}

export function DownloadButton({ href, variant = 'solid' }: DownloadButtonProps) {
  return (
    <ButtonLink href={href} variant={variant} size="lg">
      <DownloadIcon size={22} />
      <span>Download for Mac</span>
    </ButtonLink>
  )
}
