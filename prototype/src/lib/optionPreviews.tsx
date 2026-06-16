// Inline SVG previews for estimate option cards (16:9 viewBox = 160×90).
// Replace with real <Image> components once photos are available.

const W = 'w-full h-full'

// ── Property types ────────────────────────────────────────────────────────────

export const PreviewApartment = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Sky */}
    <rect width="160" height="90" fill="#E4EEF4"/>
    {/* Building body */}
    <rect x="24" y="10" width="112" height="74" fill="#8BAF96" rx="2"/>
    {/* Top trim */}
    <rect x="24" y="10" width="112" height="8" fill="#2D5A3D" rx="2"/>
    {/* Windows 4×3 */}
    {[0,1,2,3].map(c => [0,1,2].map(r => (
      <rect key={`${c}-${r}`} x={34+c*26} y={23+r*17} width="16" height="11" fill="#DBEAFE" rx="2"/>
    )))}
    {/* Ground-floor entrance */}
    <rect x="32" y="60" width="14" height="24" fill="#DBEAFE" rx="1.5"/>
    <rect x="50" y="60" width="14" height="24" fill="#DBEAFE" rx="1.5"/>
    {/* Door */}
    <rect x="68" y="66" width="24" height="18" fill="#2D5A3D" rx="2"/>
    <circle cx="77" cy="76" r="1.5" fill="#8BAF96"/>
    {/* Ground */}
    <rect x="0" y="84" width="160" height="6" fill="#E2DAD0"/>
  </svg>
)

export const PreviewHouse = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Sky */}
    <rect width="160" height="90" fill="#E4EEF4"/>
    {/* Chimney */}
    <rect x="107" y="16" width="9" height="24" fill="#6B7060"/>
    <rect x="105" y="14" width="13" height="5" fill="#4A5040" rx="1"/>
    {/* Roof */}
    <polygon points="80,6 12,48 148,48" fill="#2D5A3D"/>
    {/* Roof overhang shadow */}
    <polygon points="80,6 10,48 14,48 80,10 146,48 150,48" fill="#24482F"/>
    {/* House body */}
    <rect x="18" y="46" width="124" height="38" fill="#8BAF96"/>
    {/* Left window */}
    <rect x="28" y="55" width="30" height="20" fill="#DBEAFE" rx="2"/>
    <line x1="43" y1="55" x2="43" y2="75" stroke="#B8D4E8" strokeWidth="1"/>
    <line x1="28" y1="65" x2="58" y2="65" stroke="#B8D4E8" strokeWidth="1"/>
    {/* Right window */}
    <rect x="102" y="55" width="30" height="20" fill="#DBEAFE" rx="2"/>
    <line x1="117" y1="55" x2="117" y2="75" stroke="#B8D4E8" strokeWidth="1"/>
    <line x1="102" y1="65" x2="132" y2="65" stroke="#B8D4E8" strokeWidth="1"/>
    {/* Door */}
    <rect x="65" y="58" width="30" height="26" fill="#2D5A3D" rx="3"/>
    <circle cx="79" cy="74" r="2" fill="#8BAF96"/>
    {/* Ground */}
    <rect x="0" y="84" width="160" height="6" fill="#E2DAD0"/>
  </svg>
)

// ── Property conditions ────────────────────────────────────────────────────────

export const PreviewNew = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Clean white interior */}
    <rect width="160" height="90" fill="#FAFAF7"/>
    {/* Ceiling strip */}
    <rect x="0" y="0" width="160" height="4" fill="#F0EBE0"/>
    {/* Fresh wall */}
    <rect x="0" y="4" width="160" height="68" fill="#FAFAF7"/>
    {/* Baseboard */}
    <rect x="0" y="70" width="160" height="4" fill="#E8E0D4"/>
    {/* Floor – light parquet */}
    <rect x="0" y="74" width="160" height="16" fill="#EDE5D8"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i} x={i*20} y="74" width="19" height="8" fill="none" stroke="#DDD4C4" strokeWidth="0.6"/>
    ))}
    {/* Sparkle left */}
    <line x1="32" y1="22" x2="32" y2="34" stroke="#2D5A3D" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
    <line x1="26" y1="28" x2="38" y2="28" stroke="#2D5A3D" strokeWidth="1.2" strokeLinecap="round" opacity="0.35"/>
    <circle cx="32" cy="28" r="3" fill="none" stroke="#2D5A3D" strokeWidth="0.8" opacity="0.25"/>
    {/* Sparkle right */}
    <line x1="128" y1="18" x2="128" y2="28" stroke="#2D5A3D" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    <line x1="123" y1="23" x2="133" y2="23" stroke="#2D5A3D" strokeWidth="1" strokeLinecap="round" opacity="0.3"/>
    {/* Badge */}
    <rect x="40" y="36" width="80" height="20" fill="#2D5A3D" rx="10"/>
    <text x="80" y="50" fontSize="8" textAnchor="middle" fill="white"
      fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="0.5">NOWE BUDOWNICTWO</text>
  </svg>
)

export const PreviewPreowned = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Aged room */}
    <rect width="160" height="90" fill="#EDE0C4"/>
    {/* Aged ceiling */}
    <rect x="0" y="0" width="160" height="5" fill="#D8CDB0"/>
    {/* Wall – yellowed plaster */}
    <rect x="0" y="5" width="160" height="63" fill="#EDE0C4"/>
    {/* Crack lines */}
    <path d="M 48 10 L 53 24 L 50 38 L 54 50" stroke="#C8B890" strokeWidth="0.8" strokeLinecap="round" fill="none"/>
    <path d="M 53 24 L 60 29" stroke="#C8B890" strokeWidth="0.5" strokeLinecap="round" fill="none"/>
    <path d="M 112 8 L 109 22 L 114 36 L 110 50" stroke="#C8B890" strokeWidth="0.7" strokeLinecap="round" fill="none"/>
    {/* Paint peel */}
    <ellipse cx="80" cy="48" rx="13" ry="8" fill="#F0E8D0" stroke="#C8B890" strokeWidth="0.6"/>
    <ellipse cx="80" cy="48" rx="8" ry="5" fill="#EDE0C4" opacity="0.7"/>
    {/* Ceiling stain */}
    <ellipse cx="96" cy="5" rx="22" ry="3.5" fill="#CCB880" opacity="0.55"/>
    {/* Baseboard – worn */}
    <rect x="0" y="68" width="160" height="6" fill="#C4A882"/>
    {/* Old parquet floor */}
    <rect x="0" y="74" width="160" height="16" fill="#C4A882"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i} x={i*20} y="74" width="19" height="8" fill="none" stroke="#A88C60" strokeWidth="0.5"/>
    ))}
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i+10} x={i*20+10} y="82" width="19" height="8" fill="none" stroke="#A88C60" strokeWidth="0.5"/>
    ))}
  </svg>
)

// ── Renovation scopes ──────────────────────────────────────────────────────────

export const PreviewCosmetic = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Before (left) */}
    <rect width="80" height="90" fill="#EDE0C4"/>
    {/* After (right) – freshly painted */}
    <rect x="80" y="0" width="80" height="90" fill="#F0F6F0"/>
    {/* Fresh paint coat */}
    <rect x="80" y="0" width="80" height="74" fill="#E8F2EA"/>
    {/* Divider dashed line */}
    <line x1="80" y1="0" x2="80" y2="80" stroke="#2D5A3D" strokeWidth="1.5" strokeDasharray="5,3"/>
    {/* Floor */}
    <rect x="0" y="78" width="160" height="12" fill="#E2DAD0"/>
    {/* Paint roller handle */}
    <line x1="82" y1="12" x2="96" y2="32" stroke="#4A5040" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Roller frame */}
    <rect x="93" y="31" width="5" height="22" fill="#6B7060" rx="1.5"/>
    <rect x="90" y="28" width="11" height="7" fill="#6B7060" rx="2"/>
    {/* Roller cylinder */}
    <rect x="104" y="27" width="30" height="24" fill="#8BAF96" rx="6"/>
    <rect x="104" y="27" width="30" height="5" fill="#7AA088" rx="6"/>
    {/* Paint drip */}
    <path d="M 122 51 Q 121 58 119 63" stroke="#8BAF96" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <circle cx="118" cy="65" r="3" fill="#8BAF96"/>
    {/* Labels */}
    <text x="40" y="87" fontSize="7" textAnchor="middle" fill="#8B7060" fontFamily="system-ui,sans-serif">PRZED</text>
    <text x="120" y="87" fontSize="7" textAnchor="middle" fill="#2D5A3D" fontFamily="system-ui,sans-serif">PO</text>
  </svg>
)

export const PreviewPremium = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Marble base */}
    <rect width="160" height="90" fill="#F8F5F0"/>
    {/* Tile grid 5×3 */}
    {[0,1,2,3,4].map(c => [0,1,2].map(r => (
      <rect key={`${c}-${r}`} x={c*32} y={r*30} width="30" height="28"
        fill="#FAF8F5" stroke="#E8E0D8" strokeWidth="1" rx="0.5"/>
    )))}
    {/* Marble veins */}
    <path d="M 4 7 Q 16 14 10 26" stroke="#D8CECC" strokeWidth="0.9" fill="none"/>
    <path d="M 38 2 Q 50 14 44 28" stroke="#D4CACC" strokeWidth="0.7" fill="none"/>
    <path d="M 70 8 Q 64 20 72 27" stroke="#D8CECC" strokeWidth="0.8" fill="none"/>
    <path d="M 100 4 Q 112 14 106 28" stroke="#D4C8CC" strokeWidth="0.9" fill="none"/>
    <path d="M 6 36 Q 18 44 14 56" stroke="#D8CECC" strokeWidth="0.7" fill="none"/>
    <path d="M 70 34 Q 80 46 74 58" stroke="#D4CACC" strokeWidth="0.8" fill="none"/>
    {/* Gold accent bars */}
    <rect x="0" y="0" width="160" height="3" fill="#C4A85A" opacity="0.55"/>
    <rect x="0" y="87" width="160" height="3" fill="#C4A85A" opacity="0.55"/>
    {/* Center badge */}
    <rect x="50" y="30" width="60" height="30" fill="#2D5A3D" rx="6" opacity="0.93"/>
    {/* Diamond */}
    <polygon points="80,37 88,45 80,53 72,45" fill="white" opacity="0.92"/>
    <polygon points="80,37 88,45 80,42 72,45" fill="white" opacity="0.6"/>
    <text x="80" y="65" fontSize="6.5" textAnchor="middle" fill="white"
      fontFamily="system-ui,sans-serif" fontWeight="700" letterSpacing="1" opacity="0.9">PREMIUM</text>
  </svg>
)

export const PreviewFull = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Exposed brick wall */}
    <rect width="160" height="90" fill="#D8C8B4"/>
    {/* Brick rows: even rows offset */}
    {[0,1,2,3,4,5,6].map(r =>
      [0,1,2,3,4,5,6,7].map(c => (
        <rect key={`${c}-${r}`}
          x={c*22 + (r%2===0 ? 0 : 11) - 2} y={r*12}
          width="20" height="10"
          fill={r%3===0 ? '#C4A882' : r%3===1 ? '#B89870' : '#BEA078'}
          stroke="#A07858" strokeWidth="0.6" rx="0.5"/>
      ))
    )}
    {/* Bare concrete floor */}
    <rect x="0" y="72" width="160" height="18" fill="#C0B8AC"/>
    <line x1="0" y1="72" x2="160" y2="72" stroke="#A8A098" strokeWidth="1.2"/>
    {/* Construction warning tape */}
    <rect x="0" y="56" width="160" height="10" fill="#F5C842" opacity="0.9"/>
    {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
      <line key={i} x1={i*18-4} y1="56" x2={i*18+8} y2="66"
        stroke="#1C1C1A" strokeWidth="2" opacity="0.55"/>
    ))}
    {/* Vertical pipe */}
    <rect x="132" y="0" width="8" height="56" fill="#909090" rx="1"/>
    <rect x="130" y="0" width="12" height="4" fill="#707070" rx="1"/>
    <rect x="130" y="52" width="12" height="6" fill="#707070" rx="1"/>
  </svg>
)

// ── Room types ────────────────────────────────────────────────────────────────

export const PreviewKitchen = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Room */}
    <rect width="160" height="90" fill="#FBF6EE"/>
    {/* Floor */}
    <rect x="0" y="64" width="160" height="26" fill="#EDE5D4"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <line key={i} x1={i*20} y1="64" x2={i*20} y2="90" stroke="#E4DBCA" strokeWidth="0.6"/>
    ))}
    <line x1="0" y1="77" x2="160" y2="77" stroke="#E4DBCA" strokeWidth="0.6"/>
    {/* Lower cabinets */}
    <rect x="0" y="50" width="160" height="16" fill="#C89060" rx="1"/>
    <rect x="0" y="50" width="160" height="3" fill="#D8A070"/>
    {/* Cabinet doors */}
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={i*32+2} y="54" width="28" height="10" fill="#D49862" rx="1" stroke="#C08050" strokeWidth="0.5"/>
    ))}
    {/* Cabinet handles */}
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={i*32+13} y="60" width="6" height="1.5" fill="#8B6040" rx="1"/>
    ))}
    {/* Countertop */}
    <rect x="0" y="47" width="160" height="4" fill="#E8E0D4"/>
    {/* Stove hob (right side) */}
    <rect x="96" y="34" width="50" height="14" fill="#4A4A4A" rx="2"/>
    {/* 4 burners */}
    {[[108,39],[122,39],[108,45],[122,45]].map(([cx,cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="5" fill="#2A2A2A"/>
        <circle cx={cx} cy={cy} r="3" fill="#383838"/>
        <circle cx={cx} cy={cy} r="1.5" fill="#505050"/>
      </g>
    ))}
    {/* Sink (left side) */}
    <rect x="18" y="35" width="38" height="12" fill="#D0E8F0" rx="2"/>
    <rect x="22" y="38" width="30" height="7" fill="#B8D8E8" rx="1.5"/>
    {/* Tap */}
    <rect x="35" y="31" width="3" height="6" fill="#9090A0"/>
    <rect x="32" y="31" width="9" height="2" fill="#9090A0" rx="1"/>
    {/* Upper cabinets */}
    <rect x="0" y="6" width="160" height="22" fill="#C89060" rx="1"/>
    <rect x="0" y="25" width="160" height="3" fill="#D8A070"/>
    {[0,1,2,3,4].map(i => (
      <rect key={i} x={i*32+2} y="8" width="28" height="17" fill="#D49862" rx="1" stroke="#C08050" strokeWidth="0.5"/>
    ))}
  </svg>
)

export const PreviewLivingRoom = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Room */}
    <rect width="160" height="90" fill="#F8F4EC"/>
    {/* Parquet floor */}
    <rect x="0" y="58" width="160" height="32" fill="#D4B882"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i} x={i*20} y="58" width="19" height="14" fill="none" stroke="#C4A870" strokeWidth="0.5"/>
    ))}
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i+10} x={i*20+10} y="72" width="19" height="18" fill="none" stroke="#C4A870" strokeWidth="0.5"/>
    ))}
    {/* Rug */}
    <ellipse cx="80" cy="72" rx="42" ry="12" fill="#8BAF96" opacity="0.35"/>
    {/* Sofa – L shape */}
    <rect x="20" y="44" width="90" height="26" fill="#2D5A3D" rx="4"/>
    <rect x="20" y="42" width="90" height="6" fill="#3A7050" rx="3"/>
    {/* Sofa left arm */}
    <rect x="14" y="44" width="10" height="20" fill="#2D5A3D" rx="3"/>
    {/* Sofa right arm */}
    <rect x="106" y="44" width="10" height="20" fill="#2D5A3D" rx="3"/>
    {/* Cushions */}
    <rect x="24" y="46" width="24" height="18" fill="#3A7050" rx="3"/>
    <rect x="52" y="46" width="24" height="18" fill="#3A7050" rx="3"/>
    <rect x="80" y="46" width="24" height="18" fill="#3A7050" rx="3"/>
    {/* Coffee table */}
    <rect x="50" y="33" width="40" height="12" fill="#D4B882" rx="2"/>
    <rect x="52" y="35" width="36" height="8" fill="#E4C890" rx="1.5"/>
    {/* Floor lamp */}
    <line x1="140" y1="10" x2="140" y2="58" stroke="#8B7060" strokeWidth="2"/>
    <ellipse cx="140" cy="16" rx="10" ry="6" fill="#F5E8C0" stroke="#D4B870" strokeWidth="1"/>
    <circle cx="140" cy="56" r="5" fill="#A09080" opacity="0.4"/>
  </svg>
)

export const PreviewBedroom = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Room */}
    <rect width="160" height="90" fill="#F6F0F8"/>
    {/* Floor */}
    <rect x="0" y="62" width="160" height="28" fill="#EAE0D4"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i} x={i*20} y="62" width="19" height="13" fill="none" stroke="#DDD5C5" strokeWidth="0.5"/>
    ))}
    {/* Headboard */}
    <rect x="28" y="14" width="104" height="20" fill="#5A4A7A" rx="4"/>
    <rect x="32" y="16" width="96" height="16" fill="#6A5A8A" rx="3"/>
    {/* Bed frame */}
    <rect x="24" y="30" width="112" height="36" fill="#E8E0F0" rx="3"/>
    {/* Mattress */}
    <rect x="28" y="32" width="104" height="32" fill="#F4F0F8" rx="2"/>
    {/* Bedding */}
    <rect x="28" y="46" width="104" height="18" fill="#C0A8D8" rx="2"/>
    <rect x="32" y="48" width="96" height="14" fill="#C8B0E0" rx="2"/>
    {/* Pillows */}
    <rect x="30" y="33" width="44" height="14" fill="#EAE0F4" rx="3"/>
    <rect x="86" y="33" width="44" height="14" fill="#EAE0F4" rx="3"/>
    {/* Left nightstand */}
    <rect x="4" y="40" width="18" height="20" fill="#C8A878" rx="2"/>
    <rect x="6" y="46" width="14" height="8" fill="#B89868" rx="1.5"/>
    {/* Lamp on left nightstand */}
    <line x1="13" y1="28" x2="13" y2="41" stroke="#A08060" strokeWidth="1.5"/>
    <ellipse cx="13" cy="25" rx="8" ry="4" fill="#F8ECC0" stroke="#D4B870" strokeWidth="0.8"/>
    {/* Right nightstand */}
    <rect x="138" y="40" width="18" height="20" fill="#C8A878" rx="2"/>
    <rect x="140" y="46" width="14" height="8" fill="#B89868" rx="1.5"/>
  </svg>
)

export const PreviewBathroom = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Room – cool white/blue */}
    <rect width="160" height="90" fill="#F0F4F8"/>
    {/* Tile grid */}
    {[0,1,2,3,4,5,6,7].map(c => [0,1,2,3,4].map(r => (
      <rect key={`${c}-${r}`} x={c*20} y={r*18} width="19" height="17"
        fill={((c+r)%2===0) ? '#FAFCFE' : '#F0F6FA'} stroke="#DCE8F0" strokeWidth="0.5"/>
    )))}
    {/* Bathtub */}
    <rect x="16" y="22" width="70" height="38" fill="#FFFFFF" rx="6" stroke="#C8D8E8" strokeWidth="1.5"/>
    <rect x="20" y="26" width="62" height="30" fill="#E8F2F8" rx="4"/>
    {/* Tub faucet */}
    <rect x="44" y="20" width="4" height="8" fill="#9090A0"/>
    <rect x="40" y="19" width="12" height="3" fill="#9090A0" rx="1.5"/>
    {/* Tub feet */}
    <circle cx="24" cy="57" r="3" fill="#D0D8E0"/>
    <circle cx="78" cy="57" r="3" fill="#D0D8E0"/>
    {/* Shower/toilet right side */}
    {/* Toilet */}
    <ellipse cx="128" cy="52" rx="18" ry="14" fill="#FFFFFF" stroke="#C8D8E8" strokeWidth="1.2"/>
    <ellipse cx="128" cy="48" rx="14" ry="10" fill="#F0F6FA"/>
    <rect x="110" y="32" width="36" height="10" fill="#FFFFFF" rx="3" stroke="#C8D8E8" strokeWidth="1"/>
    {/* Sink */}
    <rect x="108" y="10" width="40" height="18" fill="#FFFFFF" rx="4" stroke="#C8D8E8" strokeWidth="1.2"/>
    <ellipse cx="128" cy="20" rx="14" ry="6" fill="#E8F2F8"/>
    <circle cx="128" cy="10" r="2" fill="#9090A0"/>
    {/* Water in bathtub */}
    <rect x="22" y="38" width="58" height="16" fill="#C0DCF0" rx="2" opacity="0.6"/>
  </svg>
)

export const PreviewHallway = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Room */}
    <rect width="160" height="90" fill="#F5F0E8"/>
    {/* Floor – diagonal tiles */}
    <rect x="0" y="56" width="160" height="34" fill="#E8DED0"/>
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <line key={i} x1={i*20-10} y1="56" x2={i*20+10} y2="90" stroke="#D8CEC0" strokeWidth="0.6"/>
    ))}
    {[0,1,2,3,4,5,6,7,8].map(i => (
      <line key={i+10} x1={i*20} y1="56" x2={i*20-10} y2="90" stroke="#D8CEC0" strokeWidth="0.6"/>
    ))}
    {/* Back wall */}
    <rect x="0" y="0" width="160" height="58" fill="#F5F0E8"/>
    {/* Big door - centered */}
    <rect x="52" y="8" width="56" height="50" fill="#C89060" rx="3"/>
    <rect x="56" y="12" width="48" height="42" fill="#D4A070" rx="2"/>
    {/* Door panels */}
    <rect x="58" y="14" width="22" height="16" fill="#C89060" rx="1.5" stroke="#B87840" strokeWidth="0.8"/>
    <rect x="84" y="14" width="18" height="16" fill="#C89060" rx="1.5" stroke="#B87840" strokeWidth="0.8"/>
    <rect x="58" y="34" width="22" height="18" fill="#C89060" rx="1.5" stroke="#B87840" strokeWidth="0.8"/>
    <rect x="84" y="34" width="18" height="18" fill="#C89060" rx="1.5" stroke="#B87840" strokeWidth="0.8"/>
    {/* Door knob */}
    <circle cx="96" cy="36" r="3.5" fill="#D4A878"/>
    <circle cx="96" cy="36" r="2" fill="#E8C090"/>
    {/* Door frame */}
    <rect x="50" y="6" width="60" height="52" fill="none" stroke="#8B6040" strokeWidth="2.5"/>
    {/* Coat hooks on left wall */}
    <line x1="22" y1="18" x2="22" y2="38" stroke="#8B6040" strokeWidth="2"/>
    <circle cx="22" cy="20" r="1.5" fill="#8B6040"/>
    {[0,1,2].map(i => (
      <g key={i}>
        <line x1="22" y1={24+i*7} x2="28" y2={27+i*7} stroke="#8B6040" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="28" cy={27+i*7} r="1.5" fill="#A07050"/>
      </g>
    ))}
    {/* Coat */}
    <path d="M 28 27 Q 34 30 32 38 L 24 38 Q 22 30 28 27" fill="#2D5A3D" opacity="0.7"/>
    {/* Umbrella stand right */}
    <rect x="130" y="44" width="12" height="14" fill="#A09080" rx="2"/>
    <line x1="134" y1="20" x2="134" y2="45" stroke="#8BAF96" strokeWidth="1.5"/>
    <line x1="138" y1="24" x2="138" y2="45" stroke="#2D5A3D" strokeWidth="1.5"/>
    <path d="M 130 22 Q 134 16 138 22" stroke="#C08040" strokeWidth="2" fill="none"/>
  </svg>
)

export const PreviewOffice = () => (
  <svg viewBox="0 0 160 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={W}>
    {/* Room */}
    <rect width="160" height="90" fill="#F0F2F5"/>
    {/* Floor */}
    <rect x="0" y="60" width="160" height="30" fill="#E4E0D8"/>
    {[0,1,2,3,4,5,6,7].map(i => (
      <rect key={i} x={i*20} y="60" width="19" height="14" fill="none" stroke="#D8D4CC" strokeWidth="0.5"/>
    ))}
    {/* Bookshelf on left */}
    <rect x="4" y="6" width="26" height="56" fill="#C89060" rx="2"/>
    <rect x="6" y="8" width="22" height="52" fill="#D4A878" rx="1"/>
    {/* Shelves */}
    {[0,1,2,3].map(i => (
      <rect key={i} x="6" y={8+i*13} width="22" height="1.5" fill="#B87840"/>
    ))}
    {/* Books */}
    {[0,1,2].map(shelf => [0,1,2,3,4].map(book => (
      <rect key={`${shelf}-${book}`}
        x={7+book*4} y={10+shelf*13}
        width="3" height={8+book%2}
        fill={['#2D5A3D','#8BAF96','#C89060','#9090A0','#6B7060'][book]}
        rx="0.5"/>
    )))}
    {/* Desk */}
    <rect x="36" y="42" width="110" height="22" fill="#C89060" rx="3"/>
    <rect x="36" y="42" width="110" height="4" fill="#D4A878" rx="3"/>
    {/* Desk legs */}
    <rect x="40" y="64" width="5" height="16" fill="#B87840" rx="1"/>
    <rect x="141" y="64" width="5" height="16" fill="#B87840" rx="1"/>
    {/* Monitor */}
    <rect x="80" y="22" width="46" height="30" fill="#2A2A35" rx="3"/>
    <rect x="82" y="24" width="42" height="26" fill="#1A2A4A" rx="2"/>
    {/* Screen content */}
    <rect x="84" y="26" width="38" height="20" fill="#2040A0" opacity="0.6" rx="1"/>
    <rect x="86" y="28" width="20" height="2" fill="white" opacity="0.5" rx="1"/>
    <rect x="86" y="32" width="30" height="2" fill="white" opacity="0.3" rx="1"/>
    <rect x="86" y="36" width="25" height="2" fill="white" opacity="0.3" rx="1"/>
    {/* Monitor stand */}
    <rect x="100" y="52" width="8" height="4" fill="#383838"/>
    <rect x="96" y="55" width="16" height="2" fill="#383838" rx="1"/>
    {/* Keyboard */}
    <rect x="62" y="52" width="36" height="8" fill="#D0C8C0" rx="2"/>
    <rect x="64" y="53" width="32" height="5" fill="#C8C0B8" rx="1.5"/>
    {/* Mouse */}
    <ellipse cx="114" cy="56" rx="7" ry="5" fill="#D0C8C0"/>
    <line x1="114" y1="52" x2="114" y2="60" stroke="#B0A8A0" strokeWidth="0.8"/>
    {/* Chair */}
    <rect x="62" y="66" width="36" height="24" fill="#3A3A4A" rx="3" opacity="0.85"/>
    <rect x="66" y="60" width="28" height="10" fill="#4A4A5A" rx="2"/>
  </svg>
)

export const ROOM_PREVIEWS: Record<string, React.ReactElement> = {
  kitchen:     <PreviewKitchen />,
  living_room: <PreviewLivingRoom />,
  bedroom:     <PreviewBedroom />,
  bathroom:    <PreviewBathroom />,
  hallway:     <PreviewHallway />,
  office:      <PreviewOffice />,
}

// ── Condition & finish placeholders ──────────────────────────────────────────

function Ph({ bg, text }: { bg: string; text: string }) {
  return (
    <div className={`w-full h-full ${bg} flex items-center justify-center`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest opacity-30">{text}</span>
    </div>
  )
}

export const WALL_CONDITION_PREVIEWS: Record<string, React.ReactElement> = {
  ready:     <Ph bg="bg-emerald-50" text="Ready"    />,
  primer:    <Ph bg="bg-slate-100"  text="Primer"   />,
  putty:     <Ph bg="bg-stone-50"   text="Putty"    />,
  full_prep: <Ph bg="bg-orange-50"  text="Full Prep"/>,
}

export const FLOOR_CONDITION_PREVIEWS: Record<string, React.ReactElement> = {
  ready:    <Ph bg="bg-stone-100" text="Ready"   />,
  leveling: <Ph bg="bg-blue-50"   text="Leveling"/>,
}

export const CEILING_CONDITION_PREVIEWS: Record<string, React.ReactElement> = {
  ready:     <Ph bg="bg-gray-50"   text="Ready"   />,
  primer:    <Ph bg="bg-slate-100" text="Primer"  />,
  full_prep: <Ph bg="bg-orange-50" text="Full Prep"/>,
}

export const WALL_FINISH_PREVIEWS: Record<string, React.ReactElement> = {
  paint:              <Ph bg="bg-green-50"  text="Paint"    />,
  wallpaper:          <Ph bg="bg-purple-50" text="Wallpaper"/>,
  decorative_plaster: <Ph bg="bg-amber-50"  text="Plaster"  />,
}

export const FLOOR_FINISH_PREVIEWS: Record<string, React.ReactElement> = {
  laminate: <Ph bg="bg-amber-100" text="Laminate"/>,
  tile:     <Ph bg="bg-gray-100"  text="Tile"    />,
  vinyl:    <Ph bg="bg-yellow-50" text="Vinyl"   />,
}

export const CEILING_FINISH_PREVIEWS: Record<string, React.ReactElement> = {
  paint:           <Ph bg="bg-gray-50"   text="Paint"  />,
  stretch_ceiling: <Ph bg="bg-blue-50"   text="Stretch"/>,
  drywall:         <Ph bg="bg-stone-100" text="Drywall"/>,
}

export const QUALITY_TIER_PREVIEWS: Record<string, React.ReactElement> = {
  economy:  <Ph bg="bg-gray-100"  text="Economy" />,
  standard: <Ph bg="bg-green-50"  text="Standard"/>,
  premium:  <Ph bg="bg-amber-50"  text="Premium" />,
}
