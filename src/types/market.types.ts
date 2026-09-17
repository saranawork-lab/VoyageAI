export interface JobDemandPoint {
  month: string;
  openings: number;
}

export interface JobDemandData {
  role: string;
  data: JobDemandPoint[];
  currentMonthOpenings: number;
  monthOnMonthGrowth: number;
  automationRiskScore: number;
  averageSalary: string;
  totalOpenings: number;
}

export interface RelatedRole {
  title: string;
  safetyScore: number;
  avgSalary: string;
}

export interface TalentRegistration {
  skills: string[];
  availability: string;
  preferredRole: string;
}

export interface MarketTrend {
  role: string;
  growth: number;
  demand: 'high' | 'medium' | 'low';
}

export interface InternshipListing {
  id: string;
  company: string;
  title: string;
  requirements: string[];
  duration: string;
  stipend: string | null;
  type: string;
  location: string;
  description: string;
  postedAt: string;
  matchScore: number;
}

export interface InternshipApplication {
  id: string;
  listingId: string;
  company: string;
  status: 'applied' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface AbroadCountry {
  id: string;
  name: string;
  flagEmoji?: string;
}

export interface AbroadPathway {
  countryName: string;
  estimatedCost: string;
  visaType: string;
  checklist: { id: string; task: string; completed: boolean; dueDate?: string }[];
  universities: { name: string; location: string; matchScore: number }[];
}

export interface MentorProfile {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  avatarUrl?: string;
  role: string;
  company: string;
  hourlyRate: number;
  bio: string;
}

export interface BookingPayload {
  mentorId: string;
  date: string;
  timeSlot: string;
}

export interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}
