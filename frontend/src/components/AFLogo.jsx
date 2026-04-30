import React from 'react';

// Animated AF monogram inside a sacred-geometry vesica
export default function AFLogo({ size = 44, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" width={size} height={size} className="absolute inset-0">
          {/* outer rotating circles */}
          <g className="animate-spin-slow" style={{ transformOrigin: '50% 50%' }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#d4a45a" strokeOpacity="0.35" strokeWidth="0.6" strokeDasharray="2 4" />
          </g>
          <g className="animate-spin-rev" style={{ transformOrigin: '50% 50%' }}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#d4a45a" strokeOpacity="0.55" strokeWidth="0.5" />
            <circle cx="50" cy="22" r="1.6" fill="#d4a45a" />
          </g>
          {/* inner overlapping circles - vesica */}
          <circle cx="40" cy="50" r="22" fill="none" stroke="#d4a45a" strokeOpacity="0.7" strokeWidth="0.7" />
          <circle cx="60" cy="50" r="22" fill="none" stroke="#d4a45a" strokeOpacity="0.7" strokeWidth="0.7" />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center serif text-[#f1e9d8]"
          style={{ fontSize: size * 0.42, fontWeight: 500, letterSpacing: '-0.04em' }}
        >
          <span style={{ color: '#d4a45a' }}>A</span>
          <span style={{ marginLeft: -size * 0.06 }}>F</span>
        </span>
      </span>
    </span>
  );
}
