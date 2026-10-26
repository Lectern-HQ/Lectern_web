import { toggleTheme } from '../../lib/theme'
import { MoonIcon, SunIcon } from './icons'

/** Shows the moon in light mode and the sun in dark mode; the icon swap is pure CSS so it never flashes. */
export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Switch between light and dark mode"
      onClick={toggleTheme}
      className="mr-1 inline-grid size-11 cursor-pointer place-items-center rounded bg-transparent text-ink transition-colors duration-180 hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus max-compact:mr-0"
    >
      <MoonIcon size={22} className="dark:hidden" />
      <SunIcon size={22} className="hidden dark:block" />
    </button>
  )
}
