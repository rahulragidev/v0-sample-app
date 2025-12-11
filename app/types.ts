/**
 * Type definitions for the v0 app builder
 */

export interface GeneratedFile {
  name: string
  content: string
  path?: string
}

export interface Chat {
  id: string
  files?: GeneratedFile[]
  demo?: string
  webUrl?: string
}

export interface ChatState {
  chat: Chat | null
  isLoading: boolean
  error: string | null
}

export type ViewMode = 'code' | 'preview' | 'split'

export interface EditorState {
  activeFileIndex: number | null
  editedFiles: Record<string, string>
  viewMode: ViewMode
}
