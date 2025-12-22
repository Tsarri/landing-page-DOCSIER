import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { BaselineMetrics as BaselineMetricsType } from "@/lib/calculatorLogic";
import { LandingSection } from "./LandingSection";
import { BaselineMetrics } from "./BaselineMetrics";
import { CalculationBreakdown } from "./CalculationBreakdown";
import { AnnualImpact } from "./AnnualImpact";
import { RecognitionMoment } from "./RecognitionMoment";
import { ResultsPage } from "./ResultsPage";

type Step = 'landing' | 'metrics' | 'breakdown' | 'impact' | 'recognition' | 'results';

export function ProfitabilityCalculator() {
  const [step, setStep] = useState<Step>('landing');
  const [metrics, setMetrics] = useState<BaselineMetricsType | null>(null);
  const [clientType, setClientType] = useState<string | null>(null);

  const handleMetricsSubmit = (newMetrics: BaselineMetricsType) => {
    setMetrics(newMetrics);
    setStep('breakdown');
  };

  const handleBack = () => {
    const stepOrder: Step[] = ['landing', 'metrics', 'breakdown', 'impact', 'recognition', 'results'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const stepOrder: Step[] = ['landing', 'metrics', 'breakdown', 'impact', 'recognition', 'results'];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <LandingSection onStart={() => setStep('metrics')} />;
      case 'metrics':
        return (
          <BaselineMetrics
            onSubmit={handleMetricsSubmit}
            initialMetrics={metrics || undefined}
          />
        );
      case 'breakdown':
        return metrics ? <CalculationBreakdown metrics={metrics} /> : null;
      case 'impact':
        return metrics ? <AnnualImpact metrics={metrics} /> : null;
      case 'recognition':
        return (
          <RecognitionMoment
            onSelect={setClientType}
            selectedType={clientType}
            onContinue={() => setStep('results')}
          />
        );
      case 'results':
        return metrics && clientType ? (
          <ResultsPage metrics={metrics} clientType={clientType} />
        ) : null;
      default:
        return null;
    }
  };

  const showNavigation = step !== 'landing' && step !== 'results';
  const showContinue = step === 'breakdown' || step === 'impact';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {step !== 'landing' && (
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </Button>
          </div>
        )}

        {renderStep()}

        {showContinue && (
          <div className="mt-8 text-center">
            <Button size="lg" onClick={handleNext} className="px-8">
              Continuar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
