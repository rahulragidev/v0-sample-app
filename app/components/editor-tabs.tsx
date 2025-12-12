'use client'

import { FileCode, X } from 'lucide-react'
import { clsx } from 'clsx'
import type { GeneratedFile } from '../types'

interface EditorTabsProps {
  files: GeneratedFile[]
  activeFile: GeneratedFile | null
  onTabClick: (index: number) => void
  onCloseTab: (fileName: string) => void
  openFiles: string[]
  editedFiles: Record<string, string>
}

function getFileIcon(filename: unknown) {
  if (!filename || typeof filename !== 'string') {
    return <FileCode className="w-3.5 h-3.5 text-zinc-500" />
  }

  const ext = filename.split('.').pop()?.toLowerCase()

  const colorMap: Record<string, string> = {
    tsx: 'text-blue-400',
    ts: 'text-blue-400',
    jsx: 'text-yellow-300',
    js: 'text-yellow-300',
    css: 'text-sky-400',
    json: 'text-yellow-500',
  }

  return <FileCode className={clsx('w-3.5 h-3.5', colorMap[ext || ''] || 'text-zinc-500')} />
}

export function EditorTabs({ files, activeFile, onTabClick, onCloseTab, openFiles, editedFiles }: EditorTabsProps) {
  if (openFiles.length === 0) return null

  return (
    <div className="flex items-center gap-0.5 px-2 py-0 border-b border-white/5 bg-background/20 backdrop-blur-sm overflow-x-auto min-h-[36px]">
      {openFiles.map((fileName) => {
        const fileIndex = files.findIndex(f => f.name === fileName)
        const file = files[fileIndex]
        if (!file) return null

        const isActive = activeFile?.name === fileName
        const isModified = editedFiles[fileName] !== undefined && editedFiles[fileName] !== file.content

        return (
          <div
            key={fileName}
            className={clsx(
              'group flex items-center gap-2 px-3 py-2 text-[13px] font-medium border-t-2 transition-all duration-200 cursor-pointer user-select-none',
              isActive
                ? 'border-blue-500 text-white bg-white/5'
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            )}
            onClick={() => onTabClick(fileIndex)}
          >
            {getFileIcon(fileName)}
            <span className="truncate max-w-[140px] font-mono tracking-tight">{fileName}</span>
            {isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onCloseTab(fileName)
              }}
              className={clsx(
                "ml-1 p-0.5 rounded-md hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity",
                isActive ? "opacity-100 text-white/50 hover:text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
