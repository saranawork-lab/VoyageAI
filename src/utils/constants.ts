export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_OTP: '/auth/verify-otp',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  CAREER_GUIDANCE: '/career-guidance',
  STUDY_ABROAD: '/study-abroad',
  JOB_MARKET: '/job-market',
  STARTUP_ADVISOR: '/startup-advisor',
  INVESTOR_ACCESS: '/investor-access',
  PARENT_DASHBOARD: '/parent-dashboard',
  MENTORS: '/mentors',
  INTERNSHIPS: '/internships',
  SETTINGS: '/settings',
  UPGRADE: '/upgrade',
  CAREERS: '/careers',
  FOR_FOUNDERS: '/for-founders',
  FOR_INVESTORS: '/for-investors',
} as const;

export const TIER_NAMES = {
  free: 'Free',
  plus: 'Plus',
  pro: 'Pro',
  custom: 'Custom',
} as const;

export const SESSION_TYPES = [
  'Career Review',
  'Mock Interview',
  'Abroad Planning',
  'JEE/NEET Strategy',
  'Startup Advisory',
  'General',
] as const;

export const SECTORS = [
  'EdTech', 'FinTech', 'HealthTech', 'AgriTech', 'CleanTech',
  'LegalTech', 'SaaS', 'E-Commerce', 'Logistics', 'AI/ML',
  'Social Impact', 'Gaming', 'Media', 'Real Estate',
] as const;

export const STAGES = [
  'Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Growth',
] as const;

export const LANGUAGES = [
  'English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam',
  'Bengali', 'Marathi', 'Gujarati',
] as const;

export const NOTIFICATION_TYPES = [
  { key: 'scholarship_alerts', label: 'Scholarship Alerts' },
  { key: 'milestone_reminders', label: 'Milestone Reminders' },
  { key: 'mentor_session', label: 'Mentor Session Reminders' },
  { key: 'weekly_digest', label: 'Weekly Digest' },
  { key: 'investor_matches', label: 'Investor Matches' },
] as const;

export const STUDENT_NAV = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Career Guidance', path: ROUTES.CAREER_GUIDANCE, icon: 'Compass' },
  { label: 'Study Abroad', path: ROUTES.STUDY_ABROAD, icon: 'Globe' },
  { label: 'Job Market', path: ROUTES.JOB_MARKET, icon: 'TrendingUp' },
  { label: 'Internships', path: ROUTES.INTERNSHIPS, icon: 'Briefcase' },
  { label: 'Mentors', path: ROUTES.MENTORS, icon: 'Users' },
] as const;

export const FOUNDER_NAV = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Startup Advisor', path: ROUTES.STARTUP_ADVISOR, icon: 'Rocket' },
  { label: 'Investor Access', path: ROUTES.INVESTOR_ACCESS, icon: 'Handshake' },
  { label: 'Job Market', path: ROUTES.JOB_MARKET, icon: 'TrendingUp' },
  { label: 'Mentors', path: ROUTES.MENTORS, icon: 'Users' },
] as const;

export const INVESTOR_NAV = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Deal Flow', path: ROUTES.INVESTOR_ACCESS, icon: 'Briefcase' },
  { label: 'Job Market', path: ROUTES.JOB_MARKET, icon: 'TrendingUp' },
  { label: 'Mentors', path: ROUTES.MENTORS, icon: 'Users' },
] as const;

export const PARENT_NAV = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Child Dashboard', path: ROUTES.PARENT_DASHBOARD, icon: 'GraduationCap' },
  { label: 'Mentors', path: ROUTES.MENTORS, icon: 'Users' },
] as const;

export const FREE_QUERY_LIMIT = 3;
export const FREE_FEATURES = [
  '3 AI career queries per month',
  'First 3 roadmap milestones',
  'Job market intelligence',
  'Internship listings',
  'Community access',
] as const;

export const PLUS_FEATURES = [
  '50 AI career queries per month',
  'Full roadmap access (up to 12 milestones)',
  '1 Human mentor session per month',
  'Basic parent dashboard',
  'Standard investor matching',
] as const;

export const PRO_FEATURES = [
  'Unlimited AI career queries',
  'Full roadmap access (unlimited milestones)',
  '4 Human mentor sessions per month',
  'Advanced parent monitoring dashboard',
  'Priority investor matching',
  'Weekly AI digest reports',
  'Study abroad account manager',
  'Certificate downloads',
] as const;

export const CUSTOM_FEATURES = [
  'Pay as you go infrastructure',
  'Dedicated AI agent instance',
  'White-glove onboarding',
  'Custom SLA & Support',
  'API Access',
] as const;
