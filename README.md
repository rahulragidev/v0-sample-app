# AppBuilder - AI-Powered App Generator

A professional, Cursor-inspired interface for creating apps from prompts using the v0 Platform API. Describe your app, watch it come to life, and edit the generated code in a real code editor.

## Features

- **🎨 Cursor-inspired UI** - Clean, dark-mode interface with professional aesthetics
- **✨ AI-Powered Generation** - Describe your app and it's generated instantly via v0
- **📝 Real Code Editor** - CodeMirror 6 with syntax highlighting and auto-completion
- **👁️ Live Preview** - See your app in action with responsive device preview
- **📁 File Explorer** - Navigate generated files with a familiar sidebar
- **🔄 Iterative Refinement** - Refine your app with follow-up prompts
- **💾 Auto-Save** - Edits persist to localStorage
- **📱 Responsive** - Works on desktop and mobile

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **CodeMirror 6** - Professional code editor
- **v0-sdk** - v0 Platform API integration
- **lucide-react** - Beautiful icons

## Project Structure

```
app/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── panel.tsx
│   │   └── kbd.tsx
│   ├── code-editor.tsx  # CodeMirror wrapper
│   ├── file-explorer.tsx
│   ├── preview-panel.tsx
│   ├── prompt-input.tsx
│   ├── header.tsx
│   ├── empty-state.tsx
│   ├── editor-tabs.tsx
│   └── refinement-bar.tsx
├── hooks/
│   ├── use-chat.ts      # Chat state management
│   └── use-editor.ts    # Editor state management
├── api/
│   └── v0/
│       └── chat/
│           └── route.ts # v0 API proxy
├── types.ts             # TypeScript definitions
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── page.tsx             # Main application
```

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Configure API Key:**

   Get your API key from [v0 account settings](https://v0.dev/chat/settings/keys) and create `.env.local`:

   ```bash
   V0_API_KEY=your_api_key_here
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Creating an App

1. Enter your prompt in the input field (e.g., "Create a modern landing page")
2. Click "Create" or press `⌘ + Enter`
3. Watch your app generate in real-time

### Editing Code

1. Select files from the sidebar or tabs
2. Edit code in the CodeMirror editor with full syntax highlighting
3. Changes are auto-saved to localStorage

### Preview Modes

- **Code** - Focus on the code editor
- **Split** - View code and preview side-by-side
- **Preview** - Full-screen app preview

### Responsive Testing

Use the device toggle buttons (Mobile/Tablet/Desktop) in the preview panel to test responsive layouts.

### Refining Your App

Use quick action buttons or type custom refinement prompts to iterate on your app.

## Best Practices Implemented

- ✅ Component-based architecture with separation of concerns
- ✅ Custom hooks for state management
- ✅ TypeScript for type safety
- ✅ Consistent naming conventions
- ✅ Accessible UI components
- ✅ Responsive design patterns
- ✅ Error handling with user feedback
- ✅ Performance optimizations (memoization, lazy loading)

## Environment Variables

| Variable     | Description                    | Required |
| ------------ | ------------------------------ | -------- |
| `V0_API_KEY` | Your v0 Platform API key       | Yes      |

## License

MIT
