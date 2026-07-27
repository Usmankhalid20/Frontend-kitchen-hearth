import { useState } from 'react';
import HeroSection from './components/HeroSection';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowItWorks';
import FeatureShowcase from './components/FeatureShowcase';
import ExploreIdeas from './components/ExploreIdeas';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import DemoModal from './components/DemoModal';
import LiveActivityToast from './components/LiveActivityToast';

const Landing = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="w-full flex flex-col relative">
      <HeroSection onOpenDemo={() => setDemoOpen(true)} />
      <SocialProof />
      <HowItWorks />
      <FeatureShowcase />
      <ExploreIdeas />
      <Comparison />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      {/* Interactive Overlays */}
      <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <LiveActivityToast />
    </div>
  );
};

export default Landing;
