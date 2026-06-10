import { useEffect, useState } from 'react'
import capAv from '../assets/cap-av.jpg'
import capFiber from '../assets/cap-fiber.jpg'

const SLIDES = [
  {
    src: capAv,
    alt: 'Modern AV integration in an executive boardroom',
    gradient: 'from-[#1a1020]/60 via-transparent to-[#121212]/90',
  },
  {
    src: capFiber,
    alt: 'Precision fiber optic cabling installation',
    gradient: 'from-[#101520]/60 via-transparent to-[#121212]/90',
  },
  {
    src: null,
    alt: '',
    gradient: 'from-[#101520]/60 via-transparent to-[#121212]/90',
    bgClass: 'bg-gradient-to-br from-[#0d1a2a] via-[#121212] to-[#0a0a0f]',
  },
  {
    src: null,
    alt: '',
    gradient: 'from-[#1a0a0a]/60 via-transparent to-[#121212]/90',
    bgClass: 'bg-gradient-to-br from-[#1a0810] via-[#121212] to-[#0a0a0f]',
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
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          {slide.src ? (
            <img
              src={slide.src}
              alt={i === 0 ? slide.alt : ''}
              className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ) : (
            <div className={`absolute inset-0 animate-hero-zoom ${slide.bgClass ?? ''}`} />
          )}
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[#1a1a20]/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a1a20]/50 via-transparent to-[#121212]/90" />
    </div>
  )
}
