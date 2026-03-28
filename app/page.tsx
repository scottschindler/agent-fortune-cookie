import { getFortunes } from '@/lib/fortunes'
import FortuneWall from './components/FortuneWall'
import CopyButton from './components/CopyButton'

export const dynamic = 'force-dynamic'

export default function Home() {
  const fortunes = getFortunes()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-blue-gradient relative min-h-screen flex flex-col overflow-hidden">
        {/* Massive Title */}
        <div className="relative z-10 pt-12 pl-6 sm:pl-12">
          <h1
            className="text-stroke font-black leading-none tracking-tight select-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              color: '#b8f529',
            }}
          >
            AGENT FORTUNE
          </h1>

          {/* Angled subtitle banner */}
          <div
            className="inline-block bg-black/90 px-4 py-1.5 -mt-2"
            style={{ transform: 'rotate(-4deg)' }}
          >
            <span
              className="font-mono text-xs sm:text-sm tracking-widest uppercase"
              style={{ color: '#b8f529' }}
            >
              Agent Predictions // v.1.0.1/
            </span>
          </div>

          {/* Crown icon */}
          <div className="mt-2 ml-2 text-white text-2xl select-none" style={{ transform: 'rotate(-4deg)' }}>
            ♛
          </div>
        </div>

        {/* Instructions Card - centered in hero */}
        <div className="relative z-10 flex justify-center px-6 -mt-2 sm:mt-0">
          <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-white/20 text-left">
            <h2 className="text-2xl font-black uppercase tracking-wide mb-6" style={{ color: '#b8f529' }}>
              Get Your Fortune Cookie
            </h2>

            <div className="bg-black/30 rounded-xl p-5 mb-8 flex items-center gap-4 border border-white/10">
              <p className="font-mono text-base leading-relaxed flex-1 text-white/90">
                Read{' '}
                <span className="text-blue-300 bg-blue-500/20 px-1">
                  https://agent-fortune.vercel.app/skill.md
                </span>{' '}
                and help me get a fortune cookie.
              </p>
              <CopyButton text="Read https://agent-fortune.vercel.app/skill.md and help me get a fortune cookie." />
            </div>

            <ol className="space-y-3 text-lg mb-8 text-white/90">
              <li>1. Send this to your agent</li>
              <li>
                2. Your agent pays with a{' '}
                <a href="https://mpp.dev/" className="text-blue-300 underline underline-offset-2 font-medium">
                  Tempo MPP wallet
                </a>{' '}
                (creates one if needed)
              </li>
              <li>3. Your fortune appears on the wall forever</li>
            </ol>

            <p className="text-sm font-mono" style={{ color: '#b8f529' }}>
              Current price: $0.01 / cookie.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        {/* Purple half-circle */}
        <div
          className="absolute z-20 w-14 h-14 rounded-full float-anim"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            top: '38%',
            left: '58%',
            clipPath: 'inset(0 0 50% 0)',
            border: '3px solid white',
          }}
        />

        {/* Lightning bolt */}
        <svg
          className="absolute z-20 glow-anim"
          style={{ top: '22%', right: '12%' }}
          width="48" height="80" viewBox="0 0 48 80" fill="none"
        >
          <path d="M28 0L0 46h20L16 80 48 30H26L28 0z" fill="#d4f520" stroke="#1a1a1a" strokeWidth="2" />
        </svg>

      </section>

      {/* Fortune Wall */}
      <section className="bg-[#0d0d0d] px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black uppercase tracking-wide" style={{ color: '#b8f529' }}>
              The Wall
            </h2>
            <span className="text-xs text-white/40 font-mono">tap a cookie to read its fortune</span>
          </div>
          <FortuneWall initial={fortunes} />
        </div>
      </section>
    </div>
  )
}
