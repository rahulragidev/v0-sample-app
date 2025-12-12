'use client'

import { useState } from 'react'
import { ExternalLink, RefreshCw, Smartphone, Monitor, Tablet } from 'lucide-react'
import { Button } from './ui/button'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'
import { Tooltip } from './ui/tooltip'
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
    <div className="flex flex-col h-full bg-background/50 border-l border-white/5 backdrop-blur-sm relative group">
      {/* Floating Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
        <ToggleGroup
          type="single"
          value={device}
          onValueChange={(val) => val && setDevice(val as DeviceSize)}
          className="gap-1"
        >
          {(Object.keys(deviceSizes) as DeviceSize[]).map((size) => {
            const { icon: Icon, label } = deviceSizes[size]
            return (
              <Tooltip key={size} content={label} side="bottom">
                <ToggleGroupItem value={size} aria-label={label} className="w-8 h-8 rounded-full data-[state=on]:bg-white/20 data-[state=on]:text-white text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
                  <Icon className="w-4 h-4" />
                </ToggleGroupItem>
              </Tooltip>
            )
          })}
        </ToggleGroup>

        <div className="w-px h-4 bg-white/10" />

        <div className="flex items-center gap-1">
          <Tooltip content="Refresh Preview" side="bottom">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="text-zinc-400 hover:text-white w-8 h-8 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </Tooltip>

          <Tooltip content="Open in New Tab" side="bottom">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOpenExternal}
              className="text-zinc-400 hover:text-white w-8 h-8 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Tooltip>
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
