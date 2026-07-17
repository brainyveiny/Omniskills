import { useInView } from '../hooks/useInView';

export default function WhyOSO() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="why-oso" className="pt-24 lg:pt-32 pb-12 lg:pb-16 bg-bg-secondary">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div ref={ref} className={`fade-up ${isInView ? 'in-view' : ''}`}>
          <span className="section-label">
            Who Can Participate?
          </span>
          <h2 className="section-header mb-6">
            Every Talent Deserves <br className="hidden sm:block" />
            <span className="text-brand-primary">an Opportunity.</span>
          </h2>
          <p className="text-lg font-medium text-text-secondary leading-relaxed max-w-2xl mx-auto mb-20">
            We believe that every learner has talent. Regardless of your background, experience, or skill level—OSO provides the space to practice, compete, and grow.
          </p>
        </div>

        {/* Visual Groups */}
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-10 mb-20">
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.496 1.509 1.333 1.509 2.316V18" />
                </svg>
              ),
              title: "The Curious Learner",
              desc: "From curiosity to capability. Take your very first steps in a supportive environment."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              ),
              title: "The Passionate Builder",
              desc: "Apply what you learn and build practical skills through real-world challenges."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-5.624a6.023 6.023 0 01-2.77.896" />
                </svg>
              ),
              title: "The Driven Leader",
              desc: "From learning to leadership. Showcase your talent and gain national recognition."
            }
          ].map((group, i) => (
            <div
              key={i}
              className={`flex flex-col items-center fade-up ${isInView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${150 + i * 100}ms` }}
            >
              <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary mb-6 border border-brand-primary/10 shadow-sm transition-transform duration-300 hover:scale-110">
                {group.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{group.title}</h3>
              <p className="text-sm font-medium text-text-secondary leading-relaxed px-2">
                {group.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div
          className={`pt-12 border-t border-border-hairline fade-up ${isInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '450ms' }}
        >
          <h3 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-text-primary tracking-tight leading-[1.2] mb-3">
            Every success starts with believing in yourself.
          </h3>
          <p className="text-base font-semibold text-brand-primary">
            This platform is meant for someone like you.
          </p>
        </div>

      </div>
    </section>
  );
}
