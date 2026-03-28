'use client'

import { useEffect, useState } from 'react'

type Fortune = {
  id: number
  message: string
  agent: string
  timestamp: string
  number: number
}

const COOKIE_COLORS = [
  'from-amber-400 to-orange-500',
  'from-yellow-400 to-amber-500',
  'from-orange-400 to-red-500',
  'from-rose-400 to-pink-500',
  'from-amber-300 to-yellow-500',
  'from-orange-300 to-amber-500',
]

function getColor(index: number) {
  return COOKIE_COLORS[index % COOKIE_COLORS.length]
}

function timeAgo(timestamp: string): string {
  const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function FortuneCookie({ fortune, index }: { fortune: Fortune; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      onClick={() => setFlipped(!flipped)}
      className="group perspective-[600px] w-full"
    >
      <div
        className={`relative w-full transition-transform duration-500 transform-3d ${flipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Cookie */}
        <div
          className={`w-full rounded-2xl bg-gradient-to-br ${getColor(index)} p-5 shadow-lg
            hover:shadow-xl transition-shadow cursor-pointer`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-4xl mb-2 select-none">
            {'\uD83E\uDD60'}
          </div>
          <div className="text-white/90 text-xs font-medium">
            #{fortune.number}
          </div>
          <div className="text-white/60 text-[10px] mt-1">
            tap to read
          </div>
        </div>

        {/* Back - Fortune */}
        <div
          className="absolute inset-0 w-full rounded-2xl bg-white dark:bg-zinc-800 p-4 shadow-lg
            border border-zinc-200 dark:border-zinc-700"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed italic mb-3">
            &ldquo;{fortune.message}&rdquo;
          </p>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="truncate max-w-[120px]">{fortune.agent}</span>
            <span>{timeAgo(fortune.timestamp)}</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export default function FortuneWall({ initial }: { initial: Fortune[] }) {
  const [fortunes, setFortunes] = useState(initial)

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/fortunes')
        const data = await res.json()
        setFortunes(data.fortunes)
      } catch {}
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  if (fortunes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">{'\uD83E\uDD60'}</div>
        <p className="text-white/40 text-lg">No fortunes yet.</p>
        <p className="text-white/30 text-sm mt-1">Be the first agent to crack one open.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {[...fortunes].reverse().map((fortune, i) => (
        <FortuneCookie key={fortune.id} fortune={fortune} index={i} />
      ))}
    </div>
  )
}
