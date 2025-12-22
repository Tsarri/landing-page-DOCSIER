import {
  BaselineMetrics,
  calculateAnnualImpact,
  formatCurrency,
  formatPercentage
} from "@/lib/calculatorLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Info, Equal, Minus, X } from "lucide-react";

interface CalculationBreakdownProps {
  metrics: BaselineMetrics;
}

export function CalculationBreakdown({ metrics }: CalculationBreakdownProps) {
  const results = calculateAnnualImpact(metrics);
  
  // Calculation constants
  const weeksPerYear = 52;
  const totalAdminHoursPerYear = metrics.adminHoursPerWeek * weeksPerYear;
  const avgMatterFee = 4000;
  const totalBillableHours = 40 * 30; // 40 weeks × 30 hrs/week

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Desglose Matemático de Pérdidas Operacionales
        </h2>
        <p className="text-muted-foreground">
          Así es como calculamos el costo real de tu overhead administrativo
        </p>
      </div>

      {/* Step 1: Weekly Admin Cost */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">1</span>
            Costo Semanal por Horas Administrativas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-background rounded border border-border">
                <span className="text-muted-foreground">Horas Admin/Semana</span>
                <span className="ml-2 font-bold text-foreground">{metrics.adminHoursPerWeek} hrs</span>
              </span>
              <X className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-background rounded border border-border">
                <span className="text-muted-foreground">Tarifa Horaria</span>
                <span className="ml-2 font-bold text-foreground">{formatCurrency(metrics.hourlyRate)}</span>
              </span>
              <Equal className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-destructive/10 rounded border border-destructive/30">
                <span className="font-bold text-destructive">{formatCurrency(results.weeklyCost)}/semana</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Cada hora administrativa tiene un costo de oportunidad igual a tu tarifa horaria.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Annual Admin Cost */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="w-7 h-7 rounded-full bg-destructive/20 text-destructive text-sm flex items-center justify-center font-bold">2</span>
            Costo Anual de Overhead Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-background rounded border border-border">
                <span className="text-muted-foreground">Costo Semanal</span>
                <span className="ml-2 font-bold text-foreground">{formatCurrency(results.weeklyCost)}</span>
              </span>
              <X className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-background rounded border border-border">
                <span className="text-muted-foreground">Semanas/Año</span>
                <span className="ml-2 font-bold text-foreground">{weeksPerYear}</span>
              </span>
              <Equal className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-destructive/10 rounded border border-destructive/30">
                <span className="font-bold text-destructive text-lg">{formatCurrency(results.annualAdminCost)}/año</span>
              </span>
            </div>
            <div className="pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{totalAdminHoursPerYear} horas</span> al año dedicadas a tareas no facturables
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Estimated Revenue */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="w-7 h-7 rounded-full bg-success/20 text-success text-sm flex items-center justify-center font-bold">3</span>
            Ingresos Brutos Estimados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-background rounded border border-border">
                <span className="text-muted-foreground">Asuntos Activos</span>
                <span className="ml-2 font-bold text-foreground">{metrics.activeMatters}</span>
              </span>
              <X className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-background rounded border border-border">
                <span className="text-muted-foreground">Honorario Promedio</span>
                <span className="ml-2 font-bold text-foreground">{formatCurrency(avgMatterFee)}</span>
              </span>
              <Equal className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-success/10 rounded border border-success/30">
                <span className="font-bold text-success text-lg">{formatCurrency(results.estimatedAnnualRevenue)}/año</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Usamos un honorario promedio de {formatCurrency(avgMatterFee)} por asunto como estimación conservadora.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Real Profit */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-bold">4</span>
            Ganancia Real Anual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-success/10 rounded border border-success/30">
                <span className="text-muted-foreground">Ingresos</span>
                <span className="ml-2 font-bold text-success">{formatCurrency(results.estimatedAnnualRevenue)}</span>
              </span>
              <Minus className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-destructive/10 rounded border border-destructive/30">
                <span className="text-muted-foreground">Overhead</span>
                <span className="ml-2 font-bold text-destructive">{formatCurrency(results.annualAdminCost)}</span>
              </span>
              <Equal className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-primary/10 rounded border border-primary/30">
                <span className="font-bold text-primary text-lg">{formatCurrency(results.actualAnnualProfit)}/año</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 5: Loss Percentage */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="w-7 h-7 rounded-full bg-warning/20 text-warning text-sm flex items-center justify-center font-bold">5</span>
            Porcentaje de Pérdida por Overhead
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">(</span>
              <span className="px-3 py-1.5 bg-destructive/10 rounded border border-destructive/30">
                <span className="font-bold text-destructive">{formatCurrency(results.annualAdminCost)}</span>
              </span>
              <span className="text-muted-foreground">÷</span>
              <span className="px-3 py-1.5 bg-success/10 rounded border border-success/30">
                <span className="font-bold text-success">{formatCurrency(results.estimatedAnnualRevenue)}</span>
              </span>
              <span className="text-muted-foreground">) × 100</span>
              <Equal className="w-4 h-4 text-muted-foreground" />
              <span className="px-3 py-1.5 bg-destructive/10 rounded border border-destructive/30">
                <span className="font-bold text-destructive text-lg">{formatPercentage(results.profitLossPercentage)}</span>
              </span>
            </div>
            <p className="text-sm text-destructive font-medium pt-2 border-t border-border/50">
              Tu overhead administrativo consume el {formatPercentage(results.profitLossPercentage)} de tus ingresos brutos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-destructive/5 border-destructive/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Calculator className="w-10 h-10 mx-auto text-destructive" />
            <div>
              <p className="text-lg text-muted-foreground">
                Estás perdiendo aproximadamente
              </p>
              <p className="text-4xl font-bold text-destructive">
                {formatCurrency(results.annualAdminCost)}
              </p>
              <p className="text-lg text-muted-foreground">
                al año en overhead administrativo
              </p>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Esto equivale a <span className="font-semibold text-foreground">{formatCurrency(results.annualAdminCost / 12)}/mes</span> o{" "}
              <span className="font-semibold text-foreground">{formatCurrency(results.weeklyCost)}/semana</span> en tiempo no facturado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}