'use client'

import { useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { EditorView } from '@codemirror/view'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  filename: string
  readOnly?: boolean
}

// Custom Premium Zinc Theme
const zincTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent',
    color: '#fafafa', // zinc-50
  },
  '.cm-content': {
    caretColor: '#3b82f6', // blue-500
    fontFamily: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace',
    fontSize: '13px',
    lineHeight: '1.6',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  '.cm-cursor': {
    borderLeftColor: '#3b82f6',
    borderLeftWidth: '2px',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    color: '#52525b', // zinc-600
    border: 'none',
    paddingRight: '12px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent',
    color: '#e4e4e7', // zinc-200
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'rgba(59, 130, 246, 0.2) !important',
  },
  '.cm-focused .cm-selectionBackground': {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  '.cm-line': {
    padding: '0 8px',
  },
})

function getLanguageExtension(filename: unknown) {
  if (!filename || typeof filename !== 'string') {
    return javascript({ jsx: true, typescript: true })
  }

  const ext = filename.split('.').pop()?.toLowerCase()

  switch (ext) {
  case 'js':
  case 'jsx':
    return javascript({ jsx: true })
  case 'ts':
  case 'tsx':
    return javascript({ jsx: true, typescript: true })
  case 'css':
    return css()
  case 'html':
    return html()
  case 'json':
    return json()
  default:
    return javascript({ jsx: true, typescript: true })
  }
}

export function CodeEditor({ value, onChange, filename, readOnly = false }: CodeEditorProps) {
  const handleChange = useCallback((val: string) => {
    onChange(val)
  }, [onChange])

  const extensions = useMemo(() => [
    getLanguageExtension(filename),
    zincTheme,
    EditorView.lineWrapping,
  ], [filename])

  return (
    <div className="h-full w-full overflow-hidden bg-transparent">
      <CodeMirror
        value={value}
        onChange={handleChange}
        extensions={extensions}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: false,
          highlightSelectionMatches: true,
          tabSize: 2,
        }}
        className="h-full text-sm"
        style={{ height: '100%' }}
      />
    </div>
  )
}
