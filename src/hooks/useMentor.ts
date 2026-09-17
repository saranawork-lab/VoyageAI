import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMentors, getMentorSlots, bookMentorSession, getBookings } from '@/api/mentor.api';
import type { BookingPayload } from '@/types/market.types';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';

export const useMentor = () => {
  const userId = useAuthStore((s) => s.user?.id || '');
  const addToast = useUIStore((s) => s.addToast);
  const queryClient = useQueryClient();

  const mentorsQuery = useQuery({
    queryKey: ['mentors'],
    queryFn: getMentors,
    select: (res) => res.data,
  });

  const bookingsQuery = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => getBookings(userId),
    enabled: !!userId,
    select: (res) => res.data,
  });

  const useSlots = (mentorId: string, date: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ['mentor-slots', mentorId, date],
      queryFn: () => getMentorSlots(mentorId, date),
      enabled: !!mentorId && !!date,
      select: (res) => res.data,
    });

  const bookMutation = useMutation({
    mutationFn: (payload: BookingPayload) => bookMentorSession(payload),
    onSuccess: () => {
      addToast({ type: 'success', message: 'Session booked successfully!', duration: 3000 });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: () => {
      addToast({ type: 'error', message: 'Booking failed.', duration: 4000 });
    },
  });

  return {
    mentors: mentorsQuery.data ?? [],
    isLoading: mentorsQuery.isLoading,
    error: mentorsQuery.error,
    bookings: bookingsQuery.data ?? [],
    useSlots,
    bookSession: bookMutation.mutate,
    isBooking: bookMutation.isPending,
    lastBooking: bookMutation.data?.data,
  };
};
