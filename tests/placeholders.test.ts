import { describe, expect, it } from 'vitest'
import * as site from '../src/content/site'

/** Marks a value only the owner can fill in; the page shows it as is until then */
const PLACEHOLDER = '[CONFIRM'

/** The dotted names of every string under `value` that still holds a placeholder */
function placeholdersIn(name: string, value: unknown): string[] {
  if (typeof value === 'string') return value.includes(PLACEHOLDER) ? [name] : []
  if (typeof value !== 'object' || value === null) return []
  return Object.entries(value).flatMap(([key, inner]) => placeholdersIn(`${name}.${key}`, inner))
}

describe('owner placeholders in site.ts', () => {
  // Fails until the owner fills EMAIL_RETENTION and MEDIATOR; the legal pages must not go live with them
  it('has every [CONFIRM] value filled in before the legal texts are published', () => {
    const open = Object.entries(site).flatMap(([name, value]) => placeholdersIn(name, value))

    expect(open).toEqual([])
  })
})
