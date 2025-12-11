'use client'

import { FileCode, FileJson, FileType, Folder } from 'lucide-react'
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
    return <FileCode className="w-4 h-4 text-neutral-400" />
  }

  const ext = filename.split('.').pop()?.toLowerCase()

  switch (ext) {
  case 'json':
    return <FileJson className="w-4 h-4 text-yellow-500" />
  case 'css':
    return <FileType className="w-4 h-4 text-blue-400" />
  case 'tsx':
  case 'ts':
    return <FileCode className="w-4 h-4 text-blue-500" />
  case 'jsx':
  case 'js':
    return <FileCode className="w-4 h-4 text-yellow-400" />
  default:
    return <FileCode className="w-4 h-4 text-neutral-400" />
  }
}

export function FileExplorer({ files, activeIndex, onFileSelect, editedFiles }: FileExplorerProps) {
  return (
    <div className="flex flex-col h-full bg-neutral-900/50">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 uppercase tracking-wider">
          <Folder className="w-3.5 h-3.5" />
          <span>Files</span>
          <span className="ml-auto text-neutral-500">{files.length}</span>
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto py-2">
        {files.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-neutral-500">No files generated yet</p>
          </div>
        ) : (
          <ul className="space-y-0.5">
            {files.map((file, index) => {
              // Ensure file and name are valid
              const fileName = typeof file?.name === 'string' ? file.name : null
              if (!fileName) return null

              const isActive = activeIndex === index
              const isModified = editedFiles[fileName] !== undefined && editedFiles[fileName] !== file.content

              return (
                <li key={fileName}>
                  <button
                    onClick={() => onFileSelect(index)}
                    className={clsx(
                      'w-full flex items-center gap-2.5 px-4 py-2 text-left transition-colors',
                      'hover:bg-neutral-800/50',
                      isActive && 'bg-neutral-800 text-white',
                      !isActive && 'text-neutral-400'
                    )}
                  >
                    {getFileIcon(fileName)}
                    <span className="flex-1 text-sm truncate font-medium">
                      {fileName}
                    </span>
                    {isModified && (
                      <span className="w-2 h-2 rounded-full bg-blue-500" title="Modified" />
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
