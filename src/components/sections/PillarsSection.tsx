import { useState } from "react";
import { Shield, Clock, ArrowRight, Eye, Brain, FileSearch, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiagnosticoModal } from "../DiagnosticoModal";

export const PillarsSection = () => {
  const [diagnosticoOpen, setDiagnosticoOpen] = useState(false);

  return (
    <>
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
            
            {/* PILLAR 1: CHAOS CTA */}
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Tu caos administrativo te está costando dinero y tiempo.
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Elimina errores manuales con documentación inteligente.
              </p>

              <div className="pt-4">
                <Button 
                  variant="ctaLarge" 
                  onClick={() => setDiagnosticoOpen(true)}
                  className="group"
                >
                  auto-diagnóstico gratis
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
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
            </div>

            {/* PILLAR 3: SECURITY */}
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
                <p className="text-lg text-muted-foreground">Encriptación del lado del servidor</p>
                <p className="text-lg text-muted-foreground">Ni siquiera nosotros podemos leer tus datos</p>
                <p className="text-lg text-muted-foreground">Auditoría completa de quién accede a qué, y cuándo</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <DiagnosticoModal open={diagnosticoOpen} onOpenChange={setDiagnosticoOpen} />
    </>
  );
};
