'use client';

import { useRef, useCallback } from 'react';

function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 50,
  borderRadius = 16,
}) => {
  const cardRef = useRef(null);

  const getEdgeProximity = useCallback((el, x, y) => {
    const { width, height } = el.getBoundingClientRect();
    const cx = width / 2;
    const cy = height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
    const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, []);

  const getCursorAngle = useCallback((el, x, y) => {
    const { width, height } = el.getBoundingClientRect();
    const dx = x - width / 2;
    const dy = y - height / 2;
    if (dx === 0 && dy === 0) return 0;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    return deg < 0 ? deg + 360 : deg;
  }, []);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const proximity = getEdgeProximity(card, x, y) * 100;
    const angle = getCursorAngle(card, x, y);

    card.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);

    // Strength = 0 in the center, ramps to 1 at the edge
    const raw = Math.max(0, (proximity - edgeSensitivity) / (100 - edgeSensitivity));
    const strength = easeOutCubic(raw);
    card.style.setProperty('--glow-border-opacity', strength.toFixed(3));
  }, [getEdgeProximity, getCursorAngle, edgeSensitivity]);

  const handlePointerLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--glow-border-opacity', '0');
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card ${className}`}
      style={{ '--border-radius': `${borderRadius}px` }}
    >
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
