import { ChevronDown, X } from "lucide-react";

export const HeroSection = () => {
  const scrollToNext = () => {
    document.getElementById("cost-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <p 
            className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-sage opacity-0 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Para Abogados en Panamá
          </p>

          {/* Main Headline */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            ¿Pierdes casos porque no puedes seguir tus plazos?
          </h1>

          {/* Pain Points */}
          <div 
            className="space-y-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <X className="w-5 h-5 text-brand-coral flex-shrink-0" />
              <span className="text-lg">75% de tu tiempo se va en administración</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <X className="w-5 h-5 text-brand-coral flex-shrink-0" />
              <span className="text-lg">Emails con plazos enterrados en tu inbox</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <X className="w-5 h-5 text-brand-coral flex-shrink-0" />
              <span className="text-lg">Un plazo perdido te cuesta $12K+</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={scrollToNext}
            className="inline-flex items-center justify-center mt-12 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 text-brand-blue-gray animate-bounce-slow" />
          </button>
        </div>
      </div>

      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-coral/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
