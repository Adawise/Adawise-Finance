import { useEffect } from 'react'

/** Tints the phone's status bar to match the current screen (navy or white). */
export function useThemeColor(color: string) {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = color
  }, [color])
}

export const NAVY = '#00547B'
export const WHITE = '#FFFFFF'
