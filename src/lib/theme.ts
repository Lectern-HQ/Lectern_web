/** Where the light or dark choice is saved; index.html reads the same key before the first paint */
export const THEME_STORAGE_KEY = 'lx-theme'

export type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  const chosen = document.documentElement.getAttribute('data-theme')
  if (chosen === 'light' || chosen === 'dark') {
    return chosen
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Switches between light and dark and remembers the choice when storage is available. */
export function toggleTheme(): void {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', next)
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next)
  } catch {
    // Private windows can refuse storage; the choice then lasts for this page only
  }
}
