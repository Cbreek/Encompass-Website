import { useEffect, useState } from 'react'
import capAv from '../assets/cap-av.jpg'

export function HeroIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t0 = window.setTimeout(() => setVisible(true), 60)
    const t1 = window.setTimeout(() => setLeaving(true), 2400)
    const t2 = window.setTimeout(() => onDone(), 3300)
    return () => {
      window.clearTimeout(t0)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-[#121212]"
      style={{ opacity: leaving ? 0 : 1, transition: 'opacity 900ms ease-out' }}
      aria-hidden="true"
    >
      <img
        src={capAv}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: visible ? 'scale(1.08)' : 'scale(1.0)',
          opacity: visible ? 1 : 0.18,
          transition: 'transform 3200ms ease-out, opacity 700ms ease-out',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/55 via-[#121212]/30 to-[#121212]/80" />
      <div className="relative flex h-full items-center justify-center px-6">
        <div
          className="text-center"
          style={{
            opacity: leaving ? 0 : visible ? 1 : 0,
            transform: `translateY(${visible && !leaving ? '0' : '14px'})`,
            transition: 'opacity 1100ms ease-out, transform 1100ms ease-out',
          }}
        >
          <h1
            className="text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "Instrument Serif, Georgia, serif" }}
          >
            Encompass <br className="hidden sm:block" />
            Technology{' '}
            <em className="italic" style={{ color: '#e87722' }}>Partners</em>
          </h1>
        </div>
      </div>
    </div>
  )
}
