import { Fragment } from 'react'

/**
 * Renders text but draws any "&" in the sans-serif font. The display serif used
 * for headings renders its ampersand as an ornate swash that doesn't read as a
 * normal "&", so we swap just that glyph while leaving the rest in serif.
 */
export function AmpText({ children }: { children: string }) {
  const parts = children.split('&')
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <span className="font-sans font-semibold">&</span>}
        </Fragment>
      ))}
    </>
  )
}
