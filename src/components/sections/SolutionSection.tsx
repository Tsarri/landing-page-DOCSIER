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
    <section className="section-padding relative overflow-hidden">
      {/* Free-flowing dynamic background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Flowing gradient blobs - more visible */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-brand-coral/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-brand-sage/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-[450px] h-[450px] bg-brand-purple/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-brand-coral/8 rounded-full blur-2xl animate-blob animation-delay-2000" />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-brand-sage/30 rounded-full animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
        
        {/* Flowing wave lines */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 300">
          <path
            d="M-100,150 Q200,50 400,150 T800,150 T1300,150"
            fill="none"
            stroke="url(#wave-gradient-1)"
            strokeWidth="2"
            className="animate-flow-path"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          />
          <path
            d="M-100,200 Q150,250 350,200 T700,200 T1100,200 T1400,200"
            fill="none"
            stroke="url(#wave-gradient-2)"
            strokeWidth="1.5"
            className="animate-flow-path-slow"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
          />
          <path
            d="M-50,100 Q300,30 500,100 T900,100 T1250,100"
            fill="none"
            stroke="url(#wave-gradient-3)"
            strokeWidth="1"
            className="animate-flow-path"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: '2s' }}
          />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--brand-coral))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--brand-coral))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--brand-coral))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--brand-sage))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--brand-sage))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--brand-sage))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--brand-purple))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--brand-purple))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--brand-purple))" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
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
