import * as React from 'react'
import { clsx } from 'clsx'

interface ToggleGroupProps {
    type: 'single' | 'multiple'
    value: string | string[]
    onValueChange: (value: any) => void
    children: React.ReactNode
    className?: string
}

const ToggleGroupContext = React.createContext<{
    value: string | string[]
    onValueChange: (value: any) => void
    type: 'single' | 'multiple'
} | null>(null)

export function ToggleGroup({ type, value, onValueChange, children, className }: ToggleGroupProps) {
    return (
        <ToggleGroupContext.Provider value={{ value, onValueChange, type }}>
            <div className={clsx('inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', className)}>
                {children}
            </div>
        </ToggleGroupContext.Provider>
    )
}

interface ToggleGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string
}

export function ToggleGroupItem({ value, className, children, ...props }: ToggleGroupItemProps) {
    const context = React.useContext(ToggleGroupContext)
    if (!context) throw new Error('ToggleGroupItem must be used within ToggleGroup')

    const isSelected = context.type === 'single'
        ? context.value === value
        : (context.value as string[]).includes(value)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (context.type === 'single') {
            context.onValueChange(value)
        } else {
            // Not strictly needed for this app but good for completeness-ish, simplified for now
            context.onValueChange(value)
        }
        props.onClick?.(e)
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            data-state={isSelected ? 'on' : 'off'}
            className={clsx(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                'hover:bg-background/50 hover:text-foreground',
                isSelected && 'bg-background text-foreground shadow-sm',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
