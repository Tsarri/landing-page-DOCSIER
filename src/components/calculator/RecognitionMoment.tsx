import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getClientMixBreakdown } from "@/lib/calculatorLogic";
import { CheckCircle2 } from "lucide-react";

interface RecognitionMomentProps {
  onSelect: (clientType: string) => void;
  selectedType: string | null;
  onContinue: () => void;
}

export function RecognitionMoment({
  onSelect,
  selectedType,
  onContinue
}: RecognitionMomentProps) {
  const options = [
    {
      id: 'small-manageable',
      title: 'Tengo muchos clientes pequeños pero manejables',
      description:
        'La mayoría de mis clientes pagan honorarios moderados y son relativamente fáciles de gestionar'
    },
    {
      id: 'large-small',
      title: 'Tengo algunos clientes grandes pero también clientes pequeños complicados',
      description:
        'Mezcla de clientes corporativos buenos y clientes pequeños que requieren mucho seguimiento'
    },
    {
      id: 'mixed-problematic',
      title: 'Mi cartera es un mix: algunos rentables, otros problemáticos',
      description:
        'Variedad de clientes con diferentes niveles de rentabilidad y fricción administrativa'
    }
  ];

  const getBreakdownText = (type: string) => getClientMixBreakdown(type);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          ¿Cuál de estos es tu cliente típico?
        </h2>
        <p className="text-muted-foreground">
          Selecciona la opción que mejor describe tu cartera actual
        </p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {options.map((option) => {
          const isSelected = selectedType === option.id;
          const breakdown = getBreakdownText(option.id);

          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'bg-card/50 border-border/50 hover:border-primary/50'
              }`}
              onClick={() => onSelect(option.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    }`}
                  >
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-foreground">
                      {option.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {option.description}
                    </p>

                    {isSelected && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Esto significa:
                        </p>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>
                            • Aproximadamente {breakdown.profitable}% de tu tiempo
                            es rentable
                          </li>
                          <li>
                            • Aproximadamente {breakdown.marginal}% de tu tiempo es
                            marginal
                          </li>
                          <li>
                            • Aproximadamente {breakdown.losing}% de tu tiempo te
                            está perdiendo dinero
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedType && (
        <div className="text-center">
          <Button size="lg" onClick={onContinue} className="px-8">
            Ver Resultados Completos
          </Button>
        </div>
      )}
    </div>
  );
}
