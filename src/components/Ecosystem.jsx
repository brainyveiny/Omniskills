import React, { useState, useEffect, memo } from 'react';
import { useInView } from '../hooks/useInView';

/* --- DESIGN TOKENS --- */
const strokePrimary = "#1F2937"; // Graphite
const strokeSecondary = "#9CA3AF"; // Soft gray
const strokeTertiary = "#E5E7EB"; // Very subtle grid
const fillWhite = "#FFFFFF";
const fillBase = "#F9FAFB"; 
const fillShadow = "#F3F4F6"; 
const fillDarkShadow = "#E5E7EB";
const accentRed = "#D92D20";
const warmGlow = "#FEF3C7"; // Subtle amber warmth

/* --- TRUE ISOMETRIC ENGINE --- */
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);
const SCALE = 45; // Expansive world scale

const iso = (x, y, z = 0) => ({
  x: (x - y) * COS30 * SCALE,
  y: ((x + y) * SIN30 - z) * SCALE
});

/* --- ISOMETRIC PRIMITIVES (Memoized for Performance) --- */
const IsoBlock = memo(({ x, y, z, w, h, d, stroke = strokePrimary, strokeWidth = 1, top = fillWhite, right = fillDarkShadow, left = fillBase, opacity = 1, className = "" }) => {
  const b0 = iso(x, y, z);
  const bX = iso(x + w, y, z);
  const bY = iso(x, y + h, z);
  const bXY = iso(x + w, y + h, z);
  const t0 = iso(x, y, z + d);
  const tX = iso(x + w, y, z + d);
  const tY = iso(x, y + h, z + d);
  const tXY = iso(x + w, y + h, z + d);

  return (
    <g stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" opacity={opacity} className={className}>
      <polygon points={`${b0.x},${b0.y} ${bX.x},${bX.y} ${tX.x},${tX.y} ${t0.x},${t0.y}`} fill={right} />
      <polygon points={`${b0.x},${b0.y} ${bY.x},${bY.y} ${tY.x},${tY.y} ${t0.x},${t0.y}`} fill={left} />
      <polygon points={`${t0.x},${t0.y} ${tX.x},${tX.y} ${tXY.x},${tXY.y} ${tY.x},${tY.y}`} fill={top} />
    </g>
  );
});

const IsoCylinder = memo(({ x, y, z, r, h, stroke = strokePrimary, strokeWidth = 1, top = fillWhite, side = fillBase, className = "" }) => {
  const centerBase = iso(x, y, z);
  const centerTop = iso(x, y, z + h);
  const rx = r * COS30 * SCALE;
  const ry = r * SIN30 * SCALE;

  return (
    <g stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" className={className}>
      <path 
        d={`M ${centerBase.x - rx} ${centerBase.y} 
            A ${rx} ${ry} 0 0 0 ${centerBase.x + rx} ${centerBase.y} 
            L ${centerTop.x + rx} ${centerTop.y} 
            A ${rx} ${ry} 0 0 1 ${centerTop.x - rx} ${centerTop.y} Z`} 
        fill={side} 
      />
      <ellipse cx={centerTop.x} cy={centerTop.y} rx={rx} ry={ry} fill={top} />
    </g>
  );
});

/* --- LANDSCAPE ARCHITECTURE --- */
const RenderTree = memo(({ x, y }) => (
  <g className="anim-tree-sway" style={{ transformOrigin: `${iso(x,y,0).x}px ${iso(x,y,0).y}px`, animationDelay: `${(x*y)%3}s` }}>
    <circle cx={iso(x, y, 0).x} cy={iso(x, y, 0).y} r="5" fill="rgba(0,0,0,0.02)" filter="url(#shadow-ambient)" />
    <IsoCylinder x={x} y={y} z={0} r={0.06} h={0.3} stroke={strokeSecondary} strokeWidth={0.5} side={fillDarkShadow} top={strokeSecondary} />
    <IsoBlock x={x-0.15} y={y-0.15} z={0.3} w={0.3} h={0.3} d={0.3} stroke={strokeSecondary} strokeWidth={0.5} top={fillWhite} left={fillBase} right={fillDarkShadow} opacity={0.85} />
  </g>
));

const RenderPlazaDetail = memo(({ x, y }) => (
  <path 
    d={`M ${iso(x-0.5, y-0.5, 0).x} ${iso(x-0.5, y-0.5, 0).y} L ${iso(x+0.5, y-0.5, 0).x} ${iso(x+0.5, y-0.5, 0).y} L ${iso(x+0.5, y+0.5, 0).x} ${iso(x+0.5, y+0.5, 0).y} L ${iso(x-0.5, y+0.5, 0).x} ${iso(x-0.5, y+0.5, 0).y} Z`} 
    fill="none" stroke={strokeTertiary} strokeWidth="1" strokeDasharray="2 4"
  />
));

/* --- ARCHITECTURAL LANDMARKS --- */

// The Learner Pawn (Abstract minimalist figurine, never louder than buildings)
const LearnerPawn = ({ x, y, z, isWalking }) => {
  const pos = iso(x, y, z);
  return (
    <g className="transition-all duration-[3000ms] ease-linear" style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
      {/* Subtle contact shadow */}
      <ellipse cx="0" cy="0" rx="8" ry="4" fill="rgba(0,0,0,0.06)" filter="url(#shadow-ambient)" />
      
      {/* Light cast by the learner onto the pathway */}
      <ellipse cx="0" cy="0" rx="20" ry="10" fill="rgba(255, 235, 175, 0.4)" filter="url(#shadow-ambient)" className="anim-light-cast mix-blend-multiply" />
      
      {/* Elegant, calm abstract form */}
      <g transform="translate(0, -6)">
        <path d="M -2 0 L 2 0 L 1.5 -6 L -1.5 -6 Z" fill={strokePrimary} stroke={strokePrimary} strokeWidth="1" strokeLinejoin="round" />
        <circle cx="0" cy="-7.5" r="2" fill={strokePrimary} />
      </g>
    </g>
  );
};

/* --- INNOVATION DISTRICT MASTERPLAN --- */
const DISTRICT_NODES = {
  arena: { id: 'arena', district: 'Competition District', title: 'Competition Arena', subtitle: 'National Championships', x: -5, y: -4 },
  edu: { id: 'edu', district: 'Education District', title: 'University', subtitle: 'Foundation of Knowledge', x: -4, y: 1 },
  mentors: { id: 'mentors', district: 'Education District', title: 'Mentors', subtitle: 'Guided Excellence', x: -1.5, y: -2.5 },
  public: { id: 'public', district: 'Civic District', title: 'Public Initiatives', subtitle: 'Government Missions', x: 2, y: -5 },
  research: { id: 'research', district: 'Innovation District', title: 'Research Lab', subtitle: 'Advanced Discovery', x: -2, y: 4.5 },
  industry: { id: 'industry', district: 'Industry District', title: 'Industry Partners', subtitle: 'Real-world Experience', x: 1, y: 1.5 },
  innovation: { id: 'innovation', district: 'Innovation District', title: 'Innovation Hub', subtitle: 'Future Technologies', x: 5, y: -2 },
  career: { id: 'career', district: 'Industry District', title: 'Career Pathways', subtitle: 'Global Opportunities', x: 4.5, y: 4 },
  plaza: { id: 'plaza', district: '', title: '', subtitle: '', x: 0, y: 0 } 
};

// Memoized Building renderer for performance
const RenderBuilding = memo(({ id, node, isActive }) => {
  const { x, y } = node;
  
  // Platform bounds vary by building
  let bw = 2.4, bh = 2.4, px = x - 1.2, py = y - 1.2;
  if (id === 'edu') {
    bw = 5.6; bh = 3.0; px = x - 2.8; py = y - 1.5;
  }
  
  const platform = <IsoBlock x={px} y={py} z={0} w={bw} h={bh} d={0.15} stroke={strokeSecondary} left={fillBase} right={fillDarkShadow} top={fillWhite} />;

  let struct = null;
  switch (id) {
    case 'arena':
      struct = (
        <g>
          {/* Audience ring glow */}
          {isActive && <circle cx={iso(x, y, 1.4).x} cy={iso(x, y, 1.4).y} r="22" fill="rgba(217,45,32,0.03)" className="anim-pulse-slow blur-md" />}
          
          <IsoCylinder x={x} y={y} z={0.15} r={1.6} h={0.6} side={fillDarkShadow} top={fillWhite} />
          <IsoCylinder x={x} y={y} z={0.75} r={1.2} h={0.6} side={fillDarkShadow} top={fillWhite} />
          <IsoCylinder x={x} y={y} z={1.35} r={0.8} h={0.6} side={fillDarkShadow} top={fillWhite} />
          
          {/* Spotlight sweep */}
          <g className={isActive ? 'anim-spotlight-active' : 'opacity-0'} style={{ transformOrigin: `${iso(x,y,2).x}px ${iso(x,y,2).y}px` }}>
            <path d={`M ${iso(x,y,2).x} ${iso(x,y,2).y} L ${iso(x-2,y-1,0).x} ${iso(x-2,y-1,0).y} L ${iso(x-1,y-2,0).x} ${iso(x-1,y-2,0).y} Z`} fill={warmGlow} opacity="0.15" style={{ mixBlendMode: 'multiply' }} />
          </g>
        </g>
      );
      break;
    case 'edu':
      struct = (
        <g>
          <IsoBlock x={x-2.5} y={y-1.2} z={0.15} w={5} h={2.4} d={1.2} />
          {/* Courtyard softly brightens */}
          <IsoBlock x={x-2.4} y={y-1.1} z={0.15} w={4.8} h={2.2} d={1.2} left={fillWhite} right={fillWhite} opacity={isActive ? 0.95 : 0.4} top={isActive ? warmGlow : fillWhite} stroke={strokeSecondary} className="transition-all duration-[2000ms]" />
          <IsoBlock x={x-2.7} y={y-1.4} z={1.35} w={5.4} h={2.8} d={0.1} top={fillWhite} right={fillDarkShadow} left={fillBase} />
          <line x1={iso(x,y,1.45).x} y1={iso(x,y,1.45).y} x2={iso(x,y,2.2).x} y2={iso(x,y,2.2).y} stroke={strokePrimary} strokeWidth={1} />
        </g>
      );
      break;
    case 'research':
      struct = (
        <g>
          <IsoBlock x={x-0.5} y={y-0.5} z={0.15} w={1.5} h={1} d={1} opacity={0.85} left={fillDarkShadow} right="#D1D5DB" />
          {/* Dome rotates slightly */}
          <g className={isActive ? "anim-dome-rotate" : ""} style={{ transformOrigin: `${iso(x-0.4,y+0.6,1).x}px ${iso(x-0.4,y+0.6,1).y}px` }}>
            <IsoBlock x={x-1} y={y+0.2} z={0.15} w={1.2} h={0.8} d={1.4} opacity={0.9} left={fillWhite} right={fillShadow} top={fillWhite} />
          </g>
          {/* Beacon pulse */}
          <circle cx={iso(x-0.5, y+0.5, 1.65).x} cy={iso(x-0.5, y+0.5, 1.65).y} r={1.5} fill={isActive ? accentRed : strokeSecondary} className="transition-colors duration-[2000ms]" />
          {isActive && <circle cx={iso(x-0.5, y+0.5, 1.65).x} cy={iso(x-0.5, y+0.5, 1.65).y} r={4} fill={accentRed} opacity={0.2} className="anim-pulse-slow blur-[1px]" />}
        </g>
      );
      break;
    case 'industry':
      struct = (
        <g>
          <IsoBlock x={x-0.8} y={y-0.8} z={0.15} w={0.6} h={1.6} d={0.8} />
          <IsoBlock x={x} y={y-0.8} z={0.15} w={0.6} h={1.6} d={1.2} />
          <IsoBlock x={x+0.8} y={y-0.8} z={0.15} w={0.2} h={1.6} d={1.8} />
          {/* Conveyor moves briefly */}
          <path d={`M ${iso(x-1,y+1.2,0.15).x} ${iso(x-1,y+1.2,0.15).y} L ${iso(x+1,y+1.2,0.15).x} ${iso(x+1,y+1.2,0.15).y}`} stroke={strokeSecondary} strokeWidth="1.5" strokeDasharray="2 2" className={isActive ? "anim-conveyor-active" : ""} />
        </g>
      );
      break;
    case 'innovation':
      struct = (
        <g>
          <IsoBlock x={x-0.8} y={y-0.8} z={0.5} w={0.6} h={0.6} d={0.6} />
          <IsoBlock x={x+0.2} y={y-0.5} z={1} w={0.8} h={0.8} d={0.8} />
          {/* Floating module rotates once */}
          <g className={isActive ? 'anim-rotate-once' : ''} style={{ transformOrigin: `${iso(x+0.05, y+0.45, 1.75).x}px ${iso(x+0.05, y+0.45, 1.75).y}px` }}>
            <IsoBlock x={x-0.2} y={y+0.2} z={1.5} w={0.5} h={0.5} d={0.5} stroke={strokePrimary} strokeWidth={1} />
          </g>
        </g>
      );
      break;
    case 'career':
      struct = (
        <g>
          <IsoBlock x={x-0.2} y={y-0.2} z={0.15} w={0.4} h={0.4} d={0.5} />
          {/* Globe rotates slowly */}
          <g className={isActive ? "anim-globe-rotate" : ""} style={{ transformOrigin: `${iso(x,y,1.5).x}px ${iso(x,y,1.5).y}px` }}>
            <circle cx={iso(x,y,1.5).x} cy={iso(x,y,1.5).y} r={18} fill="none" stroke={strokeSecondary} strokeWidth={1} />
            <ellipse cx={iso(x,y,1.5).x} cy={iso(x,y,1.5).y} rx={6} ry={18} fill="none" stroke={strokeSecondary} strokeWidth={1} />
            <ellipse cx={iso(x,y,1.5).x} cy={iso(x,y,1.5).y} rx={18} ry={6} fill="none" stroke={strokeSecondary} strokeWidth={1} />
          </g>
        </g>
      );
      break;
    case 'mentors':
      struct = (
        <g>
          <IsoBlock x={x-0.8} y={y-0.4} z={0.15} w={1.6} h={0.8} d={0.1} />
          {/* Warm pavilion illumination */}
          <IsoBlock x={x-0.6} y={y-0.2} z={0.25} w={0.2} h={0.4} d={0.6} top={isActive ? warmGlow : fillWhite} className="transition-colors duration-[2000ms]" />
          <IsoBlock x={x+0.4} y={y-0.2} z={0.25} w={0.2} h={0.4} d={0.6} top={isActive ? warmGlow : fillWhite} className="transition-colors duration-[2000ms]" />
          <IsoBlock x={x-0.8} y={y-0.4} z={0.85} w={1.6} h={0.8} d={0.2} opacity={isActive ? 0.95 : 0.8} />
        </g>
      );
      break;
    case 'public':
      struct = (
        <g>
          <IsoBlock x={x-0.8} y={y-0.8} z={0.15} w={1.6} h={1.6} d={0.6} />
          <IsoBlock x={x-0.4} y={y-0.4} z={0.75} w={0.8} h={0.8} d={0.4} top={isActive ? fillWhite : fillShadow} className="transition-colors duration-[2000ms]" />
          {/* Civic beacon pulse */}
          {isActive && <circle cx={iso(x,y,1.15).x} cy={iso(x,y,1.15).y} r={4} fill={strokeSecondary} className="anim-pulse-slow blur-sm opacity-50" />}
        </g>
      );
      break;
    case 'plaza':
      struct = (
        <g>
          <IsoCylinder x={x} y={y} z={0.01} r={1.6} h={0.05} top="#F9FAFB" side={strokeTertiary} />
          <IsoCylinder x={x} y={y} z={0.06} r={1.0} h={0.02} top="#FFFFFF" side={strokeTertiary} stroke={strokeSecondary} />
          <IsoCylinder x={x} y={y} z={0.08} r={0.2} h={0.05} top={accentRed} side={strokeSecondary} stroke="none" />
        </g>
      );
      break;
    default:
      return null;
  }

  const center2D = iso(x, y, 0);
  return (
    <g filter="url(#shadow-building)">
      <g transform={`translate(${center2D.x}, ${center2D.y}) scale(1.1) translate(${-center2D.x}, ${-center2D.y})`}>
        {platform}
        {struct}
      </g>
    </g>
  );
});

const RenderCallout = memo(({ id, node, isActive }) => {
  if (id === 'plaza') return null;
  const { x, y } = node;
  const lblPos = iso(x, y, 3.2); 
  const lblOffsetX = x > 0 ? -140 : 20;

  return (
    <g className={`transition-opacity duration-[2000ms] ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <path d={`M ${lblPos.x} ${lblPos.y} L ${lblPos.x} ${lblPos.y - 45} L ${lblPos.x + (x > 0 ? -25 : 25)} ${lblPos.y - 45}`} stroke={strokePrimary} strokeWidth="1" fill="none" />
      <text x={lblPos.x + lblOffsetX} y={lblPos.y - 52} fontSize="9" fontWeight="700" letterSpacing="0.25em" fill={strokeSecondary}>
        {node.district.toUpperCase()}
      </text>
      <text x={lblPos.x + lblOffsetX} y={lblPos.y - 32} fontSize="16" fontWeight="700" letterSpacing="0.05em" fill={strokePrimary}>
        {node.title.toUpperCase()}
      </text>
      <text x={lblPos.x + lblOffsetX} y={lblPos.y - 16} fontSize="11" fontWeight="400" fill={strokeSecondary}>
        {node.subtitle}
      </text>
    </g>
  );
});

/* --- THE JOURNEYS --- */
const CURATED_JOURNEYS = [
  ['edu', 'plaza', 'mentors', 'public', 'arena', 'research', 'industry', 'innovation', 'career'],
  ['edu', 'research', 'innovation', 'plaza', 'industry', 'career'],
  ['public', 'mentors', 'plaza', 'arena', 'career']
];

export default function Ecosystem() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  
  const [journeyIdx, setJourneyIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState('paused'); 
  
  const currentJourney = CURATED_JOURNEYS[journeyIdx];
  const currentNodeId = currentJourney[stepIdx];
  
  const nextStepIdx = stepIdx === currentJourney.length - 1 ? 0 : stepIdx + 1;
  const nextJourneyIdx = stepIdx === currentJourney.length - 1 ? (journeyIdx + 1) % CURATED_JOURNEYS.length : journeyIdx;
  const nextNodeId = CURATED_JOURNEYS[nextJourneyIdx][nextStepIdx];

  // Restrained, quiet confidence timing
  useEffect(() => {
    if (!isInView) return;
    let timeout;
    
    if (phase === 'paused') {
      // Pause at building for 3.5 seconds to appreciate the subtle reaction
      timeout = setTimeout(() => setPhase('walking'), currentNodeId === 'plaza' ? 1000 : 3500);
    } else if (phase === 'walking') {
      // Walk duration 3 seconds
      timeout = setTimeout(() => {
        setStepIdx(nextStepIdx);
        setJourneyIdx(nextJourneyIdx);
        setPhase('paused');
      }, 3000); 
    }
    return () => clearTimeout(timeout);
  }, [phase, stepIdx, journeyIdx, isInView, currentNodeId, currentJourney.length, nextStepIdx, nextJourneyIdx]);

  const isWalking = phase === 'walking';
  
  const targetNodeForPawn = DISTRICT_NODES[isWalking ? nextNodeId : currentNodeId];
  const pawnX = targetNodeForPawn.x + 0.8;
  const pawnY = targetNodeForPawn.y + 0.8;

  const prevNode = DISTRICT_NODES[currentNodeId];
  const targetNode = DISTRICT_NODES[nextNodeId];

  // Placed thoughtfully so as to not clutter
  const trees = [{x:-3, y:-1}, {x:4, y:2}, {x:-6, y:-2}, {x:0, y:-3}, {x:1.5, y:5}, {x:-2, y:5}];
  const plazas = [{x:-2, y:-2}, {x:2, y:3}, {x:3, y:-3}];

  // Z-Sorting object creation (Memoizing prevents layout thrashing)
  const sortedWorld = React.useMemo(() => {
    const objects = [
      ...Object.values(DISTRICT_NODES).map(node => ({
        type: 'building',
        id: node.id,
        node: node,
        depth: node.x + node.y
      })),
      ...trees.map((t, i) => ({ type: 'tree', id: `tree-${i}`, node: t, depth: t.x + t.y })),
      ...plazas.map((p, i) => ({ type: 'plaza_detail', id: `plaza-${i}`, node: p, depth: p.x + p.y })),
      { type: 'pawn', id: 'pawn', depth: pawnX + pawnY, x: pawnX, y: pawnY }
    ];

    objects.sort((a, b) => a.depth - b.depth);

    return objects.map(obj => {
      if (obj.type === 'pawn') {
        return <LearnerPawn key="pawn" x={obj.x} y={obj.y} z={0.15} isWalking={isWalking} />;
      } else if (obj.type === 'tree') {
        return <RenderTree key={obj.id} x={obj.node.x} y={obj.node.y} />;
      } else if (obj.type === 'plaza_detail') {
        return <RenderPlazaDetail key={obj.id} x={obj.node.x} y={obj.node.y} />;
      } else {
        return <RenderBuilding key={obj.id} id={obj.id} node={obj.node} isActive={obj.id === currentNodeId && !isWalking} />;
      }
    });
  }, [currentNodeId, isWalking, pawnX, pawnY]);

  const callouts = React.useMemo(() => Object.values(DISTRICT_NODES).map(node => (
    <RenderCallout key={`callout-${node.id}`} id={node.id} node={node} isActive={node.id === currentNodeId && !isWalking} />
  )), [currentNodeId, isWalking]);

  return (
    <section id="ecosystem" className="py-24 lg:py-32 bg-white overflow-hidden selection:bg-brand-primary/10">
      <style>
        {`
          /* Motion Philosophy: Slow acceleration, gentle deceleration, subtle anticipation */
          @keyframes spotlight-sweep { 0%, 100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
          .anim-spotlight-active { animation: spotlight-sweep 6s ease-in-out forwards; }
          
          @keyframes pulse-slow { 0%, 100% { opacity: 0; transform: scale(0.95); } 50% { opacity: 0.1; transform: scale(1.05); } }
          .anim-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
          
          @keyframes conveyor-active { 100% { stroke-dashoffset: -12; } }
          .anim-conveyor-active { animation: conveyor-active 2s linear forwards; }
          
          @keyframes globe-rotate { 100% { transform: rotate(180deg); } }
          .anim-globe-rotate { animation: globe-rotate 10s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
          
          @keyframes dome-rotate { 100% { transform: rotate(45deg); } }
          .anim-dome-rotate { animation: dome-rotate 4s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

          @keyframes rotate-once { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .anim-rotate-once { animation: rotate-once 3s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

          @keyframes architectural-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }
          .anim-architectural-bob { animation: architectural-bob 1s ease-in-out infinite; }

          @keyframes tree-sway { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(1deg); } }
          .anim-tree-sway { animation: tree-sway 8s ease-in-out infinite; }

          /* 2-3 birds flying slowly every 15-20 seconds. Non-looping distracting. */
          @keyframes slow-bird { 
            0% { transform: translate(-300px, 150px) scale(0.6); opacity: 0; } 
            5% { opacity: 0.3; } 
            15% { transform: translate(600px, -200px) scale(0.6); opacity: 0; } 
            100% { transform: translate(600px, -200px) scale(0.6); opacity: 0; } 
          }
          .anim-slow-bird { animation: slow-bird 20s linear infinite; }
          .anim-slow-bird-2 { animation: slow-bird 25s linear infinite 5s; }
          
          /* Path Embedded Lighting */
          @keyframes path-glow-trail { 
            0% { stroke-dashoffset: 200; opacity: 0; } 
            10% { opacity: 0.7; } 
            80% { opacity: 0.7; } 
            100% { stroke-dashoffset: -200; opacity: 0; } 
          }
          .anim-path-glow { 
            stroke-dasharray: 200; 
            animation: path-glow-trail 3.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; 
          }
        `}
      </style>

      {/* World Composition: Expansive edge-to-edge layout */}
      <div className="w-full px-4 lg:px-8">
        
        <div className={`text-center mb-16 fade-up ${isInView ? 'in-view' : ''} max-w-7xl mx-auto`}>
          <span className="inline-block text-[10px] font-bold text-neutral-400 tracking-[0.2em] uppercase mb-4">
            The Living World
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Where Learning Meets <span className="font-medium text-brand-primary">Opportunity</span>
          </h2>
        </div>

        <div ref={ref} className={`relative w-full max-w-[1400px] mx-auto aspect-[16/9] transition-opacity duration-[2000ms] delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <svg viewBox="-550 -350 1100 700" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            
            <defs>
              <filter id="shadow-ambient" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.04"/>
              </filter>
              <filter id="shadow-building" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#000000" floodOpacity="0.05"/>
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.02"/>
              </filter>
            </defs>

            {/* Expansive Masterplan Ground Plane */}
            <IsoBlock x={-8} y={-8} z={-1} w={16} h={16} d={0.99} stroke={strokeTertiary} left="#F3F4F6" right={fillDarkShadow} top="#FAFAFA" className="drop-shadow-2xl" />
            
            {/* Embedded Architectural Lighting (Neutral stone paths) */}
            {CURATED_JOURNEYS.map((journey, jIdx) => (
              journey.map((nodeId, nIdx) => {
                if (nIdx === 0) return null;
                const p1 = DISTRICT_NODES[journey[nIdx - 1]];
                const p2 = DISTRICT_NODES[nodeId];
                return (
                  <line 
                    key={`path-base-${jIdx}-${nIdx}`}
                    x1={iso(p1.x, p1.y, 0.01).x} y1={iso(p1.x, p1.y, 0.01).y}
                    x2={iso(p2.x, p2.y, 0.01).x} y2={iso(p2.x, p2.y, 0.01).y}
                    stroke="#F3F4F6" strokeWidth="6" strokeLinecap="round"
                  />
                );
              })
            ))}

            {/* Active Paving Glow (Trails behind the learner) */}
            {isWalking && (
              <line 
                key={`glow-${journeyIdx}-${stepIdx}`}
                x1={iso(prevNode.x, prevNode.y, 0.02).x} y1={iso(prevNode.x, prevNode.y, 0.02).y}
                x2={iso(targetNode.x, targetNode.y, 0.02).x} y2={iso(targetNode.x, targetNode.y, 0.02).y}
                stroke={warmGlow} strokeWidth="4" strokeLinecap="round" className="anim-path-glow" style={{ mixBlendMode: 'multiply' }}
              />
            )}

            {/* Complete rendering pipeline with strict Z-depth sorting */}
            {sortedWorld}
            {callouts}

            {/* Minimal ambient life */}
            <g className="anim-slow-bird pointer-events-none">
              <path d="M 0 0 Q 3 -3 6 0 Q 3 -1 0 0" fill={strokeSecondary} />
              <path d="M 6 0 Q 9 -3 12 0 Q 9 -1 6 0" fill={strokeSecondary} />
            </g>
            <g className="anim-slow-bird-2 pointer-events-none">
              <path d="M 0 0 Q 4 -4 8 0 Q 4 -1 0 0" fill={strokeSecondary} />
              <path d="M 8 0 Q 12 -4 16 0 Q 12 -1 8 0" fill={strokeSecondary} />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
