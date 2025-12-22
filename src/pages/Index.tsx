import { Navigation } from "@/components/Navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { HeroSection } from "@/components/sections/HeroSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SecurityManifestoSection } from "@/components/sections/SecurityManifestoSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navigation />
      <main>
        <HeroSection />
        <PillarsSection />
        <ProofSection />
        <HowItWorksSection />
        <SecurityManifestoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
