export interface InvestorProfile {
  id: string;
  name: string;
  investmentThesis: string;
  sectorsOfInterest: string[];
  ticketSizeRange: string;
  stagePreference: string[];
  portfolioCount: number;
}

export interface DealCard {
  id: string;
  startupId: string;
  name: string;
  sector: string;
  stage: string;
  pitch: string;
  matchScore: number;
  founderName: string;
  teamSize: number;
  askAmount: string;
  description: string;
  tractionMetrics: TractionMetric[];
}

export interface TractionMetric {
  label: string;
  value: string;
}

export interface IntroRequest {
  id: string;
  investorId: string;
  startupId: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface SectorReport {
  sector: string;
  summary: string;
  growthRate: string;
  topPlayers: string[];
  investmentTrend: string;
  riskLevel: 'low' | 'medium' | 'high';
  generatedAt: string;
}
