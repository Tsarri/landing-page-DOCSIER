import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagnosticoModal } from "../DiagnosticoModal";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  const [diagnosticoOpen, setDiagnosticoOpen] = useState(false);

  return (
    <>
      <section className="cta-gradient section-padding relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Empieza con una auditoría gratuita
            </h2>

            <p className="text-lg text-white/85">
              Te mostramos cuántos plazos estás a punto de perder.
            </p>

            <Button
              variant="ctaLarge"
              onClick={() => setDiagnosticoOpen(true)}
              className="group"
            >
              Auditar Mis Plazos
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="text-sm text-white/60">
              5 minutos. Sin tarjeta de crédito.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-coral/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-maroon/20 rounded-full blur-[100px]" />
      </section>

      <DiagnosticoModal open={diagnosticoOpen} onOpenChange={setDiagnosticoOpen} />
    </>
  );
};
