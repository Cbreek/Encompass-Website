import { useEffect, useState } from 'react'

const BASE = 'https://workforce-reimagined.lovable.app/__l5e/assets-v1'

const SLIDES = [
  {
    url: `${BASE}/a48aef79-42ab-4e3b-8bce-8222778dcedf/hero-boardroom-dvled.jpg`,
    alt: 'Encompass-installed curved DVLED video wall in an executive boardroom',
  },
  {
    url: `${BASE}/181c1ec9-24e5-48d6-97e0-79cb36bdff65/hero-speaker-rig.jpg`,
    alt: 'Suspended line-array speaker rig in a circular truss',
  },
  {
    url: `${BASE}/fec5a66c-6e2e-468c-9b65-644f57a3017d/hero-led-install.jpg`,
    alt: 'Large-format LED video wall installation in progress',
  },
  {
    url: `${BASE}/4d781ae9-6af2-463a-b594-1907165beda9/hero-datacenter-sharp.jpg`,
    alt: 'Data center hallway lined with active server racks',
    filter: 'brightness(1.55) contrast(1.2) saturate(0.85)',
  },
]

const DURATION = 6500

export function HeroRotator() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, DURATION)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((slide, i) => (
        <img
          key={slide.url}
          src={slide.url}
          alt={i === 0 ? slide.alt : ''}
          className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
          style={{
            opacity: i === index ? 1 : 0,
            transition: 'opacity 1400ms ease-in-out',
            filter: slide.filter ?? undefined,
          }}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[#1a1a20]/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a1a20]/50 via-transparent to-[#121212]/90" />
    </div>
  )
}
