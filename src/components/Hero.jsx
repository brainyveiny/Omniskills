import { useInView } from '../hooks/useInView';

export default function Hero() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[100vh] pt-32 pb-24 lg:pt-48 lg:pb-32 flex items-center overflow-hidden bg-bg-secondary"
    >
      {/* Premium Illumination (Spotlight Effect) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)' }} />

      {/* Floating background shapes (Subtle) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-bg-primary rounded-full blur-2xl opacity-50" />

        {/* Subtle geometric shapes */}
        <div className="absolute top-32 right-[15%] w-3 h-3 bg-brand-primary/20 rounded-full" />
        <div className="absolute top-[60%] left-[8%] w-2 h-2 bg-brand-primary/15 rounded-full" />
        <div className="absolute bottom-[25%] right-[30%] w-4 h-4 border border-brand-primary/10 rounded-full" />
        <div className="absolute top-[20%] left-[35%] w-2.5 h-2.5 bg-border-strong/30 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`fade-up text-left ${isInView ? 'in-view' : ''}`}>
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent rounded-full mb-8 border border-brand-primary/10">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full pulse-soft" />
              <span className="text-xs font-bold text-brand-primary tracking-widest uppercase">
                Registrations Open 2026
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[clamp(3.5rem,7vw,5rem)] font-extrabold tracking-tighter text-text-primary leading-none mb-6">
              Prove Your Skills.
              <br />
              <span className="text-brand-primary">Shape the Future.</span>
            </h1>

            {/* Description */}
            <p className="text-lg font-medium text-text-secondary leading-relaxed max-w-2xl mb-10">
              Join the nation's most ambitious minds in a battle of innovation. This isn't just a competition—it's your launchpad to real-world opportunities and global recognition.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <button
                onClick={() => scrollTo('#cta')}
                className="btn-primary shadow-[0_0_32px_rgba(217,45,32,0.15)]"
              >
                Claim Your Spot
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo('#championships')}
                className="btn-secondary"
              >
                Explore Challenges
              </button>
            </div>

            {/* Supporting Trust Text */}
            <div className="flex items-center gap-2 text-[13px] font-medium text-text-muted">
              <svg className="w-4 h-4 text-border-strong" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Join thousands of students building the skills of tomorrow.</span>
            </div>
          </div>

          {/* Right - Abstract Olympiad Graphic */}
          <div
            className={`fade-up ${isInView ? 'in-view' : ''} hidden lg:flex items-center justify-center opacity-90 scale-95 lg:mt-6`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="relative w-full max-w-[320px] aspect-square">
              {/* Concentric rings */}
              <div className="absolute inset-6 rounded-full border-2 border-brand-primary/10" />
              <div className="absolute inset-12 rounded-full border border-brand-primary/20" />
              <div className="absolute inset-20 rounded-full border border-border-default" />

              {/* Center emblem */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-22 h-22 bg-brand-primary/5 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-brand-primary/10" style={{ width: 88, height: 88 }}>
                  <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-[0_0_32px_rgba(217,45,32,0.15)]">
                    <svg className="w-6 h-6 text-text-inverse" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-5.624a6.023 6.023 0 01-2.77.896" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Orbital nodes */}
              {[
                { top: '7.5%', left: '50%', label: 'Code', delay: 0, duration: '6s' },
                { top: '28.75%', left: '86.8%', label: 'Build', delay: 1, duration: '7s' },
                { top: '71.25%', left: '86.8%', label: 'Design', delay: 2, duration: '6.5s' },
                { top: '92.5%', left: '50%', label: 'Innovate', delay: 3, duration: '8s' },
                { top: '71.25%', left: '13.2%', label: 'Learn', delay: 4, duration: '7.5s' },
                { top: '28.75%', left: '13.2%', label: 'Compete', delay: 5, duration: '6.5s' },
              ].map((node, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    ...Object.fromEntries(
                      Object.entries(node).filter(([k]) => ['top', 'left', 'right', 'bottom'].includes(k))
                    ),
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${node.delay * 0.5}s`,
                  }}
                >
                  <div 
                    className="relative flex flex-col items-center animate-float-orbital"
                    style={{ 
                      '--duration': node.duration,
                      animationDelay: `${node.delay * -0.7}s` 
                    }}
                  >
                    <div className="w-8 h-8 bg-surface-default rounded-lg border border-border-default shadow-neutral flex items-center justify-center relative z-10">
                      <div className="w-2.5 h-2.5 bg-brand-primary/80 rounded-full" />
                    </div>
                    <span className="absolute top-full mt-2 text-xs font-semibold text-text-muted tracking-wide uppercase whitespace-nowrap">
                      {node.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator-anim">
        <span className="text-xs font-medium text-text-muted tracking-widest uppercase">Scroll</span>
        <svg className="w-4 h-4 text-border-strong" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
