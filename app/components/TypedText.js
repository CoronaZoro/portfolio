'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const FONTS = [
  'Georgia, serif',
  'Arial, sans-serif',
  '"Courier New", monospace',
  'Impact, fantasy',
  '"Times New Roman", serif',
  '"Comic Sans MS", cursive',
  'Verdana, sans-serif',
  '"Palatino Linotype", serif',
  '"Trebuchet MS", sans-serif',
  '"Lucida Console", monospace',
  '"Brush Script MT", cursive',
  'Garamond, serif',
  '"Arial Black", sans-serif',
  '"Gill Sans", sans-serif',
  'Didot, serif',
]

const ORIGINAL_FONT = 'var(--font-courgette)'

export default function TypedText({ text, delay = 0, speed = 130 }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [currentFont, setCurrentFont] = useState(ORIGINAL_FONT)
  const intervalRef = useRef(null)

  useEffect(() => {
    let charIndex = 0
    let timeout

    const start = setTimeout(() => {
      const type = () => {
        charIndex++
        setDisplayed(text.slice(0, charIndex))
        if (charIndex < text.length) {
          timeout = setTimeout(type, speed)
        } else {
          setDone(true)
        }
      }
      type()
    }, delay)

    return () => {
      clearTimeout(start)
      clearTimeout(timeout)
    }
  }, [text, delay, speed])

  const handleMouseEnter = useCallback(() => {
    if (!done) return
    let i = 0
    intervalRef.current = setInterval(() => {
      i = (i + 1) % FONTS.length
      setCurrentFont(FONTS[i])
    }, 80)
  }, [done])

  const handleMouseLeave = useCallback(() => {
    clearInterval(intervalRef.current)
    setCurrentFont(ORIGINAL_FONT)
  }, [])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <em
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        color: '#e63323',
        fontFamily: currentFont,
        fontStyle: 'italic',
        cursor: done ? 'default' : undefined,
        transition: 'none',
      }}
    >
      {displayed}
      {!done && <span className="typing-cursor" />}
      {done && <span className="typing-cursor-done" />}
    </em>
  )
}
