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
    <div className="flex flex-col h-full bg-neutral-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
        <div className="flex items-center gap-1">
          {(Object.keys(deviceSizes) as DeviceSize[]).map((size) => {
            const { icon: Icon, label } = deviceSizes[size]
            return (
              <Button
                key={size}
                variant={device === size ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setDevice(size)}
                title={label}
              >
                <Icon className="w-4 h-4" />
              </Button>
            )
          })}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={handleRefresh} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleOpenExternal} title="Open in new tab">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-start justify-center p-4 overflow-auto bg-neutral-950">
        <div
          className={clsx(
            'h-full bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300',
            device !== 'desktop' && 'border border-neutral-800'
          )}
          style={{
            width: deviceSizes[device].width,
            maxWidth: '100%',
          }}
        >
          <iframe
            key={key}
            src={url}
            className="w-full h-full border-0"
            title="App Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  )
}
