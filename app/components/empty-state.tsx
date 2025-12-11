'use client'

import { Sparkles, Terminal, Layers, LayoutTemplate, Coffee } from 'lucide-react'

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  {
    icon: LayoutTemplate,
    title: 'Landing Page',
    prompt: 'Create a modern SaaS landing page with a hero section, features grid, pricing table, and footer. Use a dark theme with gradients.',
  },
  {
    icon: Layers,
    title: 'Dashboard',
    prompt: 'Create an analytics dashboard with a sidebar, top navigation, data charts, and a recent activity feed.',
  },
  {
    icon: Terminal,
    title: 'API Reference',
    prompt: 'Build a documentation site for an API with code snippets, parameter tables, and a search-focused navigation.',
  },
]

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 -mt-20">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Minimal Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 shadow-xl mb-4">
            <Sparkles className="w-5 h-5 text-zinc-100" />
          </div>
          <h1 className="text-2xl font-medium text-zinc-100 tracking-tight">
            What will you build today?
          </h1>
          <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
            Generate full-stack React applications with a single prompt. <br />
            Engineered for developers, powered by AI.
          </p>
        </div>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.title}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="
                group flex flex-col items-center p-4 text-center space-y-3
                bg-white/5 border border-white/5 rounded-xl transition-all duration-300
                hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5
              "
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-zinc-800 transition-colors">
                <suggestion.icon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
              </div>
              <div>
                <h3 className="text-xs font-medium text-zinc-300 mb-1 group-hover:text-white">{suggestion.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
