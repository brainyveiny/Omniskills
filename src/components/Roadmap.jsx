import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const milestones = [
  { phase: 'Seed', title: 'Curiosity Awakens', desc: 'A learner joins OMNI with curiosity and a desire to discover their true potential.' },
  { phase: 'Roots', title: 'Learn & Practice', desc: 'Learning begins. A strong foundation is built through world-class resources.' },
  { phase: 'Sprout', title: 'Build Real Skills', desc: 'Practical, hands-on skills start developing beyond theoretical textbooks.' },
  { phase: 'Young Plant', title: 'Compete', desc: 'State and national competitions build immense confidence and capability.' },
  { phase: 'Growing Tree', title: 'Recognition & Mentorship', desc: 'Direct guidance from industry leaders accelerates your growth.' },
  { phase: 'Mature Tree', title: 'Portfolio & Career', desc: 'Internships and career opportunities appear like strong new branches.' },
  { phase: 'Flourishing Tree', title: 'Global Impact', desc: 'Your capabilities are recognized and showcased on an international stage.' },
];

function MilestoneNode({ ms, i }) {
  const isLeft = i % 2 === 0;
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center 50%"]
  });

  // "Water flowing, relaxed but accurate"
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Bind animations to the smoothed scroll progress
  const branchDraw = useTransform(smoothProgress, [0, 0.7], [0, 1]);
  const leafScale = useTransform(smoothProgress, [0.7, 1], [0, 1]);
  const leafOpacity = useTransform(smoothProgress, [0.7, 1], [0, 1]);
  const contentOpacity = useTransform(smoothProgress, [0.3, 1], [0, 1]);
  const contentY = useTransform(smoothProgress, [0.3, 1], [30, 0]);

  return (
    <div ref={ref} className="relative w-full min-h-[250px] md:min-h-[350px] flex items-center mb-12 md:mb-0 group">
      
      {/* Branch SVG (Desktop) */}
      <div className={`hidden md:block absolute bottom-0 pointer-events-none w-[120px] h-[150px] lg:w-[180px] lg:h-[200px] z-0 ${isLeft ? 'left-1/2 -translate-x-full' : 'left-1/2'}`}>
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d={isLeft ? "M100,100 C100,50 50,0 0,0" : "M0,100 C0,50 50,0 100,0"} 
            fill="none" 
            stroke="var(--color-border-default)" 
            strokeWidth="1.5"
            style={{ pathLength: branchDraw }}
            className="transition-colors duration-700"
          />
        </svg>
        {/* Abstract Leaf Node */}
        <motion.div 
          style={{ scale: leafScale, opacity: leafOpacity }}
          className={`absolute top-0 -translate-y-1/2 w-4 h-4 bg-surface-default border border-border-default shadow-sm transition-colors duration-700 group-hover:border-brand-primary group-hover:bg-brand-primary/10
            ${isLeft ? 'left-0 -translate-x-1/2 rounded-tl-full rounded-br-full rotate-45' : 'right-0 translate-x-1/2 rounded-tr-full rounded-bl-full rotate-45'}`} 
        />
      </div>

      {/* Branch SVG (Mobile) */}
      <div className="md:hidden absolute bottom-[-40px] left-[32px] w-[64px] h-[100px] pointer-events-none z-0">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            d="M0,100 C0,50 50,0 100,0" 
            fill="none" 
            stroke="var(--color-border-default)" 
            strokeWidth="1.5"
            style={{ pathLength: branchDraw }}
          />
        </svg>
        <motion.div 
          style={{ scale: leafScale, opacity: leafOpacity }}
          className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-surface-default border border-border-default rounded-tr-full rounded-bl-full rotate-45"
        />
      </div>

      {/* Typography Content */}
      <div className={`w-full md:w-1/2 flex relative z-10 pl-[96px] md:pl-0 ${isLeft ? 'md:justify-end md:pr-[120px] lg:pr-[180px] md:text-right' : 'md:ml-auto md:pl-[120px] lg:pl-[180px] md:text-left'}`}>
        <motion.div 
          style={{ opacity: contentOpacity, y: contentY }}
          className="max-w-sm group-hover:-translate-y-1 transition-transform duration-700 ease-out"
        >
          <div className="text-xs md:text-[11px] font-bold text-text-muted uppercase tracking-[0.15em] mb-4">
            {ms.phase}
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-4 md:mb-6">
            {ms.title}
          </h3>
          <p className="text-base text-text-secondary leading-relaxed">
            {ms.desc}
          </p>
        </motion.div>
      </div>

    </div>
  );
}

function ClimaxNode() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="relative w-full pt-20 lg:pt-32 pb-12 flex justify-center z-10 mt-12 md:mt-0">
       
       {/* Bridge from main trunk to climax */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] h-20 lg:h-32 bg-gradient-to-b from-brand-primary to-transparent pointer-events-none" />

       <motion.div 
         style={{ opacity, scale, y }}
         className="relative flex flex-col items-center text-center max-w-3xl px-6"
       >
          {/* The Final Bloom / Seed of the future */}
          <div className="relative w-12 h-12 mb-12">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 rounded-full border border-border-default"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="absolute inset-2 rounded-full border border-border-hairline"
             />
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-4 h-4 bg-brand-primary rounded-full shadow-[0_0_20px_rgba(217,45,32,0.15)]" />
             </div>
          </div>

          <div className="text-xs md:text-[11px] font-bold text-text-muted uppercase tracking-[0.15em] mb-6">
            Living Tree
          </div>
          <h3 className="text-[clamp(3.5rem,7vw,5rem)] font-extrabold tracking-[-0.04em] text-text-primary mb-8 leading-[1.0]">
            Your story is only <br className="hidden sm:block" />
            <span className="italic text-text-muted">beginning.</span>
          </h3>
          <p className="text-lg lg:text-xl text-text-secondary leading-relaxed font-medium max-w-xl mx-auto">
            The OMNI ecosystem is a foundation for lifelong learning. Long after the Olympiad ends, your growth continues upward and outward.
          </p>

          {/* The infinite upward continuation */}
          <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[2px] h-[150px] bg-gradient-to-b from-brand-primary to-transparent opacity-30 pointer-events-none" />
       </motion.div>
    </div>
  );
}

export default function Roadmap() {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // "Water flowing, relaxed but accurate"
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const trunkWidth = useTransform(smoothProgress, [0, 1], ["1px", "6px"]);
  const trunkOpacity = useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 1]);

  return (
    <section id="roadmap" className="py-24 lg:py-40 relative overflow-hidden bg-bg-secondary">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-bg-primary rounded-full blur-[150px] pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className={`text-center mb-24 lg:mb-40 fade-up ${isInView ? 'in-view' : ''}`} ref={ref}>
          <span className="inline-block text-xs font-bold text-text-muted tracking-[0.15em] uppercase mb-6">
            The Tree of Life
          </span>
          <h2 className="section-header mb-8">
            Your Story <span className="italic text-text-muted">Unfolds</span>
          </h2>
          <p className="text-lg font-medium text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Watch your journey grow from a single seed of curiosity into a flourishing ecosystem of lifelong opportunity.
          </p>
        </div>

        <div className="relative w-full" ref={containerRef}>
          
          <motion.div 
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 bg-brand-primary rounded-full origin-top z-0"
            style={{ scaleY: smoothProgress, width: trunkWidth, opacity: trunkOpacity }}
          />

          <motion.div 
            className="md:hidden absolute top-0 bottom-0 left-[32px] -translate-x-1/2 bg-brand-primary rounded-full origin-top z-0"
            style={{ scaleY: smoothProgress, width: trunkWidth, opacity: trunkOpacity }}
          />

          {milestones.map((ms, i) => (
            <MilestoneNode key={i} ms={ms} i={i} />
          ))}
        </div>

        <ClimaxNode scrollYProgress={scrollYProgress} />

      </div>
    </section>
  );
}
