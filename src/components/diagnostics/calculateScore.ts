import { AssessmentData, AssessmentScore, Recommendation } from "./types";

export const calculateScore = (data: AssessmentData): AssessmentScore => {
  console.log("calculateScore input data:", JSON.stringify(data, null, 2));
  
  // Start with base score of 5, but penalize for unanswered questions
  let baseScore = 5.0;
  let unansweredPenalty = 0;

  // Parse numeric values
  const incomeStreamsCount = parseInt(data.incomeStreams) || 0;
  const countriesPerYear = data.countriesPerYear === '4+' ? 4 : parseInt(data.countriesPerYear) || 0;
  const activeClients = parseInt(data.activeClients) || 0;
  const toolsCount = parseInt(data.toolsUsed) || 0;

  // Penalize for unanswered questions
  if (!data.activeClients) unansweredPenalty += 0.5;
  if (!data.adminHoursPerWeek) unansweredPenalty += 0.5;
  if (!data.toolsUsed) unansweredPenalty += 0.3;
  if (!data.missedDeadlines) unansweredPenalty += 0.3;
  if (!data.hoursLostToDocumentation) unansweredPenalty += 0.4;
  if (!data.repetitiveTasksPercentage) unansweredPenalty += 0.4;
  if (data.growthBlockers.length === 0) unansweredPenalty += 0.3;

  baseScore -= unansweredPenalty;

  // Capacity factors (add points only if answered)
  if (incomeStreamsCount > 1) {
    baseScore += Math.min(1.5, (incomeStreamsCount - 1) * 0.5);
  }
  if (countriesPerYear > 1) {
    baseScore += Math.min(1.0, (countriesPerYear - 1) * 0.5);
  }
  if (activeClients > 5) {
    baseScore += Math.min(0.5, (activeClients - 5) * 0.1);
  }

  // Infrastructure factors (subtract points for problems)
  if (data.adminHoursPerWeek === '15+') {
    baseScore -= 1.0;
  } else if (data.adminHoursPerWeek === '10-15') {
    baseScore -= 0.5;
  }
  
  if (toolsCount > 3) {
    baseScore -= Math.min(1.5, (toolsCount - 3) * 0.5);
  }
  
  if (data.missedDeadlines === 'often' || data.missedDeadlines === 'always') {
    baseScore -= 1.0;
  } else if (data.missedDeadlines === 'sometimes') {
    baseScore -= 0.5;
  }

  // New questions impact
  if (data.hoursLostToDocumentation === '10+') {
    baseScore -= 1.5;
  } else if (data.hoursLostToDocumentation === '5-10') {
    baseScore -= 1.0;
  } else if (data.hoursLostToDocumentation === '2-5') {
    baseScore -= 0.5;
  }

  if (data.repetitiveTasksPercentage === '40%+') {
    baseScore -= 1.5;
  } else if (data.repetitiveTasksPercentage === '30-40%') {
    baseScore -= 1.0;
  } else if (data.repetitiveTasksPercentage === '20-30%') {
    baseScore -= 0.5;
  }

  // Growth blockers impact
  if (data.growthBlockers.length >= 3) {
    baseScore -= 1.0;
  } else if (data.growthBlockers.length >= 2) {
    baseScore -= 0.5;
  }

  // Optimism factor
  if (incomeStreamsCount >= 4) {
    baseScore += 0.5;
  }

  // Clamp to 1-10
  const total = Math.max(1, Math.min(10, baseScore));

  // Calculate component scores
  const adminBurden = calculateAdminBurden(data);
  const infrastructureMaturity = calculateInfrastructureMaturity(data);
  const taxCompliance = data.taxConfidence;
  const capacityCeiling = calculateCapacityCeiling(data);

  // Interpretation
  let interpretation = '';
  if (total <= 3) {
    interpretation = 'Al límite - Tu configuración es frágil y necesita intervención';
  } else if (total <= 5) {
    interpretation = 'Funcional pero precario - Sostenible sin margen de maniobra';
  } else if (total <= 7) {
    interpretation = 'Saludable con restricciones - Puedes agregar con cuidado';
  } else {
    interpretation = 'Optimizado - Puedes enfocarte en trabajo de mayor valor';
  }

  // Calculate time value (annual cost of lost hours)
  const adminHours = getAdminHours(data.adminHoursPerWeek);
  const docHours = getDocHours(data.hoursLostToDocumentation);
  const hourlyRate = parseInt(data.hourlyRate) || 75; // Default to $75 if not provided
  const totalLostHoursPerWeek = adminHours + docHours;
  const timeValue = totalLostHoursPerWeek * 52 * hourlyRate; // Annual cost in USD

  // Generate recommendations
  const recommendations = generateRecommendations(data, total);

  const result = {
    total,
    adminBurden,
    infrastructureMaturity,
    taxCompliance,
    capacityCeiling,
    interpretation,
    timeValue,
    recommendations,
  };
  
  console.log("calculateScore output:", {
    total,
    adminBurden,
    infrastructureMaturity,
    taxCompliance,
    capacityCeiling,
    interpretation
  });
  
  return result;
};

const calculateAdminBurden = (data: AssessmentData): number => {
  const adminHours = getAdminHours(data.adminHoursPerWeek);
  let score = 10;
  
  // Base hours penalty
  if (adminHours >= 15) score -= 4;
  else if (adminHours >= 10) score -= 3;
  else if (adminHours >= 5) score -= 2;
  else if (adminHours >= 2) score -= 1;
  
  // Documentation issues penalty
  if (data.hoursLostToDocumentation === '10+') score -= 3;
  else if (data.hoursLostToDocumentation === '5-10') score -= 2;
  else if (data.hoursLostToDocumentation === '2-5') score -= 1;
  
  // Repetitive tasks penalty
  if (data.repetitiveTasksPercentage === '40%+') score -= 3;
  else if (data.repetitiveTasksPercentage === '30-40%') score -= 2;
  else if (data.repetitiveTasksPercentage === '20-30%') score -= 1;
  
  return Math.max(1, Math.min(10, score));
};

const calculateInfrastructureMaturity = (data: AssessmentData): number => {
  const toolsCount = parseInt(data.toolsUsed) || 0;
  let score = 10;
  if (toolsCount > 3) {
    score -= (toolsCount - 3) * 1.5;
  }
  return Math.max(1, Math.min(10, score));
};

const calculateCapacityCeiling = (data: AssessmentData): number => {
  const additional = data.additionalStreams;
  if (additional === '0') return 1;
  if (additional === '1') return 4;
  if (additional === '2') return 7;
  return 10;
};

const getAdminHours = (range: string): number => {
  if (range === '<2') return 1;
  if (range === '2-5') return 3.5;
  if (range === '5-10') return 7.5;
  if (range === '10-15') return 12.5;
  if (range === '15+') return 17.5;
  return 0;
};

const getDocHours = (range: string): number => {
  if (range === '0-2') return 1;
  if (range === '2-5') return 3.5;
  if (range === '5-10') return 7.5;
  if (range === '10+') return 12;
  return 0;
};

const generateRecommendations = (data: AssessmentData, score: number): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  const taxJurisdictions = parseInt(data.taxJurisdictions) || 1;
  const toolsCount = parseInt(data.toolsUsed) || 0;
  const adminHours = getAdminHours(data.adminHoursPerWeek);

  // Tax compliance recommendation
  if (data.taxConfidence < 7 || taxJurisdictions > 1) {
    recommendations.push({
      priority: 'high',
      title: 'Vulnerabilidad en seguimiento fiscal',
      description: `Estás rastreando impuestos en ${taxJurisdictions} ${taxJurisdictions === 1 ? 'jurisdicción' : 'jurisdicciones'} con nivel de confianza ${data.taxConfidence}/10. Esta es tu mayor vulnerabilidad.`,
      impact: 'Riesgo de multas, deducciones perdidas y exposición a auditorías',
      solution: 'Sistema unificado de seguimiento fiscal con soporte automatizado multi-jurisdicción',
    });
  }

  // Tool fragmentation
  if (toolsCount > 5) {
    recommendations.push({
      priority: 'high',
      title: 'Fragmentación de herramientas',
      description: `Estás usando ${toolsCount} herramientas diferentes. El cambio de contexto cuesta 3-5 horas por semana.`,
      impact: 'Tiempo desperdiciado, inconsistencia de datos, mayor tasa de errores',
      solution: 'Consolidar en plataforma integrada para contratos, facturación y gestión de clientes',
    });
  }

  // Admin burden
  if (adminHours > 10) {
    recommendations.push({
      priority: 'high',
      title: 'Carga de tiempo administrativo',
      description: `${adminHours} horas por semana en administración es insostenible. Son ${Math.round(adminHours * 52)} horas por año.`,
      impact: `Costo estimado: $${Math.round(adminHours * 52 * 75).toLocaleString()} en tiempo productivo perdido anualmente`,
      solution: 'Automatizar facturación, generación de contratos y seguimiento de pagos',
    });
  }

  // Capacity ceiling
  if (data.additionalStreams === '0' || data.additionalStreams === '1') {
    recommendations.push({
      priority: 'medium',
      title: 'Capacidad de crecimiento limitada',
      description: 'Tu configuración actual solo puede manejar 1 fuente de ingreso más antes de fallar.',
      impact: 'No puedes capitalizar nuevas oportunidades sin riesgo',
      solution: 'Optimizar infraestructura de flujo de trabajo para soportar 3-5 fuentes adicionales',
    });
  }

  // Client management
  const activeClients = parseInt(data.activeClients) || 0;
  if (activeClients > 10 && data.missedDeadlines !== 'never') {
    recommendations.push({
      priority: 'medium',
      title: 'Tensión en gestión de clientes',
      description: `Gestionar ${activeClients} clientes sin un sistema unificado lleva a fechas límite perdidas.`,
      impact: 'Riesgo de satisfacción del cliente, daño a la reputación',
      solution: 'Gestión centralizada de clientes con recordatorios y flujos de trabajo automatizados',
    });
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations.slice(0, 3);
};
