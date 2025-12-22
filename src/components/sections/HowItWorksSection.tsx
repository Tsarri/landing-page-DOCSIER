import { Search, Link2, Eye } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      title: "Diagnostica",
      description: "Corre los tests gratis. Ve dónde duele.",
      icon: Search,
    },
    {
      number: "2",
      title: "Integra",
      description: "Conecta tus documentos. Gemini organiza todo automáticamente. Zero data entry.",
      icon: Link2,
    },
    {
      number: "3",
      title: "Observa",
      description: "Los agentes comienzan a trabajar. Plazos rastreados, expedientes organizados, patrones visibles.",
      icon: Eye,
    },
  ];

  return (
    <section className="bg-background section-padding relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue-gray/5 to-transparent animate-wave-horizontal"
            style={{
              top: `${25 + i * 25}%`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
            Empieza en minutos.
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-12">
            Gemini configura automáticamente tu espacio de trabajo.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="w-16 h-16 rounded-full bg-brand-sage/10 border border-brand-sage/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-brand-sage" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>

                {/* Connector line for desktop */}
                {step.number !== "3" && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-brand-sage/20 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
