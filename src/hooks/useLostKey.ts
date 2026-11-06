import { useCallback, useState } from 'react'
import { type LostKeyState, recoverLicence } from '../lib/licence'

/** The lost key search: where it is, and how to start it */
export function useLostKey(): { state: LostKeyState; send: (email: string, receiptNumber: string) => void } {
  const [state, setState] = useState<LostKeyState>({ status: 'idle' })

  const send = useCallback((email: string, receiptNumber: string) => {
    setState({ status: 'sending' })
    recoverLicence(email, receiptNumber).then(setState)
  }, [])

  return { state, send }
}
