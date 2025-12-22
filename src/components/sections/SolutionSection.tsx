import { useState } from "react";
import { Mail, Calendar, FolderOpen, BarChart3, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapacityScorecardModal, LeakageCalculatorModal } from "@/components/diagnostics";

export const SolutionSection = () => {
  const [capacityOpen, setCapacityOpen] = useState(false);
  const [leakageOpen, setLeakageOpen] = useState(false);

  const features = [
    {
      icon: Mail,
      text: "Extrae plazos de emails automáticamente",
    },
    {
      icon: Calendar,
      text: "Nunca olvida una fecha límite",
    },
    {
      icon: FolderOpen,
      text: "Organiza expedientes mientras trabajas",
    },
  ];

  return (
    <section className="bg-background section-padding relative overflow-hidden">
      {/* Dynamic animated background - matching radar style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Solution: Right-center primary radar */}
        <div className="absolute top-[40%] right-[10%]">
          {[...Array(3)].map((_, i) => (
            <div
              key={`rc-pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/15 animate-radar-pulse"
              style={{
                animationDelay: `${i * 4}s`,
                width: '80px',
                height: '80px',
              }}
            />
          ))}
        </div>

        {/* Solution: Top-left secondary radar */}
        <div className="absolute top-[15%] left-[25%]">
          {[...Array(2)].map((_, i) => (
            <div
              key={`tl-pulse-${i}`}
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
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            DOCSIER elimina el 75% de tu carga administrativa
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cuatro agentes de IA observan tu trabajo y automatizan lo que un asistente haría: 
            procesar emails, rastrear plazos, organizar documentos, aprender tus procesos.
          </p>

          <h3 className="text-2xl font-semibold text-brand-sage">
            Cero entrada de datos. Cero cambios a tu workflow.
          </h3>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-bg-elevated rounded-xl p-6 border border-muted/20 hover:border-brand-sage/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-sage-glow"
              >
                <feature.icon className="w-10 h-10 text-brand-coral mx-auto mb-4" />
                <p className="text-foreground font-medium">{feature.text}</p>
              </div>
            ))}
          </div>

          {/* Auto-diagnóstico Tools */}
          <div className="pt-8 border-t border-muted/20">
            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
              Auto-diagnóstico gratuito
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              <Button
                onClick={() => setCapacityOpen(true)}
                variant="outline"
                className="h-auto py-4 px-6 flex flex-col items-center gap-2 hover:border-brand-sage/40 hover:bg-brand-sage/5"
              >
                <BarChart3 className="w-6 h-6 text-brand-sage" />
                <span className="font-medium">Índice de Capacidad Operacional</span>
                <span className="text-xs text-muted-foreground">3-4 min</span>
              </Button>
              <Button
                onClick={() => setLeakageOpen(true)}
                variant="outline"
                className="h-auto py-4 px-6 flex flex-col items-center gap-2 hover:border-brand-coral/40 hover:bg-brand-coral/5"
              >
                <Calculator className="w-6 h-6 text-brand-coral" />
                <span className="font-medium">Calculadora de Pérdidas</span>
                <span className="text-xs text-muted-foreground">3 min</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CapacityScorecardModal open={capacityOpen} onOpenChange={setCapacityOpen} />
      <LeakageCalculatorModal open={leakageOpen} onOpenChange={setLeakageOpen} />
    </section>
  );
};
