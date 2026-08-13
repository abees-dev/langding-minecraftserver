import dynamic from 'next/dynamic';
import { Navbar, Footer, JsonLd } from '@/components/layout';
import HeroSection from '@/components/sections/HeroSection';

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'));
const RankShowcase = dynamic(() => import('@/components/sections/RankShowcase'));
const GearShowcase = dynamic(() => import('@/components/sections/GearShowcase'));
const EconomySection = dynamic(() => import('@/components/sections/EconomySection'));
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'));
const FaqSection = dynamic(() => import('@/components/sections/FaqSection'));
const CommunitySection = dynamic(() => import('@/components/sections/CommunitySection'));

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      <JsonLd />
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

