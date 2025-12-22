import { ChevronDown, X } from "lucide-react";

export const HeroSection = () => {
  const scrollToNext = () => {
    document.getElementById("cost-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient pt-16 overflow-hidden">
      {/* Radar signal background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Central radar pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(6)].map((_, i) => (
            <div
              key={`center-pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-coral/20 animate-radar-pulse"
              style={{
                animationDelay: `${i * 1.2}s`,
                width: '100px',
                height: '100px',
              }}
            />
          ))}
        </div>

        {/* Top-left radar node */}
        <div className="absolute top-[20%] left-[15%]">
          {[...Array(4)].map((_, i) => (
            <div
              key={`tl-pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/15 animate-radar-pulse-slow"
              style={{
                animationDelay: `${i * 1.8}s`,
                width: '60px',
                height: '60px',
              }}
            />
          ))}
        </div>

        {/* Bottom-right radar node */}
        <div className="absolute bottom-[25%] right-[10%]">
          {[...Array(4)].map((_, i) => (
            <div
              key={`br-pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-purple/20 animate-radar-pulse-slow"
              style={{
                animationDelay: `${i * 2}s`,
                width: '50px',
                height: '50px',
              }}
            />
          ))}
        </div>

        {/* Horizontal wave lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-coral/10 to-transparent animate-wave-horizontal"
            style={{
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}

        {/* Connecting lines - network effect */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <line x1="15%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="0.5" className="text-brand-sage animate-pulse" />
          <line x1="90%" y1="75%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="0.5" className="text-brand-purple animate-pulse" style={{ animationDelay: '1s' }} />
          <line x1="15%" y1="20%" x2="90%" y2="75%" stroke="currentColor" strokeWidth="0.3" className="text-brand-coral animate-pulse" style={{ animationDelay: '2s' }} />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
