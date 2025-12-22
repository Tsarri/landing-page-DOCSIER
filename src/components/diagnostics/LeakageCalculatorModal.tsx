import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CalculatorInputs } from "./types";
import { 
  Calculator, TrendingDown, ChevronLeft, ChevronRight, 
  X, Equal, Minus, Info
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface LeakageCalculatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ViewState = 'start' | 'calculator' | 'results';

export const LeakageCalculatorModal = ({ open, onOpenChange }: LeakageCalculatorModalProps) => {
  const [view, setView] = useState<ViewState>('start');
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    activeMatters: 20,
    hourlyRate: 200,
    adminHoursPerWeek: 15,
  });

  const handleStart = () => setView('calculator');

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setView('results');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setView('start');
    }
  };

  const handleRestart = () => {
    setInputs({
      activeMatters: 20,
      hourlyRate: 200,
      adminHoursPerWeek: 15,
    });
    setStep(1);
    setView('start');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleRestart, 300);
  };

  // Calculations
  const weeksPerYear = 52;
  const annualAdminHours = inputs.adminHoursPerWeek * weeksPerYear;
  const weeklyCost = inputs.adminHoursPerWeek * inputs.hourlyRate;
  const annualAdminCost = weeklyCost * weeksPerYear;

  // Annual projections
  const avgMatterFee = 4000;
  const estimatedRevenue = inputs.activeMatters * avgMatterFee;
  const actualProfit = estimatedRevenue - annualAdminCost;
  const lossPercentage = (annualAdminCost / estimatedRevenue) * 100;

  // Time distribution data
  const totalWeeklyHours = 40;
  const billableHours = totalWeeklyHours - inputs.adminHoursPerWeek;
  const timeData = [
    { name: "Horas Facturables", value: billableHours, color: "hsl(var(--brand-sage))" },
    { name: "Trabajo Administrativo", value: inputs.adminHoursPerWeek, color: "hsl(var(--destructive))" },
  ];

  const progress = (step / 3) * 100;

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4 flex items-center justify-between">
          <SheetHeader className="text-left">
            <SheetTitle className="text-lg">Calculadora de Pérdidas Operacionales</SheetTitle>
          </SheetHeader>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Start View */}
          {view === 'start' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="bg-brand-coral text-white p-5 rounded-full">
                    <Calculator className="h-10 w-10" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    ¿Cuánto Te Cuesta Realmente Cada Cliente?
                  </h2>
                  <p className="text-muted-foreground">
                    Descubre la rentabilidad de tu firma
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">3 min</div>
                  <p className="text-xs text-muted-foreground">Para completar</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">Autodiagnóstico</div>
                  <p className="text-xs text-muted-foreground">Personalizado</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">PDF</div>
                  <p className="text-xs text-muted-foreground">Gratis</p>
                </Card>
              </div>

              <Button onClick={handleStart} className="w-full h-14 text-lg bg-brand-coral hover:bg-brand-coral/90">
                Calcular Mi Profitabilidad
              </Button>

              <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                <TrendingDown className="h-3 w-3" />
                Usado por más de 500 abogados independientes
              </p>
            </div>
          )}

          {/* Calculator View */}
          {view === 'calculator' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Progress value={progress} className="h-1.5" />
                <p className="text-sm text-muted-foreground">Pregunta {step} de 3</p>
              </div>

              <div className="min-h-[300px] flex flex-col justify-center">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        ¿Cuántos asuntos cobrables (honorarios) tienes activos por semana?
                      </h2>
                      <p className="text-muted-foreground">
                        Incluye todos los casos en los que estás trabajando
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-5xl font-bold text-brand-coral">{inputs.activeMatters}</span>
                        <p className="text-muted-foreground mt-1">asuntos activos</p>
                      </div>

                      <Slider
                        value={[inputs.activeMatters]}
                        onValueChange={(value) => setInputs({ ...inputs, activeMatters: value[0] })}
                        min={5}
                        max={50}
                        step={1}
                      />

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5</span>
                        <span>50</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        ¿Cuál es tu tarifa horaria promedio?
                      </h2>
                      <p className="text-muted-foreground">
                        Selecciona el rango que mejor representa tus honorarios
                      </p>
                    </div>

                    <Select
                      value={inputs.hourlyRate.toString()}
                      onValueChange={(value) => setInputs({ ...inputs, hourlyRate: parseInt(value) })}
                    >
                      <SelectTrigger className="w-full h-14 text-xl">
                        <SelectValue placeholder="Selecciona tu tarifa" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">$100/hora</SelectItem>
                        <SelectItem value="150">$150/hora</SelectItem>
                        <SelectItem value="200">$200/hora</SelectItem>
                        <SelectItem value="250">$250/hora</SelectItem>
                        <SelectItem value="300">$300/hora</SelectItem>
                        <SelectItem value="350">$350/hora</SelectItem>
                        <SelectItem value="400">$400/hora</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">
                        ¿Horas semanales en trabajo administrativo?
                      </h2>
                      <p className="text-muted-foreground">
                        Emails, documentos, seguimiento, facturación, etc.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Input
                        type="number"
                        min={5}
                        max={25}
                        value={inputs.adminHoursPerWeek}
                        onChange={(e) => setInputs({ ...inputs, adminHoursPerWeek: parseInt(e.target.value) || 0 })}
                        className="w-full h-16 text-3xl text-center"
                      />
                      <p className="text-center text-muted-foreground">horas por semana</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={handleBack} className="h-12 min-w-12">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button onClick={handleNext} className="flex-1 h-12 text-lg bg-brand-coral hover:bg-brand-coral/90">
                  {step === 3 ? "Ver Mis Resultados" : "Siguiente"}
                  {step < 3 && <ChevronRight className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            </div>
          )}

          {/* Results View */}
          {view === 'results' && (
            <div className="space-y-6 animate-fade-in">
              {/* Hero */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-destructive">
                  Estás Perdiendo {formatCurrency(annualAdminCost)}/año
                </h2>
                <p className="text-muted-foreground">
                  Por carga administrativa que podrías eliminar
                </p>
              </div>

              {/* Time Distribution Chart */}
              <Card className="p-4">
                <h3 className="text-lg font-bold mb-4">Distribución de Tu Tiempo Semanal</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={timeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${value}h`}
                      outerRadius={70}
                      dataKey="value"
                    >
                      {timeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              {/* Mathematical Breakdown */}
              <Card className="p-4">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Desglose Matemático
                </h3>
                <div className="space-y-4">
                  {/* Step 1: Weekly Cost */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">1</span>
                      Costo Semanal
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-1 bg-background rounded border border-border text-xs">
                          {inputs.adminHoursPerWeek} hrs/sem
                        </span>
                        <span className="text-muted-foreground">×</span>
                        <span className="px-2 py-1 bg-background rounded border border-border text-xs">
                          {formatCurrency(inputs.hourlyRate)}/hr
                        </span>
                        <Equal className="w-3 h-3 text-muted-foreground" />
                        <span className="px-2 py-1 bg-destructive/10 rounded border border-destructive/30 text-destructive font-bold text-xs">
                          {formatCurrency(weeklyCost)}/sem
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Annual Cost */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-destructive/20 text-destructive text-xs flex items-center justify-center font-bold">2</span>
                      Costo Anual de Overhead
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-1 bg-background rounded border border-border text-xs">
                          {formatCurrency(weeklyCost)}/sem
                        </span>
                        <span className="text-muted-foreground">×</span>
                        <span className="px-2 py-1 bg-background rounded border border-border text-xs">
                          {weeksPerYear} semanas
                        </span>
                        <Equal className="w-3 h-3 text-muted-foreground" />
                        <span className="px-2 py-1 bg-destructive/10 rounded border border-destructive/30 text-destructive font-bold">
                          {formatCurrency(annualAdminCost)}/año
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
                        <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        {annualAdminHours} horas anuales en tareas no facturables
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Revenue */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-success/20 text-success text-xs flex items-center justify-center font-bold">3</span>
                      Ingresos Brutos Estimados
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-1 bg-background rounded border border-border text-xs">
                          {inputs.activeMatters} asuntos
                        </span>
                        <span className="text-muted-foreground">×</span>
                        <span className="px-2 py-1 bg-background rounded border border-border text-xs">
                          {formatCurrency(avgMatterFee)}/asunto
                        </span>
                        <Equal className="w-3 h-3 text-muted-foreground" />
                        <span className="px-2 py-1 bg-success/10 rounded border border-success/30 text-success font-bold">
                          {formatCurrency(estimatedRevenue)}/año
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Real Profit */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">4</span>
                      Ganancia Real
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-1 bg-success/10 rounded border border-success/30 text-success font-bold text-xs">
                          {formatCurrency(estimatedRevenue)}
                        </span>
                        <Minus className="w-3 h-3 text-muted-foreground" />
                        <span className="px-2 py-1 bg-destructive/10 rounded border border-destructive/30 text-destructive font-bold text-xs">
                          {formatCurrency(annualAdminCost)}
                        </span>
                        <Equal className="w-3 h-3 text-muted-foreground" />
                        <span className="px-2 py-1 bg-primary/10 rounded border border-primary/30 text-primary font-bold">
                          {formatCurrency(actualProfit)}/año
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Loss Percentage */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-warning/20 text-warning text-xs flex items-center justify-center font-bold">5</span>
                      Porcentaje de Pérdida
                    </p>
                    <div className="bg-muted/50 p-3 rounded-lg text-sm">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-muted-foreground">(</span>
                        <span className="text-destructive font-medium">{formatCurrency(annualAdminCost)}</span>
                        <span className="text-muted-foreground">÷</span>
                        <span className="text-success font-medium">{formatCurrency(estimatedRevenue)}</span>
                        <span className="text-muted-foreground">) × 100 =</span>
                        <span className="px-2 py-1 bg-destructive/10 rounded border border-destructive/30 text-destructive font-bold">
                          {lossPercentage.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-destructive mt-2">
                        El overhead consume el {lossPercentage.toFixed(1)}% de tus ingresos brutos.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Annual Impact Summary */}
              <Card className="p-5 bg-brand-coral text-white">
                <h3 className="text-lg font-bold mb-3">Resumen de Impacto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ingresos brutos:</span>
                    <span className="font-bold">{formatCurrency(estimatedRevenue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overhead administrativo:</span>
                    <span className="font-bold">-{formatCurrency(annualAdminCost)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/20 text-lg">
                    <span>Ganancia real:</span>
                    <span className="font-bold">{formatCurrency(actualProfit)}</span>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleRestart} className="flex-1">
                  Recalcular
                </Button>
                <Button onClick={handleClose} className="flex-1 bg-brand-coral hover:bg-brand-coral/90">
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
