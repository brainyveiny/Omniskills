import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';

const WhyOSO = React.lazy(() => import('./components/WhyOSO'));
const SkillChampionships = React.lazy(() => import('./components/SkillChampionships'));
const HowItWorks = React.lazy(() => import('./components/HowItWorks'));
const Benefits = React.lazy(() => import('./components/Benefits'));
const VisionMissionValues = React.lazy(() => import('./components/VisionMissionValues'));
const Ecosystem = React.lazy(() => import('./components/Ecosystem'));
const Roadmap = React.lazy(() => import('./components/Roadmap'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const FinalCTA = React.lazy(() => import('./components/FinalCTA'));
const Footer = React.lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--color-brand-accent)] via-white to-[var(--color-surface-hover)] overflow-hidden flex flex-col items-center">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <About />
        <Suspense fallback={<div className="h-32 w-full flex items-center justify-center bg-bg-secondary"><div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <WhyOSO />
          <SkillChampionships />
          <HowItWorks />
          <Benefits />
          <VisionMissionValues />
          <Ecosystem />
          <Roadmap />
          <FAQ />
          <FinalCTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
