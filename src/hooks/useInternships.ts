import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInternshipListings, applyToInternship, getApplications } from '@/api/internship.api';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

export const useInternships = () => {
  const userId = useAuthStore((s) => s.user?.id || '');
  const addToast = useUIStore((s) => s.addToast);
  const queryClient = useQueryClient();

  const listingsQuery = useQuery({
    queryKey: ['internship-listings'],
    queryFn: () => getInternshipListings(),
    select: (res) => res.data,
  });

  const applicationsQuery = useQuery({
    queryKey: ['internship-applications', userId],
    queryFn: () => getApplications(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const applyMutation = useMutation({
    mutationFn: ({ listingId, coverNote }: { listingId: string; coverNote: string }) =>
      applyToInternship(listingId, coverNote),
    onSuccess: () => {
      addToast({ type: 'success', message: 'Application submitted!', duration: 3000 });
      queryClient.invalidateQueries({ queryKey: ['internship-applications'] });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Failed to apply.', duration: 4000 });
    },
  });

  return {
    listings: listingsQuery.data ?? [],
    isLoadingListings: listingsQuery.isLoading,
    applications: applicationsQuery.data ?? [],
    isLoadingApplications: applicationsQuery.isLoading,
    apply: applyMutation.mutate,
    isApplying: applyMutation.isPending,
    error: listingsQuery.error,
    refetch: listingsQuery.refetch,
  };
};
