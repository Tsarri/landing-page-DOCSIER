import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CalculatorInputs, ClientScenario } from "./types";
import { 
  Calculator, TrendingDown, ChevronLeft, ChevronRight, 
  ArrowLeft, Share2, X 
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
  const annualAdminHours = inputs.adminHoursPerWeek * 52;
  const adminCostPerHour = inputs.hourlyRate * 0.85;
  const annualAdminCost = annualAdminHours * adminCostPerHour;

  // Client scenarios
  const scenarios: ClientScenario[] = [
    {
      type: "Cliente corporativo, bajo mantenimiento",
      fee: 12000,
      adminHours: 8,
      profit: 0,
      margin: 0,
      status: "profit",
    },
    {
      type: "Cliente regular, fricción media",
      fee: 4000,
      adminHours: 15,
      profit: 0,
      margin: 0,
      status: "profit",
    },
    {
      type: "Cliente pequeño, alta fricción",
      fee: 2000,
      adminHours: 20,
      profit: 0,
      margin: 0,
      status: "warning",
    },
    {
      type: "Referido familiar, fricción extrema",
      fee: 1500,
      adminHours: 25,
      profit: 0,
      margin: 0,
      status: "loss",
    },
    {
      type: "Cliente recurrente, baja fricción",
      fee: 7000,
      adminHours: 5,
      profit: 0,
      margin: 0,
      status: "profit",
    },
  ];

  // Calculate profits for scenarios
  scenarios.forEach((scenario) => {
    scenario.profit = scenario.fee - (scenario.adminHours * inputs.hourlyRate);
    scenario.margin = (scenario.profit / scenario.fee) * 100;

    if (scenario.profit < 0) {
      scenario.status = "loss";
    } else if (scenario.margin < 20) {
      scenario.status = "warning";
    } else {
      scenario.status = "profit";
    }
  });

  // Annual projections
  const avgMatterFee = 4000;
  const estimatedRevenue = inputs.activeMatters * avgMatterFee;
  const actualProfit = estimatedRevenue - annualAdminCost;

  // Time distribution data
  const totalWeeklyHours = 40;
  const billableHours = totalWeeklyHours - inputs.adminHoursPerWeek;
  const timeData = [
    { name: "Horas Facturables", value: billableHours, color: "hsl(var(--brand-sage))" },
    { name: "Trabajo Administrativo", value: inputs.adminHoursPerWeek, color: "hsl(var(--destructive))" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "profit": return "text-success";
      case "warning": return "text-warning";
      case "loss": return "text-destructive";
      default: return "text-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "profit": return "bg-success/10 border-success/20";
      case "warning": return "bg-warning/10 border-warning/20";
      case "loss": return "bg-destructive/10 border-destructive/20";
      default: return "bg-muted";
    }
  };

  const progress = (step / 3) * 100;

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
                    Descubre tu verdadera profitabilidad por cliente y por asunto
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">3 min</div>
                  <p className="text-xs text-muted-foreground">Para completar</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">0 emails</div>
                  <p className="text-xs text-muted-foreground">Sin registro</p>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">100%</div>
                  <p className="text-xs text-muted-foreground">Precisión</p>
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
                        ¿Cuántos asuntos billables tienes activos?
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
                  Estás Perdiendo ${annualAdminCost.toLocaleString()}/año
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

              {/* Client Scenarios */}
              <Card className="p-4">
                <h3 className="text-lg font-bold mb-4">Análisis por Tipo de Cliente</h3>
                <div className="space-y-2">
                  {scenarios.map((scenario, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${getStatusBg(scenario.status)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{scenario.type}</p>
                          <p className="text-xs text-muted-foreground">
                            ${scenario.fee.toLocaleString()} | {scenario.adminHours}h admin
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${getStatusColor(scenario.status)}`}>
                            {scenario.profit >= 0 ? "+" : ""}${scenario.profit.toLocaleString()}
                          </p>
                          <p className={`text-xs ${getStatusColor(scenario.status)}`}>
                            {scenario.margin.toFixed(0)}% margen
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Annual Impact */}
              <Card className="p-5 bg-brand-coral text-white">
                <h3 className="text-lg font-bold mb-3">Impacto Anual</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    Tus {inputs.activeMatters} asuntos generan{" "}
                    <span className="font-bold">${estimatedRevenue.toLocaleString()}</span> brutos...
                  </p>
                  <p>
                    ...pero gastas <span className="font-bold">${annualAdminCost.toLocaleString()}</span> en trabajo admin...
                  </p>
                  <p className="text-xl font-bold pt-3 border-t border-white/20">
                    Tu ganancia real: ${actualProfit.toLocaleString()}
                  </p>
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
