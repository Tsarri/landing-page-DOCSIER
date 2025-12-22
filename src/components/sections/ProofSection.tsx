import { useState } from "react";
import { Calculator, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CapacityScorecardModal, LeakageCalculatorModal } from "@/components/diagnostics";

export const ProofSection = () => {
  const [capacityOpen, setCapacityOpen] = useState(false);
  const [leakageOpen, setLeakageOpen] = useState(false);

  return (
    <>
      <section className="bg-bg-elevated section-padding relative overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] left-[15%]">
            {[...Array(2)].map((_, i) => (
              <div
                key={`pulse-${i}`}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/6 animate-radar-pulse-slow"
                style={{
                  animationDelay: `${i * 5}s`,
                  width: '60px',
                  height: '60px',
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Descubre qué está pasando en tu firma. Gratis.
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Tool 1: Calculadora de Pérdidas */}
              <div className="bg-background rounded-2xl p-8 border border-muted/20 hover:border-brand-coral/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-coral-glow">
                <Calculator className="w-12 h-12 text-brand-coral mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Calculadora de Pérdidas
                </h3>
                <p className="text-sm text-brand-coral font-medium mb-3">3 minutos</p>
                <p className="text-muted-foreground mb-6">
                  Cuánto dinero pierdes realmente cada mes por errores administrativos y plazos perdidos.
                </p>
                <Button 
                  onClick={() => setLeakageOpen(true)}
                  variant="outline"
                  className="w-full hover:border-brand-coral/40 hover:bg-brand-coral/5"
                >
                  Comenzar
                </Button>
              </div>

              {/* Tool 2: Índice de Capacidad Operacional */}
              <div className="bg-background rounded-2xl p-8 border border-muted/20 hover:border-brand-sage/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-sage-glow">
                <BarChart3 className="w-12 h-12 text-brand-sage mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Índice de Capacidad Operacional
                </h3>
                <p className="text-sm text-brand-sage font-medium mb-3">3-4 minutos</p>
                <p className="text-muted-foreground mb-6">
                  Tu firma opera al X% de su capacidad real. Esto te muestra dónde está el espacio.
                </p>
                <Button 
                  onClick={() => setCapacityOpen(true)}
                  variant="outline"
                  className="w-full hover:border-brand-sage/40 hover:bg-brand-sage/5"
                >
                  Comenzar
                </Button>
              </div>
            </div>

            <p className="text-muted-foreground">
              Cero spam. Cero obligación de comprar. Solo números reales sobre tu firma.
            </p>
          </div>
        </div>
      </section>

      <CapacityScorecardModal open={capacityOpen} onOpenChange={setCapacityOpen} />
      <LeakageCalculatorModal open={leakageOpen} onOpenChange={setLeakageOpen} />
    </>
  );
};
