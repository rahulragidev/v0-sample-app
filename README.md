This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with the [v0 Platform API](https://v0.app/docs/api/platform/quickstart).

## v0 Platform API Integration

This project demonstrates how to integrate the v0 Platform API into a Next.js application.

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Key:**
   - Get your API key from [v0 account settings](https://v0.app/chat/settings/keys)
   - Add it to `.env.local`:
     ```bash
     V0_API_KEY=your_api_key_here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the demo:**
   - Open [http://localhost:3000](http://localhost:3000) and click "Try v0 Demo"
   - Or navigate directly to [http://localhost:3000/v0-demo](http://localhost:3000/v0-demo)

### Features

The demo page (`/v0-demo`) showcases two main use cases:

1. **Iframe Embedding**: Create a chat and embed it directly in your application using an iframe
2. **Generated Files**: Access and display the generated code files from the chat

### Project Structure

- `app/api/v0/chat/route.ts` - API route for creating chats and sending messages
- `app/v0-demo/page.tsx` - Demo page component demonstrating both use cases
- `.env.local` - Environment variables (API key)

### Usage

The v0 SDK is automatically configured to use the `V0_API_KEY` environment variable. No additional initialization is needed:

```typescript
import { v0 } from 'v0-sdk'

// Create a new chat
const chat = await v0.chats.create({
  message: 'Create a responsive navbar with Tailwind CSS'
})

// Use the Demo URL in an iframe
<iframe src={chat.demo} width="100%" height="600"></iframe>

// Access generated files
chat.files?.forEach((file) => {
  console.log(`File: ${file.name}`)
  console.log(`Content: ${file.content}`)
})

// Continue the conversation
const response = await v0.chats.sendMessage({
  chatId: chat.id,
  message: 'Add dark mode support',
})
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
