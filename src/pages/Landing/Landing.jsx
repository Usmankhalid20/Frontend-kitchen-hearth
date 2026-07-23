import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import ExploreIdeas from './components/ExploreIdeas';
import FeatureOverview from './components/FeatureOverview';
import FinalCTA from './components/FinalCTA';

const Landing = () => {
  return (
    <div className="w-full flex flex-col bg-white">
      <HeroSection />
      <HowItWorks />
      <ExploreIdeas />
      <FeatureOverview />
      <FinalCTA />
    </div>
  );
};

export default Landing;
