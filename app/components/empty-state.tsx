'use client'

import { Sparkles, Zap, Palette, Layout, ShoppingCart, MessageSquare } from 'lucide-react'

interface EmptyStateProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  {
    icon: Layout,
    title: 'Landing Page',
    prompt: 'Create a modern SaaS landing page with a hero section, features grid, pricing table, and footer',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    prompt: 'Build a product showcase page with a gallery, add to cart button, and product details',
  },
  {
    icon: MessageSquare,
    title: 'Dashboard',
    prompt: 'Create an analytics dashboard with charts, stats cards, and a sidebar navigation',
  },
  {
    icon: Palette,
    title: 'Portfolio',
    prompt: 'Design a creative portfolio page with project cards, about section, and contact form',
  },
]

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/20 mb-6">
          <Sparkles className="w-8 h-8 text-blue-400" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          What would you like to build?
        </h1>
        <p className="text-neutral-400 text-lg mb-10">
          Describe your app and watch it come to life in seconds
        </p>

        {/* Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.title}
              onClick={() => onSuggestionClick(suggestion.prompt)}
              className="group flex items-start gap-3 p-4 text-left bg-neutral-900/50 border border-neutral-800 rounded-xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                <suggestion.icon className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-medium text-white mb-1">{suggestion.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{suggestion.prompt}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Features hint */}
        <div className="flex items-center justify-center gap-6 mt-10 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>Powered by v0</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
          <span>Edit code in real-time</span>
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
          <span>Live preview</span>
        </div>
      </div>
    </div>
  )
}
