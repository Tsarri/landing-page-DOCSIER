import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { CostSection } from "@/components/sections/CostSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CostSection />
        <SolutionSection />
        <ProofSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
