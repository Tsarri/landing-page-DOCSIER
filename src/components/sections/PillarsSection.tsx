import { Shield, Clock, Lightbulb, Check, Eye, Brain, FileSearch, BarChart3 } from "lucide-react";

export const PillarsSection = () => {
  return (
    <section id="pillars-section" className="bg-background section-padding relative overflow-hidden">
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
        <div className="space-y-24">
          
          {/* PILLAR 1: SECURITY */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-brand-sage/10 border border-brand-sage/20">
                <Shield className="w-8 h-8 text-brand-sage" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Tu información nunca abandona tu firma.
              </h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                <span className="text-lg text-muted-foreground">Encriptación del lado del servidor</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                <span className="text-lg text-muted-foreground">Ni siquiera nosotros podemos leer tus datos</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                <span className="text-lg text-muted-foreground">Auditoría completa de quién accede a qué, y cuándo</span>
              </div>
            </div>
          </div>

          {/* PILLAR 2: TIME SAVED */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-brand-coral/10 border border-brand-coral/20">
                <Clock className="w-8 h-8 text-brand-coral" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                El 95% de tu trabajo administrativo desaparece.
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-elevated border border-muted/20">
                <FileSearch className="w-5 h-5 text-brand-coral flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Extraen plazos de correos y documentos automáticamente</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-elevated border border-muted/20">
                <BarChart3 className="w-5 h-5 text-brand-coral flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Organizan expedientes mientras crece tu firma</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-elevated border border-muted/20">
                <Eye className="w-5 h-5 text-brand-coral flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Rastrean qué está en riesgo antes de que te des cuenta</span>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-elevated border border-muted/20">
                <Brain className="w-5 h-5 text-brand-coral flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Aprenden tus procesos y se adaptan</span>
              </div>
            </div>
            
            <p className="text-lg font-medium text-brand-coral">
              Zero entrada de datos manual. Tu firma de siempre sin peso muerto.
            </p>
          </div>

          {/* PILLAR 3: INSIGHTS */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-brand-blue-gray/10 border border-brand-blue-gray/20">
                <Lightbulb className="w-8 h-8 text-brand-blue-gray" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Recupera tiempo perdido y elimina errores antes de que sucedan.
              </h2>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
