export type UserRole = 'student' | 'founder' | 'investor' | 'parent';
export type UserTier = 'free' | 'plus' | 'pro' | 'custom';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  tier: UserTier;
  avatarUrl: string | null;
  location: string;
  language: string[];
  isOnboarded: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  emailOrPhone: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

export interface OtpPayload {
  userId: string;
  otp: string;
}

export interface ResetPasswordPayload {
  phone: string;
  otp: string;
  newPassword: string;
}

export interface OnboardingStepData {
  step: number;
  data: Record<string, unknown>;
}

export interface StudentOnboarding {
  goal: string;
  grades: GradeEntry[];
  languages: string[];
  location: string;
  schoolName: string;
  parentContact?: string;
}

export interface FounderOnboarding {
  ideaDescription: string;
  sectors: string[];
  budgetRange: string;
  teamSize: number;
  currentStage: string;
}

export interface InvestorOnboarding {
  investmentThesis: string;
  sectorsOfInterest: string[];
  ticketSizeRange: string;
  stagePreference: string[];
}

export interface ParentOnboarding {
  childContact: string;
  notificationChannel: string;
  digestFrequency: 'daily' | 'weekly';
}

export interface GradeEntry {
  subject: string;
  score: number;
  examType: string;
}

export interface NotificationPreference {
  type: string;
  enabled: boolean;
  channel: 'email' | 'whatsapp' | 'push';
}
