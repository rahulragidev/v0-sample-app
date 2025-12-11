'use client'

import { useState } from 'react'
import { Send, Wand2 } from 'lucide-react'
import { Button } from './ui/button'

interface RefinementBarProps {
  onRefine: (message: string) => void
  isLoading: boolean
}

const quickActions = [
  'Add dark mode toggle',
  'Make it responsive',
  'Add animations',
  'Improve accessibility',
]

export function RefinementBar({ onRefine, isLoading }: RefinementBarProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onRefine(message)
      setMessage('')
    }
  }

  return (
    <div className="border-t border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
      {/* Quick Actions */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-neutral-800/50 overflow-x-auto">
        <Wand2 className="w-4 h-4 text-neutral-500 flex-shrink-0" />
        {quickActions.map((action) => (
          <button
            key={action}
            onClick={() => onRefine(action)}
            disabled={isLoading}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-neutral-400 bg-neutral-800/50 border border-neutral-700/50 rounded-full hover:bg-neutral-800 hover:text-white transition-colors disabled:opacity-50"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 px-4 py-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask for changes..."
          disabled={isLoading}
          className="flex-1 px-4 py-2.5 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-600 disabled:opacity-50"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!message.trim() || isLoading}
          isLoading={isLoading}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </Button>
      </form>
    </div>
  )
}
