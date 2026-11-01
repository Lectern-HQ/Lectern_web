import appLanguages from './app-languages.json'
import appPlans from './app-plans.json'

/**
 * The facts the site shares with the app, read from copies of the app's own files. The app's
 * release script writes `app-plans.json` (without the payment links, which the site keeps
 * itself) and `app-languages.json`; do not edit them here, change them in the app.
 */

/** One plan as the app describes it */
export type AppPlan = (typeof appPlans.plans)[number]

/** The language code the app uses for "Detect automatically", which is not a language */
const DETECT_LANGUAGE = 'auto'

/** The app's plans file: currency, support address, VAT note, portal link and the plans */
export const APP_PLANS = appPlans

/** The plan with `id` in the app's file; a missing one fails the build */
export function appPlan(id: string): AppPlan {
  const plan = appPlans.plans.find((entry) => entry.id === id)
  if (!plan) throw new Error(`src/content/app-plans.json: no plan "${id}"`)
  return plan
}

/** The languages the app transcribes, by name, in the app's order */
export const APP_LANGUAGE_NAMES: readonly string[] = appLanguages.languages
  .filter((language) => language.code !== DETECT_LANGUAGE)
  .map((language) => language.label)
