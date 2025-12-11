'use client'

import { useRef, useEffect } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Kbd } from './ui/kbd'

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  placeholder?: string
  autoFocus?: boolean
}

export function PromptInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = 'Describe your app...',
  autoFocus = true,
}: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="relative">
      <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden focus-within:border-neutral-700 focus-within:ring-1 focus-within:ring-neutral-700 transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          className="w-full px-4 py-4 pr-32 bg-transparent text-white placeholder-neutral-500 resize-none focus:outline-none text-sm leading-relaxed"
          style={{ minHeight: '56px' }}
        />

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 text-neutral-500">
            <Kbd>⌘</Kbd>
            <Kbd>↵</Kbd>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            isLoading={isLoading}
          >
            {isLoading ? (
              'Creating...'
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
                <ArrowRight className="w-4 h-4 sm:hidden" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
