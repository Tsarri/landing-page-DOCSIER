import {
  BaselineMetrics,
  CLIENT_SCENARIOS,
  calculateScenarioProfit,
  formatCurrency,
  formatPercentage
} from "@/lib/calculatorLogic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ClientScenariosProps {
  metrics: BaselineMetrics;
}

export function ClientScenarios({ metrics }: ClientScenariosProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Aquí está el impacto por tipo de asunto
        </h2>
        <p className="text-muted-foreground">
          Basado en tu tarifa horaria de {formatCurrency(metrics.hourlyRate)}/hora
        </p>
      </div>

      <div className="grid gap-4">
        {CLIENT_SCENARIOS.map((scenario) => {
          const result = calculateScenarioProfit(scenario, metrics.hourlyRate);

          return (
            <Card
              key={scenario.id}
              className={`bg-card/50 border-l-4 ${
                result.status === 'healthy'
                  ? 'border-l-success'
                  : result.status === 'acceptable'
                  ? 'border-l-warning'
                  : 'border-l-destructive'
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {result.status === 'healthy' && (
                      <TrendingUp className="w-6 h-6 text-success" />
                    )}
                    {result.status === 'acceptable' && (
                      <Minus className="w-6 h-6 text-warning" />
                    )}
                    {result.status === 'problem' && (
                      <TrendingDown className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Honorarios</p>
                    <p className="font-semibold text-foreground">
                      {formatCurrency(result.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Horas Admin</p>
                    <p className="font-semibold text-foreground">
                      {scenario.adminHours} hrs
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Costo Admin</p>
                    <p className="font-semibold text-foreground">
                      {formatCurrency(result.adminCost)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ganancia Real</p>
                    <p
                      className={`font-semibold ${
                        result.netProfit > 0
                          ? result.status === 'healthy'
                            ? 'text-success'
                            : 'text-warning'
                          : 'text-destructive'
                      }`}
                    >
                      {formatCurrency(result.netProfit)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Margen</p>
                    <p
                      className={`font-semibold ${
                        result.netProfit > 0
                          ? result.status === 'healthy'
                            ? 'text-success'
                            : 'text-warning'
                          : 'text-destructive'
                      }`}
                    >
                      {formatPercentage(result.margin)}
                    </p>
                  </div>
                </div>

                {result.status === 'problem' && (
                  <div className="mt-3 p-2 bg-destructive/10 rounded text-sm text-destructive">
                    {result.netProfit < 0
                      ? '⚠️ Estás perdiendo dinero en este tipo de cliente'
                      : '⚠️ Margen muy bajo - cliente problemático'}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-muted/30 border-border/50">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <div>
                <p className="font-medium text-foreground">Verde (Margen ≥30%): Cliente Rentable</p>
                <p className="text-muted-foreground">Tu negocio es sostenible con estos clientes</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div>
                <p className="font-medium text-foreground">Amarillo (Margen 10-30%): Aceptable</p>
                <p className="text-muted-foreground">Clientes que justifican el esfuerzo pero con poco margen</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div>
                <p className="font-medium text-foreground">Rojo (Margen &lt;10%): Problema</p>
                <p className="text-muted-foreground">Estos clientes reducen tu profitabilidad general</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
