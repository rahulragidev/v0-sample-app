'use client'

import { useState, useCallback, useEffect } from 'react'
import type { GeneratedFile, ViewMode } from '../types'

interface UseEditorReturn {
  activeFileIndex: number | null
  editedFiles: Record<string, string>
  viewMode: ViewMode
  setActiveFileIndex: (index: number | null) => void
  setViewMode: (mode: ViewMode) => void
  updateFileContent: (fileName: string, content: string) => void
  getFileContent: (file: GeneratedFile) => string
  initializeFiles: (files: GeneratedFile[]) => void
  hasUnsavedChanges: (files: GeneratedFile[]) => boolean
  saveToLocalStorage: (chatId: string) => void
  loadFromLocalStorage: (chatId: string) => void
  reset: () => void
}

export function useEditor(): UseEditorReturn {
  const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null)
  const [editedFiles, setEditedFiles] = useState<Record<string, string>>({})
  const [viewMode, setViewMode] = useState<ViewMode>('split')

  const updateFileContent = useCallback((fileName: string, content: string) => {
    setEditedFiles(prev => ({ ...prev, [fileName]: content }))
  }, [])

  const getFileContent = useCallback((file: GeneratedFile): string => {
    return editedFiles[file.name] ?? file.content
  }, [editedFiles])

  const initializeFiles = useCallback((files: GeneratedFile[]) => {
    const initial: Record<string, string> = {}
    files.forEach(file => {
      initial[file.name] = file.content
    })
    setEditedFiles(initial)
    setActiveFileIndex(files.length > 0 ? 0 : null)
  }, [])

  const hasUnsavedChanges = useCallback((files: GeneratedFile[]): boolean => {
    return files.some(file => {
      const edited = editedFiles[file.name]
      return edited !== undefined && edited !== file.content
    })
  }, [editedFiles])

  const saveToLocalStorage = useCallback((chatId: string) => {
    try {
      localStorage.setItem(`v0-editor-${chatId}`, JSON.stringify(editedFiles))
    } catch {
      // Ignore localStorage errors
    }
  }, [editedFiles])

  const loadFromLocalStorage = useCallback((chatId: string) => {
    try {
      const saved = localStorage.getItem(`v0-editor-${chatId}`)
      if (saved) {
        const parsed = JSON.parse(saved)
        setEditedFiles(prev => ({ ...prev, ...parsed }))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const reset = useCallback(() => {
    setActiveFileIndex(null)
    setEditedFiles({})
    setViewMode('split')
  }, [])

  return {
    activeFileIndex,
    editedFiles,
    viewMode,
    setActiveFileIndex,
    setViewMode,
    updateFileContent,
    getFileContent,
    initializeFiles,
    hasUnsavedChanges,
    saveToLocalStorage,
    loadFromLocalStorage,
    reset,
  }
}
