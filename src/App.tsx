import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { AuthGuard } from '@/components/guards/AuthGuard';
import { ROUTES } from '@/utils/constants';

// Pages
import LandingPage from '@/pages/Landing';
import LoginPage from '@/pages/Auth/Login';
import RegisterPage from '@/pages/Auth/Register';
import VerifyOTPPage from '@/pages/Auth/VerifyOTP';
import OnboardingPage from '@/pages/Onboarding';
import CareersPage from '@/pages/Careers';
import ForFoundersPage from '@/pages/ForFounders';
import ForInvestorsPage from '@/pages/ForInvestors';

// Protected Pages
import DashboardPage from '@/pages/Dashboard';
import CareerGuidancePage from '@/pages/CareerGuidance';
import StudyAbroadPage from '@/pages/StudyAbroad';
import JobMarketPage from '@/pages/JobMarket';
import StartupAdvisorPage from '@/pages/StartupAdvisor';
import InvestorAccessPage from '@/pages/InvestorAccess';
import ParentDashboardPage from '@/pages/ParentDashboard';
import MentorsPage from '@/pages/Mentors';
import InternshipsPage from '@/pages/Internships';
import SettingsPage from '@/pages/Settings';
import UpgradePage from '@/pages/Upgrade';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.CAREERS} element={<CareersPage />} />
        <Route path={ROUTES.FOR_FOUNDERS} element={<ForFoundersPage />} />
        <Route path={ROUTES.FOR_INVESTORS} element={<ForInvestorsPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.VERIFY_OTP} element={<VerifyOTPPage />} />

        {/* Protected Routes inside AppShell */}
        <Route element={<AuthGuard><AppShell /></AuthGuard>}>
          <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          
          <Route path={ROUTES.CAREER_GUIDANCE} element={<CareerGuidancePage />} />
          <Route path={ROUTES.STUDY_ABROAD} element={<StudyAbroadPage />} />
          <Route path={ROUTES.JOB_MARKET} element={<JobMarketPage />} />
          
          <Route path={ROUTES.STARTUP_ADVISOR} element={<StartupAdvisorPage />} />
          <Route path={ROUTES.INVESTOR_ACCESS} element={<InvestorAccessPage />} />
          
          <Route path={ROUTES.PARENT_DASHBOARD} element={<ParentDashboardPage />} />
          
          <Route path={ROUTES.MENTORS} element={<MentorsPage />} />
          <Route path={ROUTES.INTERNSHIPS} element={<InternshipsPage />} />
          
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          <Route path={ROUTES.UPGRADE} element={<UpgradePage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
