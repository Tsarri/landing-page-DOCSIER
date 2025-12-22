import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

interface LandingSectionProps {
  onStart: () => void;
}

export function LandingSection({ onStart }: LandingSectionProps) {
  return (
    <div className="space-y-8 text-center py-8">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary">
          <Calculator className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground italic">
          ¿Cuánto Te Cuesta Realmente Cada Cliente?
        </h1>
        <p className="text-base text-muted-foreground">
          Descubre la rentabilidad de tu firma
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-2xl mx-auto">
        <div className="bg-muted/50 rounded-lg p-3 md:p-4 text-center">
          <p className="text-lg md:text-2xl font-bold text-primary">3 min</p>
          <p className="text-xs md:text-sm text-muted-foreground">Para completar</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 md:p-4 text-center">
          <p className="text-sm md:text-2xl font-bold text-primary leading-tight">Autodiagnóstico</p>
          <p className="text-xs md:text-sm text-muted-foreground">Personalizado</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-3 md:p-4 text-center">
          <p className="text-lg md:text-2xl font-bold text-primary">PDF</p>
          <p className="text-xs md:text-sm text-muted-foreground">Gratis</p>
        </div>
      </div>

      <Button size="lg" onClick={onStart} className="w-full max-w-2xl mx-auto py-6 text-lg font-semibold">
        Calcular Mi Profitabilidad
      </Button>
    </div>
  );
}
