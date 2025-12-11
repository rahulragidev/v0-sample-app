'use client'

import { Sparkles, Plus, Save, Code2, Eye, Columns2 } from 'lucide-react'
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
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-white">AppBuilder</span>
        </div>
      </div>

      {/* View Mode Toggle (only when chat exists) */}
      {hasChat && (
        <div className="flex items-center gap-1 p-1 bg-neutral-800/50 rounded-lg">
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
              className={clsx(hasUnsavedChanges && 'text-blue-400')}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
              {hasUnsavedChanges && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Button>
            <Button variant="secondary" size="sm" onClick={onNewChat}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New</span>
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
        'flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
        isActive
          ? 'bg-neutral-700 text-white'
          : 'text-neutral-400 hover:text-white'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  )
}
