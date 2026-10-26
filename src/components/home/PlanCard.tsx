import { PRICING_COPY, type Plan } from '../../content/pricing'
import { priceParts } from '../../content/site'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/ButtonLink'

const BUTTON_SHAPE = 'min-h-12 w-full justify-center'

interface PlanCardProps {
  plan: Plan
}

export function PlanCard({ plan }: PlanCardProps) {
  const { symbol, value } = priceParts(plan.amount)
  const quiet = plan.featured ? 'text-pale' : 'text-muted'

  return (
    <div
      className={cn(
        'reveal flex flex-col gap-5 rounded-[14px] p-8',
        plan.featured ? 'bg-accent text-on-accent' : 'border border-line bg-paper text-ink',
      )}
    >
      <h3 className="text-[22px] leading-[1.2] font-semibold">{plan.name}</h3>
      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="text-[28px] font-semibold">{symbol}</span>
        <span className="text-[clamp(56px,6vw,88px)] leading-[0.95] font-bold tracking-[-0.045em]">{value}</span>
        <span className={cn('text-[17px]', quiet)}>{plan.period}</span>
      </p>
      <p className={cn('max-w-[30ch] flex-1 text-[17px] leading-[1.4]', quiet)}>{plan.blurb}</p>
      {plan.checkoutUrl ? (
        <ButtonLink
          href={plan.checkoutUrl}
          // On the dark card the button stays light in both themes
          className={cn(BUTTON_SHAPE, plan.featured && 'bg-on-accent text-accent')}
        >
          {plan.buyLabel}
        </ButtonLink>
      ) : (
        <span
          className={cn(
            BUTTON_SHAPE,
            'inline-flex items-center rounded border text-base font-semibold',
            plan.featured ? 'border-pale/40 text-pale' : 'border-line text-muted',
          )}
        >
          {PRICING_COPY.comingSoon}
        </span>
      )}
    </div>
  )
}
