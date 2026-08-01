import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

const themeStorageKey = 'spotify-artist-theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem(themeStorageKey) as 'light' | 'dark') ?? 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  )
}
