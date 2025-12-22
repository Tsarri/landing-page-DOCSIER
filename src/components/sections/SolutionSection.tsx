import { Mail, Calendar, FolderOpen } from "lucide-react";

export const SolutionSection = () => {
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
        {/* Flowing gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-coral/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-brand-sage/8 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-brand-purple/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Flowing wave lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <path
            d="M0,50 Q250,0 500,50 T1000,50 T1500,50"
            fill="none"
            stroke="url(#wave-gradient-1)"
            strokeWidth="1"
            className="animate-flow-path"
          />
          <path
            d="M0,100 Q200,150 400,100 T800,100 T1200,100"
            fill="none"
            stroke="url(#wave-gradient-2)"
            strokeWidth="0.5"
            className="animate-flow-path-slow"
          />
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--brand-coral))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--brand-coral))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--brand-coral))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--brand-sage))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--brand-sage))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--brand-sage))" stopOpacity="0" />
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
        </div>
      </div>
    </section>
  );
};
