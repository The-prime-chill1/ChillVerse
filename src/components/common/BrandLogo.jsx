import React from 'react';

export default function BrandLogo({ height = 36, showSubtitle = false, className = '' }) {
  return (
    <div 
      className={`chillverse-brand-logo ${className}`} 
      style={{ 
        height: `${height}px`, 
        display: 'inline-flex', 
        alignItems: 'center',
        background: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0
      }}
      aria-label="CHILLVERSE"
    >
      <svg 
        viewBox={showSubtitle ? "0 0 220 48" : "0 0 205 40"} 
        height={height} 
        width="auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          display: 'block', 
          height: '100%', 
          width: 'auto',
          background: 'transparent'
        }}
      >
        <defs>
          <linearGradient id="cvBadgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA100" />
            <stop offset="45%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF1E56" />
          </linearGradient>
          <linearGradient id="cvVerseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6000" />
            <stop offset="100%" stopColor="#FF1E56" />
          </linearGradient>
        </defs>

        {/* Left Emblem Badge - Pure Vector, Transparent Base */}
        <g>
          <rect x="0" y="2" width="36" height="36" rx="8" fill="url(#cvBadgeGradient)" />
          <rect x="0.5" y="2.5" width="35" height="35" rx="7.5" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />

          {/* C Shadow Curve */}
          <path 
            d="M 28 12 C 25.5 10.5 22.5 9.5 19 9.5 C 13.5 9.5 9.5 14 9.5 20 C 9.5 26 13.5 30.5 19 30.5 C 22.5 30.5 25.5 29.5 28 28" 
            stroke="rgba(0, 0, 0, 0.28)" 
            strokeWidth="4" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Bold Pure White V Monogram */}
          <path 
            d="M 14 13.5 L 21 28 L 28 13.5" 
            stroke="#FFFFFF" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
        </g>

        {/* Brand Typography */}
        <g transform="translate(46, 0)">
          <text 
            x="0" 
            y="26.5" 
            fontFamily="'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
            fontSize="23" 
            fontWeight="900" 
            letterSpacing="0.8"
          >
            <tspan fill="#FFFFFF">CHILL</tspan>
            <tspan fill="url(#cvVerseGradient)">VERSE</tspan>
          </text>
          
          {showSubtitle && (
            <text 
              x="1" 
              y="38" 
              fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" 
              fontSize="6.5" 
              fontWeight="700" 
              fill="#94A3B8" 
              letterSpacing="2"
            >
              ENTERTAINMENT • FANDOM PORTAL
            </text>
          )}
        </g>
      </svg>
    </div>
  );
}
