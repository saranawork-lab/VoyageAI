import { useQuery } from '@tanstack/react-query';
import { getChildProfile, getGradeHistory, getSubjectPriorities, getDigests, getGoalAlignment, getMentorSessions } from '@/api/parent.api';
import { useAuthStore } from '@/store/auth.store';

export const useParentDashboard = () => {
  const userId = useAuthStore((s) => s.user?.id || '');

  const childQuery = useQuery({
    queryKey: ['child-profile', userId],
    queryFn: () => getChildProfile(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const gradesQuery = useQuery({
    queryKey: ['grade-history', childQuery.data?.id],
    queryFn: () => getGradeHistory(childQuery.data?.id || ''),
    enabled: !!childQuery.data?.id,
    select: (res) => res.data,
  });

  const prioritiesQuery = useQuery({
    queryKey: ['subject-priorities', childQuery.data?.id],
    queryFn: () => getSubjectPriorities(childQuery.data?.id || ''),
    enabled: !!childQuery.data?.id,
    select: (res) => res.data,
  });

  const digestsQuery = useQuery({
    queryKey: ['digests', userId],
    queryFn: () => getDigests(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const alignmentQuery = useQuery({
    queryKey: ['goal-alignment', childQuery.data?.id],
    queryFn: () => getGoalAlignment(childQuery.data?.id || ''),
    enabled: !!childQuery.data?.id,
    select: (res) => res.data,
  });

  const sessionsQuery = useQuery({
    queryKey: ['mentor-sessions', childQuery.data?.id],
    queryFn: () => getMentorSessions(childQuery.data?.id || ''),
    enabled: !!childQuery.data?.id,
    select: (res) => res.data,
  });

  // Extract grade chart data — plain arrays for chart component
  const getGradeChartData = (subject: string) => {
    if (!gradesQuery.data) return [];
    return gradesQuery.data.records
      .filter((r) => r.subject === subject)
      .map((r) => ({ exam: r.examName, score: r.score, maxScore: r.maxScore }));
  };

  return {
    child: childQuery.data,
    grades: gradesQuery.data,
    priorities: prioritiesQuery.data ?? [],
    digests: digestsQuery.data ?? [],
    alignment: alignmentQuery.data,
    sessions: sessionsQuery.data ?? [],
    isLoading: childQuery.isLoading,
    error: childQuery.error,
    getGradeChartData,
    subjects: gradesQuery.data?.subjects ?? [],
  };
};
