import { v0 } from 'v0-sdk'
import { NextRequest, NextResponse } from 'next/server'

interface FileMeta {
  filename?: string
  name?: string
  path?: string
  title?: string
}

interface RawFile {
  // Standard properties
  name?: string
  filename?: string
  path?: string
  content?: string
  code?: string
  locked?: boolean
  // v0 API specific properties
  lang?: string
  meta?: string | FileMeta
  source?: string
}

// Extract filename from meta object or string
function extractFilename(meta: string | FileMeta | undefined, lang: string | undefined, index: number): string {
  if (!meta) {
    return `file-${index}.${lang || 'tsx'}`
  }

  if (typeof meta === 'string') {
    return meta
  }

  // Log meta structure for debugging
  console.log(`Meta object keys for file ${index}:`, Object.keys(meta))
  console.log(`Meta object:`, JSON.stringify(meta).substring(0, 200))

  // meta is an object - try various property names
  const metaObj = meta as Record<string, unknown>
  const possibleNames = ['filename', 'name', 'path', 'title', 'file', 'fileName']

  for (const key of possibleNames) {
    if (metaObj[key] && typeof metaObj[key] === 'string') {
      return metaObj[key] as string
    }
  }

  return `file-${index}.${lang || 'tsx'}`
}

// Normalize file data from v0 API to a consistent format
function normalizeFiles(rawFiles: RawFile[] | undefined): Array<{ name: string; content: string }> {
  if (!rawFiles || !Array.isArray(rawFiles)) {
    return []
  }

  // Log first file structure for debugging
  if (rawFiles[0]) {
    console.log('First raw file structure:', JSON.stringify(rawFiles[0], null, 2).substring(0, 500))
    console.log('First raw file keys:', Object.keys(rawFiles[0]))
  }

  const result = rawFiles
    .map((file, index) => {
      // v0 API returns: { lang: "tsx", meta: {...} or "filename.tsx", source: "code..." }
      // Or standard: { name: "filename.tsx", content: "code..." }
      const name = extractFilename(file.meta, file.lang, index)
      const content = file.content || file.code || file.source || ''

      console.log(`File ${index}: extracted name="${name}"`)

      return { name: String(name), content: String(content) }
    })
    .filter((file) => file.name && file.content && file.name !== '[object Object]')

  console.log(`Returning ${result.length} normalized files`)
  return result
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, chatId } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (chatId) {
      // Send follow-up message to existing chat
      const response = await v0.chats.sendMessage({
        chatId,
        message,
      })

      const responseData = response as any

      // Files are returned directly in the response
      const files = normalizeFiles(responseData.files)

      return NextResponse.json({
        id: responseData.id || chatId,
        files,
        demo: responseData.demo,
        webUrl: responseData.webUrl,
      })
    } else {
      // Create new chat
      const chat = await v0.chats.create({ message })
      const chatData = chat as any

      // Files are returned directly in the response
      const files = normalizeFiles(chatData.files)

      return NextResponse.json({
        id: chatData.id,
        files,
        demo: chatData.demo,
        webUrl: chatData.webUrl,
      })
    }
  } catch (error: any) {
    console.error('v0 API error:', error)

    const errorMessage = error?.message || 'Failed to create chat or send message'
    const statusCode = error?.status || error?.statusCode || 500

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: statusCode }
    )
  }
}
