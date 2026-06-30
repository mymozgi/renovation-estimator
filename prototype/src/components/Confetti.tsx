'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  rotation: number; rotSpeed: number
  size: number; color: string; opacity: number
}

const COLORS = ['#1D5039', '#B9EFCF', '#4CAF7D', '#E8F5EE', '#2D7A55', '#91D9B0', '#ffffff']

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, rot: number) {
  const spikes = 5
  const inner = r * 0.45
  ctx.beginPath()
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes + rot
    const radius = i % 2 === 0 ? r : inner
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
}

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const COUNT = 120
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: -20 - Math.random() * 200,
      vx: (Math.random() - 0.5) * 2.5,
      vy: 2 + Math.random() * 3.5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.15,
      size: 6 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.85 + Math.random() * 0.15,
    }))

    let raf: number
    let start: number | null = null
    const DURATION = 4000

    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start

      ctx.clearRect(0, 0, W, H)

      let alive = false
      for (const p of particles) {
        p.y += p.vy
        p.x += p.vx + Math.sin(p.y * 0.03) * 0.5
        p.rotation += p.rotSpeed
        if (elapsed > DURATION * 0.6) p.opacity = Math.max(0, p.opacity - 0.008)

        if (p.y < H + 20 && p.opacity > 0) {
          alive = true
          ctx.globalAlpha = p.opacity
          ctx.fillStyle = p.color
          drawStar(ctx, p.x, p.y, p.size, p.rotation)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      if (alive && elapsed < DURATION + 2000) {
        raf = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, W, H)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
    />
  )
}
