import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={['flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50 dark:focus:border-slate-500 dark:focus:ring-slate-700', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
