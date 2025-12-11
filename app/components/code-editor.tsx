'use client'

import { useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  filename: string
  readOnly?: boolean
}

// Custom theme extension to match Cursor's dark theme
const customTheme = EditorView.theme({
  '&': {
    backgroundColor: '#0a0a0a',
    color: '#e5e5e5',
  },
  '.cm-content': {
    caretColor: '#528bff',
    fontFamily: 'var(--font-geist-mono), ui-monospace, monospace',
    fontSize: '13px',
    lineHeight: '1.6',
  },
  '.cm-cursor': {
    borderLeftColor: '#528bff',
  },
  '.cm-activeLine': {
    backgroundColor: '#1a1a1a',
  },
  '.cm-gutters': {
    backgroundColor: '#0a0a0a',
    color: '#525252',
    border: 'none',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#1a1a1a',
    color: '#a3a3a3',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: '#264f78 !important',
  },
  '.cm-focused .cm-selectionBackground': {
    backgroundColor: '#264f78',
  },
  '.cm-line': {
    padding: '0 16px',
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
    customTheme,
    EditorView.lineWrapping,
  ], [filename])

  return (
    <div className="h-full w-full overflow-hidden bg-[#0a0a0a]">
      <CodeMirror
        value={value}
        onChange={handleChange}
        extensions={extensions}
        theme={oneDark}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
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
