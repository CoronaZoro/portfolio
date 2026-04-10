'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: pos.y,
        left: pos.x,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <line x1="2" y1="2" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="2" x2="2" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  )
}
