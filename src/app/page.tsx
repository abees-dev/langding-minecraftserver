import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RankShowcase from "@/components/RankShowcase";
import GearShowcase from "@/components/GearShowcase";
import EconomySection from "@/components/EconomySection";
import FaqSection from "@/components/FaqSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

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
        <FaqSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
