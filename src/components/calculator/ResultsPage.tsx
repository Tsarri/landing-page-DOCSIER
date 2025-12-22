import {
  BaselineMetrics,
  calculateAnnualImpact,
  calculatePotentialSavings,
  formatCurrency,
  formatPercentage
} from "@/lib/calculatorLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Calculator,
  Info
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

interface ResultsPageProps {
  metrics: BaselineMetrics;
  clientType: string;
}

export function ResultsPage({ metrics, clientType }: ResultsPageProps) {
  const results = calculateAnnualImpact(metrics);
  const savings = calculatePotentialSavings(results.annualAdminCost);

  // Calculation breakdown values
  const weeksPerYear = 52;
  const totalAdminHoursPerYear = metrics.adminHoursPerWeek * weeksPerYear;
  const avgMatterFee = 4000;
  const totalBillableHours = 40 * 30; // 40 weeks * 30 hrs/week

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm">
          <AlertTriangle className="w-4 h-4" />
          Análisis Completo
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Tu Overhead Operacional Es{' '}
          <span className="text-destructive">
            {formatCurrency(results.annualAdminCost)}
          </span>{' '}
          Anuales
        </h1>
        <p className="text-lg text-muted-foreground">
          Esto reduce tu verdadera ganancia en{' '}
          {formatPercentage(results.profitLossPercentage)}
        </p>
      </div>

      {/* Revenue vs Profit */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-success/10 border-success/30">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Revenue Esperado
            </p>
            <p className="text-4xl font-bold text-success">
              {formatCurrency(results.estimatedAnnualRevenue)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Lo que crees que vas a ganar
            </p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="pt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Ganancia Real</p>
            <p className="text-4xl font-bold text-primary">
              {formatCurrency(results.actualAnnualProfit)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Lo que realmente te queda después de admin
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center p-4 bg-muted/30 rounded-lg">
        <p className="text-muted-foreground">
          La diferencia:{' '}
          <span className="font-bold text-destructive">
            {formatCurrency(results.annualAdminCost)}
          </span>
        </p>
        <p className="text-sm text-muted-foreground">
          Este es el costo invisible de tu overhead administrativo
        </p>
      </div>

      {/* Algebraic Breakdown */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            ¿Cómo Llegamos a Estos Resultados?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cost Calculation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-destructive/20 text-destructive text-sm flex items-center justify-center">1</span>
              Cálculo del Costo Administrativo Anual
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Costo Anual Admin =</span>
                <span className="text-foreground">Horas Admin/Semana</span>
                <span className="text-muted-foreground">×</span>
                <span className="text-foreground">Semanas/Año</span>
                <span className="text-muted-foreground">×</span>
                <span className="text-foreground">Tarifa Horaria</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-primary font-bold">
                <span className="text-muted-foreground">=</span>
                <span>{metrics.adminHoursPerWeek} hrs</span>
                <span className="text-muted-foreground">×</span>
                <span>{weeksPerYear} semanas</span>
                <span className="text-muted-foreground">×</span>
                <span>{formatCurrency(metrics.hourlyRate)}/hr</span>
              </div>
              <div className="flex items-center gap-2 text-destructive font-bold text-lg pt-2 border-t border-border/50">
                <span className="text-muted-foreground">=</span>
                <span>{formatCurrency(results.annualAdminCost)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Las horas administrativas representan tiempo no facturable: emails, llamadas, seguimiento, facturación, organización.
            </p>
          </div>

          {/* Revenue Estimation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-success/20 text-success text-sm flex items-center justify-center">2</span>
              Estimación de Ingresos Brutos
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Ingresos Brutos =</span>
                <span className="text-foreground">Asuntos Activos</span>
                <span className="text-muted-foreground">×</span>
                <span className="text-foreground">Honorario Promedio</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-primary font-bold">
                <span className="text-muted-foreground">=</span>
                <span>{metrics.activeMatters} asuntos</span>
                <span className="text-muted-foreground">×</span>
                <span>{formatCurrency(avgMatterFee)}/asunto</span>
              </div>
              <div className="flex items-center gap-2 text-success font-bold text-lg pt-2 border-t border-border/50">
                <span className="text-muted-foreground">=</span>
                <span>{formatCurrency(results.estimatedAnnualRevenue)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Usamos un honorario promedio de {formatCurrency(avgMatterFee)} por asunto como estimación conservadora.
            </p>
          </div>

          {/* Real Profit */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center">3</span>
              Ganancia Real Anual
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Ganancia Real =</span>
                <span className="text-foreground">Ingresos Brutos</span>
                <span className="text-muted-foreground">−</span>
                <span className="text-foreground">Costo Admin</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-primary font-bold">
                <span className="text-muted-foreground">=</span>
                <span className="text-success">{formatCurrency(results.estimatedAnnualRevenue)}</span>
                <span className="text-muted-foreground">−</span>
                <span className="text-destructive">{formatCurrency(results.annualAdminCost)}</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold text-lg pt-2 border-t border-border/50">
                <span className="text-muted-foreground">=</span>
                <span>{formatCurrency(results.actualAnnualProfit)}</span>
              </div>
            </div>
          </div>

          {/* Effective Rate */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-warning/20 text-warning text-sm flex items-center justify-center">4</span>
              Tarifa Horaria Efectiva
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">Tarifa Efectiva =</span>
                <span className="text-foreground">Ganancia Real</span>
                <span className="text-muted-foreground">÷</span>
                <span className="text-foreground">Horas Facturables/Año</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-primary font-bold">
                <span className="text-muted-foreground">=</span>
                <span>{formatCurrency(results.actualAnnualProfit)}</span>
                <span className="text-muted-foreground">÷</span>
                <span>{totalBillableHours.toLocaleString()} hrs</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-lg pt-2 border-t border-border/50">
                <span className="text-muted-foreground">=</span>
                <span className="text-primary">{formatCurrency(results.effectiveHourlyRate)}</span>
                <span className="text-muted-foreground text-sm font-normal">(vs {formatCurrency(metrics.hourlyRate)} nominal)</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1">
              <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Asumimos 40 semanas laborales × 30 horas facturables por semana = {totalBillableHours.toLocaleString()} horas/año.
            </p>
          </div>

          {/* Loss Percentage */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-destructive/20 text-destructive text-sm flex items-center justify-center">5</span>
              Porcentaje de Pérdida por Overhead
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground">% Pérdida =</span>
                <span className="text-foreground">(Costo Admin ÷ Ingresos Brutos)</span>
                <span className="text-muted-foreground">× 100</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-primary font-bold">
                <span className="text-muted-foreground">=</span>
                <span>({formatCurrency(results.annualAdminCost)} ÷ {formatCurrency(results.estimatedAnnualRevenue)})</span>
                <span className="text-muted-foreground">× 100</span>
              </div>
              <div className="flex items-center gap-2 text-destructive font-bold text-lg pt-2 border-t border-border/50">
                <span className="text-muted-foreground">=</span>
                <span>{formatPercentage(results.profitLossPercentage)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Effective Rate Visual */}
      <Card className="bg-muted/30 border-border/50">
        <CardHeader>
          <CardTitle className="text-center">
            Tu Verdadera Ganancia Por Hora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Tarifa Nominal</p>
              <p className="text-3xl font-bold text-foreground line-through opacity-50">
                {formatCurrency(metrics.hourlyRate)}
              </p>
            </div>
            <ArrowRight className="w-8 h-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Ganancia Real</p>
              <p className="text-3xl font-bold text-primary">
                {formatCurrency(results.effectiveHourlyRate)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Potential Savings */}
      <Card className="bg-success/10 border-success/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Si eliminabas solo el 30% de tu carga administrativa:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(savings.savedAmount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  recuperados anuales
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-success">
                  {savings.savedHoursPerWeek.toFixed(1)} horas
                </p>
                <p className="text-sm text-muted-foreground">
                  adicionales cada semana
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-2xl font-bold text-success">
                  {formatCurrency(savings.savedAmount / 12)}
                </p>
                <p className="text-sm text-muted-foreground">
                  adicionales mensuales
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Para trabajo de mayor valor o descanso
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-center">Próximos Pasos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Test de Estrés de Flujo de Trabajo</span>
              <span className="text-xs text-muted-foreground font-normal">
                Descubre exactamente dónde se esconde tu overhead
              </span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Download className="w-5 h-5" />
              <span>Descargar Análisis Completo</span>
              <span className="text-xs text-muted-foreground font-normal">
                PDF con tu análisis de profitabilidad
              </span>
            </Button>
            <Button className="h-auto py-4 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span>Auditoría Operacional Gratuita</span>
              <span className="text-xs text-muted-foreground font-normal">
                Consulta de 30 minutos sin compromiso
              </span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Share2 className="w-5 h-5" />
              <span>Compartir Con Un Colega</span>
              <span className="text-xs text-muted-foreground font-normal">
                Ayuda a otros abogados a descubrir esto
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
