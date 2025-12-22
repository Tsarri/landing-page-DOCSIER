// Capacity Scorecard Types
export interface AssessmentData {
  // Step 1: Profile
  incomeStreams: string;
  yearsJuggling: string;
  location: string;
  countriesPerYear: string;
  activeClients: string;
  hourlyRate: string;

  // Step 2: Client & Geographic Complexity
  clientCountries: string;
  taxJurisdictions: string;
  regionalTemplates: string;

  // Step 3: Administrative Burden
  adminHoursPerWeek: string;
  toolsUsed: string;
  missedDeadlines: string;
  taxConfidence: number;
  hoursLostToDocumentation: string;
  repetitiveTasksPercentage: string;

  // Step 4: Growth & Capacity
  additionalStreams: string;
  growthBlockers: string[];
  freeTimeUse: string[];
}

export interface AssessmentScore {
  total: number;
  adminBurden: number;
  infrastructureMaturity: number;
  taxCompliance: number;
  capacityCeiling: number;
  interpretation: string;
  timeValue: number;
  recommendations: Recommendation[];
}

export interface Recommendation {
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  solution: string;
}

// Leakage Calculator Types
export interface CalculatorInputs {
  activeMatters: number;
  hourlyRate: number;
  adminHoursPerWeek: number;
}

export interface ClientScenario {
  type: string;
  fee: number;
  adminHours: number;
  profit: number;
  margin: number;
  status: "profit" | "warning" | "loss";
}
