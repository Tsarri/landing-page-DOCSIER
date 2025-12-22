import { ChevronDown, X } from "lucide-react";

export const HeroSection = () => {
  const scrollToNext = () => {
    document.getElementById("cost-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-16 overflow-hidden">
      {/* Dynamic animated background - matching AnimatedBackground */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hero: Top-left primary radar */}
        <div className="absolute top-[25%] left-[20%]">
          {[...Array(3)].map((_, i) => (
            <div
              key={`tl-pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/15 animate-radar-pulse"
              style={{
                animationDelay: `${i * 4}s`,
                width: '80px',
                height: '80px',
              }}
            />
          ))}
        </div>

        {/* Hero: Bottom-right secondary radar */}
        <div className="absolute bottom-[30%] right-[15%]">
          {[...Array(2)].map((_, i) => (
            <div
              key={`br-pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-blue-gray/15 animate-radar-pulse-slow"
              style={{
                animationDelay: `${i * 5 + 2}s`,
                width: '60px',
                height: '60px',
              }}
            />
          ))}
        </div>

        {/* Horizontal wave lines */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue-gray/8 to-transparent animate-wave-horizontal"
            style={{
              top: `${25 + i * 25}%`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}

        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
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

    </section>
  );
};
