'use client'

import { Sparkles, Plus, Save, Code2, Eye, Columns2, Command } from 'lucide-react'
import { Button } from './ui/button'
import { clsx } from 'clsx'
import type { ViewMode } from '../types'

interface HeaderProps {
  hasChat: boolean
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  onNewChat: () => void
  onSave: () => void
  hasUnsavedChanges: boolean
}

export function Header({
  hasChat,
  viewMode,
  onViewModeChange,
  onNewChat,
  onSave,
  hasUnsavedChanges,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 h-14 border-b border-white/5 bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
            <Command className="w-4 h-4 text-zinc-100" />
          </div>
          <span className="text-sm font-medium text-zinc-200 tracking-tight">AppBuilder</span>
        </div>
      </div>

      {/* View Mode Toggle (only when chat exists) */}
      {hasChat && (
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 p-0.5 bg-zinc-900/50 border border-white/5 rounded-lg backdrop-blur-md">
          <ViewModeButton
            mode="code"
            currentMode={viewMode}
            icon={Code2}
            label="Code"
            onClick={() => onViewModeChange('code')}
          />
          <ViewModeButton
            mode="split"
            currentMode={viewMode}
            icon={Columns2}
            label="Split"
            onClick={() => onViewModeChange('split')}
          />
          <ViewModeButton
            mode="preview"
            currentMode={viewMode}
            icon={Eye}
            label="Preview"
            onClick={() => onViewModeChange('preview')}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {hasChat && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className={clsx(
                "h-8 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors",
                hasUnsavedChanges && 'text-blue-400 hover:text-blue-300'
              )}
            >
              <Save className="w-3.5 h-3.5 mr-2" />
              Save
              {hasUnsavedChanges && (
                <span className="w-1.5 h-1.5 ml-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onNewChat}
              className="h-8 text-xs bg-zinc-100 text-zinc-900 hover:bg-white border-0"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              New Project
            </Button>
          </>
        )}
      </div>
    </header>
  )
}

interface ViewModeButtonProps {
  mode: ViewMode
  currentMode: ViewMode
  icon: React.ElementType
  label: string
  onClick: () => void
}

function ViewModeButton({ mode, currentMode, icon: Icon, label, onClick }: ViewModeButtonProps) {
  const isActive = mode === currentMode

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-md transition-all duration-200',
        isActive
          ? 'bg-zinc-800 text-zinc-100 shadow-sm'
          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
