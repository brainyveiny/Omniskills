import { useInView } from '../hooks/useInView';

export default function FinalCTA() {
  const [ref, isInView] = useInView();

  return (
    <section id="cta" className="py-24 lg:py-32 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative rounded-[2.5rem] overflow-hidden bg-bg-inverse text-center px-6 py-20 lg:py-28 shadow-2xl scale-in ${
            isInView ? 'in-view' : ''
          }`}
        >
          {/* Subtle refined background gradient instead of floating shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-surface-default/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at top right, var(--color-surface-default), transparent 60%)' }} />

          <div className="relative z-10">
            <h2 className="text-[clamp(3rem,5vw,4rem)] font-bold tracking-[-0.03em] text-text-inverse leading-[1.05] mb-6">
              Ready to Showcase <br />
              <span className="text-brand-primary">Your Talent?</span>
            </h2>
            <p className="text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed font-medium">
              Join the largest skills movement in India.
              <br />
              <span className="text-text-secondary font-normal">Pre-registrations for OMNI Skills Olympiad 2026 are now open.</span>
            </p>
            
            {/* Social Proof / Trust markers */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 mb-10">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-text-inverse mb-1 tabular-nums">10+</div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-[0.15em]">Skill Domains</div>
              </div>
              <div className="w-px h-8 bg-border-hairline/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-text-inverse mb-1 tabular-nums">50k+</div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-[0.15em]">Expected Participants</div>
              </div>
              <div className="w-px h-8 bg-border-hairline/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl font-extrabold text-text-inverse mb-1 tabular-nums">100%</div>
                <div className="text-xs font-bold text-text-muted uppercase tracking-[0.15em]">Practical Focus</div>
              </div>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-surface-default text-brand-primary text-sm font-bold rounded-xl btn-hover shadow-xl hover:shadow-2xl transition-all"
            >
              Register Now
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
