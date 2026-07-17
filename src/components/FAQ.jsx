import { useState } from 'react';
import { useInView } from '../hooks/useInView';

const faqs = [
  {
    q: 'Who can participate?',
    a: 'OMNI Skills Olympiad welcomes participants from all educational backgrounds and skill levels — students, learners, and practitioners across disciplines.',
  },
  {
    q: 'Is prior experience required?',
    a: 'No prior experience is required. OSO is designed for all skill levels, from beginners to advanced practitioners. Learning resources are provided to help you prepare.',
  },
  {
    q: 'Are competitions individual or team based?',
    a: 'OSO offers both individual and team-based competitions depending on the skill championship category, giving participants flexibility in how they compete.',
  },
  {
    q: 'Will participants receive certificates?',
    a: 'Yes, all participants receive certificates of participation. Winners and top performers receive special recognition, awards, and professional certifications.',
  },
  {
    q: 'How are winners evaluated?',
    a: 'Evaluation is conducted by expert evaluators based on practical skills, creativity, problem-solving, innovation, and real-world application of knowledge.',
  },
  {
    q: 'Are competitions available for different age groups?',
    a: 'Yes, OSO offers competitions across different age groups and educational levels to ensure fair and inclusive participation for everyone.',
  },
  {
    q: 'Can institutions register multiple participants?',
    a: 'Yes, educational institutions can register multiple participants across different skill championships. Bulk registration options are available.',
  },
  {
    q: 'What learning resources are provided?',
    a: 'OSO provides curated learning materials, practice challenges, mentorship access, and orientation sessions to help participants prepare for competitions.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const toggleOpen = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section id="faq" className="py-32 lg:py-48 bg-bg-primary relative overflow-hidden">
      
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[35%_1fr] gap-16 lg:gap-24">
          
          {/* Left: Sticky Header */}
          <div className="lg:sticky lg:top-40 self-start">
            <div ref={ref} className={`fade-up ${isInView ? 'in-view' : ''}`}>
              <span className="section-label !text-text-muted">
                FAQ
              </span>
              <h2 className="section-header mb-6">
                Common <br className="hidden lg:block"/>
                <span className="italic text-text-muted">Questions</span>
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed max-w-sm font-medium mb-12">
                Simple answers before you take the next step.
              </p>

              {/* Editorial Divider */}
              <div className="w-12 h-[1px] bg-border-default mb-10" />

              {/* Trust Facts */}
              <ul className="space-y-5 mb-12">
                <li className="flex items-center text-xs font-bold tracking-[0.2em] uppercase text-text-muted">
                  <span className="w-1 h-1 bg-brand-primary/50 rounded-full mr-4" />
                  Multiple Skill Championships
                </li>
                <li className="flex items-center text-xs font-bold tracking-[0.2em] uppercase text-text-muted">
                  <span className="w-1 h-1 bg-brand-primary/50 rounded-full mr-4" />
                  National Recognition
                </li>
                <li className="flex items-center text-xs font-bold tracking-[0.2em] uppercase text-text-muted">
                  <span className="w-1 h-1 bg-brand-primary/50 rounded-full mr-4" />
                  Industry Mentorship
                </li>
              </ul>

              <a href="#contact" className="inline-flex items-center text-sm font-semibold text-text-primary hover:text-brand-primary transition-colors duration-300 group">
                Still need help? Contact us 
                <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

            </div>
          </div>

          {/* Right: Accordion */}
          <div className="max-w-3xl">
            <div className="relative">
              {/* Top border for the first item */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-border-hairline" />

              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="relative group">
                    
                    {/* Disappearing Divider */}
                    {i > 0 && (
                      <div className={`absolute top-0 left-0 w-full h-[1px] bg-border-hairline transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    )}

                    <button
                      onClick={() => toggleOpen(i)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between text-left py-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 relative z-10"
                    >
                      <span className={`text-2xl font-semibold tracking-tight pr-8 transition-colors duration-300 ${
                        isOpen ? 'text-brand-primary' : 'text-text-primary'
                      }`}>
                        {faq.q}
                      </span>
                      <span className={`flex-shrink-0 ml-4 mt-2 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-brand-primary' : 'text-text-muted group-hover:text-text-secondary'
                      }`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    
                    {/* Animated Answer Body */}
                    <div className={`grid transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden">
                        <div className={`pb-12 pr-8 md:pr-12 transform transition-transform duration-300 ease-out ${
                          isOpen ? 'translate-y-0' : 'translate-y-3'
                        }`}>
                          <p className="text-base text-text-secondary leading-relaxed font-medium">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {/* Bottom border for the last item */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-hairline" />
            </div>

            {/* Closing Statement */}
            <div className={`mt-24 pt-12 border-t border-border-hairline fade-up ${isInView ? 'in-view' : ''}`} style={{ transitionDelay: '300ms' }}>
              <p className="text-[clamp(2rem,3vw,2.5rem)] font-bold tracking-tight text-text-primary mb-4 leading-tight">
                Still have questions?
              </p>
              <p className="text-lg text-text-secondary mb-10 font-medium max-w-md leading-relaxed">
                We're happy to help you choose the right championship and guide you through registration.
              </p>
              <a href="#contact" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-text-primary hover:text-brand-primary transition-colors duration-300 group">
                Contact Us 
                <span className="ml-3 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
