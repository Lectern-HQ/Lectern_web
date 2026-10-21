import { SECTION_IDS, anchor } from '../../routes'

export function SkipLink() {
  return (
    <a
      href={anchor(SECTION_IDS.main)}
      className="absolute -top-20 left-4 z-10 rounded bg-ink px-[18px] py-3 text-paper no-underline focus:top-4"
    >
      Skip to content
    </a>
  )
}
