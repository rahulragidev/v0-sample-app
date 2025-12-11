import { type HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface KbdProps extends HTMLAttributes<HTMLElement> { }

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <kbd
      className={clsx(
        'inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium',
        'bg-neutral-800 border border-neutral-700 rounded text-neutral-400',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}
