import { useEffect, useState } from 'react'
import capAv from '../assets/cap-av.jpg'

// Preload this so the fade-out lands on a fully loaded image
const FIRST_HERO =
  'https://workforce-reimagined.lovable.app/__l5e/assets-v1/a48aef79-42ab-4e3b-8bce-8222778dcedf/hero-boardroom-dvled.jpg'

const FADE_MS = 1000

export function HeroIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    // Begin loading the first hero image immediately so it's ready when we need it
    let imgReady = false
    const preload = new window.Image()
    preload.onload = () => { imgReady = true }
    preload.onerror = () => { imgReady = true } // don't block on network failure
    preload.src = FIRST_HERO

    const t0 = window.setTimeout(() => setVisible(true), 60)

    // After minimum display time, wait for the image (up to 1.5 s extra) then fade
    const t1 = window.setTimeout(() => {
      const doLeave = () => {
        if (cancelled) return
        setLeaving(true)
        window.setTimeout(() => { if (!cancelled) onDone() }, FADE_MS + 80)
      }

      if (imgReady) {
        doLeave()
      } else {
        let waited = 0
        const poll = window.setInterval(() => {
          waited += 100
          if (imgReady || waited >= 1500) {
            window.clearInterval(poll)
            doLeave()
          }
        }, 100)
      }
    }, 2400)

    return () => {
      cancelled = true
      window.clearTimeout(t0)
      window.clearTimeout(t1)
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[60] overflow-hidden bg-[#121212]"
      style={{
        opacity: leaving ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-out`,
        pointerEvents: leaving ? 'none' : 'auto',
      }}
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
            transition: 'opacity 800ms ease-out, transform 800ms ease-out',
          }}
        >
          <h1
            className="text-4xl leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
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
