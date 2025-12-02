import React from 'react';

export const WdslLogo = ({ className = "w-24 h-24" }) => (
  <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skyGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#bfdbfe" />
        <stop offset="100%" stopColor="#ffffff" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    
    {/* Shield Body with Blue Border */}
    <path d="M 10 10 Q 100 40 190 10 L 190 80 Q 190 190 100 235 Q 10 190 10 80 Z" fill="url(#skyGradient)" stroke="#1d4ed8" strokeWidth="5" />
    
    {/* Yellow Header Section */}
    <path d="M 12 12 Q 100 42 188 12 L 188 70 Q 100 90 12 70 Z" fill="#fef08a" opacity="0.9" />
    
    {/* Text: W.D. S.L. */}
    <text x="50" y="55" fontSize="24" fontWeight="900" fill="#000" fontFamily="serif" style={{textShadow: '1px 1px 0px white'}}>W.D.</text>
    <text x="150" y="55" fontSize="24" fontWeight="900" fill="#000" fontFamily="serif" textAnchor="end" style={{textShadow: '1px 1px 0px white'}}>S.L.</text>

    {/* Sun */}
    <circle cx="40" cy="90" r="12" fill="#ef4444" />
    <circle cx="40" cy="90" r="14" fill="none" stroke="#facc15" strokeWidth="2" opacity="0.5" />

    {/* Landscape: Mountains */}
    <path d="M 20 170 L 50 110 L 90 170 Z" fill="#15803d" opacity="0.8" />
    <path d="M 130 170 L 160 120 L 180 170 Z" fill="#ca8a04" opacity="0.6" />
    
    {/* Round Tower (Central Feature) */}
    <rect x="85" y="90" width="30" height="90" fill="#64748b" />
    <path d="M 85 90 L 100 70 L 115 90 Z" fill="#475569" /> {/* Roof */}
    <rect x="95" y="100" width="10" height="15" fill="#1e293b" rx="5" /> {/* Window 1 */}
    <rect x="95" y="120" width="10" height="15" fill="#1e293b" rx="5" /> {/* Window 2 */}
    <path d="M 95 150 A 10 10 0 0 1 105 150 V 180 H 95 Z" fill="#1e293b" /> {/* Door */}

    {/* Trees */}
    <path d="M 40 180 L 50 140 L 60 180 Z" fill="#166534" />
    <path d="M 30 180 L 40 150 L 50 180 Z" fill="#166534" />
    <path d="M 140 180 L 150 140 L 160 180 Z" fill="#166534" />
    <path d="M 150 180 L 160 150 L 170 180 Z" fill="#166534" />

    {/* River */}
    <path d="M 70 110 Q 60 140 80 180" stroke="#60a5fa" strokeWidth="4" fill="none" />

    {/* Bottom Scroll/Banner */}
    <path d="M 5 180 Q 100 200 195 180 L 195 210 Q 100 230 5 210 Z" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" filter="url(#shadow)" />
    <path id="curve" d="M 20 195 Q 100 215 180 195" fill="transparent" />
    <text fontSize="9" fontWeight="bold" fill="#1e3a8a" textAnchor="middle" fontFamily="serif">
       <textPath href="#curve" startOffset="50%">Mol an Óige agus Tiocfaidh sí</textPath>
    </text>

    {/* Football at bottom tip */}
    <circle cx="100" cy="220" r="14" fill="white" stroke="black" strokeWidth="1" />
    <g transform="translate(100, 220) scale(0.28)">
        <path d="M 0 0 L 10 -18 L 28 -8 L 28 15 L 10 25 L -10 25 L -28 15 L -28 -8 L -10 -18 Z" fill="#111" />
        <path d="M 0 0 L 0 -15 M 0 0 L 13 8 M 0 0 L -13 8" stroke="white" strokeWidth="4" />
    </g>
  </svg>
);