import { Navbar, Footer } from '@/components/layout';
import {
  HeroSection,
  FeaturesSection,
  RankShowcase,
  GearShowcase,
  EconomySection,
  BlogSection,
  FaqSection,
  CommunitySection,
} from '@/components/sections';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RankShowcase />
        <GearShowcase />
        <EconomySection />
        <BlogSection />
        <FaqSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
