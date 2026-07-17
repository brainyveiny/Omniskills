import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { BookOpen, Target, Award, Briefcase, ArrowRight } from 'lucide-react';

const pagesData = [
  { 
    id: 1,
    title: 'Practical Learning', 
    desc: 'Move beyond theory with hands-on skill development and immersive exercises designed by experts.',
    icon: <BookOpen className="w-5 h-5" strokeWidth={2} />,
    watermark: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 text-brand-primary opacity-[0.04] w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 pointer-events-none">
        <path d="M10 50 h20 l10 -20 h30 l10 20 h20 M30 30 v-10 h-10 M70 30 v-10 h10 M30 70 v10 h-10 M70 70 v10 h10" stroke="currentColor" fill="none" strokeWidth="0.5"/>
        <circle cx="10" cy="50" r="1.5" fill="currentColor"/>
        <circle cx="90" cy="50" r="1.5" fill="currentColor"/>
        <circle cx="20" cy="30" r="1.5" fill="currentColor"/>
        <circle cx="80" cy="30" r="1.5" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 2,
    title: 'Real-World Challenges', 
    desc: 'Solve complex engineering problems sourced directly from industry leaders and real scenarios.',
    icon: <Target className="w-5 h-5" strokeWidth={2} />,
    watermark: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 text-brand-primary opacity-[0.04] w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 pointer-events-none">
        <path d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z M50 20 L50 50 M20 35 L50 50 M80 35 L50 50 M50 50 L50 80" stroke="currentColor" fill="none" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="1" fill="currentColor"/>
        <circle cx="50" cy="20" r="1" fill="currentColor"/>
        <circle cx="80" cy="65" r="1" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 3,
    title: 'National Recognition', 
    desc: 'Earn prestigious certificates and prove your excellence on a national competitive stage.',
    icon: <Award className="w-5 h-5" strokeWidth={2} />,
    watermark: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 text-brand-primary opacity-[0.04] w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 pointer-events-none">
        <path d="M0 50 Q 25 10, 50 50 T 100 50 M 0 30 h100 M 0 70 h100 M 50 0 v100" stroke="currentColor" fill="none" strokeWidth="0.5"/>
        <circle cx="50" cy="50" r="1.5" fill="currentColor"/>
      </svg>
    )
  },
  { 
    id: 4,
    title: 'Industry Collaboration', 
    desc: 'Connect directly with expert mentors and build relationships with leading tech companies.',
    icon: <Briefcase className="w-5 h-5" strokeWidth={2} />,
    watermark: (
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 text-brand-primary opacity-[0.04] w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 pointer-events-none">
        <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.25"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 2" />
      </svg>
    )
  }
];

const TOTAL_PAGES = pagesData.length;
const FLIP_DURATION = 800; // ms

export default function About() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [flippedCount, setFlippedCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Strict transition curve requested by user
  const flipTransition = { duration: FLIP_DURATION / 1000, ease: [0.16, 1, 0.3, 1] };

  const handleSetFlippedCount = (newCount) => {
    if (isAnimating || newCount < 0 || newCount >= TOTAL_PAGES) return;
    setIsAnimating(true);
    setFlippedCount(newCount);
    setTimeout(() => setIsAnimating(false), FLIP_DURATION);
  };

  return (
    <section id="about" className="py-24 lg:py-32 bg-bg-secondary overflow-hidden" aria-label="About the Olympiad">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ─── LEFT COLUMN: EDITORIAL CONTENT ─── */}
          <div ref={ref} className={`fade-up ${isInView ? 'in-view' : ''}`}>
            <span className="section-label">
              About OSO
            </span>
            <h2 className="section-header mb-8">
              More Than An
              <br />
              <span className="text-brand-primary">Olympiad.</span>
            </h2>
            
            {/* Synchronized Description & Page Indicator */}
            <div className="relative min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={flippedCount}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <p className="text-xl font-medium text-text-secondary leading-relaxed max-w-lg mb-8">
                    {flippedCount < TOTAL_PAGES 
                      ? pagesData[flippedCount].desc 
                      : "You've reached the end of the chapter. Ready to begin?"}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm font-bold tracking-widest text-text-muted">
                    <span className="text-brand-primary">
                      0{Math.min(flippedCount + 1, TOTAL_PAGES)}
                    </span>
                    <div className="w-8 h-px bg-border-strong" />
                    <span>0{TOTAL_PAGES}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Removed fallback buttons as requested for pure cursor physics */}
          </div>

          {/* ─── RIGHT COLUMN: PREMIUM 3D NOTEBOOK ─── */}
          <motion.div 
            className="relative w-full max-w-[600px] xl:max-w-[700px] aspect-[4/3] mx-auto perspective-[2000px] group/book z-10"
            whileHover={{ y: -6, rotateX: 2, rotateY: -2, scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            
            {/* Base Book Shadow */}
            <div className="absolute inset-0 rounded-2xl shadow-[0_32px_64px_rgba(0,0,0,0.1)] transition-shadow duration-700 group-hover/book:shadow-[0_48px_80px_rgba(0,0,0,0.15)]" />

            {/* Back Cover / Paper Stack Simulation */}
            <div className="absolute inset-0 w-1/2 left-1/2 bg-[#fafafa] border border-border-default rounded-r-2xl shadow-[1px_0_0_#fff,2px_0_0_#e5e5e5,3px_0_0_#fff,4px_0_0_#e5e5e5,5px_0_0_#fff,6px_0_0_#e5e5e5,7px_0_0_#fff,8px_0_0_#e5e5e5]" />
            <div className="absolute inset-0 w-1/2 left-0 bg-[#fafafa] border border-border-default rounded-l-2xl shadow-[-1px_0_0_#fff,-2px_0_0_#e5e5e5,-3px_0_0_#fff,-4px_0_0_#e5e5e5,-5px_0_0_#fff,-6px_0_0_#e5e5e5,-7px_0_0_#fff,-8px_0_0_#e5e5e5]" />
            
            {/* The Pages */}
            {pagesData.map((page, index) => {
              const isFlipped = index < flippedCount;
              const isActiveRight = index === flippedCount;
              const isActiveLeft = index === flippedCount - 1;
              const isLastPage = index === TOTAL_PAGES - 1;
              const zIndex = isFlipped ? index : TOTAL_PAGES - index;

              return (
                <BookPage
                  key={page.id}
                  page={page}
                  index={index}
                  isFlipped={isFlipped}
                  isActiveRight={isActiveRight}
                  isActiveLeft={isActiveLeft}
                  isLastPage={isLastPage}
                  isAnimating={isAnimating}
                  isInView={isInView}
                  zIndex={zIndex}
                  onFlip={() => handleSetFlippedCount(index + 1)}
                  onUnflip={() => handleSetFlippedCount(index)}
                  flipTransition={flipTransition}
                />
              );
            })}

            {/* Realistic Notebook Spine */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-black/[0.12] via-black/[0.02] to-black/[0.12] z-50 pointer-events-none rounded-full blur-[2px]" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/10 z-50 pointer-events-none shadow-inner" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   Individual Book Page Component
   ═══════════════════════════════════════════════════════ */
function BookPage({ page, index, isFlipped, isActiveRight, isActiveLeft, isLastPage, isAnimating, isInView, zIndex, onFlip, onUnflip, flipTransition }) {
  const pageRef = useRef(null);
  const hasTeased = useRef(false);
  
  const targetRotation = isFlipped ? -180 : 0;
  const rotateY = useMotionValue(targetRotation);

  useEffect(() => {
    import('framer-motion').then(({ animate }) => {
      animate(rotateY, targetRotation, flipTransition);
    });
  }, [targetRotation, rotateY, flipTransition]);

  // Micro-invitation teaser animation
  useEffect(() => {
    if (isActiveRight && isInView && !hasTeased.current && index === 0) {
      hasTeased.current = true;
      const timeoutId = setTimeout(() => {
        if (isAnimating || rotateY.get() !== 0) return;
        import('framer-motion').then(({ animate }) => {
          animate(rotateY, -8, { duration: 0.8, ease: [0.16, 1, 0.3, 1] }).then(() => {
            setTimeout(() => {
              // Only return if user hasn't grabbed it
              if (rotateY.get() === -8) {
                animate(rotateY, 0, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
              }
            }, 600);
          });
        });
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, isActiveRight, index, rotateY, isAnimating]);

  const handleMouseMove = (e) => {
    if (isAnimating || !pageRef.current) return;
    
    const rect = pageRef.current.getBoundingClientRect();
    
    if (isActiveRight && !isLastPage) {
      // Right page: x is from 0 (spine) to width (right edge)
      const x = e.clientX - rect.left;
      const progress = Math.max(0, Math.min(1, x / rect.width));
      
      // Auto-flip threshold at last 25% (near the spine)
      if (progress < 0.25) {
        onFlip();
      } else {
        // Heavy paper inertia: mapping progress (0.25 to 1) to an angle (-15 to 0)
        // This simulates the paper "bending" up toward the cursor without strictly sticking to it
        const peelAngle = -15 * (1 - (progress - 0.25) / 0.75);
        rotateY.set(peelAngle);
      }
    } 
    else if (isActiveLeft) {
      // Left page (flipped): x is from 0 (left edge) to width (spine)
      // Because it's rotated 180deg, the physical left edge is the visual right edge.
      const x = e.clientX - rect.left;
      const progress = Math.max(0, Math.min(1, x / rect.width));
      
      // Auto-flip threshold at last 25% (near the spine)
      if (progress > 0.75) {
        onUnflip();
      } else {
        // Heavy paper inertia: mapping progress (0 to 0.75) to an angle (-180 to -165)
        const peelAngle = -180 + 15 * (progress / 0.75);
        rotateY.set(peelAngle);
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isAnimating) {
      // Snap back to resting state
      import('framer-motion').then(({ animate }) => {
        animate(rotateY, targetRotation, { duration: 0.4, ease: "easeOut" });
      });
    }
  };

  return (
    <motion.div
      ref={pageRef}
      className="absolute top-0 bottom-0 left-1/2 w-1/2 origin-left preserve-3d"
      style={{ zIndex, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── FRONT FACE ─── */}
      <motion.div 
        className="absolute inset-0 backface-hidden bg-[#faf9f6] border border-border-default/50 rounded-r-xl overflow-hidden"
        style={{
          boxShadow: useTransform(rotateY, [0, -15, -90], [
            '-4px 0 12px rgba(0,0,0,0.03)',
            '-16px 16px 32px rgba(0,0,0,0.12)',
            '-4px 0 12px rgba(0,0,0,0.03)'
          ])
        }}
      >
        
        {/* Paper Texture (Subtle Noise) */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        
        {/* Sticky Note (Only on Page 1) */}
        {index === 0 && (
          <div 
            className="absolute -top-2 -right-2 w-20 h-20 z-50 group/note animate-float-note origin-bottom-left cursor-pointer"
          >
            <div 
              className="absolute inset-0 transition-transform duration-300 group-hover/note:-translate-y-2 group-hover/note:rotate-3 shadow-[2px_4px_12px_rgba(0,0,0,0.1)] group-hover/note:shadow-[4px_8px_20px_rgba(0,0,0,0.12)] flex flex-col items-center justify-center p-2"
              style={{
                background: 'linear-gradient(225deg, transparent 12px, #fffdf0 0)',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E"), linear-gradient(225deg, transparent 12px, #fffdf0 0)'
              }}
            >
              {/* Folded Corner flap */}
              <div className="absolute top-0 right-0 w-4 h-4 bg-[#f0eed9] shadow-[-2px_2px_4px_rgba(0,0,0,0.06)] rounded-bl-sm" />
              
              <span className="font-handwriting text-brand-primary text-xl font-bold tracking-tight leading-none rotate-[-4deg] mt-1 text-center">
                FLIP IT
              </span>
              
              <svg 
                className="w-5 h-5 text-text-primary opacity-70 mt-1 rotate-12 transition-transform duration-300 group-hover/note:scale-110 group-hover/note:-translate-x-0.5 group-hover/note:translate-y-0.5" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Engineering Watermark */}
        {page.watermark}

        {/* Editorial Layout */}
        <div className="p-8 sm:p-10 h-full flex flex-col relative z-10 group/page">
          <div className="flex items-center gap-3 mb-8 sm:mb-10 text-brand-primary opacity-80">
            {page.icon}
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Chapter 0{index + 1}</span>
          </div>
          
          <h3 className="text-[2rem] sm:text-[2.5rem] font-black text-text-primary tracking-tighter leading-[1.05] mb-5 sm:mb-6 uppercase w-full">
            {page.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>
          
          <div className="w-16 h-px bg-border-strong mb-5 sm:mb-6" />
          
          <p className="text-sm font-medium text-text-secondary leading-relaxed w-full">
            {page.desc}
          </p>

          {!isLastPage && (
            <div className="mt-auto flex items-center gap-2 text-brand-primary font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover/page:opacity-100 transition-opacity duration-300">
              <span className="group-hover/page:translate-x-1 transition-transform duration-300"><ArrowRight className="w-4 h-4" /></span>
              Continue
            </div>
          )}
        </div>
        
        {/* Dynamic Shadow Overlay (Simulates paper bending) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-r-xl"
          style={{ 
            background: useTransform(rotateY, [0, -90], ['linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)', 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 100%)']),
            opacity: useTransform(rotateY, [0, -90], [0, 1]) 
          }}
        />
      </motion.div>

      {/* ─── BACK FACE ─── */}
      <motion.div 
        className="absolute inset-0 backface-hidden bg-[#f4f3f0] border border-border-default/50 rounded-l-xl overflow-hidden"
        style={{ 
          transform: 'rotateY(180deg)',
          boxShadow: useTransform(rotateY, [-180, -165, -90], [
            '4px 0 12px rgba(0,0,0,0.03)',
            '16px 16px 32px rgba(0,0,0,0.12)',
            '4px 0 12px rgba(0,0,0,0.03)'
          ])
        }}
      >
        {/* Spine Shadow on back face */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/[0.08] to-transparent pointer-events-none" />
        
        {/* Editorial Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
          <span className="text-[140px] font-black tracking-tighter text-brand-primary -rotate-90">0{index + 1}</span>
        </div>

        {/* Dynamic Shadow Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-l-xl"
          style={{ 
            background: useTransform(rotateY, [-180, -90], ['linear-gradient(270deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)', 'linear-gradient(270deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 100%)']),
            opacity: useTransform(rotateY, [-180, -90], [0, 1]) 
          }}
        />
      </motion.div>
      
      {/* Paper Thickness Edge */}
      <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-[#fff] transform translate-z-[1px]" />
      <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-[#d5d5d5] transform translate-z-[2px]" />
    </motion.div>
  );
}
