import type { ApiResponse } from '@/types/api.types';
import type { JobDemandData, RelatedRole, TalentRegistration, MarketTrend } from '@/types/market.types';

export const getJobDemand = async (role: string): Promise<ApiResponse<JobDemandData>> => {
  return {
    success: true,
    data: {
      role: role || 'Software Engineer',
      data: [
        { month: 'Jan', openings: 1200 },
        { month: 'Feb', openings: 1350 },
        { month: 'Mar', openings: 1250 },
        { month: 'Apr', openings: 1500 },
        { month: 'May', openings: 1600 },
        { month: 'Jun', openings: 1800 },
      ],
      currentMonthOpenings: 1800,
      monthOnMonthGrowth: 12.5,
      automationRiskScore: 35,
      averageSalary: '₹8-12 LPA',
      totalOpenings: 45000,
    },
  };
};

export const getRelatedRoles = async (role: string): Promise<ApiResponse<RelatedRole[]>> => {
  void role;
  return {
    success: true,
    data: [
      { title: 'Data Scientist', safetyScore: 85, avgSalary: '₹10-15 LPA' },
      { title: 'DevOps Engineer', safetyScore: 92, avgSalary: '₹12-18 LPA' },
      { title: 'Product Manager', safetyScore: 78, avgSalary: '₹15-22 LPA' },
    ],
  };
};

export const getMarketTrends = async (): Promise<ApiResponse<MarketTrend[]>> => {
  return {
    success: true,
    data: [
      { role: 'AI Engineer', growth: 45, demand: 'high' },
      { role: 'Cybersecurity Analyst', growth: 32, demand: 'high' },
      { role: 'Cloud Architect', growth: 28, demand: 'medium' },
    ],
  };
};

export const registerTalent = async (
  payload: TalentRegistration
): Promise<ApiResponse<{ registeredId: string }>> => {
  void payload;
  return {
    success: true,
    data: { registeredId: `tal_${Date.now()}` },
  };
};
