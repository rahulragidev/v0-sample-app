'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Chat, GeneratedFile } from '../types'

interface UseChatReturn {
  chat: Chat | null
  isLoading: boolean
  error: string | null
  createChat: (message: string) => Promise<void>
  sendMessage: (message: string) => Promise<void>
  resetChat: () => void
}

export function useChat(): UseChatReturn {
  const [chat, setChat] = useState<Chat | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load chat from localStorage on mount
  useEffect(() => {
    try {
      const savedChat = localStorage.getItem('v0-current-chat')
      if (savedChat) {
        setChat(JSON.parse(savedChat))
      }
    } catch {
      // Ignore errors including JSON parse errors
    }
  }, [])

  // Save chat to localStorage whenever it changes
  useEffect(() => {
    try {
      if (chat) {
        localStorage.setItem('v0-current-chat', JSON.stringify(chat))
      } else {
        localStorage.removeItem('v0-current-chat')
      }
    } catch {
      // Ignore errors
    }
  }, [chat])

  const createChat = useCallback(async (message: string) => {
    if (!message.trim()) {
      setError('Please enter a prompt')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v0/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create app')
      }

      const data = await response.json()
      setChat(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sendMessage = useCallback(async (message: string) => {
    if (!chat?.id || !message.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v0/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId: chat.id, message }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update app')
      }

      const data = await response.json()
      setChat(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [chat?.id])

  const resetChat = useCallback(() => {
    setChat(null)
    setError(null)
    localStorage.removeItem('v0-current-chat')
  }, [])

  return {
    chat,
    isLoading,
    error,
    createChat,
    sendMessage,
    resetChat,
  }
}

