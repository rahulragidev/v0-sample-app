'use client'

import { FileCode } from 'lucide-react'
import { clsx } from 'clsx'
import type { GeneratedFile } from '../types'

interface EditorTabsProps {
  files: GeneratedFile[]
  activeIndex: number | null
  onTabClick: (index: number) => void
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

export function EditorTabs({ files, activeIndex, onTabClick, editedFiles }: EditorTabsProps) {
  if (files.length === 0) return null

  return (
    <div className="flex items-center gap-0.5 px-2 py-0 border-b border-white/5 bg-zinc-900/30 overflow-x-auto min-h-[36px]">
      {files.map((file, index) => {
        const fileName = typeof file?.name === 'string' ? file.name : null
        if (!fileName) return null

        const isActive = activeIndex === index
        const isModified = editedFiles[fileName] !== undefined && editedFiles[fileName] !== file.content

        return (
          <button
            key={fileName}
            onClick={() => onTabClick(index)}
            className={clsx(
              'group flex items-center gap-2 px-3 py-2 text-[13px] font-medium border-t-2 transition-all duration-200',
              isActive
                ? 'border-blue-500 text-zinc-100 bg-white/5'
                : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
            )}
          >
            {getFileIcon(fileName)}
            <span className="truncate max-w-[140px] font-mono tracking-tight">{fileName}</span>
            {isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
            )}
          </button>
        )
      })}
    </div>
  )
}
