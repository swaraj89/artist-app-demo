import * as React from 'react'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  id?: string
  name?: string
  value: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  searchable?: boolean
  className?: string
  onChange: (value: string) => void
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ id, name, value, placeholder, options, disabled = false, searchable = false, className, onChange }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const selectedOption = options.find((option) => option.value === value)
    const displayLabel = selectedOption?.label ?? placeholder ?? 'Select...'
    const filteredOptions = searchable
      ? options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()))
      : options

    const handleSelect = (selectedValue: string) => {
      onChange(selectedValue)
      setOpen(false)
      setSearch('')
    }

    return (
      <div ref={(node) => {
        containerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }} className={['relative min-w-[10rem]', className].filter(Boolean).join(' ')}>
        <button
          type="button"
          id={id}
          name={name}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 text-left text-sm text-slate-900 shadow-sm transition-colors hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:hover:border-slate-600 dark:focus:ring-sky-500"
        >
          <span className={['truncate', !selectedOption ? 'text-slate-400' : ''].join(' ')}>{displayLabel}</span>
          <ChevronDown className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </button>

        {open && (
          <div className="absolute right-0 left-0 z-20 mt-2 max-h-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-950">
            {searchable && (
              <div className="border-b border-slate-200 px-3 py-2 dark:border-slate-700">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition-colors focus:border-sky-400 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-sky-500 dark:focus:ring-sky-500/20"
                />
              </div>
            )}
            <div role="listbox" aria-labelledby={id} className="max-h-60 overflow-y-auto py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">No options found.</div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => handleSelect(option.value)}
                    className={['flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-slate-100 dark:hover:bg-slate-900',
                      option.value === value ? 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-50' : 'text-slate-900 dark:text-slate-100',
                    ].filter(Boolean).join(' ')}
                  >
                    <span className="truncate">{option.label}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'
