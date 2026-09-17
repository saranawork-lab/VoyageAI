import { useQuery, useMutation } from '@tanstack/react-query';
import { getCountries, getFields, generatePathway, updateChecklist } from '@/api/abroad.api';
import { useAuthStore } from '@/store/auth.store';

export const useAbroadPathway = () => {
  const userId = useAuthStore((s) => s.user?.id || '');

  const countriesQuery = useQuery({
    queryKey: ['abroad-countries'],
    queryFn: getCountries,
    select: (res) => res.data,
  });

  const fieldsQuery = (query?: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['abroad-fields', query],
      queryFn: () => getFields(query),
      select: (res) => res.data,
    });

  const pathwayMutation = useMutation({
    mutationFn: (params: { country: string; field: string; budget: string; timeline: string }) =>
      generatePathway(params.country, params.field, params.budget, params.timeline),
  });

  const checklistMutation = useMutation({
    mutationFn: ({ itemId, checked }: { itemId: string; checked: boolean }) =>
      updateChecklist(userId, itemId, checked),
  });

  return {
    countries: countriesQuery.data ?? [],
    isLoadingCountries: countriesQuery.isLoading,
    fieldsQuery,
    generatePathway: pathwayMutation.mutate,
    pathway: pathwayMutation.data?.data,
    isGenerating: pathwayMutation.isPending,
    updateChecklist: checklistMutation.mutate,
  };
};
