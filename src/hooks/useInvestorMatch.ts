import { useQuery, useMutation } from '@tanstack/react-query';
import { getInvestorMatches, requestIntroduction, getSectorReport } from '@/api/investor.api';
import { useUIStore } from '@/store/ui.store';

export const useInvestorMatch = (investorId: string = 'inv_001') => {
  const addToast = useUIStore((s) => s.addToast);

  const matchesQuery = useQuery({
    queryKey: ['investor-matches', investorId],
    queryFn: () => getInvestorMatches(investorId),
    select: (res) => ({ deals: res.data, pagination: res.pagination }),
  });

  const introMutation = useMutation({
    mutationFn: (startupId: string) => requestIntroduction(investorId, startupId),
    onSuccess: () => {
      addToast({ type: 'success', message: 'Introduction request sent!', duration: 3000 });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to send request.', duration: 4000 });
    },
  });

  const useSectorReport = (sector: string) =>
    useQuery({
      queryKey: ['sector-report', sector],
      queryFn: () => getSectorReport(sector),
      enabled: !!sector,
      select: (res) => res.data,
    });

  return {
    deals: matchesQuery.data?.deals ?? [],
    pagination: matchesQuery.data?.pagination,
    isLoading: matchesQuery.isLoading,
    error: matchesQuery.error,
    refetch: matchesQuery.refetch,
    requestIntro: introMutation.mutate,
    isRequestingIntro: introMutation.isPending,
    useSectorReport,
  };
};
