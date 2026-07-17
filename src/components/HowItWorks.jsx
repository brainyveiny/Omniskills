import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════
   Journey Steps Data
   ═══════════════════════════════════════════════════════ */
const steps = [
  {
    title: 'Registration',
    label: 'REGISTER',
    description:
      'Sign up and create your participant profile to begin your journey in the OMNI Skills Olympiad.',
    cta: 'Register Now',
  },
  {
    title: 'Orientation',
    label: 'ORIENT',
    description:
      'Understand the competition format, rules, and pathways available across all skill domains.',
    cta: 'Get Oriented',
  },
  {
    title: 'Learning',
    label: 'LEARN',
    description:
      'Access curated learning resources, practice materials, and mentorship to build your skills.',
    cta: 'Start Learning',
  },
  {
    title: 'Skill Challenges',
    label: 'CHALLENGE',
    description:
      'Test your abilities through focused skill challenges designed to push your boundaries.',
    cta: 'Take a Challenge',
  },
  {
    title: 'Practical Competition',
    label: 'COMPETE',
    description:
      'Build real solutions and projects in hands-on practical competitions across disciplines.',
    cta: 'Compete Now',
  },
  {
    title: 'Evaluation',
    label: 'ASSESS',
    description:
      'Expert evaluators assess your work based on practical skills, creativity, and innovation.',
    cta: 'Learn More',
  },
  {
    title: 'Recognition & Awards',
    label: 'RECOGNIZE',
    description:
      'Celebrate your achievements with certificates, professional recognition, and national awards.',
    cta: 'View Awards',
  },
  {
    title: 'National Championship',
    label: 'CHAMPION',
    description:
      'Advance to the national stage and represent your region in the OMNI National Championship.',
    cta: 'Aim for National',
  },
];

const TOTAL = steps.length;

/* ═══════════════════════════════════════════════════════
   Step Icons
   ═══════════════════════════════════════════════════════ */
const stepIcons = [
  <svg key="0" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75" />
  </svg>,
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15v-3.75m0 0h-.008v.008H6.75v-.008z" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.06A2.25 2.25 0 014.5 10v-1.5A2.25 2.25 0 016.75 6.33l5.1 3.06a2.25 2.25 0 001.92 0l5.1-3.06A2.25 2.25 0 0121 8.5V10a2.25 2.25 0 01-1.82 2.11l-5.1 3.06a2.25 2.25 0 01-1.92 0zM6.75 17.67l5.1 3.06a2.25 2.25 0 001.92 0l5.1-3.06" />
  </svg>,
  <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>,
  <svg key="6" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-5.624a6.023 6.023 0 01-2.77.896" />
  </svg>,
  <svg key="7" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
  </svg>,
];

/* Large icons for the info panel */
const stepIconsLarge = stepIcons.map((icon, i) => {
  const paths = icon.props.children;
  return (
    <svg key={`lg-${i}`} className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      {paths}
    </svg>
  );
});

/* ═══════════════════════════════════════════════════════
   SVG Configuration
   ═══════════════════════════════════════════════════════ */
const SVG_W = 920;
const SVG_H = 520;

const milestonePoints = [
  { x: 60,  y: 455 },
  { x: 185, y: 400 },
  { x: 310, y: 348 },
  { x: 428, y: 296 },
  { x: 540, y: 244 },
  { x: 652, y: 188 },
  { x: 762, y: 126 },
  { x: 865, y: 60  },
];

/* ─── Catmull-Rom to Cubic Bezier Path ─── */
function generateSmoothPath(points, tension = 0.3) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

/* ═══════════════════════════════════════════════════════
   Milestone Card Component
   ═══════════════════════════════════════════════════════ */
function MilestoneCard({ step, index, point, isActive, isCompleted, onHover }) {
  const leftPct = (point.x / SVG_W) * 100;
  const topPct = (point.y / SVG_H) * 100;

  return (
    <div
      className="absolute z-10"
      style={{ left: `${leftPct}%`, top: `${topPct}%` }}
      onMouseEnter={onHover}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          animate={{
            scale: isActive ? 1.05 : 1,
            y: isActive ? -4 : 0,
          }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Card body */}
          <motion.div
            className="rounded-2xl p-4 text-center mb-1.5 bg-surface-default border border-border-default transition-shadow"
            animate={{
              boxShadow: isActive
                ? '0 20px 40px -8px rgba(0,0,0,0.12), 0 0 0 2px rgba(217,45,32,0.1)'
                : '0 4px 24px rgba(0,0,0,0.04)',
              borderColor: isActive ? 'rgba(217,45,32,0.2)' : 'var(--color-border-default)',
            }}
            style={{ width: 130 }}
          >
            {/* Icon */}
            <motion.div
              className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
              animate={{
                backgroundColor: isCompleted ? 'var(--color-brand-primary)' : 'var(--color-bg-secondary)',
                color: isCompleted ? 'var(--color-text-inverse)' : 'var(--color-text-muted)',
              }}
            >
              {stepIcons[index]}
            </motion.div>

            {/* Label */}
            <motion.span
              className="block text-xs font-bold tracking-[0.15em] uppercase mb-1"
              animate={{ color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-muted)' }}
            >
              {step.label}
            </motion.span>

            {/* Title */}
            <h4 className="text-xs font-semibold text-text-primary leading-tight">
              {step.title}
            </h4>
          </motion.div>

          {/* Connector stem */}
          <div className="w-px h-4 bg-border-strong" />

          {/* Dot on curve */}
          <motion.div
            className="rounded-full flex-shrink-0"
            animate={{
              width: isActive ? 14 : 10,
              height: isActive ? 14 : 10,
              backgroundColor: isCompleted ? 'var(--color-brand-primary)' : 'var(--color-border-strong)',
              boxShadow: isActive ? '0 0 0 4px rgba(217,45,32,0.12)' : '0 0 0 0px rgba(217,45,32,0)',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */
export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(1200);

  const pathD = useMemo(() => generateSmoothPath(milestonePoints), []);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const progress = active / (TOTAL - 1);
  const dashOffset = pathLength * (1 - progress);

  return (
    <section id="journey" className="py-24 lg:py-32 bg-bg-secondary overflow-hidden relative">
      
      {/* Gentle Side Lighting */}
      <div className="absolute top-0 right-0 bottom-0 w-[50vw] pointer-events-none opacity-80" style={{ background: 'radial-gradient(ellipse at right center, rgba(255,255,255,0.7) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="section-label">
            How It Works
          </span>
          <h2 className="section-header">
            Your Journey Towards{' '}
            <span className="text-brand-primary">Excellence</span>
          </h2>
        </div>

        {/* ══ Desktop Layout ══ */}
        <div className="hidden lg:grid lg:grid-cols-[300px_1fr] gap-10 items-start">
          {/* ── Left: Information Panel ── */}
          <div className="sticky top-28">
            <div className="bg-surface-default border border-border-default shadow-neutral rounded-[2rem] overflow-hidden">
              <div className="p-8 xl:p-10 min-h-[340px] flex flex-col justify-center relative">
                {/* Decorative corner element */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-brand-primary/[0.02] rounded-full" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10"
                  >
                    {/* Step badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent rounded-full mb-4">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      <span className="text-xs font-bold text-brand-primary tracking-[0.15em] uppercase">
                        Step {active + 1} of {TOTAL}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-text-inverse mb-4 shadow-[0_0_32px_rgba(217,45,32,0.15)]">
                      {stepIconsLarge[active]}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl xl:text-3xl font-semibold text-text-primary tracking-tight mb-3 leading-tight">
                      {steps[active].title}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-text-secondary leading-relaxed mb-6">
                      {steps[active].description}
                    </p>

                    {/* CTA */}
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-text-inverse text-sm font-semibold rounded-xl btn-hover hover:bg-brand-hover shadow-[0_0_32px_rgba(217,45,32,0.15)] transition-colors duration-200">
                      {steps[active].cta}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress bar at the bottom of the panel */}
              <div className="px-6 xl:px-7 pb-5">
                <div className="h-1 bg-border-hairline rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-primary rounded-full"
                    animate={{ width: `${((active + 1) / TOTAL) * 100}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Curved Journey Path ── */}
          <div
            className="relative"
            style={{ aspectRatio: `${SVG_W} / ${SVG_H}` }}
          >
            {/* SVG Curve */}
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="absolute inset-0 w-full h-full"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background path (gray) */}
              <path
                d={pathD}
                stroke="var(--color-border-hairline)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
              />

              {/* Animated progress path (red) */}
              <motion.path
                ref={pathRef}
                d={pathD}
                stroke="var(--color-brand-primary)"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={pathLength}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />
            </svg>

            {/* Milestone Cards */}
            {steps.map((step, i) => (
              <MilestoneCard
                key={i}
                step={step}
                index={i}
                point={milestonePoints[i]}
                isActive={i === active}
                isCompleted={i <= active}
                onHover={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {/* ══ Mobile / Tablet Layout ══ */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-250 ${
                    isActive
                      ? 'bg-surface-default border-brand-primary/20 shadow-[0_4px_24px_rgba(217,45,32,0.1)]'
                      : 'bg-bg-secondary border-border-default'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-250 ${
                        isActive || i < active
                          ? 'bg-brand-primary text-text-inverse'
                          : 'bg-bg-secondary text-text-muted'
                      }`}
                    >
                      {stepIcons[i]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-brand-primary tracking-[0.15em] uppercase">
                          Step {i + 1}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-text-primary">{step.title}</h4>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                              {step.description}
                            </p>
                            <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary">
                              {step.cta}
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
