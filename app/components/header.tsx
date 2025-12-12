'use client'

import { Sparkles, Plus, Save, Code2, Eye, Columns2, Command } from 'lucide-react'
import { Button } from './ui/button'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Tooltip } from './ui/tooltip'
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
    <header className="flex items-center justify-between px-6 h-16 border-b border-white/5 bg-background/40 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-105 transition-all duration-300">
            <Command className="w-5 h-5 text-foreground/90" />
          </div>
          <span className="text-sm font-medium tracking-tight bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">AppBuilder</span>
        </div>
      </div>

      {/* View Mode Toggle (only when chat exists) */}
      {hasChat && (
        <div className="absolute left-1/2 -translate-x-1/2">
          <ToggleGroup type="single" value={viewMode} onValueChange={(val) => val && onViewModeChange(val)} className="bg-white/5 border border-white/5 backdrop-blur-xl rounded-full p-1 gap-1 shadow-2xl shadow-black/20">
            <Tooltip content="Code View" side="bottom">
              <ToggleGroupItem value="code" aria-label="Code View" className="w-9 h-9 rounded-full data-[state=on]:bg-white/10 data-[state=on]:text-white hover:bg-white/5">
                <Code2 className="w-4 h-4" />
              </ToggleGroupItem>
            </Tooltip>
            <Tooltip content="Split View" side="bottom">
              <ToggleGroupItem value="split" aria-label="Split View" className="w-9 h-9 rounded-full data-[state=on]:bg-white/10 data-[state=on]:text-white hover:bg-white/5">
                <Columns2 className="w-4 h-4" />
              </ToggleGroupItem>
            </Tooltip>
            <Tooltip content="Preview" side="bottom">
              <ToggleGroupItem value="preview" aria-label="Preview" className="w-9 h-9 rounded-full data-[state=on]:bg-white/10 data-[state=on]:text-white hover:bg-white/5">
                <Eye className="w-4 h-4" />
              </ToggleGroupItem>
            </Tooltip>
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
