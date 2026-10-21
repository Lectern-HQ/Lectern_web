import type { LegalSection } from '../../content/legal'

/** Heading on the left, text on the right; the two stack on narrow screens. */
export function LegalSectionRow({ heading, body }: LegalSection) {
  return (
    <section className="flex flex-wrap gap-x-16 gap-y-4 py-10">
      <h2 className="flex-[1_1_240px] type-title">{heading}</h2>
      <div className="flex max-w-[66ch] min-w-0 flex-[2_1_420px] flex-col gap-3.5 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-[22px]">
        {body}
      </div>
    </section>
  )
}
