import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
const HEADING_FONT = "'Inter', system-ui, sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// ─── Types ────────────────────────────────────────────────────────────────────

type CityNode = {
  id: string;
  label: string;
  region: string;
  cx: number;
  cy: number;
  isHub?: boolean;
};
type TradeRoute = {
  from: string;
  to: string;
  delay: number;
  duration: number;
  label?: string;
  corridor: string;
};
type RouteWithPath = TradeRoute & {
  pathStr: string;
};
type FilterRegion = {
  id: string;
  label: string;
  color: string;
  nodeIds: string[];
};

// ─── Hub coordinates ──────────────────────────────────────────────────────────

const NKOMAZI_HUB: CityNode = {
  id: 'nkz',
  label: 'Nkomazi SEZ',
  region: 'South Africa',
  cx: 500,
  cy: 295,
  isHub: true
};

// ─── City nodes ───────────────────────────────────────────────────────────────

const CITY_NODES: CityNode[] = [{
  id: 'map',
  label: 'Maputo',
  region: 'Mozambique',
  cx: 530,
  cy: 310
}, {
  id: 'jnb',
  label: 'Johannesburg',
  region: 'SADC',
  cx: 470,
  cy: 318
}, {
  id: 'hre',
  label: 'Harare',
  region: 'SADC',
  cx: 510,
  cy: 258
}, {
  id: 'lun',
  label: 'Lusaka',
  region: 'SADC',
  cx: 482,
  cy: 232
}, {
  id: 'bla',
  label: 'Blantyre',
  region: 'SADC',
  cx: 540,
  cy: 248
}, {
  id: 'dbn',
  label: 'Durban Port',
  region: 'SADC',
  cx: 488,
  cy: 340
}, {
  id: 'nbi',
  label: 'Nairobi',
  region: 'East Africa',
  cx: 548,
  cy: 196
}, {
  id: 'dares',
  label: 'Dar es Salaam',
  region: 'East Africa',
  cx: 556,
  cy: 220
}, {
  id: 'cai',
  label: 'Cairo',
  region: 'North Africa',
  cx: 520,
  cy: 100
}, {
  id: 'lag',
  label: 'Lagos',
  region: 'West Africa',
  cx: 392,
  cy: 178
}, {
  id: 'lhr',
  label: 'London',
  region: 'Europe',
  cx: 430,
  cy: 44
}, {
  id: 'ams',
  label: 'Amsterdam',
  region: 'Europe',
  cx: 462,
  cy: 38
}, {
  id: 'fra',
  label: 'Frankfurt',
  region: 'Europe',
  cx: 484,
  cy: 42
}, {
  id: 'dxb',
  label: 'Dubai',
  region: 'Middle East',
  cx: 628,
  cy: 128
}, {
  id: 'jed',
  label: 'Jeddah',
  region: 'Middle East',
  cx: 580,
  cy: 130
}, {
  id: 'bom',
  label: 'Mumbai',
  region: 'South Asia',
  cx: 692,
  cy: 160
}, {
  id: 'sin',
  label: 'Singapore',
  region: 'ASEAN',
  cx: 790,
  cy: 220
}, {
  id: 'hkg',
  label: 'Hong Kong',
  region: 'East Asia',
  cx: 820,
  cy: 162
}, {
  id: 'nrt',
  label: 'Tokyo',
  region: 'East Asia',
  cx: 872,
  cy: 120
}, {
  id: 'nyc',
  label: 'New York',
  region: 'Americas',
  cx: 126,
  cy: 108
}, {
  id: 'gru',
  label: 'São Paulo',
  region: 'Americas',
  cx: 162,
  cy: 330
}, {
  id: 'syd',
  label: 'Sydney',
  region: 'Pacific',
  cx: 888,
  cy: 360
}];

// ─── Region filter definitions ────────────────────────────────────────────────

const FILTER_REGIONS: FilterRegion[] = [{
  id: 'all',
  label: 'All Corridors',
  color: '#C8A84B',
  nodeIds: []
}, {
  id: 'sadc',
  label: 'SADC',
  color: '#C8A84B',
  nodeIds: ['map', 'jnb', 'hre', 'lun', 'bla', 'dbn']
}, {
  id: 'africa',
  label: 'Africa',
  color: '#FCD34D',
  nodeIds: ['map', 'jnb', 'hre', 'lun', 'bla', 'dbn', 'nbi', 'dares', 'cai', 'lag']
}, {
  id: 'europe',
  label: 'Europe',
  color: '#A78BFA',
  nodeIds: ['lhr', 'ams', 'fra']
}, {
  id: 'mena',
  label: 'MENA',
  color: '#FB923C',
  nodeIds: ['dxb', 'jed', 'cai']
}, {
  id: 'asia',
  label: 'Asia-Pacific',
  color: '#38BDF8',
  nodeIds: ['bom', 'sin', 'hkg', 'nrt', 'syd']
}, {
  id: 'americas',
  label: 'Americas',
  color: '#60B4FF',
  nodeIds: ['nyc', 'gru']
}];

// ─── Trade routes ─────────────────────────────────────────────────────────────

const TRADE_ROUTES: TradeRoute[] = [{
  from: 'map',
  to: 'nkz',
  delay: 0.0,
  duration: 1.2,
  label: 'Maputo Port',
  corridor: 'sadc'
}, {
  from: 'dbn',
  to: 'nkz',
  delay: 0.2,
  duration: 1.4,
  label: 'Durban Port',
  corridor: 'sadc'
}, {
  from: 'jnb',
  to: 'nkz',
  delay: 0.1,
  duration: 1.3,
  label: 'N4 Corridor',
  corridor: 'sadc'
}, {
  from: 'hre',
  to: 'nkz',
  delay: 0.3,
  duration: 1.6,
  corridor: 'sadc'
}, {
  from: 'lun',
  to: 'nkz',
  delay: 0.4,
  duration: 1.8,
  corridor: 'sadc'
}, {
  from: 'bla',
  to: 'nkz',
  delay: 0.5,
  duration: 1.5,
  corridor: 'sadc'
}, {
  from: 'nbi',
  to: 'nkz',
  delay: 0.6,
  duration: 2.0,
  label: 'East Africa',
  corridor: 'africa'
}, {
  from: 'dares',
  to: 'nkz',
  delay: 0.7,
  duration: 1.9,
  corridor: 'africa'
}, {
  from: 'cai',
  to: 'nkz',
  delay: 0.9,
  duration: 2.2,
  corridor: 'mena'
}, {
  from: 'lag',
  to: 'nkz',
  delay: 1.1,
  duration: 2.8,
  corridor: 'africa'
}, {
  from: 'lhr',
  to: 'nkz',
  delay: 1.0,
  duration: 4.0,
  label: 'EU Corridor',
  corridor: 'europe'
}, {
  from: 'fra',
  to: 'nkz',
  delay: 1.1,
  duration: 4.0,
  corridor: 'europe'
}, {
  from: 'dxb',
  to: 'nkz',
  delay: 0.8,
  duration: 3.4,
  label: 'MENA Corridor',
  corridor: 'mena'
}, {
  from: 'jed',
  to: 'nkz',
  delay: 0.9,
  duration: 3.0,
  corridor: 'mena'
}, {
  from: 'bom',
  to: 'nkz',
  delay: 1.2,
  duration: 3.6,
  corridor: 'asia'
}, {
  from: 'sin',
  to: 'nkz',
  delay: 1.4,
  duration: 4.2,
  label: 'ASEAN Link',
  corridor: 'asia'
}, {
  from: 'hkg',
  to: 'nkz',
  delay: 1.5,
  duration: 4.0,
  corridor: 'asia'
}, {
  from: 'nrt',
  to: 'nkz',
  delay: 1.6,
  duration: 4.5,
  corridor: 'asia'
}, {
  from: 'syd',
  to: 'nkz',
  delay: 1.7,
  duration: 4.8,
  corridor: 'asia'
}, {
  from: 'nyc',
  to: 'nkz',
  delay: 1.8,
  duration: 5.0,
  corridor: 'americas'
}, {
  from: 'gru',
  to: 'nkz',
  delay: 1.6,
  duration: 4.8,
  label: 'South-South',
  corridor: 'americas'
},
// Feeder routes
{
  from: 'nyc',
  to: 'lhr',
  delay: 0.2,
  duration: 3.8,
  corridor: 'europe'
}, {
  from: 'lhr',
  to: 'dxb',
  delay: 0.6,
  duration: 3.2,
  corridor: 'mena'
}, {
  from: 'fra',
  to: 'dxb',
  delay: 0.9,
  duration: 3.0,
  corridor: 'mena'
}, {
  from: 'dxb',
  to: 'bom',
  delay: 1.0,
  duration: 2.4,
  corridor: 'asia'
}, {
  from: 'bom',
  to: 'sin',
  delay: 1.3,
  duration: 3.0,
  corridor: 'asia'
}, {
  from: 'hkg',
  to: 'sin',
  delay: 0.5,
  duration: 2.6,
  corridor: 'asia'
}, {
  from: 'nrt',
  to: 'hkg',
  delay: 0.8,
  duration: 2.4,
  corridor: 'asia'
}, {
  from: 'syd',
  to: 'sin',
  delay: 1.5,
  duration: 3.2,
  corridor: 'asia'
}, {
  from: 'nyc',
  to: 'gru',
  delay: 2.0,
  duration: 3.6,
  corridor: 'americas'
}, {
  from: 'jed',
  to: 'dxb',
  delay: 0.4,
  duration: 1.8,
  corridor: 'mena'
}, {
  from: 'cai',
  to: 'dxb',
  delay: 0.7,
  duration: 2.2,
  corridor: 'mena'
}, {
  from: 'lag',
  to: 'cai',
  delay: 0.3,
  duration: 2.6,
  corridor: 'africa'
}];

// ─── Continent paths ──────────────────────────────────────────────────────────

const CONTINENT_PATHS = [{
  d: `M 390 90 C 408 72 440 66 468 72 L 500 76 C 530 78 556 90 570 108 L 590 130 C 606 154 608 182 600 206 L 588 234 C 574 262 554 278 534 286 L 510 294 C 488 300 464 296 448 282 L 430 264 C 414 244 408 216 412 190 L 416 166 C 420 142 410 118 390 90 Z`,
  fill: 'rgba(200,168,75,0.13)',
  stroke: 'rgba(200,168,75,0.32)'
}, {
  d: `M 448 282 C 460 292 480 298 500 294 L 530 286 C 548 278 558 268 560 280 L 554 310 C 546 332 528 346 508 348 L 484 346 C 462 342 448 326 444 306 L 444 290 Z`,
  fill: 'rgba(200,168,75,0.14)',
  stroke: 'rgba(200,168,75,0.30)'
}, {
  d: `M 570 108 C 586 104 610 108 624 120 L 636 138 C 630 154 614 158 598 150 L 578 134 Z`,
  fill: 'rgba(200,168,75,0.10)',
  stroke: 'rgba(200,168,75,0.22)'
}, {
  d: `M 578 294 C 584 282 596 280 602 290 L 606 318 L 592 328 L 578 312 Z`,
  fill: 'rgba(200,168,75,0.08)',
  stroke: 'rgba(200,168,75,0.18)'
}, {
  d: `M 402 20 C 422 10 466 8 498 16 L 522 24 C 538 34 538 50 520 58 L 490 64 L 456 60 L 424 48 Z`,
  fill: 'rgba(200,168,75,0.08)',
  stroke: 'rgba(200,168,75,0.18)'
}, {
  d: `M 390 42 C 398 32 414 32 418 42 L 414 58 L 396 56 Z`,
  fill: 'rgba(200,168,75,0.07)',
  stroke: 'rgba(200,168,75,0.15)'
}, {
  d: `M 584 110 C 604 98 644 100 662 118 L 672 140 C 668 160 648 168 624 164 L 600 152 L 582 132 Z`,
  fill: 'rgba(200,168,75,0.09)',
  stroke: 'rgba(200,168,75,0.20)'
}, {
  d: `M 660 130 C 686 116 728 118 748 136 L 762 160 C 760 186 740 202 712 202 L 680 192 L 658 168 Z`,
  fill: 'rgba(200,168,75,0.08)',
  stroke: 'rgba(200,168,75,0.18)'
}, {
  d: `M 768 186 C 796 172 844 174 864 192 L 876 216 C 870 238 848 248 820 244 L 788 232 L 768 210 Z`,
  fill: 'rgba(200,168,75,0.08)',
  stroke: 'rgba(200,168,75,0.18)'
}, {
  d: `M 796 246 C 808 238 824 242 830 254 L 832 274 L 812 278 L 796 262 Z`,
  fill: 'rgba(200,168,75,0.07)',
  stroke: 'rgba(200,168,75,0.15)'
}, {
  d: `M 870 96 C 880 84 898 84 902 96 L 900 116 L 882 120 Z`,
  fill: 'rgba(200,168,75,0.07)',
  stroke: 'rgba(200,168,75,0.15)'
}, {
  d: `M 830 320 C 858 302 916 300 940 322 L 956 350 C 960 382 944 410 918 420 L 882 426 C 848 426 822 406 814 378 L 812 350 Z`,
  fill: 'rgba(200,168,75,0.09)',
  stroke: 'rgba(200,168,75,0.20)'
}, {
  d: `M 36 54 C 58 34 104 28 140 36 L 174 46 C 196 58 200 80 188 96 L 168 114 C 146 128 118 128 98 116 L 68 96 C 44 80 30 68 36 54 Z`,
  fill: 'rgba(200,168,75,0.08)',
  stroke: 'rgba(200,168,75,0.18)'
}, {
  d: `M 188 96 L 208 106 L 216 124 L 196 130 L 182 114 Z`,
  fill: 'rgba(200,168,75,0.07)',
  stroke: 'rgba(200,168,75,0.14)'
}, {
  d: `M 96 274 C 118 252 164 248 190 264 L 214 284 C 232 308 232 346 218 374 L 196 402 C 172 424 140 428 118 412 C 96 396 86 366 90 336 L 90 304 Z`,
  fill: 'rgba(200,168,75,0.09)',
  stroke: 'rgba(200,168,75,0.20)'
}, {
  d: `M 490 0 C 560 0 700 0 800 8 L 880 18 C 900 26 892 40 860 44 L 780 48 L 680 40 L 580 32 L 490 26 Z`,
  fill: 'rgba(200,168,75,0.06)',
  stroke: 'rgba(200,168,75,0.12)'
}];

// ─── Region colours ───────────────────────────────────────────────────────────

const REGION_COLORS: Record<string, string> = {
  Mozambique: '#C8A84B',
  SADC: '#C8A84B',
  'East Africa': '#FCD34D',
  'North Africa': '#FB923C',
  'West Africa': '#F97316',
  Europe: '#A78BFA',
  'Middle East': '#FB923C',
  'South Asia': '#34D399',
  ASEAN: '#F472B6',
  'East Asia': '#38BDF8',
  Pacific: '#4ADE80',
  Americas: '#60B4FF'
};

// ─── Stats bar data ───────────────────────────────────────────────────────────

const MAP_STATS = [{
  value: '16',
  label: 'SADC countries reachable'
}, {
  value: '6',
  label: 'Continents connected'
}, {
  value: 'N4',
  label: 'Maputo Corridor access'
}, {
  value: '48h',
  label: 'Avg. port transit time'
}];

// ─── Inset panel nodes & routes ───────────────────────────────────────────────

const INSET_NODES = [{
  id: 'nkz-i',
  label: 'Nkomazi SEZ',
  x: 100,
  y: 100,
  isHub: true,
  color: '#C8A84B'
}, {
  id: 'map-i',
  label: 'Maputo',
  x: 148,
  y: 118,
  isHub: false,
  color: '#C8A84B'
}, {
  id: 'jnb-i',
  label: 'Johannesburg',
  x: 44,
  y: 124,
  isHub: false,
  color: '#C8A84B'
}, {
  id: 'dbn-i',
  label: 'Durban',
  x: 68,
  y: 160,
  isHub: false,
  color: '#C8A84B'
}, {
  id: 'hre-i',
  label: 'Harare',
  x: 122,
  y: 52,
  isHub: false,
  color: '#FCD34D'
}, {
  id: 'bla-i',
  label: 'Blantyre',
  x: 158,
  y: 64,
  isHub: false,
  color: '#FCD34D'
}];
const INSET_ROUTES = [{
  from: {
    x: 148,
    y: 118
  },
  to: {
    x: 100,
    y: 100
  },
  label: 'Maputo Port'
}, {
  from: {
    x: 44,
    y: 124
  },
  to: {
    x: 100,
    y: 100
  },
  label: 'N4 Corridor'
}, {
  from: {
    x: 68,
    y: 160
  },
  to: {
    x: 100,
    y: 100
  },
  label: 'Durban Port'
}, {
  from: {
    x: 122,
    y: 52
  },
  to: {
    x: 100,
    y: 100
  },
  label: 'Harare'
}, {
  from: {
    x: 158,
    y: 64
  },
  to: {
    x: 100,
    y: 100
  },
  label: 'Blantyre'
}];

// ─── Arc helpers ──────────────────────────────────────────────────────────────

function buildArc(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const bend = Math.min(dist * 0.28, 110);
  const nx = -dy / dist;
  const ny = dx / dist;
  const sign = ny < 0 ? -1 : 1;
  const cx = mx + nx * bend * sign;
  const cy = my + ny * bend * sign;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}
function buildArcSimple(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const bend = dist * 0.22;
  const nx = -dy / dist;
  const ny = dx / dist;
  return `M ${x1} ${y1} Q ${mx + nx * bend} ${my + ny * bend} ${x2} ${y2}`;
}
function bezierMid(x1: number, y1: number, cpx: number, cpy: number, x2: number, y2: number, t = 0.5): {
  x: number;
  y: number;
} {
  const x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cpx + t * t * x2;
  const y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cpy + t * t * y2;
  return {
    x,
    y
  };
}
function getArcMid(pathStr: string): {
  x: number;
  y: number;
} | null {
  const m = pathStr.match(/M\s*([\d.]+)\s+([\d.]+)\s+Q\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!m) return null;
  return bezierMid(+m[1], +m[2], +m[3], +m[4], +m[5], +m[6]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const RadiusPulse = ({
  cx,
  cy,
  baseR,
  delay
}: {
  cx: number;
  cy: number;
  baseR: number;
  delay: number;
}) => <motion.circle cx={cx} cy={cy} r={baseR} fill="none" stroke="#C8A84B" strokeWidth={0.6} strokeDasharray="4 6" initial={{
  r: baseR,
  opacity: 0
}} animate={{
  r: [baseR, baseR + 22],
  opacity: [0.45, 0]
}} transition={{
  duration: 3.2,
  delay,
  repeat: Infinity,
  repeatDelay: 1.4,
  ease: 'easeOut'
}} />;
const PulseRing = ({
  cx,
  cy,
  delay
}: {
  cx: number;
  cy: number;
  delay: number;
}) => <motion.circle cx={cx} cy={cy} r={4} fill="none" stroke="#C8A84B" strokeWidth={1.2} initial={{
  r: 4,
  opacity: 0.8
}} animate={{
  r: [4, 20],
  opacity: [0.7, 0]
}} transition={{
  duration: 2.4,
  delay,
  repeat: Infinity,
  repeatDelay: 1.2,
  ease: 'easeOut'
}} />;
const TradeDot = ({
  pathStr,
  delay,
  duration,
  isHub
}: {
  pathStr: string;
  delay: number;
  duration: number;
  isHub: boolean;
}) => <motion.circle r={isHub ? 3.5 : 2.2} fill={isHub ? '#C8A84B' : 'rgba(200,168,75,0.9)'} filter="url(#dot-glow)" style={{
  offsetPath: `path("${pathStr}")`
} as React.CSSProperties} initial={{
  offsetDistance: '0%',
  opacity: 0
}} animate={{
  offsetDistance: ['0%', '100%'],
  opacity: [0, 1, 1, 0]
}} transition={{
  duration,
  delay,
  repeat: Infinity,
  repeatDelay: duration * 0.5,
  ease: 'easeInOut',
  times: [0, 0.05, 0.9, 1]
}} />;
const RouteLabel = ({
  pathStr,
  label,
  visible
}: {
  pathStr: string;
  label: string;
  visible: boolean;
}) => {
  const mid = getArcMid(pathStr);
  if (!mid) return null;
  return <AnimatePresence>
      {visible && <motion.g key={label}>
          <motion.rect x={mid.x - 36} y={mid.y - 9} width={72} height={16} rx={4} ry={4} fill="rgba(15,36,25,0.88)" stroke="rgba(200,168,75,0.5)" strokeWidth={0.5} initial={{
        opacity: 0,
        scale: 0.85
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.85
      }} transition={{
        duration: 0.22
      }} style={{
        transformOrigin: `${mid.x}px ${mid.y}px`
      }} />
          <motion.text x={mid.x} y={mid.y + 3} textAnchor="middle" fontSize="7" fill="#C8A84B" style={{
        fontFamily: BODY_FONT,
        fontWeight: 600,
        letterSpacing: '0.04em'
      }} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.22
      }}>
            {label}
          </motion.text>
        </motion.g>}
    </AnimatePresence>;
};

// ─── Inset panel ──────────────────────────────────────────────────────────────

const InsetPanel = ({
  inView
}: {
  inView: boolean;
}) => {
  const [hoveredInset, setHoveredInset] = useState<string | null>(null);
  return <motion.div initial={{
    opacity: 0,
    scale: 0.92,
    y: 12
  }} animate={inView ? {
    opacity: 1,
    scale: 1,
    y: 0
  } : {}} transition={{
    duration: 0.7,
    delay: 0.9,
    ease: [0.22, 1, 0.36, 1]
  }} className="absolute bottom-[56px] left-[20px] z-20 rounded-2xl overflow-hidden" style={{
    width: '190px',
    background: 'rgba(10,25,16,0.92)',
    border: '1px solid rgba(200,168,75,0.3)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 12px 48px rgba(0,0,0,0.5)'
  }}>
      <div className="flex items-center justify-between px-3 py-2" style={{
      borderBottom: '1px solid rgba(200,168,75,0.15)'
    }}>
        <span className="text-[#C8A84B] uppercase tracking-widest" style={{
        fontFamily: BODY_FONT,
        fontSize: '8px',
        fontWeight: 700
      }}>
          N4 Corridor · Zoom
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A84B] animate-pulse" />
          <span style={{
          fontFamily: BODY_FONT,
          fontSize: '7px',
          color: 'rgba(255,255,255,0.4)'
        }}>LIVE</span>
        </div>
      </div>

      <svg viewBox="0 0 200 200" className="w-full" style={{
      display: 'block'
    }}>
        <defs>
          <radialGradient id="inset-spotlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(200,168,75,0.08)" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="inset-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width="200" height="200" fill="url(#inset-spotlight)" />
        {[50, 100, 150].map(v => <line key={`ig-v${v}`} x1={v} y1={0} x2={v} y2={200} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />)}
        {[50, 100, 150].map(v => <line key={`ig-h${v}`} x1={0} y1={v} x2={200} y2={v} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />)}

        {inView && <>
            <motion.circle cx={100} cy={100} r={18} fill="none" stroke="#C8A84B" strokeWidth={0.5} strokeDasharray="3 5" animate={{
          r: [18, 34],
          opacity: [0.4, 0]
        }} transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: 'easeOut',
          repeatDelay: 1
        }} />
            <motion.circle cx={100} cy={100} r={30} fill="none" stroke="#C8A84B" strokeWidth={0.4} strokeDasharray="2 6" animate={{
          r: [30, 50],
          opacity: [0.3, 0]
        }} transition={{
          duration: 3.2,
          delay: 0.8,
          repeat: Infinity,
          ease: 'easeOut',
          repeatDelay: 1
        }} />
          </>}

        {INSET_ROUTES.map((r, i) => {
        const pathStr = buildArcSimple(r.from.x, r.from.y, r.to.x, r.to.y);
        const isHov = hoveredInset === r.label;
        return <path key={`ir-${i}`} d={pathStr} fill="none" stroke={isHov ? '#C8A84B' : 'rgba(200,168,75,0.35)'} strokeWidth={isHov ? 1.2 : 0.7} style={{
          transition: 'stroke 0.2s, stroke-width 0.2s'
        }} />;
      })}

        {INSET_NODES.filter(n => !n.isHub).map(n => <g key={n.id} style={{
        cursor: 'pointer'
      }} onMouseEnter={() => setHoveredInset(n.label)} onMouseLeave={() => setHoveredInset(null)}>
            <circle cx={n.x} cy={n.y} r={hoveredInset === n.label ? 5 : 3.5} fill={n.color} filter="url(#inset-glow)" style={{
          transition: 'r 0.15s'
        }} />
            <text x={n.x} y={n.y - 6} textAnchor="middle" fontSize="7.5" fill={hoveredInset === n.label ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)'} style={{
          fontFamily: BODY_FONT,
          fontWeight: hoveredInset === n.label ? 700 : 400
        }}>
              {n.label}
            </text>
          </g>)}

        <motion.circle cx={100} cy={100} r={7} fill="#C8A84B" filter="url(#inset-glow)" animate={inView ? {
        scale: [1, 1.18, 1]
      } : {}} transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
        <circle cx={100} cy={100} r={3} fill="#0A1910" />
        <text x={100} y={113} textAnchor="middle" fontSize="7" fill="#C8A84B" style={{
        fontFamily: BODY_FONT,
        fontWeight: 700,
        letterSpacing: '0.05em'
      }}>
          NKOMAZI SEZ
        </text>
      </svg>

      <div className="px-3 pb-2.5 flex items-center gap-1.5">
        <div className="w-2 h-px bg-[#C8A84B]" />
        <span style={{
        fontFamily: BODY_FONT,
        fontSize: '7px',
        color: 'rgba(255,255,255,0.35)'
      }}>
          Mpumalanga · South Africa
        </span>
      </div>
    </motion.div>;
};

// ─── Region Filter Toggle Bar ─────────────────────────────────────────────────

const RegionFilterBar = ({
  activeFilter,
  onSelect
}: {
  activeFilter: string;
  onSelect: (id: string) => void;
}) => <motion.div initial={{
  opacity: 0,
  y: 12
}} animate={{
  opacity: 1,
  y: 0
}} transition={{
  duration: 0.5,
  delay: 0.4,
  ease: [0.22, 1, 0.36, 1]
}} className="flex flex-wrap justify-center gap-2 px-6 pb-6">
    {FILTER_REGIONS.map(region => {
    const isActive = activeFilter === region.id;
    return <motion.button key={region.id} onClick={() => onSelect(region.id)} whileTap={{
      scale: 0.94
    }} transition={{
      duration: 0.15
    }} className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-[0.05em] overflow-hidden" style={{
      fontFamily: BODY_FONT,
      border: `1px solid ${isActive ? region.color : 'rgba(255,255,255,0.12)'}`,
      color: isActive ? region.id === 'all' ? '#0F2419' : '#0F2419' : 'rgba(255,255,255,0.55)',
      background: isActive ? region.color : 'rgba(255,255,255,0.04)',
      transition: 'background 0.25s, border-color 0.25s, color 0.25s'
    }}>
          {region.id !== 'all' && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{
        backgroundColor: isActive ? '#0F2419' : region.color,
        opacity: isActive ? 0.7 : 1
      }} />}
          <span>{region.label}</span>
          {isActive && <motion.div layoutId="filter-pill-bg" className="absolute inset-0 rounded-full" style={{
        background: region.color,
        zIndex: -1
      }} transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }} />}
        </motion.button>;
  })}
  </motion.div>;

// ─── Main component ───────────────────────────────────────────────────────────

export const GlobalRouteMap: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: '-80px'
  });
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [activeLabelIdx, setActiveLabelIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const allNodes = [NKOMAZI_HUB, ...CITY_NODES];
  const routePaths: RouteWithPath[] = TRADE_ROUTES.map(route => {
    const from = allNodes.find(n => n.id === route.from)!;
    const to = allNodes.find(n => n.id === route.to)!;
    return {
      ...route,
      pathStr: buildArc(from.cx, from.cy, to.cx, to.cy)
    };
  });
  const activeFilterDef = FILTER_REGIONS.find(f => f.id === activeFilter)!;

  // Determine which routes are "active" under the current filter
  const isRouteActive = (route: RouteWithPath): boolean => {
    if (activeFilter === 'all') return true;
    return route.corridor === activeFilter;
  };

  // Determine which nodes are "active" under the current filter
  const isNodeActive = (nodeId: string): boolean => {
    if (activeFilter === 'all') return true;
    if (nodeId === 'nkz') return true;
    return activeFilterDef.nodeIds.includes(nodeId);
  };
  const labelledHubRoutes = routePaths.filter(r => r.label && (r.from === 'nkz' || r.to === 'nkz') && isRouteActive(r));
  useEffect(() => {
    setActiveLabelIdx(0);
  }, [activeFilter]);
  useEffect(() => {
    if (!inView || labelledHubRoutes.length === 0) return;
    const id = setInterval(() => {
      setActiveLabelIdx(prev => (prev + 1) % labelledHubRoutes.length);
    }, 2200);
    return () => clearInterval(id);
  }, [inView, labelledHubRoutes.length]);
  const highlightedRouteIds = hoveredCity ? routePaths.filter(r => r.from === hoveredCity || r.to === hoveredCity).map(r => `${r.from}-${r.to}`) : [];
  const REGIONAL_IDS = ['map', 'jnb', 'hre', 'lun', 'bla', 'dbn', 'nbi', 'dares'];
  const getRouteOpacity = (route: RouteWithPath): number => {
    if (activeFilter === 'all') return 1;
    return isRouteActive(route) ? 1 : 0.06;
  };
  const getRouteStroke = (route: RouteWithPath): string => {
    const isHighlighted = highlightedRouteIds.includes(`${route.from}-${route.to}`);
    const active = isRouteActive(route);
    if (!active) return 'rgba(255,255,255,0.06)';
    if (isHighlighted) return '#C8A84B';
    const isHubRoute = route.from === 'nkz' || route.to === 'nkz';
    const isRegional = REGIONAL_IDS.includes(route.from) || REGIONAL_IDS.includes(route.to);
    if (activeFilter !== 'all') return activeFilterDef.color;
    return isHubRoute && isRegional ? 'rgba(200,168,75,0.45)' : isHubRoute ? 'rgba(200,168,75,0.22)' : 'rgba(200,168,75,0.09)';
  };
  const getRouteWidth = (route: RouteWithPath): number => {
    const isHighlighted = highlightedRouteIds.includes(`${route.from}-${route.to}`);
    const active = isRouteActive(route);
    if (!active) return 0.3;
    if (isHighlighted) return 1.6;
    const isHubRoute = route.from === 'nkz' || route.to === 'nkz';
    const isRegional = REGIONAL_IDS.includes(route.from) || REGIONAL_IDS.includes(route.to);
    if (activeFilter !== 'all') return isHubRoute ? 1.2 : 0.7;
    return isHubRoute && isRegional ? 1.0 : isHubRoute ? 0.7 : 0.4;
  };
  return <section ref={sectionRef} className="py-[120px] mx-2.5">
      <div className="bg-[#0F2419] rounded-3xl overflow-hidden">

        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: 24
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="flex flex-col items-center gap-3 text-center pt-16 pb-8 px-6">
          <span className="inline-block bg-[#1A3C2E] text-white text-xs rounded-full px-3 py-2 leading-[21px] tracking-[0.06em] uppercase" style={{
          fontFamily: BODY_FONT
        }}>
            Investment Corridors
          </span>
          <h2 className="text-white font-light m-0" style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          lineHeight: '1.1',
          letterSpacing: '-2px',
          fontFamily: HEADING_FONT
        }}>
            Nkomazi's global trade reach
          </h2>
          <p className="text-white/55 text-base leading-[1.7] m-0 max-w-[560px]" style={{
          fontFamily: BODY_FONT
        }}>
            Direct corridor access to SADC, EU, MENA, and Asia-Pacific markets — filter by region or hover any city to reveal active trade corridors.
          </p>
        </motion.div>

        {/* ── Region Filter Toggle Bar ── */}
        <RegionFilterBar activeFilter={activeFilter} onSelect={setActiveFilter} />

        {/* ── Active filter summary pill ── */}
        <AnimatePresence mode="wait">
          {activeFilter !== 'all' && <motion.div key={activeFilter} initial={{
          opacity: 0,
          y: -6
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -6
        }} transition={{
          duration: 0.25,
          ease: 'easeOut'
        }} className="flex justify-center pb-4">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full" style={{
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${activeFilterDef.color}40`
          }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{
              backgroundColor: activeFilterDef.color
            }} />
                <span className="text-xs font-medium" style={{
              fontFamily: BODY_FONT,
              color: activeFilterDef.color
            }}>
                  {activeFilterDef.label} corridors highlighted
                </span>
                <button onClick={() => setActiveFilter('all')} className="ml-1 text-white/30 hover:text-white/70 transition-colors duration-200 text-xs" style={{
              fontFamily: BODY_FONT
            }}>
                  ✕ clear
                </button>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* SVG Map */}
        <motion.div initial={{
        opacity: 0
      }} animate={inView ? {
        opacity: 1
      } : {}} transition={{
        duration: 1.0,
        delay: 0.3
      }} className="w-full px-4 pb-2 relative">
          <svg viewBox="0 0 1000 460" preserveAspectRatio="xMidYMid meet" className="w-full" style={{
          display: 'block'
        }} aria-label="Nkomazi SEZ global trade corridor map">
            <defs>
              <filter id="dot-glow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="hub-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="hub-pulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C8A84B" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#C8A84B" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="hub-spotlight" cx="50%" cy="64%" r="45%">
                <stop offset="0%" stopColor="rgba(200,168,75,0.07)" stopOpacity="1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="map-vignette" cx="50%" cy="50%" r="55%">
                <stop offset="35%" stopColor="transparent" stopOpacity="0" />
                <stop offset="100%" stopColor="#0F2419" stopOpacity="0.75" />
              </radialGradient>
            </defs>

            {/* Grid */}
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => <line key={`vg-${x}`} x1={x} y1={0} x2={x} y2={460} stroke="rgba(255,255,255,0.018)" strokeWidth="0.5" />)}
            {[80, 160, 240, 320, 400].map(y => <line key={`hg-${y}`} x1={0} y1={y} x2={1000} y2={y} stroke="rgba(255,255,255,0.018)" strokeWidth="0.5" />)}

            {/* Continent fills */}
            {CONTINENT_PATHS.map((cp, i) => <path key={`cont-${i}`} d={cp.d} fill={cp.fill} stroke={cp.stroke} strokeWidth="0.8" />)}

            {/* Spotlight + vignette */}
            <rect x="0" y="0" width="1000" height="460" fill="url(#hub-spotlight)" />
            <rect x="0" y="0" width="1000" height="460" fill="url(#map-vignette)" />

            {/* Pulsing radius circles */}
            {inView && <>
                <RadiusPulse cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} baseR={40} delay={0.0} />
                <RadiusPulse cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} baseR={72} delay={0.9} />
                <RadiusPulse cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} baseR={108} delay={1.8} />
              </>}

            {/* Route arcs */}
            {routePaths.map(route => <motion.path key={`arc-${route.from}-${route.to}`} d={route.pathStr} fill="none" animate={{
            stroke: getRouteStroke(route),
            strokeWidth: getRouteWidth(route),
            opacity: getRouteOpacity(route)
          }} transition={{
            duration: 0.4,
            ease: 'easeInOut'
          }} strokeDasharray={isRouteActive(route) ? route.from === 'nkz' || route.to === 'nkz' ? 'none' : '3 5' : '2 6'} />)}

            {/* Animated trade dots — only on active routes */}
            {inView && routePaths.map(route => isRouteActive(route) && <TradeDot key={`dot-${route.from}-${route.to}`} pathStr={route.pathStr} delay={route.delay} duration={route.duration} isHub={route.from === 'nkz' || route.to === 'nkz'} />)}

            {/* Animated route labels */}
            {inView && labelledHubRoutes.map((route, i) => <RouteLabel key={`lbl-${route.from}-${route.to}`} pathStr={route.pathStr} label={route.label!} visible={i === activeLabelIdx} />)}

            {/* Hub glow halo */}
            <motion.circle cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} r={36} fill="url(#hub-pulse)" animate={{
            r: [30, 52],
            opacity: [0.65, 0]
          }} transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeOut'
          }} />

            {/* City nodes */}
            {CITY_NODES.map(city => {
            const color = REGION_COLORS[city.region] || '#C8A84B';
            const isHovered = hoveredCity === city.id;
            const isRegionalNode = REGIONAL_IDS.includes(city.id);
            const nodeActive = isNodeActive(city.id);
            return <g key={city.id} style={{
              cursor: 'pointer'
            }} onMouseEnter={() => setHoveredCity(city.id)} onMouseLeave={() => setHoveredCity(null)}>
                  {isHovered && <PulseRing cx={city.cx} cy={city.cy} delay={0} />}
                  <motion.circle cx={city.cx} cy={city.cy} r={isHovered ? 6 : isRegionalNode ? 4.5 : 3.5} fill={color} animate={{
                opacity: nodeActive ? 1 : 0.15
              }} transition={{
                duration: 0.35
              }} />
                  <motion.text x={city.cx} y={city.cy - 8} textAnchor="middle" fontSize={isRegionalNode ? '9.5' : '8.5'} fill={isHovered ? 'rgba(255,255,255,0.95)' : isRegionalNode ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)'} style={{
                fontFamily: BODY_FONT,
                fontWeight: isHovered || isRegionalNode ? 600 : 400
              }} animate={{
                opacity: nodeActive ? 1 : 0.12
              }} transition={{
                duration: 0.35
              }}>
                    {city.label}
                  </motion.text>
                </g>;
          })}

            {/* Hub node */}
            <g style={{
            cursor: 'pointer'
          }} onMouseEnter={() => setHoveredCity('nkz')} onMouseLeave={() => setHoveredCity(null)}>
              <PulseRing cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} delay={0} />
              <PulseRing cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} delay={1.2} />
              <motion.circle cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} r={10} fill="#C8A84B" filter="url(#hub-glow)" animate={inView ? {
              scale: [1, 1.15, 1]
            } : {}} transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }} />
              <circle cx={NKOMAZI_HUB.cx} cy={NKOMAZI_HUB.cy} r={4.5} fill="#0F2419" />
              <text x={NKOMAZI_HUB.cx} y={NKOMAZI_HUB.cy + 22} textAnchor="middle" fontSize="10" fill="#C8A84B" style={{
              fontFamily: BODY_FONT,
              fontWeight: 700,
              letterSpacing: '0.04em'
            }}>
                NKOMAZI SEZ
              </text>
              <text x={NKOMAZI_HUB.cx} y={NKOMAZI_HUB.cy + 34} textAnchor="middle" fontSize="8" fill="rgba(200,168,75,0.55)" style={{
              fontFamily: BODY_FONT
            }}>
                Mpumalanga · South Africa
              </text>
            </g>

            {/* Hover tooltip */}
            <AnimatePresence>
              {hoveredCity && hoveredCity !== 'nkz' && (() => {
              const city = CITY_NODES.find(c => c.id === hoveredCity);
              if (!city) return null;
              const color = REGION_COLORS[city.region] || '#C8A84B';
              const routes = routePaths.filter(r => r.from === hoveredCity || r.to === hoveredCity);
              const tx = city.cx > 750 ? city.cx - 126 : city.cx + 12;
              const ty = city.cy > 360 ? city.cy - 64 : city.cy + 12;
              return <g key={`tooltip-${hoveredCity}`}>
                    <motion.rect x={tx} y={ty} width={116} height={50} rx={6} ry={6} fill="rgba(15,36,25,0.95)" stroke="rgba(200,168,75,0.4)" strokeWidth={0.7} initial={{
                  opacity: 0,
                  scale: 0.9
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} exit={{
                  opacity: 0,
                  scale: 0.9
                }} transition={{
                  duration: 0.18
                }} style={{
                  transformOrigin: `${tx}px ${ty}px`
                }} />
                    <text x={tx + 10} y={ty + 18} fontSize="9.5" fill="white" style={{
                  fontFamily: BODY_FONT,
                  fontWeight: 600
                }}>
                      {city.label}
                    </text>
                    <text x={tx + 10} y={ty + 30} fontSize="8.5" fill={color} style={{
                  fontFamily: BODY_FONT
                }}>
                      {city.region}
                    </text>
                    <text x={tx + 10} y={ty + 42} fontSize="7.5" fill="rgba(255,255,255,0.45)" style={{
                  fontFamily: BODY_FONT
                }}>
                      {routes.length} active corridor{routes.length !== 1 ? 's' : ''}
                    </text>
                  </g>;
            })()}
            </AnimatePresence>
          </svg>

          {/* Inset panel */}
          <InsetPanel inView={inView} />

          {/* Inset connector line */}
          <motion.div initial={{
          opacity: 0
        }} animate={inView ? {
          opacity: 1
        } : {}} transition={{
          duration: 0.6,
          delay: 1.2
        }} className="absolute bottom-[56px] left-[214px] hidden lg:block" style={{
          pointerEvents: 'none'
        }}>
            <svg width="40" height="30" viewBox="0 0 40 30">
              <path d="M 0 28 Q 20 28 40 14" fill="none" stroke="rgba(200,168,75,0.25)" strokeWidth="0.8" strokeDasharray="3 4" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6,
        delay: 0.6
      }} className="grid gap-px mx-4 mb-4 rounded-2xl overflow-hidden" style={{
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'rgba(200,168,75,0.12)'
      }}>
          {MAP_STATS.map(stat => <div key={stat.label} className="flex flex-col items-center justify-center gap-1.5 py-7 px-4" style={{
          background: 'rgba(200,168,75,0.06)'
        }}>
              <span className="text-white font-light" style={{
            fontSize: '36px',
            letterSpacing: '-1.5px',
            lineHeight: '1',
            fontFamily: HEADING_FONT
          }}>
                {stat.value}
              </span>
              <span className="text-white/50 text-sm text-center leading-tight" style={{
            fontFamily: BODY_FONT
          }}>
                {stat.label}
              </span>
            </div>)}
        </motion.div>

        {/* Legend */}
        <motion.div initial={{
        opacity: 0
      }} animate={inView ? {
        opacity: 1
      } : {}} transition={{
        duration: 0.6,
        delay: 0.8
      }} className="flex flex-wrap justify-center gap-x-6 gap-y-2 pb-10 px-6">
          {Object.entries(REGION_COLORS).map(([region, color]) => <div key={region} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{
            backgroundColor: color
          }} />
              <span className="text-white/40 text-xs" style={{
            fontFamily: BODY_FONT
          }}>{region}</span>
            </div>)}
        </motion.div>

      </div>
    </section>;
};