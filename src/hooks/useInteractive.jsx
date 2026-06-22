import React, { useRef, useEffect, useState } from 'react';

// ─── Magnetic Button ───────────────────────────────────────────────────────────
export function MagneticButton({ as: Tag = 'button', children, strength = 0.3, className, style, onClick, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.transition = 'transform 0.15s ease';
    };

    const handleLeave = () => {
      el.style.transform = 'translate(0,0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return (
    <Tag ref={ref} className={className} style={style} onClick={onClick} {...props}>
      {children}
    </Tag>
  );
}

// ─── Tilt Card ─────────────────────────────────────────────────────────────────
export function TiltCard({ as: Tag = 'div', children, maxTilt = 8, glow = true, className, style, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -maxTilt;
      const rotY = ((x - cx) / cx) * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      el.style.transition = 'transform 0.1s ease';

      if (glow) {
        const glowEl = el.querySelector('.tilt-glow');
        if (glowEl) {
          glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,42,42,0.12) 0%, transparent 70%)`;
        }
      }
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      if (glow) {
        const glowEl = el.querySelector('.tilt-glow');
        if (glowEl) glowEl.style.background = 'transparent';
      }
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [maxTilt, glow]);

  return (
    <Tag ref={ref} className={`relative ${className || ''}`} style={style} {...props}>
      {glow && <div className="tilt-glow absolute inset-0 pointer-events-none rounded-inherit z-0 transition-all duration-200" />}
      {children}
    </Tag>
  );
}

// ─── Cursor Aura ───────────────────────────────────────────────────────────────
export function CursorAura({ size = 400, color = 'rgba(255,42,42,0.07)' }) {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const fn = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5]"
      style={{
        background: `radial-gradient(circle ${size}px at ${pos.x}px ${pos.y}px, ${color}, transparent)`,
        transition: 'background 0.1s ease',
      }}
    />
  );
}

// ─── Signal Dot (pulsing glow dot for box corners) ────────────────────────────
export function SignalDot({ className = '' }) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff2a2a] opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff2a2a]" />
      </span>
    </span>
  );
}
