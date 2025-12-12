import { type ReactNode } from 'react'
import { clsx } from 'clsx'

interface TooltipProps {
    content: string
    children: ReactNode
    side?: 'top' | 'bottom' | 'left' | 'right'
    className?: string
}

export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
    return (
        <div className={clsx('group/tooltip relative inline-flex', className)}>
            {children}
            <div
                className={clsx(
                    'absolute z-50 px-2 py-1 text-[10px] font-medium text-white bg-zinc-900 border border-zinc-800 rounded-md whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none',
                    {
                        '-top-8 left-1/2 -translate-x-1/2': side === 'top',
                        'top-[calc(100%+8px)] left-1/2 -translate-x-1/2': side === 'bottom',
                        '-left-2 top-1/2 -translate-y-1/2 -translate-x-full': side === 'left',
                        '-right-2 top-1/2 -translate-y-1/2 translate-x-full': side === 'right',
                    }
                )}
            >
                {content}
            </div>
        </div>
    )
}
