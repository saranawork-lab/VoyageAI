import { useQuery, useMutation } from '@tanstack/react-query';
import { getJobDemand, getRelatedRoles, registerTalent, getMarketTrends } from '@/api/market.api';
import type { TalentRegistration } from '@/types/market.types';
import { useUIStore } from '@/store/ui.store';

export const useJobMarket = (role?: string) => {
  const addToast = useUIStore((s) => s.addToast);

  const demandQuery = useQuery({
    queryKey: ['job-demand', role],
    queryFn: () => getJobDemand(role || ''),
    enabled: !!role,
    select: (res) => res.data,
  });

  const relatedRolesQuery = useQuery({
    queryKey: ['related-roles', role],
    queryFn: () => getRelatedRoles(role || ''),
    enabled: !!role,
    select: (res) => res.data,
  });

  const trendsQuery = useQuery({
    queryKey: ['market-trends'],
    queryFn: getMarketTrends,
    select: (res) => res.data,
  });

  const talentMutation = useMutation({
    mutationFn: (payload: TalentRegistration) => registerTalent(payload),
    onSuccess: () => {
      addToast({ type: 'success', message: 'Skills registered successfully!', duration: 3000 });
    },
  });

  // Extract chart data as plain arrays
  const chartData = demandQuery.data?.data ?? [];
  const relatedRolesChartData = (relatedRolesQuery.data ?? []).map((r) => ({
    label: r.title,
    value: r.safetyScore,
  }));

  return {
    demand: demandQuery.data,
    isLoading: demandQuery.isLoading,
    error: demandQuery.error,
    refetch: demandQuery.refetch,
    relatedRoles: relatedRolesQuery.data ?? [],
    trends: trendsQuery.data ?? [],
    registerTalent: talentMutation.mutate,
    isRegistering: talentMutation.isPending,
    chartData,
    relatedRolesChartData,
  };
};
