'use client'

import { FileCode, FileJson, FileType, Folder, ChevronRight, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import type { GeneratedFile } from '../types'

interface FileExplorerProps {
  files: GeneratedFile[]
  activeIndex: number | null
  onFileSelect: (index: number) => void
  editedFiles: Record<string, string>
}

function getFileIcon(filename: unknown) {
  if (!filename || typeof filename !== 'string') {
    return <FileCode className="w-4 h-4 text-zinc-500" />
  }

  const ext = filename.split('.').pop()?.toLowerCase()

  switch (ext) {
  case 'json':
    return <FileJson className="w-3.5 h-3.5 text-yellow-500/80" />
  case 'css':
    return <FileType className="w-3.5 h-3.5 text-sky-400/80" />
  case 'tsx':
  case 'ts':
    return <FileCode className="w-3.5 h-3.5 text-blue-400/80" />
  case 'jsx':
  case 'js':
    return <FileCode className="w-3.5 h-3.5 text-yellow-300/80" />
  default:
    return <FileCode className="w-3.5 h-3.5 text-zinc-500" />
  }
}

export function FileExplorer({ files, activeIndex, onFileSelect, editedFiles }: FileExplorerProps) {
  return (
    <div className="flex flex-col h-full bg-muted/30 border-r border-border">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between group">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
          <Folder className="w-3.5 h-3.5" />
          <span>Explorer</span>
        </div>
        <span className="text-[10px] text-muted-foreground font-mono">{files.length}</span>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto py-1">
        {files.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-zinc-600">No files</p>
          </div>
        ) : (
          <ul className="space-y-0.5 px-2">
            {files.map((file, index) => {
              const fileName = typeof file?.name === 'string' ? file.name : null
              if (!fileName) return null

              const isActive = activeIndex === index
              const isModified = editedFiles[fileName] !== undefined && editedFiles[fileName] !== file.content

              return (
                <li key={fileName}>
                  <button
                    onClick={() => onFileSelect(index)}
                    className={clsx(
                      'w-full flex items-center gap-2 px-2 py-1.5 text-left transition-all duration-200 rounded-md',
                      isActive
                        ? 'bg-blue-500/10 text-blue-100 font-medium'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                    )}
                  >
                    {getFileIcon(fileName)}
                    <span className="flex-1 text-[13px] truncate font-mono tracking-tight">
                      {fileName}
                    </span>
                    {isModified && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm" title="Modified" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
