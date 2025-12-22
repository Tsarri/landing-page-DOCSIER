import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagnosticoModal } from "../DiagnosticoModal";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const [diagnosticoOpen, setDiagnosticoOpen] = useState(false);

  return (
    <>
      <section className="bg-background section-padding relative overflow-hidden">
        {/* Dynamic animated background - matching AnimatedBackground */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* CTA: Left-center primary radar */}
          <div className="absolute top-[50%] left-[8%]">
            {[...Array(3)].map((_, i) => (
              <div
                key={`lc-pulse-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/15 animate-radar-pulse"
                style={{
                  animationDelay: `${i * 4}s`,
                  width: '80px',
                  height: '80px',
                }}
              />
            ))}
          </div>

          {/* CTA: Top-right secondary radar */}
          <div className="absolute top-[20%] right-[25%]">
            {[...Array(2)].map((_, i) => (
              <div
                key={`tr-pulse-${i}`}
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
          <div className="max-w-xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Registrate hoy y recupera tu autonomía</h2>

            <p className="text-lg text-muted-foreground">Despídete del tiempo perdido y olvídate de errores manuales.</p>

            <Button variant="ctaLarge" onClick={() => setDiagnosticoOpen(true)} className="group">
              Auditar Mis Plazos
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      <DiagnosticoModal open={diagnosticoOpen} onOpenChange={setDiagnosticoOpen} />
    </>
  );
};