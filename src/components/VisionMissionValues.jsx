import { useInView } from '../hooks/useInView';

export default function VisionMissionValues() {
  const [visionRef, visionInView] = useInView({ threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ threshold: 0.1 });

  const values = [
    { label: 'Continuous Learning', text: 'Learning never stops. It is the engine of growth.' },
    { label: 'Innovation', text: 'Challenge the status quo. Solve real problems.' },
    { label: 'Integrity', text: 'Fairness and transparency in every action.' },
    { label: 'Collaboration', text: 'We go further when we build together.' },
    { label: 'Inclusivity', text: 'Opportunity for everyone, everywhere.' },
    { label: 'Excellence', text: 'The highest standard in everything we do.' },
  ];

  return (
    <section id="manifesto" className="relative pt-24 lg:pt-32 pb-24 lg:pb-32 bg-bg-secondary border-t border-border-default">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
        
        {/* Purpose, Vision & Mission */}
        <div ref={visionRef} className={`fade-up ${visionInView ? 'in-view' : ''}`}>
          <span className="section-label">
            The Manifesto
          </span>
          <h2 className="section-header mb-16 lg:mb-24">
            Where Potential <br className="hidden sm:block" />
            <span className="text-brand-primary">Becomes Power.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-12 lg:gap-20 text-left mb-20 lg:mb-32 relative">
          {/* Subtle divider between columns on desktop */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-border-default -translate-x-1/2"></div>
          
          {/* Vision */}
          <div className={`fade-up ${visionInView ? 'in-view' : ''}`} style={{ transitionDelay: '150ms' }}>
            <h3 className="text-xs font-bold text-text-muted tracking-[0.15em] uppercase mb-4">
              Our Vision
            </h3>
            <p className="text-2xl text-text-primary font-bold leading-tight tracking-tight mb-3">
              A world built on skill.
            </p>
            <p className="text-base text-text-secondary leading-relaxed font-medium pr-4">
              We envision a global ecosystem where practical experience, relentless innovation, and lifelong learning empower every individual.
            </p>
          </div>

          {/* Mission */}
          <div className={`fade-up ${visionInView ? 'in-view' : ''}`} style={{ transitionDelay: '300ms' }}>
            <h3 className="text-xs font-bold text-text-muted tracking-[0.15em] uppercase mb-4">
              Our Mission
            </h3>
            <p className="text-2xl text-text-primary font-bold leading-tight tracking-tight mb-3">
              Bridge the gap.
            </p>
            <p className="text-base text-text-secondary leading-relaxed font-medium pr-4">
              We turn raw potential into proven capability through competency-based challenges, expert mentorship, and industry recognition.
            </p>
          </div>
        </div>

        {/* Closing Statement (Emotional Climax) */}
        <div className={`mb-24 lg:mb-32 fade-up ${visionInView ? 'in-view' : ''}`} style={{ transitionDelay: '450ms' }}>
          <h3 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold text-text-primary tracking-tight leading-[1.1] max-w-4xl mx-auto">
            "The future is not just learned.<br className="hidden sm:block"/> <span className="text-brand-primary">It is built.</span>"
          </h3>
        </div>

        {/* Values - Supporting the manifesto softly */}
        <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 text-left">
          {values.map((val, i) => (
            <div
              key={i}
              className={`fade-up ${valuesInView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 bg-brand-primary/80 rounded-full" />
                  <h3 className="text-sm font-semibold text-text-primary tracking-wide uppercase">{val.label}</h3>
                </div>
                <p className="text-sm font-medium text-text-secondary leading-relaxed pl-3.5 border-l border-border-default ml-[3px]">
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* Soft fade into the next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 lg:h-64 bg-gradient-to-b from-transparent to-bg-primary pointer-events-none z-0"></div>

    </section>
  );
}
