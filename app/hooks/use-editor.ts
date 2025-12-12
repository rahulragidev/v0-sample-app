'use client'

import { useState, useCallback, useEffect } from 'react'
import type { GeneratedFile, ViewMode } from '../types'

interface UseEditorReturn {
  activeFileIndex: number | null
  editedFiles: Record<string, string>
  viewMode: ViewMode
  openFiles: string[]
  setActiveFileIndex: (index: number | null) => void
  setViewMode: (mode: ViewMode) => void
  updateFileContent: (fileName: string, content: string) => void
  getFileContent: (file: GeneratedFile) => string
  initializeFiles: (files: GeneratedFile[]) => void
  hasUnsavedChanges: (files: GeneratedFile[]) => boolean
  saveToLocalStorage: (chatId: string) => void
  loadFromLocalStorage: (chatId: string) => void
  reset: () => void
  openFile: (fileName: string, allFiles: GeneratedFile[]) => void
  closeFile: (fileName: string, allFiles: GeneratedFile[]) => void
}

export function useEditor(): UseEditorReturn {
  const [activeFileIndex, setActiveFileIndex] = useState<number | null>(null)
  const [editedFiles, setEditedFiles] = useState<Record<string, string>>({})
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [openFiles, setOpenFiles] = useState<string[]>([])

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
    // Initially open just the first file, or maybe none? Let's say first file.
    const firstFile = files[0]?.name
    if (firstFile) {
      setOpenFiles([firstFile])
      setActiveFileIndex(0)
    } else {
      setOpenFiles([])
      setActiveFileIndex(null)
    }
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

  const openFile = useCallback((fileName: string, allFiles: GeneratedFile[]) => {
    setOpenFiles(prev => {
      if (!prev.includes(fileName)) {
        return [...prev, fileName]
      }
      return prev
    })
    const index = allFiles.findIndex(f => f.name === fileName)
    if (index !== -1) {
      setActiveFileIndex(index)
    }
  }, [])

  const closeFile = useCallback((fileName: string, allFiles: GeneratedFile[]) => {
    let nextToActivate: string | null = null;

    setOpenFiles(prev => {
      const index = prev.indexOf(fileName)
      if (index === -1) return prev // File not open

      const newOpen = prev.filter(f => f !== fileName)

      if (newOpen.length === 0) {
        nextToActivate = null
      } else if (index === 0) {
        // Closed first tab, open new first
        nextToActivate = newOpen[0]
      } else {
        // Open the one to the left
        nextToActivate = newOpen[index - 1]
      }

      return newOpen
    })

    setActiveFileIndex(currentIndex => {
      if (currentIndex === null) return null
      const currentName = allFiles[currentIndex]?.name

      if (currentName === fileName) {
        // Active file was closed
        if (nextToActivate) {
          const nextIndex = allFiles.findIndex(f => f.name === nextToActivate)
          return nextIndex
        }
        return null
      }
      return currentIndex
    })
  }, [])

  const reset = useCallback(() => {
    setActiveFileIndex(null)
    setEditedFiles({})
    setViewMode('split')
    setOpenFiles([])
  }, [])

  return {
    activeFileIndex,
    editedFiles,
    viewMode,
    openFiles,
    setActiveFileIndex,
    setViewMode,
    updateFileContent,
    getFileContent,
    initializeFiles,
    hasUnsavedChanges,
    saveToLocalStorage,
    loadFromLocalStorage,
    reset,
    openFile,
    closeFile
  }
}
