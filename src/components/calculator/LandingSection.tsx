import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingDown, Clock, DollarSign } from "lucide-react";

interface LandingSectionProps {
  onStart: () => void;
}

export function LandingSection({ onStart }: LandingSectionProps) {
  return (
    <div className="space-y-8 text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Calculadora de Rentabilidad
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubre cuánto te está costando realmente el overhead administrativo 
          y cómo impacta tu ganancia por hora.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6 text-center space-y-2">
            <TrendingDown className="w-8 h-8 mx-auto text-destructive" />
            <h3 className="font-semibold text-foreground">Costo Oculto</h3>
            <p className="text-sm text-muted-foreground">
              Calcula el verdadero costo de tu carga administrativa
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6 text-center space-y-2">
            <Clock className="w-8 h-8 mx-auto text-warning" />
            <h3 className="font-semibold text-foreground">Tiempo Perdido</h3>
            <p className="text-sm text-muted-foreground">
              Identifica cuántas horas gastas en tareas no facturables
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="pt-6 text-center space-y-2">
            <DollarSign className="w-8 h-8 mx-auto text-success" />
            <h3 className="font-semibold text-foreground">Ganancia Real</h3>
            <p className="text-sm text-muted-foreground">
              Descubre tu verdadera tarifa horaria efectiva
            </p>
          </CardContent>
        </Card>
      </div>

      <Button size="lg" onClick={onStart} className="px-8">
        Comenzar Análisis
      </Button>

      <p className="text-xs text-muted-foreground">
        Solo toma 2 minutos • Resultados inmediatos • 100% confidencial
      </p>
    </div>
  );
}
