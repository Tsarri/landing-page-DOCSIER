import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NosotrosModal } from "./NosotrosModal";
import { DiagnosticoModal } from "./DiagnosticoModal";

export const Navigation = () => {
  const [nosotrosOpen, setNosotrosOpen] = useState(false);
  const [diagnosticoOpen, setDiagnosticoOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-brand-coral tracking-tight">
                DOCSIER
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <Button
                variant="nav"
                onClick={() => setNosotrosOpen(true)}
              >
                Nosotros
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDiagnosticoOpen(true)}
              >
                Auto-Diagnóstico
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <NosotrosModal open={nosotrosOpen} onOpenChange={setNosotrosOpen} />
      <DiagnosticoModal open={diagnosticoOpen} onOpenChange={setDiagnosticoOpen} />
    </>
  );
};
