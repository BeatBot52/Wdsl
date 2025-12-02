
import React from 'react';
import { Team } from '../types';

interface TeamLogoProps {
  team: Team;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showShadow?: boolean;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ 
  team, 
  size = 'md', 
  className = '',
  showShadow = true
}) => {
  // Size mapping
  const sizes = {
    sm: "w-8 h-8 text-[8px]",
    md: "w-12 h-12 text-[10px]",
    lg: "w-16 h-16 text-xs",
    xl: "w-24 h-24 text-base",
    '2xl': "w-32 h-32 text-lg",
  };

  const commonProps = {
    viewBox: "0 0 100 100",
    className: `w-full h-full ${showShadow ? 'filter drop-shadow-md' : ''}`,
    xmlns: "http://www.w3.org/2000/svg"
  };

  // ----------------------------------------------------------------------
  // 1. ARKLOW TOWN (Anchor)
  // ----------------------------------------------------------------------
  if (team.name === 'Arklow Town') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
          <path d="M10 22 Q 50 8 90 22 L 90 32 Q 50 18 10 32 Z" fill="#dc2626" />
          <path d="M10 22 L 5 28 L 10 32" fill="#991b1b" />
          <path d="M90 22 L 95 28 L 90 32" fill="#991b1b" />
          <path id="curveTop" d="M12 28 Q 50 14 88 28" fill="transparent" />
          <text fontSize="7" fontWeight="900" fill="white" textAnchor="middle">
             <textPath href="#curveTop" startOffset="50%">ARKLOW TOWN F.C</textPath>
          </text>
          <path d="M 20 35 H 80 V 55 C 80 80, 50 95, 50 95 C 50 95, 20 80, 20 55 Z" fill="#111" stroke="#111" strokeWidth="1" />
          <rect x="33" y="35" width="6" height="22" fill="white" />
          <rect x="47" y="35" width="6" height="22" fill="white" />
          <rect x="61" y="35" width="6" height="22" fill="white" />
          <path d="M 22 56 H 78 C 78 78, 50 92, 50 92 C 50 92, 22 78, 22 56 Z" fill="white" />
          <g transform="translate(50, 72) scale(0.35)" fill="#64748b">
             <path d="M -20 -10 Q 0 15 20 -10 L 25 -5 Q 0 30 -25 -5 Z" />
             <rect x="-3" y="-35" width="6" height="40" />
             <circle cx="0" cy="-40" r="6" stroke="#64748b" strokeWidth="3" fill="none"/>
             <rect x="-15" y="-25" width="30" height="4" rx="2" />
          </g>
          <circle cx="50" cy="45" r="9" fill="white" stroke="#111" strokeWidth="1" />
          <g transform="translate(50, 45) scale(0.18)">
             <path d="M 0 0 L 10 -18 L 28 -8 L 28 15 L 10 25 L -10 25 L -28 15 L -28 -8 L -10 -18 Z" fill="#111" /> 
             <path d="M 0 0 L 0 -15 M 0 0 L 13 8 M 0 0 L -13 8" stroke="white" strokeWidth="5" />
          </g>
          <path d="M15 88 Q 50 100 85 88 L 85 96 Q 50 108 15 96 Z" fill="#dc2626" />
          <path id="curveBottom" d="M18 92 Q 50 104 82 92" fill="transparent" />
          <text fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">
             <textPath href="#curveBottom" startOffset="50%">EST. 1948</textPath>
          </text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 2. ARKLOW CELTIC (Bridge)
  // ----------------------------------------------------------------------
  if (team.name === 'Arklow Celtic') {
    return (
       <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg viewBox="0 0 100 120" className={`w-full h-full ${showShadow ? 'filter drop-shadow-md' : ''}`} xmlns="http://www.w3.org/2000/svg">
          <defs><clipPath id="celticShield"><path d="M 15 15 H 85 L 85 50 C 85 80 50 95 50 95 C 50 95 15 80 15 50 Z" /></clipPath></defs>
           <path d="M 15 15 H 85 L 85 50 C 85 80 50 95 50 95 C 50 95 15 80 15 50 Z" fill="black" stroke="black" strokeWidth="2" />
          <rect x="0" y="0" width="100" height="100" fill="#60a5fa" clipPath="url(#celticShield)" />
          <rect x="0" y="0" width="100" height="32" fill="#16a34a" clipPath="url(#celticShield)" />
          <path d="M 15 32 H 85" stroke="black" strokeWidth="1" />
          <text x="50" y="27" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="serif">Arklow Celtic</text>
           <g clipPath="url(#celticShield)"><circle cx="30" cy="55" r="10" fill="#15803d" /><circle cx="45" cy="52" r="12" fill="#15803d" /><circle cx="60" cy="55" r="10" fill="#15803d" /><circle cx="75" cy="58" r="8" fill="#15803d" /></g>
          <g clipPath="url(#celticShield)">
            <path d="M 10 60 H 90 V 75 H 10 Z" fill="#ca8a04" />
            <path d="M 15 75 Q 22 65 29 75 V 90 H 15 Z" fill="#92400e" />
            <path d="M 33 75 Q 40 65 47 75 V 90 H 33 Z" fill="#92400e" />
            <path d="M 51 75 Q 58 65 65 75 V 90 H 51 Z" fill="#92400e" />
            <path d="M 69 75 Q 76 65 83 75 V 90 H 69 Z" fill="#92400e" />
            <line x1="10" y1="58" x2="90" y2="58" stroke="white" strokeWidth="2" />
            <path d="M15 58 L15 62 M25 58 L25 62 M35 58 L35 62 M45 58 L45 62 M55 58 L55 62 M65 58 L65 62 M75 58 L75 62" stroke="black" strokeWidth="0.5" />
          </g>
          <text x="50" y="88" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle" clipPath="url(#celticShield)">1979</text>
           <circle cx="50" cy="45" r="8" fill="white" stroke="black" strokeWidth="0.5" />
           <g transform="translate(50, 45) scale(0.15)"><path d="M 0 0 L 10 -18 L 28 -8 L 28 15 L 10 25 L -10 25 L -28 15 L -28 -8 L -10 -18 Z" fill="#111" /></g>
          <path d="M 10 98 Q 50 110 90 98 L 90 110 Q 50 120 10 110 Z" fill="white" stroke="black" strokeWidth="1" />
          <path d="M 5 95 L 10 98 L 10 110 L 5 105 Z" fill="white" stroke="black" strokeWidth="1" />
          <path d="M 95 95 L 90 98 L 90 110 L 95 105 Z" fill="white" stroke="black" strokeWidth="1" />
          <path id="curveBottom2" d="M 15 106 Q 50 116 85 106" fill="transparent" />
          <text fontSize="6" fontWeight="bold" fill="#16a34a" textAnchor="middle"><textPath href="#curveBottom2" startOffset="50%">FOOTBALL CLUB</textPath></text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 3. WICKLOW ROVERS (Green/White Shield)
  // ----------------------------------------------------------------------
  if (team.name === 'Wicklow Rovers') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
          <path d="M15 15 H 85 L 85 60 C 85 85 50 98 50 98 C 50 98 15 85 15 60 Z" fill="#16a34a" stroke="white" strokeWidth="2" />
          <path d="M15 40 L 85 40" stroke="white" strokeWidth="8" />
          <text x="50" y="30" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">WICKLOW</text>
          <text x="50" y="55" fontSize="10" fontWeight="bold" fill="#16a34a" textAnchor="middle">ROVERS</text>
          <circle cx="50" cy="75" r="10" fill="white" />
          <path d="M50 75 L50 65 M50 75 L50 85 M50 75 L60 75 M50 75 L40 75" stroke="#16a34a" strokeWidth="2" />
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 4. ASHFORD ROVERS (Blue/White Diagonal)
  // ----------------------------------------------------------------------
  if (team.name === 'Ashford Rovers') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
          <defs><clipPath id="ashfordShield"><path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" /></clipPath></defs>
          <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#2563eb" stroke="#1e40af" strokeWidth="2" />
          <rect x="-10" y="0" width="120" height="20" fill="white" transform="rotate(45, 50, 50)" clipPath="url(#ashfordShield)" />
          <text x="50" y="45" fontSize="14" fontWeight="black" fill="white" textAnchor="middle" style={{textShadow: '1px 1px 2px black'}}>ARFC</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 5. NEWTOWN JUNIORS (Red/Black Stripes)
  // ----------------------------------------------------------------------
  if (team.name === 'Newtown Juniors') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <defs><clipPath id="newtownShield"><path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" /></clipPath></defs>
           <path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" fill="black" stroke="white" strokeWidth="1" />
           <rect x="25" y="0" width="10" height="100" fill="#dc2626" clipPath="url(#newtownShield)" />
           <rect x="45" y="0" width="10" height="100" fill="#dc2626" clipPath="url(#newtownShield)" />
           <rect x="65" y="0" width="10" height="100" fill="#dc2626" clipPath="url(#newtownShield)" />
           <circle cx="50" cy="50" r="12" fill="white" stroke="black" strokeWidth="2" />
           <text x="50" y="54" fontSize="10" fontWeight="bold" fill="black" textAnchor="middle">NJ</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 6. ST PATRICKS (Green with Shamrock)
  // ----------------------------------------------------------------------
  if (team.name === 'St. Patricks') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 50 C 80 80 50 95 50 95 C 50 95 20 80 20 50 Z" fill="#15803d" stroke="#facc15" strokeWidth="2" />
           {/* Shamrock */}
           <g transform="translate(50, 50) scale(1.2)" fill="#facc15">
             <circle cx="-6" cy="-6" r="6" />
             <circle cx="6" cy="-6" r="6" />
             <circle cx="0" cy="4" r="6" />
             <path d="M -2 4 L 2 4 L 1 15 L -1 15 Z" />
           </g>
           <text x="50" y="30" fontSize="8" fontWeight="bold" fill="#facc15" textAnchor="middle">AVOCA</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 7. GLENCORMAC UTD (Green/Yellow Quarters)
  // ----------------------------------------------------------------------
  if (team.name === 'Glencormac United') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <defs><clipPath id="glenShield"><path d="M 20 20 Q 50 10 80 20 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" /></clipPath></defs>
           <path d="M 20 20 Q 50 10 80 20 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#16a34a" stroke="#facc15" strokeWidth="2" />
           <rect x="50" y="20" width="30" height="38" fill="#facc15" clipPath="url(#glenShield)" />
           <rect x="20" y="58" width="30" height="37" fill="#facc15" clipPath="url(#glenShield)" />
           <text x="50" y="40" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle" stroke="black" strokeWidth="0.5">GLEN</text>
           <text x="50" y="80" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle" stroke="black" strokeWidth="0.5">UTD</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 8. GREYSTONES UNITED (Green/White Hoops/Castle)
  // ----------------------------------------------------------------------
  if (team.name === 'Greystones United') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#16a34a" stroke="white" strokeWidth="2" />
           <rect x="20" y="35" width="60" height="10" fill="white" />
           <rect x="20" y="55" width="60" height="10" fill="white" />
           {/* Castle turret suggestion */}
           <path d="M 40 30 L 40 25 L 45 25 L 45 30 L 50 30 L 50 25 L 55 25 L 55 30 L 60 30 L 60 25 L 65 25 L 65 30" stroke="white" strokeWidth="2" fill="none" />
           <text x="50" y="85" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">GUFC</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 9. COOLBOY RANGERS (Blue/Yellow Halves)
  // ----------------------------------------------------------------------
  if (team.name === 'Coolboy Rangers') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
          <defs><clipPath id="coolShield"><path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" /></clipPath></defs>
          <path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" fill="#2563eb" stroke="black" strokeWidth="1" />
          <rect x="50" y="0" width="50" height="100" fill="#facc15" clipPath="url(#coolShield)" />
          <circle cx="50" cy="50" r="15" fill="white" stroke="black" strokeWidth="2" />
          <text x="50" y="54" fontSize="10" fontWeight="bold" fill="black" textAnchor="middle">CR</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 10. RATHNEW AFC (Green/Gold Stripes)
  // ----------------------------------------------------------------------
  if (team.name === 'Rathnew AFC') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <defs><clipPath id="rathShield"><path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" /></clipPath></defs>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#16a34a" stroke="#fbbf24" strokeWidth="2" />
           <rect x="35" y="20" width="10" height="80" fill="#fbbf24" clipPath="url(#rathShield)" />
           <rect x="55" y="20" width="10" height="80" fill="#fbbf24" clipPath="url(#rathShield)" />
           <text x="50" y="40" fontSize="12" fontWeight="black" fill="white" textAnchor="middle" stroke="black" strokeWidth="0.5">RATHNEW</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 11. WOLFE TONE (Blue/White Wolf/W)
  // ----------------------------------------------------------------------
  if (team.name === 'Wolfe Tone') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 L 80 20 L 80 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#3b82f6" stroke="white" strokeWidth="2" />
           <path d="M 30 40 L 40 70 L 50 50 L 60 70 L 70 40" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
           <text x="50" y="30" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">BRAY</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 12. AVONMORE (Blue River)
  // ----------------------------------------------------------------------
  if (team.name === 'Avonmore') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
           <path d="M 20 40 Q 35 30 50 40 T 80 40" stroke="#60a5fa" strokeWidth="4" fill="none" />
           <path d="M 20 55 Q 35 45 50 55 T 80 55" stroke="#60a5fa" strokeWidth="4" fill="none" />
           <text x="50" y="80" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">AFC</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 13. ENNISKERRY YC (Mountain)
  // ----------------------------------------------------------------------
  if (team.name === 'Enniskerry YC') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#3b82f6" stroke="white" strokeWidth="2" />
           {/* Sugarloaf shape */}
           <path d="M 20 70 L 40 40 L 50 30 L 60 40 L 80 70" fill="#94a3b8" stroke="white" strokeWidth="1" />
           <text x="50" y="85" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">EYC</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 14. CARNEW (Red Castle)
  // ----------------------------------------------------------------------
  if (team.name === 'Carnew') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" fill="#dc2626" stroke="black" strokeWidth="1" />
           {/* Simple Castle */}
           <path d="M 35 40 H 65 V 70 H 35 Z M 35 40 V 30 H 40 V 35 H 45 V 30 H 50 V 35 H 55 V 30 H 60 V 35 H 65 V 30 V 40" fill="black" />
           <text x="50" y="85" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">CARNEW</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 15. AUGHRIM RANGERS (Blue/White A)
  // ----------------------------------------------------------------------
  if (team.name === 'Aughrim Rangers') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#2563eb" stroke="white" strokeWidth="2" />
           <path d="M 50 30 L 70 70 H 60 L 50 50 L 40 70 H 30 Z" fill="white" />
           <text x="50" y="85" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">RANGERS</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 16. SHILLELAGH (Green/Gold Tree)
  // ----------------------------------------------------------------------
  if (team.name === 'Shillelagh') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#16a34a" stroke="#fbbf24" strokeWidth="2" />
           {/* Stick/Branch */}
           <path d="M 55 30 Q 60 50 45 70" stroke="#fbbf24" strokeWidth="4" fill="none" strokeLinecap="round" />
           <circle cx="55" cy="30" r="3" fill="#fbbf24" />
           <text x="50" y="85" fontSize="8" fontWeight="bold" fill="#fbbf24" textAnchor="middle">1989</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 17. ARDMORE ROVERS (Black/Blue Stripes)
  // ----------------------------------------------------------------------
  if (team.name === 'Ardmore Rovers') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <defs><clipPath id="ardShield"><path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" /></clipPath></defs>
           <path d="M 50 5 L 90 20 V 55 C 90 80 50 95 50 95 C 50 95 10 80 10 55 V 20 Z" fill="black" stroke="white" strokeWidth="1" />
           <rect x="30" y="0" width="15" height="100" fill="#2563eb" clipPath="url(#ardShield)" />
           <rect x="55" y="0" width="15" height="100" fill="#2563eb" clipPath="url(#ardShield)" />
           <text x="50" y="30" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">ARDMORE</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 18. ST ANTHONYS (Red/Black Quarters)
  // ----------------------------------------------------------------------
  if (team.name === 'St. Anthonys') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <defs><clipPath id="antShield"><path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" /></clipPath></defs>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#dc2626" stroke="black" strokeWidth="2" />
           <rect x="50" y="20" width="30" height="80" fill="black" clipPath="url(#antShield)" />
           <rect x="20" y="60" width="30" height="40" fill="black" clipPath="url(#antShield)" />
           <rect x="50" y="60" width="30" height="40" fill="#dc2626" clipPath="url(#antShield)" />
           <text x="50" y="50" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">St.A</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 19. KILCOOLE (Green/White Bird)
  // ----------------------------------------------------------------------
  if (team.name === 'Kilcoole') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <path d="M 20 20 H 80 V 60 C 80 85 50 95 50 95 C 50 95 20 85 20 60 Z" fill="#16a34a" stroke="white" strokeWidth="2" />
           {/* Abstract Bird/Wing */}
           <path d="M 30 50 Q 50 30 70 50 Q 50 60 30 50" fill="white" />
           <circle cx="65" cy="45" r="2" fill="#16a34a" />
           <text x="50" y="80" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">KILCOOLE</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 20. ARKLOW UNITED (Ship/Waves)
  // ----------------------------------------------------------------------
  if (team.name === 'Arklow United') {
    return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           {/* White Shield Background with Black Border */}
           <path d="M 10 10 H 90 V 50 C 90 85 50 98 50 98 C 50 98 10 85 10 50 V 10 Z" fill="white" stroke="black" strokeWidth="2" />

           {/* Top Text: ARKLOW - UNITED */}
           <text x="28" y="24" fontSize="7" fontWeight="bold" fill="#15803d" textAnchor="middle">ARKLOW</text>
           <text x="72" y="24" fontSize="7" fontWeight="bold" fill="#15803d" textAnchor="middle">UNITED</text>

           {/* Waves at bottom */}
           <path d="M 11 75 Q 20 70 30 75 T 50 75 T 70 75 T 89 75 V 80 C 89 85 50 97 50 97 C 50 97 11 85 11 80 Z" fill="#0369a1" />
           <path d="M 11 80 Q 20 75 30 80 T 50 80 T 70 80 T 89 80" stroke="white" strokeWidth="1" fill="none" />
           <path d="M 13 85 Q 20 80 30 85 T 50 85 T 70 85 T 87 85" stroke="white" strokeWidth="1" fill="none" />

           {/* Ship Hull */}
           <path d="M 38 65 L 42 75 H 58 L 62 65" fill="#fbbf24" stroke="black" strokeWidth="0.5" />
           {/* Mast */}
           <rect x="49" y="25" width="2" height="40" fill="#fbbf24" stroke="black" strokeWidth="0.5" />
           {/* Flag on top */}
           <path d="M 51 26 L 60 28 L 51 32" fill="white" stroke="black" strokeWidth="0.5" />

           {/* Sail */}
           <path d="M 28 35 Q 22 55 28 70 Q 50 75 72 70 Q 78 55 72 35 Q 50 30 28 35 Z" fill="white" stroke="black" strokeWidth="1" />

           {/* Sail Content */}
           <text x="50" y="44" fontSize="6" fontWeight="bold" fill="#15803d" textAnchor="middle">FC</text>
           <text x="50" y="66" fontSize="6" fontWeight="bold" fill="#15803d" textAnchor="middle">1978</text>
           
           {/* Ball */}
           <circle cx="50" cy="52" r="5" fill="white" stroke="black" strokeWidth="0.5" />
           <g transform="translate(50, 52) scale(0.1)">
             <path d="M 0 0 L 10 -18 L 28 -8 L 28 15 L 10 25 L -10 25 L -28 15 L -28 -8 L -10 -18 Z" fill="#111" />
           </g>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // 21. ROUNDWOOD AFC (Tree)
  // ----------------------------------------------------------------------
  if (team.name === 'Roundwood AFC') {
     return (
      <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
        <svg {...commonProps}>
           <circle cx="50" cy="50" r="45" fill="#16a34a" stroke="white" strokeWidth="2" />
           {/* Tree */}
           <path d="M 50 20 L 30 50 H 45 V 70 H 55 V 50 H 70 Z" fill="white" />
           <text x="50" y="85" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">ROUNDWOOD</text>
        </svg>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // DEFAULT GENERATOR (Fallback)
  // ----------------------------------------------------------------------
  const primaryColor = team.colors?.[0] || '#1f2937';
  const secondaryColor = team.colors?.[1] || '#ffffff';
  
  return (
    <div className={`relative flex items-center justify-center select-none ${sizes[size]} ${className}`}>
      <svg {...commonProps}>
        <defs>
          <linearGradient id={`grad_${team.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <path 
          d="M50 5 L90 20 V55 C90 75 50 95 50 95 C 50 95 10 75 10 55 V20 L50 5 Z" 
          fill={primaryColor} 
          stroke="#1e293b" 
          strokeWidth="2"
        />
        
        <path 
           d="M40 10 V90" 
           stroke={secondaryColor} 
           strokeWidth="20" 
           clipPath="path('M50 7 L88 21 V55 C88 74 50 93 50 93 C50 93 12 74 12 55 V21 L50 7 Z')"
        />

        <path 
          d="M50 5 L90 20 V55 C90 75 50 95 50 95 C 50 95 10 75 10 55 V20 L50 5 Z" 
          fill={`url(#grad_${team.id})`}
          style={{ mixBlendMode: 'overlay' }}
        />
        
        <text x="50" y="55" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle" style={{textShadow: '0px 2px 2px rgba(0,0,0,0.5)'}}>
           {team.shortName}
        </text>
      </svg>
    </div>
  );
};

export default TeamLogo;