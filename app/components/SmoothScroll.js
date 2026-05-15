'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useAnimationFrame } from 'framer-motion'

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    lenisRef.current = new Lenis({
      lerp:        0.08,
      duration:    1.2,
      smoothWheel: true,
    })

    // Expose instance globally so any page can pause/resume via
    // window.__lenis?.stop() / window.__lenis?.start()
    window.__lenis = lenisRef.current

    return () => {
      lenisRef.current?.destroy()
      lenisRef.current = null
      window.__lenis = null
    }
  }, [])

  // Tick Lenis on every Framer Motion animation frame so
  // scroll-triggered animations (whileInView, useScroll) stay in sync
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return children
}
