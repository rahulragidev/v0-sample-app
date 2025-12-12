'use client'

import { Sparkles, Plus, Save, Code2, Eye, Columns2, Command } from 'lucide-react'
import { Button } from './ui/button'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
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
    <header className="flex items-center justify-between px-4 h-14 border-b bg-background/50 backdrop-blur-xl sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-muted border flex items-center justify-center group-hover:border-foreground/20 transition-colors">
            <Command className="w-4 h-4 text-foreground" />
          </div>
          <span className="text-sm font-medium tracking-tight">AppBuilder</span>
        </div>
      </div>

      {/* View Mode Toggle (only when chat exists) */}
      {hasChat && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(val) => val && onViewModeChange(val)} className="bg-muted/50 border backdrop-blur-md">
            <ToggleGroupItem value="code" aria-label="Code View">
              <Code2 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Code</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="split" aria-label="Split View">
              <Columns2 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Split</span>
            </ToggleGroupItem>
            <ToggleGroupItem value="preview" aria-label="Preview">
              <Eye className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Preview</span>
            </ToggleGroupItem>
          </ToggleGroup>
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
                hasUnsavedChanges && 'text-blue-500 hover:text-blue-600'
              )}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
              {hasUnsavedChanges && (
                <span className="w-1.5 h-1.5 ml-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              )}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onNewChat}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              New Project
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
