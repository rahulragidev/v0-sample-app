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
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

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
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
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
      <main className="flex-1 flex overflow-hidden relative">
        {!chat ? (
          // Empty State + Prompt Input
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col justify-center animate-in fade-in duration-700">
              <EmptyState onSuggestionClick={handleSuggestionClick} />

              <div className="mt-8 mx-auto w-full max-w-2xl px-4">
                <PromptInput
                  value={prompt}
                  onChange={setPrompt}
                  onSubmit={handleCreateApp}
                  isLoading={isLoading}
                  placeholder="Describe your app..."
                />
                {error && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs text-center">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />
          </div>
        ) : (
          // Editor Layout
          <div className="flex-1 flex overflow-hidden animate-in fade-in duration-500">
            {/* File Sidebar */}
            {showSidebar && (
              <div className="w-60 shrink-0 border-r border-white/5 hidden lg:block bg-muted/30">
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
              <div className="flex flex-col flex-1 overflow-hidden border-r border-white/5 bg-muted/10">
                <EditorTabs
                  files={files}
                  activeIndex={activeFileIndex}
                  onTabClick={setActiveFileIndex}
                  editedFiles={editedFiles}
                />

                <div className="flex-1 overflow-hidden relative">
                  {activeFile ? (
                    <CodeEditor
                      value={getFileContent(activeFile)}
                      onChange={(value) => updateFileContent(activeFile.name, value)}
                      filename={activeFile.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600 text-sm">
                      <p>Select a file to edit</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview Panel */}
            {showPreview && chat.demo && (
              <div className="flex-1 overflow-hidden bg-background">
                <PreviewPanel url={chat.demo} />
              </div>
            )}

            {/* No Preview Available */}
            {viewMode !== 'code' && !chat.demo && (
              <div className="flex-1 flex items-center justify-center bg-zinc-950/50">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-zinc-900 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
                  </div>
                  <p className="text-zinc-500 text-sm">Waiting for preview...</p>
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
