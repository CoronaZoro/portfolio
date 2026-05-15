'use client'

import { useEffect, useRef, useCallback } from 'react'

// ── Game constants ────────────────────────────────────────────────────────────

const W          = 600
const H          = 120
const GROUND_Y   = 88          // y of ground line
const DINO_X     = 60
const DINO_W     = 22
const DINO_H     = 30
const DINO_Y     = GROUND_Y - DINO_H   // resting y (top of dino)
const GRAVITY    = 0.6
const JUMP_VEL   = -11
const BASE_SPEED = 4
const ACCEL      = 0.0012       // speed increase per frame

// ── Draw helpers ──────────────────────────────────────────────────────────────

function drawDino(ctx, y, frame, isDead) {
  ctx.fillStyle = isDead ? 'rgba(255,255,255,0.35)' : '#ffffff'
  const x = DINO_X

  // Body
  ctx.fillRect(x, y, DINO_W, DINO_H)

  // Eye
  if (!isDead) {
    ctx.fillStyle = '#0e0c0a'
    ctx.fillRect(x + 15, y + 5, 4, 4)
  } else {
    // X eyes
    ctx.fillStyle = '#e63323'
    ctx.fillRect(x + 13, y + 4, 3, 2)
    ctx.fillRect(x + 16, y + 6, 3, 2)
    ctx.fillRect(x + 13, y + 6, 3, 2)
    ctx.fillRect(x + 16, y + 4, 3, 2)
  }

  // Legs (alternating walk frames)
  ctx.fillStyle = isDead ? 'rgba(255,255,255,0.35)' : '#ffffff'
  if (y < DINO_Y - 2) {
    // Airborne — legs tucked
    ctx.fillRect(x + 4, y + DINO_H, 6, 6)
    ctx.fillRect(x + 13, y + DINO_H, 6, 6)
  } else {
    const leg1Up = frame % 12 < 6
    ctx.fillRect(x + 4,  y + DINO_H, 6, leg1Up ? 6 : 10)
    ctx.fillRect(x + 13, y + DINO_H, 6, leg1Up ? 10 : 6)
  }
}

function drawCactus(ctx, x, type) {
  ctx.fillStyle = '#ffffff'

  if (type === 0) {
    // Single tall cactus
    ctx.fillRect(x + 6, GROUND_Y - 32, 8, 32)
    ctx.fillRect(x,     GROUND_Y - 22, 6, 6)
    ctx.fillRect(x + 14, GROUND_Y - 18, 6, 6)
  } else if (type === 1) {
    // Double cactus
    ctx.fillRect(x + 4,  GROUND_Y - 28, 7, 28)
    ctx.fillRect(x + 17, GROUND_Y - 34, 7, 34)
    ctx.fillRect(x,      GROUND_Y - 18, 4, 5)
    ctx.fillRect(x + 11, GROUND_Y - 14, 6, 5)
    ctx.fillRect(x + 24, GROUND_Y - 22, 5, 5)
  } else {
    // Short fat cactus
    ctx.fillRect(x + 4, GROUND_Y - 22, 12, 22)
    ctx.fillRect(x,     GROUND_Y - 14, 4, 5)
    ctx.fillRect(x + 16, GROUND_Y - 16, 4, 5)
  }
}

function cactusWidth(type) {
  return type === 1 ? 28 : 20
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function DinoGame({ onClose }) {
  const canvasRef  = useRef(null)
  const stateRef   = useRef(null)
  const rafRef     = useRef(null)

  // ── Init / reset game state ───────────────────────────────────────────────

  const initState = useCallback(() => ({
    dinoY:       DINO_Y,
    dinoVY:      0,
    onGround:    true,
    score:       0,
    speed:       BASE_SPEED,
    frame:       0,
    dead:        false,
    started:     false,      // first press starts the game
    cacti:       [],
    nextSpawn:   90,         // frames until next cactus
    clouds:      [
      { x: 200, y: 14, w: 40 },
      { x: 450, y: 20, w: 30 },
    ],
  }), [])

  // ── Jump handler ──────────────────────────────────────────────────────────

  const jump = useCallback(() => {
    const s = stateRef.current
    if (!s) return
    if (s.dead) {
      // Restart
      stateRef.current = initState()
      stateRef.current.started = true
      stateRef.current.dinoVY = JUMP_VEL
      stateRef.current.onGround = false
      return
    }
    if (!s.started) {
      s.started = true
    }
    if (s.onGround) {
      s.dinoVY   = JUMP_VEL
      s.onGround = false
    }
  }, [initState])

  // ── Key / click handlers ──────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
      if (e.code === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jump, onClose])

  // ── Game loop ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    stateRef.current = initState()

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      const s = stateRef.current
      const { width: cw, height: ch } = canvas

      // ── Clear ──
      ctx.clearRect(0, 0, cw, ch)

      // ── Background ──
      ctx.fillStyle = '#0e0c0a'
      ctx.fillRect(0, 0, cw, ch)

      // ── Ground line ──
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, GROUND_Y)
      ctx.lineTo(cw, GROUND_Y)
      ctx.stroke()

      if (!s.started) {
        // ── Idle state ──
        drawDino(ctx, s.dinoY, 0, false)

        // Prompt text
        ctx.fillStyle = 'rgba(255,255,255,0.25)'
        ctx.font = '11px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('SPACE or click to start', cw / 2, GROUND_Y - 42)
        ctx.textAlign = 'left'
        return
      }

      if (!s.dead) {
        s.frame++
        s.speed += ACCEL
        s.score  = Math.floor(s.frame * 0.1)
      }

      // ── Physics ──
      if (!s.dead) {
        s.dinoVY += GRAVITY
        s.dinoY  += s.dinoVY

        if (s.dinoY >= DINO_Y) {
          s.dinoY   = DINO_Y
          s.dinoVY  = 0
          s.onGround = true
        }
      }

      // ── Clouds (decorative) ──
      s.clouds.forEach(c => {
        if (!s.dead) c.x -= s.speed * 0.3
        if (c.x + c.w < 0) { c.x = cw + 20; c.y = 10 + Math.random() * 20 }
        ctx.fillStyle = 'rgba(255,255,255,0.07)'
        ctx.beginPath()
        ctx.ellipse(c.x + c.w / 2, c.y, c.w / 2, 8, 0, 0, Math.PI * 2)
        ctx.fill()
      })

      // ── Spawn cacti ──
      if (!s.dead) {
        s.nextSpawn--
        if (s.nextSpawn <= 0) {
          const type = Math.floor(Math.random() * 3)
          s.cacti.push({ x: cw + 10, type })
          // Gap decreases as speed increases (min 55 frames)
          s.nextSpawn = Math.max(55, Math.floor(90 - (s.speed - BASE_SPEED) * 8) + Math.random() * 30)
        }
      }

      // ── Move & draw cacti ──
      s.cacti = s.cacti.filter(c => c.x + cactusWidth(c.type) > -10)
      s.cacti.forEach(c => {
        if (!s.dead) c.x -= s.speed
        drawCactus(ctx, c.x, c.type)

        // ── Collision (tight hitbox) ──
        if (!s.dead) {
          const cw2 = cactusWidth(c.type)
          const dinoL  = DINO_X + 4,  dinoR  = DINO_X + DINO_W - 4
          const dinoT  = s.dinoY + 4, dinoB  = s.dinoY + DINO_H
          const cactL  = c.x + 3,     cactR  = c.x + cw2 - 3
          const cactT  = GROUND_Y - (c.type === 1 ? 34 : c.type === 0 ? 32 : 22)
          if (dinoR > cactL && dinoL < cactR && dinoB > cactT) {
            s.dead = true
          }
        }
      })

      // ── Dino ──
      drawDino(ctx, s.dinoY, s.frame, s.dead)

      // ── Score ──
      ctx.fillStyle = 'rgba(255,255,255,0.45)'
      ctx.font = '600 12px system-ui, sans-serif'
      ctx.textAlign = 'right'
      ctx.fillText(String(s.score).padStart(5, '0'), cw - 12, 18)
      ctx.textAlign = 'left'

      // ── Game over ──
      if (s.dead) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)'
        ctx.font = '600 13px system-ui, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('GAME OVER — space or click to retry', cw / 2, GROUND_Y - 42)
        ctx.textAlign = 'left'
      }
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [initState])

  return (
    <div
      style={{
        position: 'relative',
        width: W,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close game"
        style={{
          position: 'absolute',
          top: -12,
          right: -12,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.5)',
          fontSize: 13,
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          fontFamily: 'system-ui, sans-serif',
          padding: 0,
          transition: 'background 0.15s, color 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
          e.currentTarget.style.color = '#fff'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
        }}
      >
        ✕
      </button>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        onClick={jump}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          cursor: 'pointer',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
    </div>
  )
}
