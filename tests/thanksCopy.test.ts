import { describe, expect, it } from 'vitest'
import { THANKS_COPY } from '../src/content/thanks'

describe('the thank-you page steps', () => {
  it('lead from Copy key to the app in the labels the app shows', () => {
    const steps = THANKS_COPY.steps.join(' ')
    expect(steps).toContain(THANKS_COPY.copy)
    for (const label of ['Settings', 'Licence', 'Licence key', 'Activate']) {
      expect(steps).toContain(label)
    }
  })
})
