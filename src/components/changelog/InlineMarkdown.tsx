import type { ReactNode } from 'react'
import { TextLink } from '../ui/TextLink'

/** `code` or [text](url), the only inline markup the changelog uses */
const INLINE_TOKEN = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g

interface InlineMarkdownProps {
  text: string
}

/** Renders a changelog line as React elements, never as raw HTML. */
export function InlineMarkdown({ text }: InlineMarkdownProps) {
  const parts: ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(INLINE_TOKEN)) {
    const [whole, code, linkText, href] = match
    parts.push(text.slice(cursor, match.index))
    parts.push(
      code !== undefined ? (
        <code key={match.index} className="rounded-sm bg-mist px-1 font-mono text-[0.85em]">
          {code}
        </code>
      ) : (
        <TextLink key={match.index} inline href={href}>
          {linkText}
        </TextLink>
      ),
    )
    cursor = match.index + whole.length
  }
  parts.push(text.slice(cursor))

  return <>{parts}</>
}
