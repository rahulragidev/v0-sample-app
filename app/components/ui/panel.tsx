import { type HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated'
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden',
          variant === 'elevated' && 'shadow-xl shadow-black/20',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Panel.displayName = 'Panel'

interface PanelHeaderProps extends HTMLAttributes<HTMLDivElement> { }

export const PanelHeader = forwardRef<HTMLDivElement, PanelHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PanelHeader.displayName = 'PanelHeader'

interface PanelContentProps extends HTMLAttributes<HTMLDivElement> { }

export const PanelContent = forwardRef<HTMLDivElement, PanelContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex-1 overflow-auto', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

PanelContent.displayName = 'PanelContent'
