import { useInView } from '../hooks/useInView';

const chapters = [
  {
    num: "01",
    title: "Build the Foundation",
    desc: "Develop the hands-on abilities and creative problem-solving mindset needed for real-world impact.",
    tags: ["Practical Skills", "Problem Solving", "Creativity", "Innovation"]
  },
  {
    num: "02",
    title: "Cultivate the Mindset",
    desc: "Discover your true potential, lead with resilience, and learn to trust in your own capabilities.",
    tags: ["Leadership", "Teamwork", "Entrepreneurial Mindset", "Confidence"]
  },
  {
    num: "03",
    title: "Prove Your Mastery",
    desc: "Build a verified body of work and earn credentials that command national respect.",
    tags: ["Project Portfolio", "Professional Certifications", "National Recognition"]
  },
  {
    num: "04",
    title: "Launch Your Future",
    desc: "Connect with industry leaders and emerge fully prepared to step into the professional arena.",
    tags: ["Industry Exposure", "Networking", "Internships", "Career Readiness"]
  }
];

export default function Benefits() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="benefits" className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden flex items-center justify-center min-h-screen">
      
      {/* Subtle Visual Anchor: Upward growth arc */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <svg className="absolute w-[120%] h-[120%] sm:w-full sm:h-full opacity-30" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="xMidYMid slice">
          <path 
            d="M -100 550 C 300 550, 600 150, 1100 50" 
            stroke="url(#growth-gradient)" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className={`transition-all duration-1000 ease-out ${isInView ? 'stroke-dashoffset-0' : 'stroke-dashoffset-[1500]'}`}
            strokeDasharray="1500"
          />
          <defs>
            <linearGradient id="growth-gradient" x1="0" y1="550" x2="1000" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--color-brand-primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-brand-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col justify-center">
        
        {/* Header */}
        <div ref={ref} className={`mb-16 lg:mb-24 text-center max-w-3xl mx-auto fade-up ${isInView ? 'in-view' : ''}`}>
          <span className="section-label">
            Personal Transformation
          </span>
          <h2 className="section-header mb-4">
            Become a More <br className="hidden sm:block" />
            <span className="text-brand-primary">Capable Person.</span>
          </h2>
        </div>

        {/* Editorial Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 lg:gap-y-16">
          {chapters.map((chapter, i) => (
            <div 
              key={i} 
              className={`flex flex-col relative fade-up ${isInView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
            >
              {/* Massive background number */}
              <div className="text-[clamp(5.5rem,10vw,7.5rem)] font-extrabold text-bg-secondary/80 leading-none tracking-tighter absolute -top-8 -left-4 -z-10 select-none">
                {chapter.num}
              </div>
              
              <div className="pt-4 lg:pt-6 h-full flex flex-col">
                <h3 className="text-2xl font-semibold text-text-primary tracking-tight mb-2">
                  {chapter.title}
                </h3>
                <p className="text-base text-text-secondary leading-relaxed mb-4 font-medium">
                  {chapter.desc}
                </p>
                {/* Subtle skill tags */}
                <div className="mt-auto">
                  <p className="text-xs font-bold text-text-muted tracking-widest uppercase leading-loose">
                    {chapter.tags.join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Closing Statement */}
        <div 
          className={`mt-16 lg:mt-24 text-center max-w-3xl mx-auto border-t border-border-hairline pt-10 fade-up ${isInView ? 'in-view' : ''}`}
          style={{ transitionDelay: '750ms' }}
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-text-primary tracking-tight leading-snug">
            "You won't just gain skills—you will become a more <span className="text-brand-primary font-bold">capable, confident, and future-ready</span> person."
          </h3>
        </div>

      </div>
    </section>
  );
}
