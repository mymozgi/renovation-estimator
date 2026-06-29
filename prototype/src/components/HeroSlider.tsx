'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const SLIDES = [
  { src: '/images/economy-slider.png',  label: 'Ekonomiczny', alt: 'Standard ekonomiczny' },
  { src: '/images/standard-slider.png', label: 'Optymalny',   alt: 'Standard optymalny'  },
  { src: '/images/premium-slider.png',  label: 'Premium',     alt: 'Standard premium'     },
]

const INTERVAL = 5000

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[16/8] cursor-pointer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-20 bg-white/20">
        <div
          key={current}
          className="h-full bg-white origin-left"
          style={{ animation: paused ? 'none' : `progress ${INTERVAL}ms linear forwards` }}
        />
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-5 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#191C1C] transition-all duration-300">
        {SLIDES[current].label}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(false) }}
            aria-label={`Slajd ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
