'use client'

import { useState } from 'react'

export default function V0Demo() {
  const [message, setMessage] = useState('Create a responsive navbar with Tailwind CSS')
  const [chat, setChat] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'iframe' | 'files'>('iframe')

  const createChat = async () => {
    if (!message.trim()) {
      setError('Please enter a message')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v0/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error('Failed to create chat')
      }

      const data = await response.json()
      setChat(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const sendFollowUp = async (followUpMessage: string) => {
    if (!chat?.id || !followUpMessage.trim()) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/v0/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chat.id,
          message: followUpMessage,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      setChat(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold mb-2 text-black dark:text-zinc-50">
          v0 Platform API Demo
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Get started with the v0 Platform API
        </p>

        {/* Input Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your prompt..."
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  createChat()
                }
              }}
            />
            <button
              onClick={createChat}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating...' : 'Create Chat'}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>

        {/* Results Section */}
        {chat && (
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
            {/* Tabs */}
            <div className="border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('iframe')}
                  className={`px-6 py-3 font-medium transition-colors ${activeTab === 'iframe'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                    }`}
                >
                  Use Case 1: Iframe Embedding
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`px-6 py-3 font-medium transition-colors ${activeTab === 'files'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50'
                    }`}
                >
                  Use Case 2: Generated Files
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'iframe' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
                    Chat Demo URL
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Embed this chat in an iframe:
                  </p>
                  <div className="mb-4">
                    <code className="block p-3 bg-zinc-100 dark:bg-zinc-800 rounded text-sm text-black dark:text-zinc-50 break-all">
                      {chat.demo}
                    </code>
                  </div>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
                    <iframe
                      src={chat.demo}
                      width="100%"
                      height="600"
                      className="border-0"
                      title="v0 Chat Demo"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'files' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">
                    Generated Files
                  </h2>
                  {chat.files && chat.files.length > 0 ? (
                    <div className="space-y-4">
                      {chat.files.map((file: any, index: number) => (
                        <div
                          key={index}
                          className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
                        >
                          <h3 className="font-semibold text-black dark:text-zinc-50 mb-2">
                            {file.name}
                          </h3>
                          <pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded text-sm overflow-x-auto text-black dark:text-zinc-50">
                            <code>{file.content}</code>
                          </pre>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-600 dark:text-zinc-400">
                      No files generated yet. Try adding a follow-up message to refine the output.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Follow-up Section */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950">
              <h3 className="font-semibold mb-3 text-black dark:text-zinc-50">
                Continue the Conversation
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => sendFollowUp('Add dark mode support')}
                  disabled={loading}
                  className="px-4 py-2 text-sm bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                >
                  Add dark mode support
                </button>
                <button
                  onClick={() => sendFollowUp('Make it more responsive')}
                  disabled={loading}
                  className="px-4 py-2 text-sm bg-zinc-200 dark:bg-zinc-800 text-black dark:text-zinc-50 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 disabled:opacity-50 transition-colors"
                >
                  Make it more responsive
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
