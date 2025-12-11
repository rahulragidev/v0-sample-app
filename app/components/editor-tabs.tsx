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
    return <FileCode className="w-3.5 h-3.5 text-neutral-400" />
  }

  const ext = filename.split('.').pop()?.toLowerCase()

  const colorMap: Record<string, string> = {
    tsx: 'text-blue-500',
    ts: 'text-blue-500',
    jsx: 'text-yellow-400',
    js: 'text-yellow-400',
    css: 'text-blue-400',
    json: 'text-yellow-500',
  }

  return <FileCode className={clsx('w-3.5 h-3.5', colorMap[ext || ''] || 'text-neutral-400')} />
}

export function EditorTabs({ files, activeIndex, onTabClick, editedFiles }: EditorTabsProps) {
  if (files.length === 0) return null

  return (
    <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-neutral-800 bg-neutral-900/50 overflow-x-auto">
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
              'group flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
              'hover:bg-neutral-800/50',
              isActive
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            )}
          >
            {getFileIcon(fileName)}
            <span className="truncate max-w-[120px]">{fileName}</span>
            {isModified && (
              <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
            )}
          </button>
        )
      })}
    </div>
  )
}
