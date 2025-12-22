import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagnosticoModal } from "../DiagnosticoModal";
import { ArrowRight } from "lucide-react";
export const CTASection = () => {
  const [diagnosticoOpen, setDiagnosticoOpen] = useState(false);
  return <>
      <section className="cta-gradient section-padding relative overflow-hidden">
        {/* Animated mycelium/wave network */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Central pulse origin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {[...Array(5)].map((_, i) => <div key={`center-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-radar-pulse" style={{
            animationDelay: `${i * 1.5}s`,
            width: '80px',
            height: '80px'
          }} />)}
          </div>

          {/* Left network node */}
          <div className="absolute top-[30%] left-[10%]">
            {[...Array(4)].map((_, i) => <div key={`left-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/15 animate-radar-pulse-slow" style={{
            animationDelay: `${i * 2}s`,
            width: '60px',
            height: '60px'
          }} />)}
          </div>

          {/* Right network node */}
          <div className="absolute bottom-[25%] right-[15%]">
            {[...Array(4)].map((_, i) => <div key={`right-${i}`} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-coral/20 animate-radar-pulse-slow" style={{
            animationDelay: `${i * 2.5 + 0.5}s`,
            width: '50px',
            height: '50px'
          }} />)}
          </div>

          {/* Horizontal wave lines */}
          {[...Array(4)].map((_, i) => <div key={`wave-${i}`} className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-wave-horizontal" style={{
          top: `${15 + i * 25}%`,
          animationDelay: `${i * 1.2}s`
        }} />)}

          {/* Connecting lines - mycelium effect */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <line x1="10%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="0.5" className="text-brand-sage animate-pulse" />
            <line x1="85%" y1="75%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="0.5" className="text-brand-coral animate-pulse" style={{
            animationDelay: '1s'
          }} />
            <line x1="10%" y1="30%" x2="85%" y2="75%" stroke="currentColor" strokeWidth="0.3" className="text-white animate-pulse" style={{
            animationDelay: '2s'
          }} />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Registrate hoy y recupera tu autonomía</h2>

            <p className="text-lg text-white/85">Despídete del tiempo perdido y olvídate de  errores manuales.</p>

            <Button variant="ctaLarge" onClick={() => setDiagnosticoOpen(true)} className="group">
              Auditar Mis Plazos
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            
          </div>
        </div>

        {/* Decorative blur elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-coral/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-maroon/20 rounded-full blur-[100px]" />
      </section>

      <DiagnosticoModal open={diagnosticoOpen} onOpenChange={setDiagnosticoOpen} />
    </>;
};