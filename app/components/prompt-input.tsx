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
    <div className="relative group">
      <div
        className="
          relative bg-zinc-900/50 overflow-hidden transition-all duration-300
          border border-white/5 shadow-2xl rounded-xl
          focus-within:border-white/10 focus-within:ring-1 focus-within:ring-white/10 focus-within:bg-zinc-900/80
          group-hover:border-white/10
        "
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={isLoading}
          className="
            w-full px-5 py-5 pr-32 bg-transparent text-zinc-100 
            placeholder-zinc-500 resize-none focus:outline-none 
            text-sm leading-relaxed font-sans tracking-wide
          "
          style={{ minHeight: '64px' }}
        />

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          {!value && (
            <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-600 mr-2">
              <span>Press</span>
              <Kbd>⌘</Kbd>
              <Kbd>↵</Kbd>
              <span>to create</span>
            </div>
          )}

          <Button
            size="sm"
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            isLoading={isLoading}
            className="
              h-8 px-3 transition-all duration-300
              disabled:opacity-0 disabled:translate-x-2
              bg-white text-zinc-950 hover:bg-zinc-200
            "
          >
            {isLoading ? (
              <span className="text-xs">Generating...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                <span className="text-xs font-medium">Generate</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000 -z-10" />
    </div>
  )
}
