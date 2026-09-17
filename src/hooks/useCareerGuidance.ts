import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';
import { generateCareerRoadmap, getCareerRoadmap, updateCareerProgress, getCareerQueries, getScholarshipAlerts } from '@/api/career.api';

export const useCareerGuidance = () => {
  const userId = useAuthStore((s) => s.user?.id || '');
  const queryClient = useQueryClient();

  const roadmapQuery = useQuery({
    queryKey: ['career-roadmap', userId],
    queryFn: () => getCareerRoadmap(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const queriesQuery = useQuery({
    queryKey: ['career-queries', userId],
    queryFn: () => getCareerQueries(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const scholarshipsQuery = useQuery({
    queryKey: ['scholarships', userId],
    queryFn: () => getScholarshipAlerts(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const generateMutation = useMutation({
    mutationFn: (query: string) => generateCareerRoadmap(query),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-roadmap'] });
      queryClient.invalidateQueries({ queryKey: ['career-queries'] });
    },
  });

  const progressMutation = useMutation({
    mutationFn: (milestoneId: string) => updateCareerProgress(userId, milestoneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['career-roadmap'] });
    },
  });

  // Extract roadmap data for charts
  const completionPercentage = roadmapQuery.data?.completionPercentage ?? 0;
  const milestones = roadmapQuery.data?.milestones ?? [];
  const todaysTasks = milestones
    .filter((m) => m.status === 'in_progress' || m.status === 'upcoming')
    .slice(0, 3);

  return {
    roadmap: roadmapQuery.data,
    isLoadingRoadmap: roadmapQuery.isLoading,
    roadmapError: roadmapQuery.error,
    refetchRoadmap: roadmapQuery.refetch,
    pastQueries: queriesQuery.data ?? [],
    scholarships: scholarshipsQuery.data ?? [],
    generateRoadmap: generateMutation.mutate,
    isGenerating: generateMutation.isPending,
    markMilestoneComplete: progressMutation.mutate,
    completionPercentage,
    milestones,
    todaysTasks,
  };
};
