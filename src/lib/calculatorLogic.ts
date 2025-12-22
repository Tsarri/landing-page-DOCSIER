export interface BaselineMetrics {
  activeMatters: number;
  hourlyRate: number;
  adminHoursPerWeek: number;
}

export interface ClientScenario {
  id: string;
  name: string;
  typicalFee: number;
  adminHours: number;
  description: string;
}

export interface CalculationResults {
  weeklyCost: number;
  annualAdminCost: number;
  adminCostPerMatter: number;
  estimatedAnnualRevenue: number;
  actualAnnualProfit: number;
  effectiveHourlyRate: number;
  profitLossPercentage: number;
}

export const CLIENT_SCENARIOS: ClientScenario[] = [
  {
    id: 'alto-valor',
    name: 'Cliente de Alto Valor, Baja Fricción',
    typicalFee: 12000,
    adminHours: 8,
    description: 'Cliente corporativo, comunicación eficiente, poca fricción administrativa'
  },
  {
    id: 'habitual',
    name: 'Cliente Habitual, Media Fricción',
    typicalFee: 4000,
    adminHours: 15,
    description: 'Cliente recurrente con comunicación regular y seguimiento estándar'
  },
  {
    id: 'pequeno',
    name: 'Cliente Pequeño, Alta Fricción',
    typicalFee: 2000,
    adminHours: 20,
    description: 'Cliente con múltiples consultas, requiere seguimiento constante'
  },
  {
    id: 'familia',
    name: 'Cliente Familia/Referencia, Muy Alta Fricción',
    typicalFee: 1500,
    adminHours: 25,
    description: 'Cliente referido, expectativas altas, comunicación intensiva'
  },
  {
    id: 'corporativo',
    name: 'Cliente Corporativo Recurrente, Baja Fricción',
    typicalFee: 7000,
    adminHours: 5,
    description: 'Cliente corporativo establecido, procesos claros, mínima fricción'
  }
];

export function calculateScenarioProfit(
  scenario: ClientScenario,
  hourlyRate: number
): {
  revenue: number;
  adminCost: number;
  netProfit: number;
  margin: number;
  status: 'healthy' | 'acceptable' | 'problem';
} {
  const revenue = scenario.typicalFee;
  const adminCost = scenario.adminHours * hourlyRate;
  const netProfit = revenue - adminCost;
  const margin = (netProfit / revenue) * 100;

  let status: 'healthy' | 'acceptable' | 'problem';
  if (margin >= 30) status = 'healthy';
  else if (margin >= 10) status = 'acceptable';
  else status = 'problem';

  return { revenue, adminCost, netProfit, margin, status };
}

export function calculateAnnualImpact(
  metrics: BaselineMetrics
): CalculationResults {
  const { activeMatters, hourlyRate, adminHoursPerWeek } = metrics;
  const weeklyCost = adminHoursPerWeek * hourlyRate;
  const annualAdminCost = weeklyCost * 52;
  const adminCostPerMatter = annualAdminCost / activeMatters;
  const avgMatterFee = 4000;
  const estimatedAnnualRevenue = activeMatters * avgMatterFee;
  const actualAnnualProfit = estimatedAnnualRevenue - annualAdminCost;
  const totalBillableHours = 40 * 30;
  const effectiveHourlyRate = actualAnnualProfit / totalBillableHours;
  const profitLossPercentage = (annualAdminCost / estimatedAnnualRevenue) * 100;

  return {
    weeklyCost,
    annualAdminCost,
    adminCostPerMatter,
    estimatedAnnualRevenue,
    actualAnnualProfit,
    effectiveHourlyRate,
    profitLossPercentage
  };
}

export function calculatePotentialSavings(
  annualAdminCost: number,
  reductionPercentage: number = 30
): { savedAmount: number; savedHoursPerWeek: number } {
  const savedAmount = annualAdminCost * (reductionPercentage / 100);
  const savedHoursPerWeek = (savedAmount / 52) / 200;
  return { savedAmount, savedHoursPerWeek };
}

export function getClientMixBreakdown(clientType: string): {
  profitable: number;
  marginal: number;
  losing: number;
} {
  switch (clientType) {
    case 'small-manageable':
      return { profitable: 60, marginal: 30, losing: 10 };
    case 'mixed-problematic':
      return { profitable: 40, marginal: 35, losing: 25 };
    case 'large-small':
      return { profitable: 50, marginal: 30, losing: 20 };
    default:
      return { profitable: 50, marginal: 30, losing: 20 };
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-PA', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
