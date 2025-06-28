import React, { useEffect, useRef } from 'react'
export const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const particles: Particle[] = []
    const particleCount = 50
    let mouseX = 0
    let mouseY = 0
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      constructor() {
        this.x = Math.random() * canvas!.width
        this.y = Math.random() * canvas!.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
      }
      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > canvas!.width) this.x = 0
        else if (this.x < 0) this.x = canvas!.width
        if (this.y > canvas!.height) this.y = 0
        else if (this.y < 0) this.y = canvas!.height
        // Subtle movement towards mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          this.x += dx * 0.01
          this.y += dy * 0.01
        }
      }
      draw() {
        if (!ctx) return
        ctx.fillStyle = 'rgba(100, 100, 255, 0.2)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(100, 100, 255, ${0.1 - distance / 1000})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      requestAnimationFrame(animate)
    }
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    init()
    animate()
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 z-0"
    />
  )
}
