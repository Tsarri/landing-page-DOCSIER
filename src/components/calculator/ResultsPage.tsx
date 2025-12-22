import {
  BaselineMetrics,
  calculateAnnualImpact,
  calculatePotentialSavings,
  formatCurrency,
  formatPercentage,
  getClientMixBreakdown
} from "@/lib/calculatorLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Download,
  Calendar,
  TrendingUp,
  AlertTriangle,
  ArrowRight
} from "lucide-react";
import { ClientScenarios } from "./ClientScenarios";

interface ResultsPageProps {
  metrics: BaselineMetrics;
  clientType: string;
}

export function ResultsPage({ metrics, clientType }: ResultsPageProps) {
  const results = calculateAnnualImpact(metrics);
  const savings = calculatePotentialSavings(results.annualAdminCost);
  const breakdown = getClientMixBreakdown(clientType);

  const profitableMatters = Math.round(
    (metrics.activeMatters * breakdown.profitable) / 100
  );
  const marginalMatters = Math.round(
    (metrics.activeMatters * breakdown.marginal) / 100
  );
  const losingMatters =
    metrics.activeMatters - profitableMatters - marginalMatters;

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

      {/* Client Scenarios */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground text-center">
          Desglose de Profitabilidad por Tipo de Cliente
        </h2>
        <ClientScenarios metrics={metrics} />
      </div>

      {/* Matter Breakdown */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-center">
            Esto Significa Que de Tus {metrics.activeMatters} Asuntos Activos:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <p className="text-4xl font-bold text-success">
                {profitableMatters}
              </p>
              <p className="font-medium text-foreground">Son rentables</p>
              <p className="text-sm text-muted-foreground">
                Generan márgenes saludables
              </p>
            </div>
            <div className="text-center p-4 bg-warning/10 rounded-lg">
              <p className="text-4xl font-bold text-warning">{marginalMatters}</p>
              <p className="font-medium text-foreground">Son marginales</p>
              <p className="text-sm text-muted-foreground">
                Apenas justifican el esfuerzo
              </p>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <p className="text-4xl font-bold text-destructive">
                {losingMatters}
              </p>
              <p className="font-medium text-foreground">Te pierden dinero</p>
              <p className="text-sm text-muted-foreground">
                Reducen tu profitabilidad total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Effective Rate */}
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
