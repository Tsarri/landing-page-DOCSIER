import { Lock } from "lucide-react";

export const SecurityManifestoSection = () => {
  return (
    <section className="bg-bg-elevated section-padding relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] right-[10%]">
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
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-sage/10 border border-brand-sage/20 mx-auto">
            <Lock className="w-8 h-8 text-brand-sage" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            La privacía no es una característica premium. Es el estándar.
          </h2>

          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Construimos DOCSIER con una regla simple: nunca comprometemos encriptación zero-knowledge 
              por facilidad, features, presión regulatoria, competencia, o dinero.
            </p>
            <p className="font-medium text-foreground/80">
              El día que lo hagamos, cerramos.
            </p>
            <p>
              Tus datos de clientes son privilegiados. Nosotros solo construimos el cofre. Tú tienes las llaves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
