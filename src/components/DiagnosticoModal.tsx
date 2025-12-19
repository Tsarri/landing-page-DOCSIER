import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosticoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Answer = string | null;

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuántos expedientes activos manejas?",
    options: ["<10", "10-30", "30-50", "50+"],
  },
  {
    id: 2,
    question: "¿Cuántos emails legales recibes por día?",
    options: ["<10", "10-30", "30-50", "50+"],
  },
  {
    id: 3,
    question: "¿Has perdido un plazo en los últimos 6 meses?",
    options: ["Sí", "No", "No estoy seguro"],
  },
];

const calculateRisk = (answers: Answer[]): { level: string; percentage: number; hours: number; cost: number } => {
  let riskScore = 0;

  // Answer 1: Expedientes
  if (answers[0] === "50+") riskScore += 3;
  else if (answers[0] === "30-50") riskScore += 2;
  else if (answers[0] === "10-30") riskScore += 1;

  // Answer 2: Emails
  if (answers[1] === "50+") riskScore += 3;
  else if (answers[1] === "30-50") riskScore += 2;
  else if (answers[1] === "10-30") riskScore += 1;

  // Answer 3: Lost deadline
  if (answers[2] === "Sí") riskScore += 4;
  else if (answers[2] === "No estoy seguro") riskScore += 2;

  const percentage = Math.min(Math.round((riskScore / 10) * 100), 95);
  const hours = Math.round(8 + (riskScore * 2));
  const cost = hours * 150 * 52;

  if (riskScore >= 6) return { level: "ALTO", percentage, hours, cost };
  if (riskScore >= 3) return { level: "MEDIO", percentage, hours, cost };
  return { level: "BAJO", percentage, hours, cost };
};

export const DiagnosticoModal = ({ open, onOpenChange }: DiagnosticoModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([null, null, null]);
    setShowResults(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleReset, 300);
  };

  const risk = calculateRisk(answers);

  const getRiskIcon = () => {
    if (risk.level === "ALTO") return <AlertTriangle className="w-8 h-8 text-brand-coral" />;
    if (risk.level === "MEDIO") return <HelpCircle className="w-8 h-8 text-yellow-500" />;
    return <CheckCircle className="w-8 h-8 text-brand-sage" />;
  };

  const getRiskColor = () => {
    if (risk.level === "ALTO") return "text-brand-coral";
    if (risk.level === "MEDIO") return "text-yellow-500";
    return "text-brand-sage";
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-background border-brand-purple p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-muted/20">
          <DialogTitle className="text-xl font-semibold text-foreground">
            Diagnóstico de Plazos
          </DialogTitle>
          {!showResults && (
            <div className="flex items-center gap-2 mt-3">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-all duration-300",
                    index <= currentStep ? "bg-brand-coral" : "bg-muted"
                  )}
                />
              ))}
            </div>
          )}
        </DialogHeader>

        {/* Content */}
        <div className="p-6">
          {!showResults ? (
            <div className="space-y-6 animate-fade-in" key={currentStep}>
              <p className="text-sm text-muted-foreground">
                Paso {currentStep + 1} de {questions.length}
              </p>

              <h3 className="text-xl font-semibold text-foreground">
                {questions[currentStep].question}
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {questions[currentStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-200 text-left font-medium",
                      answers[currentStep] === option
                        ? "border-brand-coral bg-brand-coral/10 text-foreground"
                        : "border-muted/30 hover:border-muted/60 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>
                <Button
                  variant="default"
                  onClick={handleNext}
                  disabled={answers[currentStep] === null}
                  className="gap-2"
                >
                  {currentStep === questions.length - 1 ? "Ver Resultados" : "Siguiente"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Risk Level */}
              <div className="text-center space-y-3">
                {getRiskIcon()}
                <h3 className={cn("text-3xl font-bold", getRiskColor())}>
                  Tu Riesgo: {risk.level}
                </h3>
              </div>

              {/* Risk Breakdown */}
              <div className="bg-bg-elevated rounded-lg p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Riesgo de plazo perdido:</span>
                  <span className={cn("font-bold", getRiskColor())}>{risk.percentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Horas perdidas/semana:</span>
                  <span className="font-bold text-foreground">~{risk.hours}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Costo anual estimado:</span>
                  <span className="font-bold text-brand-coral">
                    ${risk.cost.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message */}
              <p className="text-muted-foreground text-center">
                {risk.level === "ALTO" 
                  ? "Tu firma necesita automatización urgente. Estás perdiendo dinero cada semana."
                  : risk.level === "MEDIO"
                  ? "Hay oportunidades significativas para mejorar tu eficiencia."
                  : "Tu operación es sólida, pero siempre hay espacio para optimizar."}
              </p>

              {/* CTA */}
              <div className="space-y-3 pt-2">
                <Button variant="hero" className="w-full" size="lg">
                  Hablar con Experto
                </Button>
                <Button variant="ghost" className="w-full" onClick={handleReset}>
                  Repetir Diagnóstico
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
