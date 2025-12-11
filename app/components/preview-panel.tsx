'use client'

import { useState } from 'react'
import { ExternalLink, RefreshCw, Smartphone, Monitor, Tablet } from 'lucide-react'
import { Button } from './ui/button'
import { clsx } from 'clsx'

interface PreviewPanelProps {
  url: string
}

type DeviceSize = 'mobile' | 'tablet' | 'desktop'

const deviceSizes: Record<DeviceSize, { width: string; icon: React.ElementType; label: string }> = {
  mobile: { width: '375px', icon: Smartphone, label: 'Mobile' },
  tablet: { width: '768px', icon: Tablet, label: 'Tablet' },
  desktop: { width: '100%', icon: Monitor, label: 'Desktop' },
}

export function PreviewPanel({ url }: PreviewPanelProps) {
  const [device, setDevice] = useState<DeviceSize>('desktop')
  const [key, setKey] = useState(0)

  const handleRefresh = () => {
    setKey(prev => prev + 1)
  }

  const handleOpenExternal = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col h-full bg-background border-l border-white/5">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-zinc-900/10 backdrop-blur-sm">
        <div className="flex items-center gap-0.5 p-0.5 bg-zinc-900/50 rounded-lg border border-white/5">
          {(Object.keys(deviceSizes) as DeviceSize[]).map((size) => {
            const { icon: Icon, label } = deviceSizes[size]
            return (
              <Button
                key={size}
                variant={device === size ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setDevice(size)}
                title={label}
                className={clsx(
                  "h-7 w-7 p-0",
                  device === size ? "bg-zinc-700 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                )}
              >
                <Icon className="w-4 h-4" />
              </Button>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            title="Refresh"
            className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-200"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenExternal}
            title="Open in new tab"
            className="h-8 w-8 p-0 text-zinc-500 hover:text-zinc-200"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-start justify-center p-6 overflow-auto bg-[url('/grid-pattern.svg')] bg-repeat opacity-100">
        <div
          className={clsx(
            'h-full bg-white transition-all duration-500 ease-in-out shadow-2xl',
            device !== 'desktop' && 'border-4 border-zinc-900 rounded-4xl h-[800px] max-h-full'
          )}
          style={{
            width: deviceSizes[device].width,
            maxWidth: '100%',
          }}
        >
          <iframe
            key={key}
            src={url}
            className="w-full h-full border-0 rounded-[inherit]"
            title="App Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  )
}
