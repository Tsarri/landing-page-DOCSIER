import {
  BaselineMetrics,
  calculateAnnualImpact,
  formatCurrency
} from "@/lib/calculatorLogic";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowRight } from "lucide-react";

interface AnnualImpactProps {
  metrics: BaselineMetrics;
}

export function AnnualImpact({ metrics }: AnnualImpactProps) {
  const results = calculateAnnualImpact(metrics);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Ahora, veamos el impacto en tu año completo
        </h2>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="pt-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Si tus {metrics.activeMatters} asuntos activos generan aproximadamente...
            </p>
            <p className="text-4xl font-bold text-success">
              {formatCurrency(results.estimatedAnnualRevenue)}
            </p>
            <p className="text-muted-foreground">en honorarios brutos este año</p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground">...pero gastas en administración...</p>
            <p className="text-4xl font-bold text-destructive">
              {formatCurrency(results.annualAdminCost)}
            </p>
            <p className="text-sm text-muted-foreground">
              ({metrics.adminHoursPerWeek} horas/semana × 52 semanas × {formatCurrency(metrics.hourlyRate)}/hora)
            </p>
          </div>

          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-muted-foreground">...tu ganancia real será...</p>
            <p className="text-4xl font-bold text-primary">
              {formatCurrency(results.actualAnnualProfit)}
            </p>
            <p className="text-muted-foreground">
              o {formatCurrency(results.actualAnnualProfit / 12)}/mes
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-destructive/10 border-destructive/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div className="space-y-3">
              <p className="text-foreground">
                Esto significa que estás ganando solo el{' '}
                <span className="font-bold">
                  {(100 - results.profitLossPercentage).toFixed(0)}%
                </span>{' '}
                de tus honorarios brutos
              </p>
              <p className="text-muted-foreground">
                El overhead administrativo te está costando{' '}
                <span className="font-semibold text-destructive">
                  {results.profitLossPercentage.toFixed(0)}% de tus ingresos
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/30 border-border/50">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground mb-4">
            Tu verdadera ganancia por hora de trabajo:
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tarifa nominal</p>
              <p className="text-2xl font-bold text-foreground line-through opacity-50">
                {formatCurrency(metrics.hourlyRate)}
              </p>
            </div>
            <ArrowRight className="w-6 h-6 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tarifa efectiva</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(results.effectiveHourlyRate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
