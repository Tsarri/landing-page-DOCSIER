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
    <section className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
