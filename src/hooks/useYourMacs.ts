import { useCallback, useState } from 'react'
import { afterAnswer, freeMac, listMacs, type YourMacsState } from '../lib/macs'

/** The Your Macs page: where it is, how to show a key's Macs, and how to free one */
export function useYourMacs(): { state: YourMacsState; show: (key: string) => void; free: (machineId: string) => void } {
  const [state, setState] = useState<YourMacsState>({ status: 'idle' })
  // Kept only in memory, to free a Mac of the list it showed
  const [key, setKey] = useState('')

  const show = useCallback((typed: string) => {
    setKey(typed)
    setState({ status: 'loading' })
    listMacs(typed).then((answer) => setState(afterAnswer(answer, null)))
  }, [])

  const free = useCallback(
    (machineId: string) => {
      if (state.status !== 'listed') return
      const shown = state.list
      setState({ ...state, freeing: machineId, freeFailed: false })
      freeMac(key, machineId).then((answer) => setState(afterAnswer(answer, shown)))
    },
    [state, key],
  )

  return { state, show, free }
}
