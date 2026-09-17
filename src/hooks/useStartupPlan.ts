import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getActionPlan, getStartupProfile, updateTaskStatus as updateApiTaskStatus, getInvestorMatchesCount } from '@/api/startup.api';
import type { TaskStatus } from '@/types/startup.types';

export const useStartupPlan = (startupId: string = 'stp_001') => {
  const queryClient = useQueryClient();

  const startupQuery = useQuery({
    queryKey: ['startup', startupId],
    queryFn: () => getStartupProfile(startupId),
    select: (res) => res.data,
  });

  const planQuery = useQuery({
    queryKey: ['startup-plan', startupId],
    queryFn: () => getActionPlan(startupId),
    select: (res) => res.data,
  });

  const matchCountQuery = useQuery({
    queryKey: ['investor-match-count', startupId],
    queryFn: () => getInvestorMatchesCount(startupId),
    select: (res) => res.data,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ milestoneId, status }: { milestoneId: string; status: TaskStatus }) =>
      updateApiTaskStatus(milestoneId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup-plan'] });
    },
  });

  const tasks = planQuery.data?.tasks ?? [];
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return {
    startup: startupQuery.data,
    plan: planQuery.data,
    isLoading: planQuery.isLoading,
    error: planQuery.error,
    refetch: planQuery.refetch,
    matchCount: matchCountQuery.data,
    updateTaskStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    todoTasks,
    inProgressTasks,
    doneTasks,
    completionPercentage: planQuery.data?.completionPercentage ?? 0,
  };
};
