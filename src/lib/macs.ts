import { postToService } from './licence'

/** The licence service's answer to a key that is not one it signed */
const INVALID_KEY_STATUS = 400
/** The licence service's answer to a revoked licence */
const REVOKED_STATUS = 403
/** The status of the free limit; the service's rate limit shares it, so the error tells them apart */
const FREE_LIMIT_STATUS = 429

/** One Mac a key is active on; `activatedAt` is in Unix seconds */
export interface Mac {
  machineId: string
  activatedAt: number
}

/** The Macs a key is active on, newest first, and the frees left this year */
export interface MacList {
  macs: Mac[]
  freesLeft: number
  /** Unix seconds when a free is possible again, or null while some are left */
  nextFreeAt: number | null
}

/** What the licence service answered about a key's Macs */
export type MacsAnswer =
  | ({ status: 'listed' } & MacList)
  | { status: 'invalid' }
  | { status: 'revoked' }
  | { status: 'freeLimit'; nextFreeAt: number }
  | { status: 'failed' }

/** True for a Mac as the service sends it */
function isMac(value: unknown): value is Mac {
  const mac = value as Partial<Mac> | null
  return typeof mac?.machineId === 'string' && typeof mac.activatedAt === 'number'
}

/** The list in a successful answer, or null when it is not one */
function readList(body: unknown): MacList | null {
  const list = body as Partial<MacList> | null
  if (!Array.isArray(list?.macs) || !list.macs.every(isMac) || typeof list.freesLeft !== 'number') return null
  return { macs: list.macs, freesLeft: list.freesLeft, nextFreeAt: typeof list.nextFreeAt === 'number' ? list.nextFreeAt : null }
}

/** What an answer of the licence service means for the page */
function readAnswer(status: number, body: unknown): MacsAnswer {
  const { error, nextFreeAt } = (body ?? {}) as { error?: unknown; nextFreeAt?: unknown }
  if (status === INVALID_KEY_STATUS && error === 'invalid_key') return { status: 'invalid' }
  if (status === REVOKED_STATUS) return { status: 'revoked' }
  if (status === FREE_LIMIT_STATUS && error === 'free_limit' && typeof nextFreeAt === 'number') return { status: 'freeLimit', nextFreeAt }
  const list = status === 200 ? readList(body) : null
  return list ? { status: 'listed', ...list } : { status: 'failed' }
}

/** Posts `body` to `path` on the licence service. Never throws. */
async function ask(path: string, body: object, fetcher: typeof fetch): Promise<MacsAnswer> {
  try {
    const response = await postToService(path, body, fetcher)
    return readAnswer(response.status, await response.json().catch(() => null))
  } catch {
    return { status: 'failed' }
  }
}

/** The Macs `key` is active on; the key proves the purchase and the service keeps nothing of it */
export function listMacs(key: string, fetcher: typeof fetch = fetch): Promise<MacsAnswer> {
  return ask('/macs', { key }, fetcher)
}

/** Frees one of the key's Macs and answers the new list */
export function freeMac(key: string, machineId: string, fetcher: typeof fetch = fetch): Promise<MacsAnswer> {
  return ask('/macs/free', { key, machineId }, fetcher)
}

/** Where the Your Macs page is: before a key, waiting, the list (with a free under way or failed), or why there is none */
export type YourMacsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'invalid' }
  | { status: 'revoked' }
  | { status: 'failed' }
  | { status: 'listed'; list: MacList; freeing: string | null; freeFailed: boolean }

/**
 * The page after an answer. `shown` is the list on screen while freeing: it stays when the free
 * fails, and shows no frees left when the service says the limit was reached.
 */
export function afterAnswer(answer: MacsAnswer, shown: MacList | null): YourMacsState {
  const listed = (list: MacList, freeFailed = false): YourMacsState => ({ status: 'listed', list, freeing: null, freeFailed })
  switch (answer.status) {
    case 'listed':
      return listed({ macs: answer.macs, freesLeft: answer.freesLeft, nextFreeAt: answer.nextFreeAt })
    case 'freeLimit':
      return shown ? listed({ ...shown, freesLeft: 0, nextFreeAt: answer.nextFreeAt }) : { status: 'failed' }
    case 'failed':
      return shown ? listed(shown, true) : answer
    default:
      return answer
  }
}
