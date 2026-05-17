// WTV Remotion Compositions
// Pixel-perfect animated recreations of every WTV app screen
// Colors, layout, and content match the live app exactly.

import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

// ─── Brand tokens (mirrors WTVTheme.swift) ────────────────────────────────────
const C = {
  accent:   '#E85D3A',
  accentBg: '#FDF1EE',
  accentSoft:'#FDEEE9',
  green:    '#2D8B4E',
  greenBg:  '#EAF5EE',
  yellow:   '#D4A017',
  red:      '#C43333',
  bg:       '#FAFAF8',
  card:     '#FFFFFF',
  text:     '#1A1A1A',
  muted:    '#6B6B6B',
  border:   '#EBEBEB',
  // Subway line colors
  bdfm:     '#FF6319',
  ace:      '#0039A6',
  l:        '#A7A9AC',
  nqrw:     '#FCCC0A',
  g:        '#6CBE45',
  jz:       '#996633',
  r123:     '#EE352E',
  r456:     '#00933C',
  r7:       '#B933AD',
};

// ─── Spring helper ─────────────────────────────────────────────────────────────
function spr(frame: number, delay = 0, { damping = 14, stiffness = 120 } = {}) {
  return spring({ frame: frame - delay, fps: 30, config: { damping, stiffness }, durationInFrames: 40 });
}
function fade(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
}
function slideUp(frame: number, delay: number, px = 24) {
  const s = spr(frame, delay);
  return `translateY(${interpolate(s, [0, 1], [px, 0])}px)`;
}

// ─── Shared UI primitives ──────────────────────────────────────────────────────

function StatusBar({ time = '1:15' }: { time?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 22px 6px', height: 52 }}>
      <span style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: 17, color: C.text, letterSpacing: -0.3 }}>{time}</span>
      <div style={{ width: 120, height: 34, background: '#000', borderRadius: 20, position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8 }} />
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
          <rect x="0" y="6" width="3" height="7" rx="1" fill={C.text} />
          <rect x="4.5" y="4" width="3" height="9" rx="1" fill={C.text} />
          <rect x="9" y="2" width="3" height="11" rx="1" fill={C.text} />
          <rect x="13.5" y="0" width="3" height="13" rx="1" fill={C.text} />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.9L15 3.5C13.2 1.6 10.7 0.5 8 0.5C5.3 0.5 2.8 1.6 1 3.5L2.4 4.9C3.8 3.4 5.8 2.5 8 2.5Z" fill={C.text} />
          <path d="M8 5.5C9.5 5.5 10.8 6.1 11.8 7.1L13.2 5.7C11.8 4.4 10 3.5 8 3.5C6 3.5 4.2 4.4 2.8 5.7L4.2 7.1C5.2 6.1 6.5 5.5 8 5.5Z" fill={C.text} />
          <circle cx="8" cy="10" r="1.5" fill={C.text} />
        </svg>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 25, height: 13, border: `1.5px solid ${C.text}`, borderRadius: 3, position: 'relative', display: 'flex', alignItems: 'center', padding: '0 2px' }}>
            <div style={{ width: '80%', height: 8, background: C.text, borderRadius: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBar({ active }: { active: 'Home' | 'Map' | 'Search' | 'Block' | 'Saved' }) {
  const tabs = [
    { id: 'Home',   icon: HomeIcon   },
    { id: 'Map',    icon: MapIcon    },
    { id: 'Search', icon: SearchIcon },
    { id: 'Block',  icon: BlockIcon  },
    { id: 'Saved',  icon: SavedIcon  },
  ] as const;
  return (
    <div style={{ display: 'flex', borderTop: `1px solid ${C.border}`, background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(10px)', padding: '8px 0 24px' }}>
      {tabs.map(({ id, icon: Icon }) => (
        <div key={id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Icon color={id === active ? C.accent : '#ACACAC'} size={24} />
          <span style={{ fontFamily: 'system-ui', fontSize: 10, fontWeight: id === active ? 600 : 400, color: id === active ? C.accent : '#ACACAC', letterSpacing: 0.1 }}>{id}</span>
        </div>
      ))}
    </div>
  );
}

function FilterChip({ label, icon, active = false, style }: { label: string; icon?: React.ReactNode; active?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      paddingLeft: 12, paddingRight: 14, height: 34,
      borderRadius: 20,
      background: active ? C.accent : C.card,
      border: `1.5px solid ${active ? C.accent : C.border}`,
      color: active ? '#fff' : C.text,
      fontFamily: 'system-ui', fontSize: 14, fontWeight: 600,
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {label}
    </div>
  );
}

function CategoryBadge({ label, color = C.accent, bg = C.accentSoft }: { label: string; color?: string; bg?: string }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      paddingLeft: 8, paddingRight: 10, height: 24,
      borderRadius: 6, background: bg,
      fontFamily: 'system-ui', fontSize: 12, fontWeight: 700,
      color, textTransform: 'uppercase', letterSpacing: 0.5,
    }}>
      {label}
    </div>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: C.card, borderRadius: 16,
      border: `1px solid ${C.border}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      padding: 16,
      ...style,
    }}>
      {children}
    </div>
  );
}

function RatingBadge({ rating }: { rating: string }) {
  return (
    <div style={{
      background: C.accentSoft, borderRadius: 8,
      padding: '3px 8px',
      fontFamily: 'system-ui', fontSize: 13, fontWeight: 700, color: C.accent,
    }}>
      {rating}
    </div>
  );
}

function GradeBadge({ grade }: { grade: 'A' | 'B' | 'C' }) {
  const colors = { A: { bg: C.greenBg, color: C.green }, B: { bg: '#FFF8E0', color: C.yellow }, C: { bg: '#FEECEC', color: C.red } };
  const c = colors[grade];
  return (
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui', fontSize: 15, fontWeight: 800, color: c.color,
    }}>
      {grade}
    </div>
  );
}

// ─── Subway line pill ──────────────────────────────────────────────────────────
function SubwayPill({ line, color }: { line: string; color: string }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: 11,
      background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'system-ui', fontSize: 12, fontWeight: 800, color: '#fff',
    }}>
      {line}
    </div>
  );
}

// ─── Icons (matching app) ──────────────────────────────────────────────────────
function HomeIcon({ color, size }: { color: string; size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z" stroke={color} strokeWidth={1.8} fill="none" /><path d="M9 21V12h6v9" stroke={color} strokeWidth={1.8} strokeLinecap="round" /></svg>;
}
function MapIcon({ color, size }: { color: string; size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M9 20L3 17V4l6 3m0 13l6-3m-6 3V7m6-3l6 3v13l-6-3m0 0V4m0 0L9 7" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function SearchIcon({ color, size }: { color: string; size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth={1.8} /><path d="M15.5 15.5L20 20" stroke={color} strokeWidth={1.8} strokeLinecap="round" /></svg>;
}
function BlockIcon({ color, size }: { color: string; size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth={1.8} /><rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth={1.8} /><rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth={1.8} /><rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth={1.8} /></svg>;
}
function SavedIcon({ color, size }: { color: string; size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

// ─── COMPOSITION 1: Live Feed ──────────────────────────────────────────────────
export function LiveFeedComposition() {
  const frame = useCurrentFrame();

  const headerOpacity = fade(frame, 0, 20);
  const headerTransform = slideUp(frame, 0, 20);

  const subtitleOpacity = fade(frame, 18, 38);

  const chip1Transform = slideUp(frame, 28, 18);
  const chip1Opacity = fade(frame, 28, 42);
  const chip2Transform = slideUp(frame, 35, 18);
  const chip2Opacity = fade(frame, 35, 49);
  const chip3Transform = slideUp(frame, 42, 18);
  const chip3Opacity = fade(frame, 42, 56);

  const featuredOpacity = fade(frame, 55, 72);
  const featuredTransform = slideUp(frame, 50, 28);

  const transitOpacity = fade(frame, 75, 88);
  const section2Opacity = fade(frame, 85, 100);
  const card2aOpacity = fade(frame, 95, 108);
  const card2bOpacity = fade(frame, 102, 115);

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:15" />

      {/* Header */}
      <div style={{ padding: '4px 20px 0', opacity: headerOpacity, transform: headerTransform }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.7, lineHeight: 1.1 }}>Good afternoon, Bed-Stuy</div>
        <div style={{ opacity: subtitleOpacity, marginTop: 6, fontSize: 14, color: C.muted, fontWeight: 400, lineHeight: 1.4 }}>
          20 events nearby. 10 spots curated.{'\n'}5 road delays. 8 stations tracked.
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '14px 16px 0', overflow: 'hidden' }}>
        <div style={{ opacity: chip1Opacity, transform: chip1Transform }}>
          <FilterChip label="Events" active icon={<span style={{ fontSize: 14 }}>📅</span>} />
        </div>
        <div style={{ opacity: chip2Opacity, transform: chip2Transform }}>
          <FilterChip label="Food" icon={<span style={{ fontSize: 14 }}>🍽</span>} />
        </div>
        <div style={{ opacity: chip3Opacity, transform: chip3Transform }}>
          <FilterChip label="Spots" icon={<span style={{ fontSize: 14 }}>📍</span>} />
        </div>
        <div style={{ opacity: chip3Opacity, transform: chip3Transform }}>
          <FilterChip label="Transit" icon={<span style={{ fontSize: 14 }}>🚇</span>} />
        </div>
      </div>

      {/* Featured card */}
      <div style={{ padding: '14px 16px 0', opacity: featuredOpacity, transform: featuredTransform }}>
        <Card style={{ borderColor: C.accent, borderWidth: 1.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.accent }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1, textTransform: 'uppercase' }}>FEATURED</span>
          </div>
          <CategoryBadge label="🎪 Street Fair" />
          <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.4 }}>Picnic House</div>
          <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: C.muted }}>
            <span>🕐 Sun, Apr 5 · 1:15 PM</span>
          </div>
          <div style={{ marginTop: 3, fontSize: 13, color: C.muted }}>↑ Brooklyn, Brooklyn</div>
          <div style={{ marginTop: 10, fontSize: 14, color: C.muted, lineHeight: 1.5 }}>Something's happening on the block. Check it out.</div>
        </Card>
      </div>

      {/* Transit row */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 10, opacity: transitOpacity }}>
        {[
          { label: 'BQE', sub: 'Heavy +18m', icon: '🚗', color: C.red },
          { label: 'Williamsburg Bridge', sub: 'Moderate +8m', icon: '🌉', color: C.yellow },
          { label: 'Bedford Ave', sub: 'Packed', icon: '🚇', color: C.accent },
        ].map((t) => (
          <div key={t.label} style={{ flex: 1, background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: '8px 10px' }}>
            <div style={{ fontSize: 11, color: C.muted }}>{t.icon} {t.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.color, marginTop: 2 }}>{t.sub}</div>
          </div>
        ))}
      </div>

      {/* What's Happening */}
      <div style={{ padding: '14px 16px 0', opacity: section2Opacity }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>🗓 What's Happening</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>See all 19</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { opacity: card2aOpacity, name: 'Celebration', badge: 'Street Fair' },
            { opacity: card2bOpacity, name: 'Uconn Marching B.', badge: 'Street Fair' },
          ].map((c) => (
            <div key={c.name} style={{ flex: 1, opacity: c.opacity }}>
              <Card style={{ padding: 12 }}>
                <CategoryBadge label={`🎪 ${c.badge}`} />
                <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: C.text }}>{c.name}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>Sun, Apr 5 · 1:15 PM</div>
                <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>↑ Manhattan</div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Home" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION 2: Block Report ──────────────────────────────────────────────
export function BlockReportComposition() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:15" />

      {/* MY BLOCK header */}
      <div style={{ padding: '8px 20px 0', opacity: fade(frame, 0, 18), transform: slideUp(frame, 0, 16) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase' }}>MY BLOCK</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, paddingLeft: 10, paddingRight: 10, height: 22, borderRadius: 11, border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.accent }}>✏ Change</span>
          </div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.6, lineHeight: 1.15 }}>
          Bedford Ave & N 7th St
        </div>
        <div style={{ fontSize: 14, color: C.muted, marginTop: 2 }}>Williamsburg, Brooklyn</div>
      </div>

      {/* Vibe summary */}
      <div style={{ padding: '10px 20px 0', opacity: fade(frame, 20, 35), transform: slideUp(frame, 18, 16) }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: C.accent, lineHeight: 1.4 }}>
          Buzzy. Markets, tourists, and the L train doing its thing.
        </div>
      </div>

      {/* WTV Says card */}
      <div style={{ padding: '14px 16px 0', opacity: fade(frame, 35, 52), transform: slideUp(frame, 32, 24) }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: '#FF6319' }}>❝❝</div>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: 1, textTransform: 'uppercase' }}>WTV SAYS</span>
          </div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.65, fontStyle: 'italic' }}>
            Afternoon in Williamsburg: buzzy, markets, tourists, and the L train doing its thing. Junior Volunteer Corps and Picnic House are on nearby. L'Industrie Pizzeria is the move for pizza. L train is packed — 4 min walk.
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div style={{ padding: '16px 16px 0', opacity: fade(frame, 52, 66) }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 10 }}>🗓 Upcoming Events</div>
        {[
          { delay: 58, name: 'Junior Volunteer Corps', sub: 'Street Fair · Street' },
          { delay: 68, name: 'Picnic House', sub: 'Street Fair · Street' },
          { delay: 78, name: 'Picnic House', sub: 'Street Fair · Street' },
        ].map((e) => (
          <div key={e.name + e.delay} style={{ opacity: fade(frame, e.delay, e.delay + 14), transform: slideUp(frame, e.delay - 4, 18) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ textAlign: 'center', minWidth: 32 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: 0.5 }}>APR</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1 }}>5</div>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{e.name}</div>
                <div style={{ fontSize: 12, color: C.accent, marginTop: 2 }}>{e.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Block" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION 3: Map Layer ─────────────────────────────────────────────────
export function MapLayerComposition() {
  const frame = useCurrentFrame();

  // A stylized NYC grid — no external images needed
  const MapGrid = () => (
    <div style={{ position: 'absolute', inset: 0, background: '#E8E4DC', overflow: 'hidden' }}>
      {/* Streets */}
      {[40,80,120,160,200,240,280,320,360,400,440].map(y => (
        <div key={`h${y}`} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 1, background: 'rgba(255,255,255,0.5)' }} />
      ))}
      {[30,70,110,150,190,230,270,310,350].map(x => (
        <div key={`v${x}`} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 1, background: 'rgba(255,255,255,0.5)' }} />
      ))}
      {/* Major streets */}
      {[60,180,300].map(y => (
        <div key={`mh${y}`} style={{ position: 'absolute', left: 0, right: 0, top: y, height: 3, background: 'rgba(255,255,255,0.8)' }} />
      ))}
      {[100,230].map(x => (
        <div key={`mv${x}`} style={{ position: 'absolute', top: 0, bottom: 0, left: x, width: 3, background: 'rgba(255,255,255,0.8)' }} />
      ))}
      {/* Parks */}
      <div style={{ position: 'absolute', left: 40, top: 90, width: 55, height: 55, background: '#B5D5A0', borderRadius: 4 }} />
      <div style={{ position: 'absolute', left: 230, top: 150, width: 70, height: 40, background: '#B5D5A0', borderRadius: 4 }} />
      {/* Neighborhood label */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: '38%', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(80,60,40,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>BEDFORD</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'rgba(80,60,40,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>STUYVESANT</div>
      </div>
    </div>
  );

  const trayY = interpolate(spr(frame, 60, { damping: 18 }), [0, 1], [300, 0]);
  const mapOpacity = fade(frame, 0, 20);

  const pins = [
    { x: 85,  y: 95,  delay: 30, color: C.accent },
    { x: 185, y: 140, delay: 38, color: C.green   },
    { x: 255, y: 85,  delay: 44, color: C.accent  },
    { x: 140, y: 200, delay: 50, color: '#B933AD'  },
    { x: 310, y: 170, delay: 56, color: C.accent  },
  ];

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:14" />

      {/* Search bar */}
      <div style={{ padding: '4px 16px 0', opacity: fade(frame, 5, 22) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: '10px 14px' }}>
          <SearchIcon color={C.muted} size={18} />
          <span style={{ fontSize: 15, color: C.muted }}>Places, events, eats…</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.accent }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Bed-Stuy</span>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px 0', opacity: fade(frame, 14, 30) }}>
        <FilterChip label="Events" icon={<span style={{ fontSize: 13 }}>📅</span>} />
        <FilterChip label="Food" icon={<span style={{ fontSize: 13 }}>🍽</span>} />
        <FilterChip label="Spots" active icon={<span style={{ fontSize: 13 }}>📍</span>} />
        <FilterChip label="Transit" icon={<span style={{ fontSize: 13 }}>🚇</span>} />
      </div>

      {/* Map */}
      <div style={{ marginTop: 10, height: 340, position: 'relative', opacity: mapOpacity, overflow: 'hidden' }}>
        <MapGrid />
        {/* Pins */}
        {pins.map((p, i) => {
          const pinScale = spr(frame, p.delay, { damping: 10, stiffness: 200 });
          const pinOpacity = fade(frame, p.delay, p.delay + 10);
          return (
            <div key={i} style={{
              position: 'absolute', left: p.x - 14, top: p.y - 32,
              opacity: pinOpacity,
              transform: `scale(${interpolate(pinScale, [0, 1], [0.3, 1])})`,
              transformOrigin: 'bottom center',
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: '#fff' }} />
              </div>
              <div style={{ width: 4, height: 8, background: p.color, margin: '0 auto', borderRadius: '0 0 2px 2px' }} />
            </div>
          );
        })}
      </div>

      {/* Bottom tray */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        transform: `translateY(${trayY}px)`,
        background: C.bg, borderRadius: '24px 24px 0 0',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.12)',
        padding: '12px 16px 0',
      }}>
        <div style={{ width: 36, height: 4, background: C.border, borderRadius: 2, margin: '0 auto 14px' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: C.text }}>📍 10 spots nearby</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { type: 'CAFE', name: 'Devocion', tags: ['aesthetic', 'work-friendly'], rating: '4.6', busy: 'Busy' },
            { type: 'BAR',  name: 'Mood Ring', tags: ['scene-y', 'cocktails'],      rating: '4.4', busy: 'Packed' },
          ].map((v) => (
            <div key={v.name} style={{ flex: 1, background: C.card, borderRadius: 14, border: `1px solid ${C.border}`, padding: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{v.type}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.text }}>{v.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
                {v.tags.map(t => (
                  <div key={t} style={{ background: C.accentSoft, borderRadius: 6, padding: '3px 7px', fontSize: 11, fontWeight: 600, color: C.accent }}>{t}</div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>★ {v.rating}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.accent }}>👥 {v.busy}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Map" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION 4: Spot Card (Search → Spots filter) ─────────────────────────
export function SpotCardComposition() {
  const frame = useCurrentFrame();

  const spots = [
    { name: 'Devocion',       sub: 'Cafe · Williamsburg',       rating: '4.6+', delay: 35 },
    { name: 'Mood Ring',      sub: 'Bar · Bushwick',             rating: '4.4+', delay: 45 },
    { name: 'Cafe Forgot',    sub: 'Shop · Lower East Side',     rating: '4.7+', delay: 52 },
    { name: 'House of Yes',   sub: 'Nightlife · Bushwick',       rating: '4.5+', delay: 59 },
    { name: 'Pioneer Works',  sub: 'Gallery · Red Hook',         rating: '4.8+', delay: 65 },
    { name: 'Bathhouse',      sub: 'Wellness · Williamsburg',    rating: '4.3+', delay: 71 },
    { name: 'Sey Coffee',     sub: 'Cafe · Bushwick',            rating: '4.6+', delay: 77 },
    { name: 'Nowadays',       sub: 'Nightlife · Ridgewood',      rating: '4.6+', delay: 83 },
  ];

  const iconEmojis: Record<string, string> = {
    Cafe: '☕', Bar: '🍸', Shop: '🛍', Nightlife: '🎵', Gallery: '🎨', Wellness: '🧖',
  };

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:21" />

      {/* Search bar */}
      <div style={{ padding: '6px 16px 0', opacity: fade(frame, 0, 16) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.card, borderRadius: 14, border: `2px solid ${C.accent}`, padding: '10px 14px' }}>
          <SearchIcon color={C.accent} size={18} />
          <span style={{ fontSize: 15, color: C.muted }}>Spots, eats, events, transit…</span>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0', opacity: fade(frame, 12, 28) }}>
        <FilterChip label="All" icon={<span style={{ fontSize: 12 }}>⊞</span>} />
        <FilterChip label="Spots" active icon={<span style={{ fontSize: 12 }}>📍</span>} />
        <FilterChip label="Eats" icon={<span style={{ fontSize: 12 }}>🍽</span>} />
        <FilterChip label="Events" icon={<span style={{ fontSize: 12 }}>📅</span>} />
        <FilterChip label="Transit" icon={<span style={{ fontSize: 12 }}>🚇</span>} />
      </div>

      {/* Section label */}
      <div style={{ padding: '14px 16px 6px', opacity: fade(frame, 22, 36) }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>SPOTS</span>
      </div>

      {/* Spot list */}
      <div style={{ padding: '0 16px', overflow: 'hidden' }}>
        {spots.map((s) => {
          const category = s.sub.split(' · ')[0].split(' ')[0];
          const emoji = iconEmojis[category] || '📍';
          return (
            <div key={s.name} style={{ opacity: fade(frame, s.delay, s.delay + 14), transform: slideUp(frame, s.delay - 6, 16) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderBottom: `1px solid ${C.border}` }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{s.sub}</div>
                </div>
                <RatingBadge rating={s.rating} />
                <span style={{ color: C.border, fontSize: 18 }}>›</span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Search" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION 5: Food Card (Search → Eats filter) ──────────────────────────
export function FoodCardComposition() {
  const frame = useCurrentFrame();

  const eats = [
    { name: "L'Industrie Pizzeria", sub: 'Pizza · Williamsburg',            grade: 'A' as const, delay: 35 },
    { name: 'Tatiana by Kwame',     sub: 'Contemporary American · Lincoln', grade: 'A' as const, delay: 44 },
    { name: 'Taqueria Al Pastor',   sub: 'Mexican · Astoria',               grade: 'B' as const, delay: 51 },
    { name: 'Russ & Daughters Cafe',sub: 'Jewish Deli · Lower East Side',   grade: 'A' as const, delay: 58 },
    { name: 'Soothr',               sub: 'Thai · East Village',             grade: 'A' as const, delay: 64 },
    { name: 'Peking Duck House',    sub: 'Chinese · Chinatown',             grade: 'C' as const, delay: 70 },
    { name: 'Lucali',               sub: 'Pizza · Carroll Gardens',         grade: 'A' as const, delay: 76 },
    { name: 'Dhamaka',              sub: 'Indian · Lower East Side',        grade: 'A' as const, delay: 82 },
  ];

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:20" />

      <div style={{ padding: '6px 16px 0', opacity: fade(frame, 0, 16) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.card, borderRadius: 14, border: `2px solid ${C.accent}`, padding: '10px 14px' }}>
          <SearchIcon color={C.accent} size={18} />
          <span style={{ fontSize: 15, color: C.muted }}>Spots, eats, events, transit…</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0', opacity: fade(frame, 12, 28) }}>
        <FilterChip label="All" icon={<span style={{ fontSize: 12 }}>⊞</span>} />
        <FilterChip label="Spots" icon={<span style={{ fontSize: 12 }}>📍</span>} />
        <FilterChip label="Eats" active icon={<span style={{ fontSize: 12 }}>🍽</span>} />
        <FilterChip label="Events" icon={<span style={{ fontSize: 12 }}>📅</span>} />
        <FilterChip label="Transit" icon={<span style={{ fontSize: 12 }}>🚇</span>} />
      </div>

      <div style={{ padding: '14px 16px 6px', opacity: fade(frame, 22, 36) }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase' }}>EATS</span>
      </div>

      <div style={{ padding: '0 16px', overflow: 'hidden' }}>
        {eats.map((e) => (
          <div key={e.name} style={{ opacity: fade(frame, e.delay, e.delay + 14), transform: slideUp(frame, e.delay - 6, 16) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderBottom: `1px solid ${C.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.greenBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                🍽
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{e.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{e.sub}</div>
              </div>
              <GradeBadge grade={e.grade} />
              <span style={{ color: C.border, fontSize: 18 }}>›</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Search" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION 6: Event Card (Home → Events filter active) ──────────────────
export function EventCardComposition() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:19" />

      <div style={{ padding: '4px 20px 0', opacity: fade(frame, 0, 18), transform: slideUp(frame, 0, 20) }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.7, lineHeight: 1.1 }}>Good afternoon, Bed-Stuy</div>
        <div style={{ marginTop: 6, fontSize: 14, color: C.muted, opacity: fade(frame, 16, 32) }}>20 events nearby. 10 spots curated. 5 road delays.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '14px 16px 0', opacity: fade(frame, 22, 38) }}>
        <FilterChip label="Events" active icon={<span style={{ fontSize: 14 }}>📅</span>} />
        <FilterChip label="Food" icon={<span style={{ fontSize: 14 }}>🍽</span>} />
        <FilterChip label="Spots" icon={<span style={{ fontSize: 14 }}>📍</span>} />
        <FilterChip label="Transit" icon={<span style={{ fontSize: 14 }}>🚇</span>} />
      </div>

      <div style={{ padding: '14px 16px 0', opacity: fade(frame, 40, 56), transform: slideUp(frame, 36, 28) }}>
        <Card style={{ borderColor: C.accent, borderWidth: 1.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: C.accent }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, letterSpacing: 1, textTransform: 'uppercase' }}>FEATURED</span>
          </div>
          <CategoryBadge label="🎪 Street Fair" />
          <div style={{ marginTop: 8, fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.4 }}>Picnic House</div>
          <div style={{ marginTop: 6, fontSize: 13, color: C.muted }}>🕐 Sun, Apr 5 · 1:13 PM</div>
          <div style={{ marginTop: 3, fontSize: 13, color: C.muted }}>↑ Brooklyn, Brooklyn</div>
          <div style={{ marginTop: 10, fontSize: 14, color: C.muted, lineHeight: 1.5 }}>Something's happening on the block. Check it out.</div>
        </Card>
      </div>

      {/* Transit row */}
      <div style={{ padding: '12px 16px 0', display: 'flex', gap: 10, opacity: fade(frame, 58, 72) }}>
        {[
          { label: 'BQE',                sub: 'Heavy +18m',   icon: '🚗' },
          { label: 'Williamsburg Bridge', sub: 'Moderate +8m', icon: '🌉' },
          { label: 'Rat Radar',          sub: 'Active',        icon: '⚠️' },
        ].map((t) => (
          <div key={t.label} style={{ flex: 1, background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: '8px 10px' }}>
            <div style={{ fontSize: 11, color: C.muted }}>{t.icon} {t.label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginTop: 2 }}>{t.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '14px 16px 0', opacity: fade(frame, 75, 88) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>🗓 What's Happening</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>See all 19</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { opacity: fade(frame, 82, 95), name: 'Celebration', time: '1:13 PM' },
            { opacity: fade(frame, 90, 103), name: 'Uconn Marching B.', time: '1:13 PM' },
          ].map((c) => (
            <div key={c.name} style={{ flex: 1, opacity: c.opacity }}>
              <Card style={{ padding: 12 }}>
                <CategoryBadge label="🎪 Street Fair" />
                <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: C.text }}>{c.name}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>Sun, Apr 5 · {c.time}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: C.muted }}>↑ Manhattan</div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Home" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION: Search ──────────────────────────────────────────────────────
// Mirrors the live WTV Search tab. Animates the result list staging in,
// then a category-chip filter swap to demonstrate the cross-entity behavior.
export function SearchComposition() {
  const frame = useCurrentFrame();

  // Three filter chip states: All (0–80) → Eats (80–150) → All (150+)
  // Each result entity tags itself so we can show/hide on chip change.
  type Kind = 'spot' | 'eat' | 'event';
  type Result = {
    kind: Kind;
    name: string;
    sub: string;
    icon: string;
    iconBg: string;
    rating?: string;
    grade?: 'A' | 'B';
  };

  const results: Result[] = [
    { kind: 'spot',  name: 'Devocion',                       sub: 'Cafe · Williamsburg',           icon: '☕', iconBg: '#F4ECE3', rating: '4.6' },
    { kind: 'spot',  name: 'Mood Ring',                      sub: 'Bar · Bushwick',                icon: '🍸', iconBg: '#EFE6F4', rating: '4.4' },
    { kind: 'spot',  name: 'Cafe Forgot',                    sub: 'Shop · Lower East Side',        icon: '🛍', iconBg: '#E6EEF6', rating: '4.7' },
    { kind: 'event', name: 'Myrtle Ave Block Party',         sub: 'Block Party · Clinton Hill',    icon: '🎉', iconBg: '#FBE6E0' },
    { kind: 'eat',   name: 'Smorgasburg Williamsburg',       sub: 'Market · Williamsburg',         icon: '🥡', iconBg: '#E8F2EA' },
    { kind: 'event', name: 'Tompkins Square Jazz',           sub: 'Concert · East Village',        icon: '🎷', iconBg: '#F4ECE3' },
    { kind: 'eat',   name: "L'Industrie Pizzeria",           sub: 'Pizza · Williamsburg',          icon: '🍕', iconBg: '#FBE6E0', grade: 'A' },
    { kind: 'eat',   name: 'Tatiana by Kwame',               sub: 'Contemporary · Lincoln Ctr',    icon: '🍽', iconBg: '#E8F2EA', grade: 'A' },
  ];

  // Chip filter timeline
  // 0–75 frames  → All
  // 75–150       → Eats
  const activeChip: 'All' | 'Eats' = frame < 75 ? 'All' : 'Eats';
  const visibleResults = results.filter((r) => activeChip === 'All' || r.kind === 'eat');

  // Tap pulse on Eats chip when it activates
  const tapPulse = interpolate(frame, [70, 76, 82], [1, 0.92, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:40" />

      {/* Search bar */}
      <div style={{ padding: '4px 16px 0', opacity: fade(frame, 0, 18), transform: slideUp(frame, 0, 16) }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: C.accentSoft,
          borderRadius: 14,
          border: `1.5px solid ${C.accent}`,
          padding: '12px 14px',
        }}>
          <SearchIcon color={C.accent} size={18} />
          <span style={{ fontSize: 15, color: C.muted, fontWeight: 500 }}>Spots, eats, events, transit…</span>
        </div>
      </div>

      {/* Filter chips — horizontal */}
      <div style={{
        display: 'flex', gap: 8, padding: '14px 16px 0',
        opacity: fade(frame, 8, 24),
        overflow: 'hidden',
      }}>
        <div style={{ transform: activeChip === 'All' ? 'scale(1)' : 'scale(0.96)', transition: 'none' }}>
          <FilterChip label="All" active={activeChip === 'All'} icon={<span style={{ fontSize: 13 }}>▦</span>} />
        </div>
        <FilterChip label="Spots" icon={<span style={{ fontSize: 13 }}>📍</span>} />
        <div style={{ transform: `scale(${activeChip === 'Eats' ? tapPulse : 1})`, transformOrigin: 'center' }}>
          <FilterChip label="Eats" active={activeChip === 'Eats'} icon={<span style={{ fontSize: 13 }}>🍽</span>} />
        </div>
        <FilterChip label="Events" icon={<span style={{ fontSize: 13 }}>📅</span>} />
        <FilterChip label="Transit" icon={<span style={{ fontSize: 13 }}>🚇</span>} />
      </div>

      {/* NEARBY label */}
      <div style={{
        padding: '18px 18px 8px',
        fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: C.muted, textTransform: 'uppercase',
        opacity: fade(frame, 18, 30),
      }}>
        Nearby
      </div>

      {/* Results list */}
      <div style={{ padding: '0 16px', flex: 1, overflow: 'hidden' }}>
        {visibleResults.map((r, i) => {
          // Stagger the rows in. After the chip swap, re-stagger the filtered set.
          const baseDelay = activeChip === 'All' ? 22 + i * 7 : 80 + i * 6;
          const rowOpacity = fade(frame, baseDelay, baseDelay + 14);
          const rowY = slideUp(frame, baseDelay, 18);
          return (
            <div
              key={`${activeChip}-${r.name}`}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 0',
                borderBottom: `1px solid ${C.border}`,
                opacity: rowOpacity,
                transform: rowY,
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: r.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                {r.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{r.sub}</div>
              </div>
              {r.rating && (
                <div style={{
                  background: C.accentSoft, color: C.accent,
                  borderRadius: 8, padding: '4px 9px',
                  fontSize: 12, fontWeight: 800,
                }}>
                  {r.rating}★
                </div>
              )}
              {r.grade && <GradeBadge grade={r.grade} />}
              <div style={{ color: '#C8C8C8', fontSize: 14, fontWeight: 700 }}>›</div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Search" />
      </div>
    </AbsoluteFill>
  );
}

// ─── COMPOSITION 7: Transit Card ──────────────────────────────────────────────
export function TransitCardComposition() {
  const frame = useCurrentFrame();

  const lines = [
    { line: 'L', color: C.l,    label: 'Bedford Av',         crowd: 'Packed',  crowdColor: C.red,    delay: 50 },
    { line: 'G', color: C.g,    label: 'Flushing Av',        crowd: 'Busy',    crowdColor: C.yellow, delay: 58 },
    { line: 'J', color: C.jz,   label: 'Halsey St',          crowd: 'Normal',  crowdColor: C.green,  delay: 66 },
    { line: 'A', color: C.ace,  label: 'Utica Av',           crowd: 'Quiet',   crowdColor: C.green,  delay: 74 },
    { line: '3', color: C.r123, label: 'Eastern Pkwy',       crowd: 'Busy',    crowdColor: C.yellow, delay: 82 },
  ];

  return (
    <AbsoluteFill style={{ background: C.bg, fontFamily: 'system-ui' }}>
      <StatusBar time="1:19" />

      <div style={{ padding: '4px 20px 0', opacity: fade(frame, 0, 18), transform: slideUp(frame, 0, 20) }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.7, lineHeight: 1.1 }}>Good afternoon, Bed-Stuy</div>
        <div style={{ marginTop: 6, fontSize: 14, color: C.muted, opacity: fade(frame, 16, 30) }}>8 stations tracked near you.</div>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '14px 16px 0', opacity: fade(frame, 20, 35) }}>
        <FilterChip label="Events" icon={<span style={{ fontSize: 14 }}>📅</span>} />
        <FilterChip label="Food" icon={<span style={{ fontSize: 14 }}>🍽</span>} />
        <FilterChip label="Spots" icon={<span style={{ fontSize: 14 }}>📍</span>} />
        <FilterChip label="Transit" active icon={<span style={{ fontSize: 14 }}>🚇</span>} />
      </div>

      {/* Transit summary chips */}
      <div style={{ padding: '14px 16px 0', opacity: fade(frame, 30, 44) }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'BQE Heavy', color: C.red, bg: '#FEECEC' },
            { label: 'Williamsburg Bridge Moderate', color: C.yellow, bg: '#FFF8E0' },
            { label: 'Bedford Ave Packed', color: C.accent, bg: C.accentSoft },
          ].map((chip) => (
            <div key={chip.label} style={{ background: chip.bg, borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 700, color: chip.color }}>
              {chip.label}
            </div>
          ))}
        </div>
      </div>

      {/* Stations */}
      <div style={{ padding: '16px 16px 0', opacity: fade(frame, 42, 54) }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 12 }}>🚇 Nearby Stations</div>
        {lines.map((s) => (
          <div key={s.line} style={{ opacity: fade(frame, s.delay, s.delay + 14), transform: slideUp(frame, s.delay - 5, 16) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: `1px solid ${C.border}` }}>
              <SubwayPill line={s.line} color={s.color} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{s.label}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>0.3 mi · 6 min walk</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: s.crowdColor }}>{s.crowd}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>next: 4 min</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <TabBar active="Home" />
      </div>
    </AbsoluteFill>
  );
}
