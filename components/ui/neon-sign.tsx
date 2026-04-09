'use client';

export default function NeonSign() {
  return (
    <div className="relative flex flex-col items-center">
      {/* 24/7 neon text */}
      <span
        className="neon-text-gold neon-flicker text-6xl sm:text-7xl lg:text-8xl select-none"
        style={{ fontFamily: 'var(--font-tilt-neon)' }}
      >
        24/7
      </span>

      {/* "ALWAYS OPEN" underneath */}
      <span
        className="neon-text-gold neon-flicker text-[10px] sm:text-xs uppercase tracking-[0.35em] select-none mt-1"
        style={{ fontFamily: 'var(--font-tilt-neon)', animationDelay: '0.5s' }}
      >
        Always Open
      </span>
    </div>
  );
}
