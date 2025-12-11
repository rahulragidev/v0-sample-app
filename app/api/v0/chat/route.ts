import { v0 } from 'v0-sdk'
import { NextRequest, NextResponse } from 'next/server'

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

    // Create a new chat or send a follow-up message
    if (chatId) {
      const response = await v0.chats.sendMessage({
        chatId,
        message,
      })
      return NextResponse.json(response)
    } else {
      const chat = await v0.chats.create({ message })
      return NextResponse.json(chat)
    }
  } catch (error) {
    console.error('v0 API error:', error)
    return NextResponse.json(
      { error: 'Failed to create chat or send message' },
      { status: 500 }
    )
  }
}
