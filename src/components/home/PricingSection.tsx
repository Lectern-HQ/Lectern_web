import { PLANS, PRICING_COPY } from '../../content/pricing'
import { PROVIDERS, SALES_REGIONS, VAT_NOTE, formatList, freeTrialNote } from '../../content/site'
import { ROUTES, SECTION_IDS } from '../../routes'
import { Container } from '../ui/Container'
import { SlantedSection } from '../ui/SlantedSection'
import { TextLink } from '../ui/TextLink'
import { PlanCard } from './PlanCard'

export function PricingSection() {
  return (
    <SlantedSection id={SECTION_IDS.pricing} tone="mist" padTop={120} padBottom={100}>
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-5">
          <h2 className="reveal max-w-[14ch] type-headline text-balance">{freeTrialNote()}</h2>
          <p className="reveal max-w-[40ch] text-[clamp(20px,1.2vw+10px,26px)] leading-[1.35] font-medium">
            {PRICING_COPY.lede}
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch gap-5">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-16 gap-y-6">
          <ul className="flex max-w-[52ch] flex-[1_1_320px] list-disc flex-col gap-2 pl-[22px]">
            {PRICING_COPY.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="max-w-[52ch] flex-[1_1_320px] text-[15px] leading-[1.5] text-muted">
            Your licence key and invoice arrive by email after you pay. {VAT_NOTE} Plans are sold in{' '}
            {formatList(SALES_REGIONS)}, and {PROVIDERS.payment} handles the payment. Cancel Monthly and Yearly any
            time. Sales are final except where the law requires a refund, as the{' '}
            <TextLink inline href={ROUTES.terms}>
              terms of use
            </TextLink>{' '}
            explain.
          </p>
        </div>
      </Container>
    </SlantedSection>
  )
}
