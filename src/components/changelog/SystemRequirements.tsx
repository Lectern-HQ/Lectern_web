import { SYSTEM_REQUIREMENTS } from '../../content/site'
import { cn } from '../../lib/cn'

interface SystemRequirementsProps {
  className?: string
}

export function SystemRequirements({ className }: SystemRequirementsProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <h3 className="text-sm font-bold">System requirements</h3>
      <ul className="flex list-disc flex-col gap-1 pl-[22px] text-sm">
        {SYSTEM_REQUIREMENTS.map((requirement) => (
          <li key={requirement}>{requirement}</li>
        ))}
      </ul>
    </div>
  )
}
