import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   Worlds Data (Championships)
   ═══════════════════════════════════════════════════════ */
const worlds = [
  {
    name: 'Circuit',
    fullName: 'Skill-on-Circuit',
    philosophy: 'The foundation of the physical-digital bridge.',
    skills: ['Electronics', 'Embedded Systems', 'IoT'],
  },
  {
    name: 'Code',
    fullName: 'Skill-on-Code',
    philosophy: 'Architecting the logic of tomorrow.',
    skills: ['Programming', 'AI', 'Data Science'],
  },
  {
    name: 'Robotics',
    fullName: 'Skill-on-Robotics',
    philosophy: 'Breathing movement into intelligent systems.',
    skills: ['Automation', 'Mechatronics'],
  },
  {
    name: 'Design',
    fullName: 'Skill-on-Design',
    philosophy: 'Where human experience meets engineering.',
    skills: ['UI/UX', 'Product Design'],
  },
  {
    name: 'Business',
    fullName: 'Skill-on-Business',
    philosophy: 'Transforming technical innovation into market impact.',
    skills: ['Management', 'Marketing', 'Finance'],
  },
  {
    name: 'Healthcare',
    fullName: 'Skill-on-Healthcare',
    philosophy: 'Pioneering the intersection of technology and biology.',
    skills: ['Medical Tech', 'Innovation'],
  },
  {
    name: 'Agriculture',
    fullName: 'Skill-on-Agriculture',
    philosophy: 'Engineering sustainable systems for a growing world.',
    skills: ['Smart Farming', 'Sustainability'],
  },
  {
    name: 'Manufacturing',
    fullName: 'Skill-on-Manufacturing',
    philosophy: 'The art and science of building at scale.',
    skills: ['Industrial Skills', 'Production'],
  },
  {
    name: 'Civil',
    fullName: 'Skill-on-Civil',
    philosophy: 'Designing the structural backbone of society.',
    skills: ['Infrastructure', 'Construction'],
  },
  {
    name: 'Energy',
    fullName: 'Skill-on-Energy',
    philosophy: 'Powering the future with sustainable innovation.',
    skills: ['Renewable Energy', 'Clean Tech'],
  },
];

const TOTAL = worlds.length;

/* ═══════════════════════════════════════════════════════
   Miniature Architecture (The Diorama SVGs)
   ═══════════════════════════════════════════════════════ */
const miniatureBuildings = [
  // 0: Circuit
  <g key="0" stroke="currentColor" strokeWidth="2" fill="none">
    <rect x="-15" y="-30" width="30" height="30" />
    <path d="M-15 -20 H 15 M-15 -10 H 15" strokeWidth="1" strokeDasharray="2 4" />
    <circle cx="0" cy="-40" r="4" fill="currentColor" />
    <path d="M0 -30 V -40" strokeWidth="1" />
  </g>,
  // 1: Code
  <g key="1" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-20 -40 L -30 -25 L -20 -10 M20 -40 L 30 -25 L 20 -10" />
    <rect x="-10" y="-35" width="20" height="35" />
  </g>,
  // 2: Robotics
  <g key="2" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-25 0 V -30 L -10 -20 V -30 L 5 -20 V -30 L 25 -30 V 0" strokeLinejoin="round" />
    <path d="M25 -15 L 40 -25 L 50 -15" strokeLinejoin="round" />
    <circle cx="40" cy="-25" r="3" fill="currentColor" />
  </g>,
  // 3: Design
  <g key="3" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-25 0 C -25 -40, 25 -40, 25 0" />
    <circle cx="0" cy="-20" r="8" strokeWidth="1" />
  </g>,
  // 4: Business
  <g key="4" stroke="currentColor" strokeWidth="2" fill="none">
    <rect x="-25" y="-50" width="15" height="50" />
    <rect x="-5" y="-70" width="20" height="70" />
    <rect x="20" y="-40" width="15" height="40" />
    <path d="M-25 -50 L 5 -80 L 35 -50" strokeWidth="1" strokeDasharray="2 4" />
  </g>,
  // 5: Healthcare
  <g key="5" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-30 0 H 30 V -40 H -30 Z" />
    <path d="M0 -15 V -25 M-5 -20 H 5" />
    <path d="M15 -40 V -55" strokeWidth="1" />
  </g>,
  // 6: Agriculture
  <g key="6" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-30 0 L -15 -30 H 15 L 30 0" />
    <path d="M-15 0 L 0 -20 H 20 L 35 0" strokeWidth="1" />
    <circle cx="0" cy="-40" r="4" fill="currentColor" />
    <path d="M0 -30 V -40" strokeWidth="1" />
  </g>,
  // 7: Manufacturing
  <g key="7" stroke="currentColor" strokeWidth="2" fill="none">
    <rect x="-20" y="-40" width="40" height="40" />
    <rect x="-10" y="-60" width="6" height="20" />
    <rect x="5" y="-50" width="6" height="10" />
    <circle cx="0" cy="-20" r="10" strokeDasharray="4 4" />
  </g>,
  // 8: Civil
  <g key="8" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-40 -20 H 40" />
    <path d="M-20 0 V -40 M20 0 V -40" />
    <path d="M-40 -20 Q -20 -40 0 -20 Q 20 -40 40 -20" strokeWidth="1" />
  </g>,
  // 9: Energy
  <g key="9" stroke="currentColor" strokeWidth="2" fill="none">
    <path d="M-15 0 V -40" />
    <path d="M-15 -40 L -25 -55 M-15 -40 L -5 -55 M-15 -40 V -60" strokeLinecap="round" />
    <circle cx="-15" cy="-40" r="3" fill="currentColor" />
    <path d="M10 0 L 15 -20 H 35 L 30 0 Z" strokeWidth="1.5" />
  </g>
];

/* ═══════════════════════════════════════════════════════
   Main Component: The Precision Navigation Marker
   ═══════════════════════════════════════════════════════ */
export default function SkillChampionships() {
  const [active, setActive] = useState(0);
  const boulevardRef = useRef(null);

  // Precision Scrubber Logic (Desktop)
  const handleMouseMove = (e) => {
    if (!boulevardRef.current) return;
    const rect = boulevardRef.current.getBoundingClientRect();
    
    // Add 20px padding to the hit area logic so the first and last stations are easier to hit
    const hitAreaWidth = rect.width;
    const x = e.clientX - rect.left;
    
    let relativeX = x / hitAreaWidth;
    relativeX = Math.max(0, Math.min(1, relativeX));
    
    const closestIndex = Math.round(relativeX * (TOTAL - 1));
    if (closestIndex !== active) {
      setActive(closestIndex);
    }
  };

  // Mobile Swipe/Drag Logic
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.touches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && active < TOTAL - 1) setActive(active + 1);
      if (diff < 0 && active > 0) setActive(active - 1);
      setTouchStart(e.touches[0].clientX); // Reset touch start to allow continuous scrubbing
    }
  };

  return (
    <section 
      id="championships" 
      className="relative w-full h-[100svh] min-h-[700px] bg-bg-primary overflow-hidden select-none flex flex-col"
    >
      
      {/* ── Top 70%: Massive Fixed Typography ── */}
      <div className="flex-1 flex flex-col items-center justify-center pt-20 px-6 z-10 pointer-events-none">
        <div className="w-full max-w-4xl flex flex-col items-center text-center">
          
          <div className="mb-6 lg:mb-8 pointer-events-auto">
            <span className="section-label">
              Omni Destination {String(active + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="h-[240px] lg:h-[300px] flex flex-col items-center justify-start pointer-events-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(2px)', y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center w-full"
              >
                <h2 className="text-[3.5rem] lg:text-[6.5rem] font-bold text-text-primary leading-[1.05] tracking-[-0.03em] mb-6">
                  {worlds[active].name}
                </h2>
                
                <p className="text-lg lg:text-2xl text-text-secondary leading-relaxed mb-8 lg:mb-12 max-w-[500px]">
                  {worlds[active].philosophy}
                </p>
                
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-10">
                  {worlds[active].skills.map((skill, j) => (
                    <span key={j} className="text-xs lg:text-base text-text-primary font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-border-strong text-text-primary overflow-hidden hover:border-text-primary transition-colors duration-300">
                  {/* Sweep background */}
                  <div className="absolute inset-0 bg-text-primary transform translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                  <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-text-inverse">
                    Explore Championship
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Bottom 30%: The Precision Scrubber (Boulevard) ── */}
      <div 
        className="h-[30vh] min-h-[250px] relative w-full flex items-center justify-center"
      >
        {/* Hit area for mouse tracking - covers the entire bottom third */}
        <div 
          className="absolute inset-0 z-20 cursor-ew-resize hidden lg:block"
          onMouseMove={handleMouseMove}
        />
        {/* Mobile touch area */}
        <div 
          className="absolute inset-0 z-20 lg:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />

        {/* The Track Container */}
        <div 
          ref={boulevardRef}
          className="relative w-[90%] max-w-[1200px] h-[100px] mx-auto pointer-events-none"
        >
          {/* Ground Line (The Boulevard) */}
          <div className="absolute top-[80px] left-0 w-full h-[1px] bg-border-default" />

          {/* The 10 Stations and Architecture */}
          {worlds.map((world, i) => {
            const isThisActive = i === active;
            const percentage = (i / (TOTAL - 1)) * 100;

            return (
              <div 
                key={i}
                className="absolute top-0 h-full flex flex-col items-center justify-end pb-[20px]" // pb-20px aligns with the ground line
                style={{ left: `${percentage}%`, transform: 'translateX(-50%)' }}
              >
                
                {/* Miniature Architecture */}
                <div className="relative w-[60px] h-[80px] flex items-end justify-center mb-1">
                  <svg viewBox="-50 -100 100 100" className="w-full h-full overflow-visible">
                    <motion.g
                      animate={{ 
                        opacity: isThisActive ? 1 : 0.2,
                        y: isThisActive ? 0 : 4,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-text-primary"
                    >
                      {miniatureBuildings[i]}
                    </motion.g>
                  </svg>
                </div>

                {/* Station Marker */}
                <div className="flex flex-col items-center">
                  <div className={`w-px h-3 transition-colors duration-500 ${isThisActive ? 'bg-text-primary' : 'bg-border-strong'}`} />
                  {/* Invisible structural dot to give the station weight */}
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent mt-1" /> 
                </div>

                {/* Station Name (Only visible heavily on desktop, tiny on mobile) */}
                <motion.span 
                  animate={{ opacity: isThisActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-8 text-[9px] font-bold text-text-primary tracking-[0.1em] uppercase whitespace-nowrap"
                >
                  {world.name}
                </motion.span>
              </div>
            );
          })}

          {/* The Precision Shuttle (Side-View Bus) */}
          <motion.div
            className="absolute top-[68px] z-30 pointer-events-none"
            initial={false}
            animate={{ left: `${(active / (TOTAL - 1)) * 100}%` }}
            style={{ transform: 'translateX(-50%)' }}
            transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
          >
            {/* Elegant Side-View Shuttle Architecture */}
            <div className="relative w-12 h-4 bg-text-primary rounded-[4px] shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-between px-1.5">
              
              {/* Minimalist windows slit */}
              <div className="w-6 h-1.5 bg-surface-default rounded-full opacity-80" />
              
              {/* The Red Pulse Indicator (Front) */}
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(217,45,32,0.8)]" />
              
              {/* Tiny wheels (recessed/implied to keep it hovering/gliding) */}
              <div className="absolute -bottom-0.5 left-2 w-1.5 h-1 bg-text-primary rounded-b-full opacity-50" />
              <div className="absolute -bottom-0.5 right-2 w-1.5 h-1 bg-text-primary rounded-b-full opacity-50" />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
