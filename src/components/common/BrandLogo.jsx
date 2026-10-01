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
            <stop offset="0%" stopColor="#FFA800" />
            <stop offset="50%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF1E56" />
          </linearGradient>
          <linearGradient id="cvVerseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#FF1E56" />
          </linearGradient>
          <filter id="cvDropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1.5" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.7" />
          </filter>
        </defs>

        {/* Left Emblem Badge - Stylized C with Interlocking V (From Original Design) */}
        <g transform="translate(2, 3)">
          {/* Orange/Amber Stylized C Frame with rounded corners */}
          <path 
            d="M 32 3 L 13 3 C 6 3 1 8 1 15 L 1 25 C 1 32 6 37 13 37 L 32 37 L 32 29.5 L 14 29.5 C 10 29.5 8 27.5 8 23.5 L 8 16.5 C 8 12.5 10 10.5 14 10.5 L 32 10.5 Z" 
            fill="url(#cvBadgeGradient)" 
          />
          {/* Interlocking cutout depth shadow */}
          <path 
            d="M 13.5 3 L 23 37 L 32.5 3" 
            stroke="#0a0c10" 
            strokeWidth="5" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bold Pure White V Monogram */}
          <path 
            d="M 13.5 3 L 23 37 L 32.5 3" 
            stroke="#FFFFFF" 
            strokeWidth="4.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="url(#cvDropShadow)"
          />
        </g>

        {/* Brand Typography */}
        <g transform="translate(44, 0)">
          <text 
            x="0" 
            y="27" 
            fontFamily="'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif" 
            fontSize="24" 
            fontWeight="900" 
            letterSpacing="0.6"
          >
            <tspan fill="#FFFFFF">CHILL</tspan>
            <tspan fill="url(#cvVerseGradient)">VERSE</tspan>
          </text>
          
          {showSubtitle && (
            <text 
              x="1" 
              y="38.5" 
              fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" 
              fontSize="6.8" 
              fontWeight="800" 
              fill="#00e5ff" 
              letterSpacing="1.8"
            >
              ENTERTAINMENT • FANDOM PORTAL
            </text>
          )}
        </g>
      </svg>
    </div>
  );
}
