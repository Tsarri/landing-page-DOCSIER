import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { AssessmentData, AssessmentScore } from "./types";
import { calculateScore } from "./calculateScore";
import { 
  BarChart3, Clock, TrendingUp, ChevronLeft, ChevronRight, 
  AlertCircle, Settings, Shield, Share2, Lock, X 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CapacityScorecardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ViewState = 'start' | 'form' | 'results';
const TOTAL_STEPS = 3;

export const CapacityScorecardModal = ({ open, onOpenChange }: CapacityScorecardModalProps) => {
  const [view, setView] = useState<ViewState>('start');
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<AssessmentData>({
    incomeStreams: "",
    yearsJuggling: "",
    location: "",
    countriesPerYear: "",
    activeClients: "",
    clientCountries: "",
    taxJurisdictions: "",
    regionalTemplates: "",
    adminHoursPerWeek: "",
    toolsUsed: "",
    missedDeadlines: "",
    taxConfidence: 5,
    hoursLostToDocumentation: "",
    repetitiveTasksPercentage: "",
    additionalStreams: "",
    growthBlockers: [],
    freeTimeUse: [],
  });
  const [score, setScore] = useState<AssessmentScore | null>(null);

  const updateData = (field: keyof AssessmentData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCheckbox = (field: 'growthBlockers' | 'freeTimeUse', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleStart = () => setView('form');

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      const calculatedScore = calculateScore(data);
      setScore(calculatedScore);
      setView('results');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setView('start');
    }
  };

  const handleRestart = () => {
    setData({
      incomeStreams: "",
      yearsJuggling: "",
      location: "",
      countriesPerYear: "",
      activeClients: "",
      clientCountries: "",
      taxJurisdictions: "",
      regionalTemplates: "",
      adminHoursPerWeek: "",
      toolsUsed: "",
      missedDeadlines: "",
      taxConfidence: 5,
      hoursLostToDocumentation: "",
      repetitiveTasksPercentage: "",
      additionalStreams: "",
      growthBlockers: [],
      freeTimeUse: [],
    });
    setScore(null);
    setCurrentStep(1);
    setView('start');
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleRestart, 300);
  };

  const getScoreColor = (value: number) => {
    if (value <= 3) return "text-destructive";
    if (value <= 5) return "text-warning";
    if (value <= 7) return "text-brand-sage";
    return "text-success";
  };

  const getScoreGradient = (value: number) => {
    if (value <= 3) return "from-destructive/20 to-destructive/5";
    if (value <= 5) return "from-warning/20 to-warning/5";
    if (value <= 7) return "from-brand-sage/20 to-brand-sage/5";
    return "from-success/20 to-success/5";
  };

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const blockerLabels: Record<string, string> = {
    'Time/admin': 'Tiempo/administración',
    'Legal/tax complexity': 'Complejidad legal/fiscal',
    'Client management': 'Gestión de clientes',
    'Payment/invoicing': 'Pagos/facturación',
    'Something else': 'Otra cosa'
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4 flex items-center justify-between">
          <SheetHeader className="text-left">
            <SheetTitle className="text-lg">Índice de Capacidad Operacional</SheetTitle>
          </SheetHeader>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Start View */}
          {view === 'start' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold text-foreground">
                  Evaluación de Capacidad de Flujo de Trabajo
                </h2>
                <p className="text-muted-foreground">
                  Descubre si tu infraestructura puede sostener tu estilo de vida profesional
                </p>
              </div>

              <Card className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center mx-auto">
                      <Clock className="w-5 h-5 text-brand-sage" />
                    </div>
                    <h3 className="font-semibold text-sm">3-4 Min</h3>
                    <p className="text-xs text-muted-foreground">Evaluación rápida</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center mx-auto">
                      <BarChart3 className="w-5 h-5 text-brand-sage" />
                    </div>
                    <h3 className="font-semibold text-sm">Análisis Honesto</h3>
                    <p className="text-xs text-muted-foreground">Puntos débiles</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-brand-sage/10 flex items-center justify-center mx-auto">
                      <TrendingUp className="w-5 h-5 text-brand-sage" />
                    </div>
                    <h3 className="font-semibold text-sm">Accionable</h3>
                    <p className="text-xs text-muted-foreground">Recomendaciones</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Lo que descubrirás:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-brand-sage mt-0.5">✓</span>
                      <span>Tu puntuación de capacidad (escala 1-10)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-sage mt-0.5">✓</span>
                      <span>Las ineficiencias por falta de sistematización de procesos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-brand-sage mt-0.5">✓</span>
                      <span>Tus mayores vulnerabilidades operativas</span>
                    </li>
                  </ul>
                </div>

                <Button onClick={handleStart} className="w-full mt-6 bg-brand-coral hover:bg-brand-coral/90">
                  Comenzar Evaluación
                </Button>
              </Card>

              <p className="text-center text-xs text-muted-foreground">
                Sin registro requerido • Resultados anónimos
              </p>
            </div>
          )}

          {/* Form View */}
          {view === 'form' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Paso {currentStep} de {TOTAL_STEPS}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <Card className="p-6">
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Tu Perfil</h2>
                      <p className="text-sm text-muted-foreground">Entendamos tu configuración actual</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>¿Cuántos casos/sociedades/clientes manejas por semana?</Label>
                        <Input
                          type="number"
                          placeholder="ej., 10"
                          value={data.activeClients}
                          onChange={(e) => updateData('activeClients', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Carga Administrativa</h2>
                      <p className="text-sm text-muted-foreground">¿Cuánto tiempo te consume la administración?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>¿Horas por semana en administración/operaciones?</Label>
                        <Select value={data.adminHoursPerWeek} onValueChange={(v) => updateData('adminHoursPerWeek', v)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecciona rango" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="<2">Menos de 2 horas</SelectItem>
                            <SelectItem value="2-5">2-5 horas</SelectItem>
                            <SelectItem value="5-10">5-10 horas</SelectItem>
                            <SelectItem value="10-15">10-15 horas</SelectItem>
                            <SelectItem value="15+">15+ horas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>¿Cuántas herramientas/plataformas en tu negocio (base de datos, correos, facturas, administrar tu firma) usas?</Label>
                        <Input
                          type="number"
                          min="1"
                          placeholder="ej., 7"
                          value={data.toolsUsed}
                          onChange={(e) => updateData('toolsUsed', e.target.value)}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label>¿Con qué frecuencia pierdes fechas límite por la administración?</Label>
                        <Select value={data.missedDeadlines} onValueChange={(v) => updateData('missedDeadlines', v)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecciona frecuencia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Nunca</SelectItem>
                            <SelectItem value="rarely">Raramente</SelectItem>
                            <SelectItem value="sometimes">A veces</SelectItem>
                            <SelectItem value="often">Frecuentemente</SelectItem>
                            <SelectItem value="always">Siempre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Tiempo perdido por documentación incompleta, documentos perdidos/mal organizados (horas por semana)</Label>
                        <Select value={data.hoursLostToDocumentation} onValueChange={(v) => updateData('hoursLostToDocumentation', v)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecciona horas" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-2">0-2 horas</SelectItem>
                            <SelectItem value="2-5">2-5 horas</SelectItem>
                            <SelectItem value="5-10">5-10 horas</SelectItem>
                            <SelectItem value="10+">10+ horas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Procesos no sistematizados (duplicación de trabajo) - ¿% de tu semana en tareas repetitivas?</Label>
                        <Select value={data.repetitiveTasksPercentage} onValueChange={(v) => updateData('repetitiveTasksPercentage', v)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Selecciona porcentaje" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10-20%">10-20%</SelectItem>
                            <SelectItem value="20-30%">20-30%</SelectItem>
                            <SelectItem value="30-40%">30-40%</SelectItem>
                            <SelectItem value="40%+">40%+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Crecimiento y Capacidad</h2>
                      <p className="text-sm text-muted-foreground">¿Hacia dónde puedes ir desde aquí?</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>¿Qué te impide agregar más? (Selecciona todas)</Label>
                        <div className="mt-3 space-y-2">
                          {[
                            { value: 'Time/admin', label: 'Tiempo/administración' },
                            { value: 'Legal/tax complexity', label: 'Complejidad legal/fiscal' },
                            { value: 'Client management', label: 'Gestión de clientes' },
                            { value: 'Payment/invoicing', label: 'Pagos/facturación' },
                            { value: 'Something else', label: 'Otra cosa' }
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`blocker-${option.value}`}
                                checked={data.growthBlockers.includes(option.value)}
                                onCheckedChange={() => toggleCheckbox('growthBlockers', option.value)}
                              />
                              <label htmlFor={`blocker-${option.value}`} className="text-sm">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label>Si la carga administrativa disminuyera 5h/semana, ¿qué harías?</Label>
                        <div className="mt-3 space-y-2">
                          {[
                            { value: 'Add income stream', label: 'Agregar fuente de ingreso' },
                            { value: 'Improve existing work', label: 'Mejorar trabajo existente' },
                            { value: 'Rest', label: 'Descansar' },
                            { value: 'Explore new markets', label: 'Explorar nuevos mercados' },
                            { value: 'Other', label: 'Otro' }
                          ].map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <Checkbox
                                id={`freetime-${option.value}`}
                                checked={data.freeTimeUse.includes(option.value)}
                                onCheckedChange={() => toggleCheckbox('freeTimeUse', option.value)}
                              />
                              <label htmlFor={`freetime-${option.value}`} className="text-sm">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                  <Button variant="outline" onClick={handlePrevious} className="flex-1">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {currentStep === 1 ? 'Inicio' : 'Anterior'}
                  </Button>
                  <Button onClick={handleNext} className="flex-1 bg-brand-coral hover:bg-brand-coral/90">
                    {currentStep === TOTAL_STEPS ? 'Ver Resultados' : 'Siguiente'}
                    {currentStep !== TOTAL_STEPS && <ChevronRight className="w-4 h-4 ml-1" />}
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Results View */}
          {view === 'results' && score && (
            <div className="space-y-6 animate-fade-in">
              {/* Primary Score */}
              <Card className={`p-8 text-center bg-gradient-to-br ${getScoreGradient(score.total)}`}>
                <h2 className="text-lg font-semibold text-foreground mb-2">Puntuación de Capacidad</h2>
                <div className={`text-5xl font-bold ${getScoreColor(score.total)}`}>
                  {score.total.toFixed(1)}<span className="text-2xl">/10</span>
                </div>
                <div className="max-w-sm mx-auto mt-4">
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-coral transition-all duration-1000"
                      style={{ width: `${score.total * 10}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground mt-4">{score.interpretation}</p>
              </Card>

              {/* Breakdown Cards */}
              <div className="grid gap-4">
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-sage/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-brand-sage" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">Carga Administrativa</h3>
                        <span className={`font-semibold ${getScoreColor(score.adminBurden)}`}>
                          {score.adminBurden.toFixed(1)}/10
                        </span>
                      </div>
                      <Progress value={score.adminBurden * 10} className="h-1.5 mt-2" />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-sage/10 flex items-center justify-center flex-shrink-0">
                      <Settings className="w-4 h-4 text-brand-sage" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">Madurez de Infraestructura</h3>
                        <span className={`font-semibold ${getScoreColor(score.infrastructureMaturity)}`}>
                          {score.infrastructureMaturity.toFixed(1)}/10
                        </span>
                      </div>
                      <Progress value={score.infrastructureMaturity * 10} className="h-1.5 mt-2" />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-sage/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-brand-sage" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">Cumplimiento Fiscal</h3>
                        <span className={`font-semibold ${getScoreColor(score.taxCompliance)}`}>
                          {score.taxCompliance}/10
                        </span>
                      </div>
                      <Progress value={score.taxCompliance * 10} className="h-1.5 mt-2" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Recommendations */}
              {score.recommendations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-foreground">Recomendaciones</h3>
                  {score.recommendations.map((rec, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          rec.priority === 'high' ? 'bg-destructive/10' : 'bg-warning/10'
                        }`}>
                          <AlertCircle className={`w-4 h-4 ${
                            rec.priority === 'high' ? 'text-destructive' : 'text-warning'
                          }`} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm">{rec.title}</h4>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              rec.priority === 'high'
                                ? 'bg-destructive/10 text-destructive'
                                : 'bg-warning/10 text-warning'
                            }`}>
                              {rec.priority === 'high' ? 'ALTA' : 'MEDIA'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{rec.description}</p>
                          <p className="text-xs text-brand-sage">
                            <span className="font-medium">Solución:</span> {rec.solution}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={handleRestart} className="flex-1">
                  Repetir Evaluación
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
