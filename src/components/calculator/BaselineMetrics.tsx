import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { BaselineMetrics as BaselineMetricsType, formatCurrency } from "@/lib/calculatorLogic";
import { Briefcase, Clock, DollarSign } from "lucide-react";

interface BaselineMetricsProps {
  onSubmit: (metrics: BaselineMetricsType) => void;
  initialMetrics?: BaselineMetricsType;
}

export function BaselineMetrics({ onSubmit, initialMetrics }: BaselineMetricsProps) {
  const [metrics, setMetrics] = useState<BaselineMetricsType>(
    initialMetrics || {
      activeMatters: 25,
      hourlyRate: 200,
      adminHoursPerWeek: 15
    }
  );

  const handleSubmit = () => {
    onSubmit(metrics);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Cuéntanos sobre tu práctica
        </h2>
        <p className="text-muted-foreground">
          Ajusta los valores para reflejar tu situación actual
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="w-5 h-5 text-primary" />
              Asuntos Activos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>¿Cuántos asuntos cobrables (honorarios) tienes activos por semana?</Label>
              <span className="text-2xl font-bold text-primary">
                {metrics.activeMatters}
              </span>
            </div>
            <Slider
              value={[metrics.activeMatters]}
              onValueChange={([value]) =>
                setMetrics({ ...metrics, activeMatters: value })
              }
              min={5}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 asuntos</span>
              <span>100 asuntos</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="w-5 h-5 text-primary" />
              Tarifa Horaria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>¿Cuál es tu tarifa horaria?</Label>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(metrics.hourlyRate)}
              </span>
            </div>
            <Slider
              value={[metrics.hourlyRate]}
              onValueChange={([value]) =>
                setMetrics({ ...metrics, hourlyRate: value })
              }
              min={50}
              max={500}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$50/hora</span>
              <span>$500/hora</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              Horas Administrativas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Horas semanales en tareas no facturables</Label>
              <span className="text-2xl font-bold text-primary">
                {metrics.adminHoursPerWeek} hrs
              </span>
            </div>
            <Slider
              value={[metrics.adminHoursPerWeek]}
              onValueChange={([value]) =>
                setMetrics({ ...metrics, adminHoursPerWeek: value })
              }
              min={5}
              max={40}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 horas</span>
              <span>40 horas</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Incluye: emails, llamadas, seguimiento, facturación, organización
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button size="lg" onClick={handleSubmit} className="px-8">
          Ver Mi Análisis
        </Button>
      </div>
    </div>
  );
}
