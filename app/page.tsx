'use client'

import { useState, useEffect, useCallback } from 'react'
import { Header } from './components/header'
import { EmptyState } from './components/empty-state'
import { PromptInput } from './components/prompt-input'
import { FileExplorer } from './components/file-explorer'
import { EditorTabs } from './components/editor-tabs'
import { CodeEditor } from './components/code-editor'
import { PreviewPanel } from './components/preview-panel'
import { RefinementBar } from './components/refinement-bar'
import { useChat } from './hooks/use-chat'
import { useEditor } from './hooks/use-editor'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const { chat, isLoading, error, createChat, sendMessage, resetChat } = useChat()
  const {
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
    reset: resetEditor,
  } = useEditor()

  // Initialize files when chat is created
  useEffect(() => {
    if (chat?.files && chat.files.length > 0) {
      initializeFiles(chat.files)
    }
  }, [chat?.files, initializeFiles])

  // Load saved edits from localStorage
  useEffect(() => {
    if (chat?.id) {
      loadFromLocalStorage(chat.id)
    }
  }, [chat?.id, loadFromLocalStorage])

  const handleCreateApp = useCallback(async () => {
    await createChat(prompt)
    setPrompt('')
  }, [createChat, prompt])

  const handleNewChat = useCallback(() => {
    resetChat()
    resetEditor()
    setPrompt('')
  }, [resetChat, resetEditor])

  const handleSave = useCallback(() => {
    if (chat?.id) {
      saveToLocalStorage(chat.id)
    }
  }, [chat?.id, saveToLocalStorage])

  const handleRefine = useCallback(async (message: string) => {
    await sendMessage(message)
  }, [sendMessage])

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setPrompt(suggestion)
  }, [])

  const files = chat?.files || []
  const activeFile = activeFileIndex !== null ? files[activeFileIndex] : null
  const showUnsavedIndicator = files.length > 0 && hasUnsavedChanges(files)

  // Determine layout based on view mode and chat state
  const showSidebar = chat && viewMode !== 'preview'
  const showEditor = chat && viewMode !== 'preview'
  const showPreview = chat && chat.demo && viewMode !== 'code'

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Header */}
      <Header
        hasChat={!!chat}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNewChat={handleNewChat}
        onSave={handleSave}
        hasUnsavedChanges={showUnsavedIndicator}
      />

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {!chat ? (
          // Empty State + Prompt Input
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto">
              <EmptyState onSuggestionClick={handleSuggestionClick} />
            </div>
            <div className="p-4 border-t border-neutral-800 bg-neutral-900/50">
              <div className="max-w-3xl mx-auto">
                <PromptInput
                  value={prompt}
                  onChange={setPrompt}
                  onSubmit={handleCreateApp}
                  isLoading={isLoading}
                  placeholder="Describe the app you want to create..."
                />
                {error && (
                  <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Editor Layout
          <div className="flex-1 flex overflow-hidden">
            {/* File Sidebar */}
            {showSidebar && (
              <div className="w-56 shrink-0 border-r border-neutral-800 hidden lg:block">
                <FileExplorer
                  files={files}
                  activeIndex={activeFileIndex}
                  onFileSelect={setActiveFileIndex}
                  editedFiles={editedFiles}
                />
              </div>
            )}

            {/* Editor Panel */}
            {showEditor && (
              <div className="flex flex-col flex-1 overflow-hidden border-r border-neutral-800">
                {/* File Tabs */}
                <EditorTabs
                  files={files}
                  activeIndex={activeFileIndex}
                  onTabClick={setActiveFileIndex}
                  editedFiles={editedFiles}
                />

                {/* Code Editor */}
                <div className="flex-1 overflow-hidden">
                  {activeFile ? (
                    <CodeEditor
                      value={getFileContent(activeFile)}
                      onChange={(value) => updateFileContent(activeFile.name, value)}
                      filename={activeFile.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-500">
                      <p>Select a file to edit</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview Panel */}
            {showPreview && chat.demo && (
              <div className="flex-1 overflow-hidden">
                <PreviewPanel url={chat.demo} />
              </div>
            )}

            {/* No Preview Available */}
            {viewMode !== 'code' && !chat.demo && (
              <div className="flex-1 flex items-center justify-center bg-neutral-950">
                <div className="text-center">
                  <p className="text-neutral-500 mb-2">Preview not available</p>
                  <p className="text-neutral-600 text-sm">The generated app doesn't have a preview URL</p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Refinement Bar (only when chat exists) */}
      {chat && (
        <RefinementBar onRefine={handleRefine} isLoading={isLoading} />
      )}
    </div>
  )
}
