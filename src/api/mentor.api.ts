import type { ApiResponse } from '@/types/api.types';
import type { MentorProfile, BookingPayload, Booking } from '@/types/market.types';

const MOCK_MENTORS: MentorProfile[] = [
  {
    id: 'men_001',
    name: 'Suresh Kumar',
    expertise: ['System Design', 'React', 'Career Advice'],
    rating: 4.9,
    reviewCount: 120,
    avatarUrl: undefined,
    role: 'Senior Software Engineer',
    company: 'Google',
    hourlyRate: 1500,
    bio: 'Ex-Amazon, currently at Google. I help students crack product-based companies and master system design.',
  },
  {
    id: 'men_002',
    name: 'Priya Sharma',
    expertise: ['Product Management', 'Startup Pitch', 'GTM Strategy'],
    rating: 4.8,
    reviewCount: 85,
    avatarUrl: undefined,
    role: 'Product Lead',
    company: 'Stripe',
    hourlyRate: 2000,
    bio: 'Product leader with experience scaling 0-1 products. Happy to review pitch decks and product roadmaps.',
  },
];

export const getMentors = async (): Promise<ApiResponse<MentorProfile[]>> => {
  return { success: true, data: MOCK_MENTORS };
};

export const getMentorSlots = async (
  mentorId: string,
  date: string
): Promise<ApiResponse<any[]>> => {
  void mentorId; void date;
  return {
    success: true,
    data: [
      { id: 'ts_1', time: '10:00 AM', available: true },
      { id: 'ts_2', time: '11:00 AM', available: false },
      { id: 'ts_3', time: '02:00 PM', available: true },
    ],
  };
};

export const bookMentorSession = async (
  payload: BookingPayload
): Promise<ApiResponse<Booking>> => {
  return {
    success: true,
    data: {
      id: `bk_${Date.now()}`,
      date: payload.date,
      timeSlot: payload.timeSlot,
      status: 'scheduled',
    },
  };
};

export const getBookings = async (userId: string): Promise<ApiResponse<Booking[]>> => {
  void userId;
  return {
    success: true,
    data: [
      {
        id: 'bk_001',
        date: '2023-11-20',
        timeSlot: '10:00 AM',
        status: 'scheduled',
      },
    ],
  };
};
