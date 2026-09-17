import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ROUTES, SECTORS, LANGUAGES, STAGES } from '@/utils/constants';

// Basic multi-step onboarding wizard
export const OnboardingPage: React.FC = () => {
  const { user, role, setUser } = useAuthStore();
  const addToast = useUIStore((s) => s.addToast);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states depending on role
  const [studentData, setStudentData] = useState({ goal: '', language: '', location: '' });
  const [founderData, setFounderData] = useState({ idea: '', sector: '', stage: '' });

  const totalSteps = role === 'student' ? 3 : role === 'founder' ? 3 : 2; // Simplify for MVP

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Mock API call to complete onboarding
        await new Promise((resolve) => setTimeout(resolve, 800));
        if (user) {
          setUser({ ...user, isOnboarded: true });
        }
        addToast({ type: 'success', message: 'Onboarding complete!', duration: 3000 });
        navigate(ROUTES.DASHBOARD);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStudentSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-text-dark">What's your career goal?</h2>
            <p className="text-sm text-text-light mb-4">We'll use this to build your personalized roadmap.</p>
            <Input
              id="student-goal"
              placeholder="e.g. Software Engineer at Google"
              value={studentData.goal}
              onChange={(e) => setStudentData({ ...studentData, goal: e.target.value })}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-text-dark">Language & Location</h2>
            <Select
              id="student-language"
              label="Preferred Language"
              options={LANGUAGES.map((l) => ({ value: l, label: l }))}
              value={studentData.language}
              onChange={(e) => setStudentData({ ...studentData, language: e.target.value })}
            />
            <Input
              id="student-location"
              label="City"
              placeholder="e.g. Hyderabad"
              value={studentData.location}
              onChange={(e) => setStudentData({ ...studentData, location: e.target.value })}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-text-dark">Link Parent Account (Optional)</h2>
            <p className="text-sm text-text-light mb-4">Allow your parents to track your progress and receive weekly digests.</p>
            <Input id="parent-email" placeholder="Parent's email address" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderFounderSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-text-dark">Tell us about your startup</h2>
            <Input
              id="founder-idea"
              placeholder="A brief description of your idea"
              value={founderData.idea}
              onChange={(e) => setFounderData({ ...founderData, idea: e.target.value })}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-text-dark">Sector & Stage</h2>
            <Select
              id="founder-sector"
              label="Sector"
              options={SECTORS.map((s) => ({ value: s, label: s }))}
              value={founderData.sector}
              onChange={(e) => setFounderData({ ...founderData, sector: e.target.value })}
            />
            <Select
              id="founder-stage"
              label="Current Stage"
              options={STAGES.map((s) => ({ value: s, label: s }))}
              value={founderData.stage}
              onChange={(e) => setFounderData({ ...founderData, stage: e.target.value })}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-xl font-bold text-text-dark">Almost done!</h2>
            <p className="text-sm text-text-light">We're generating your initial action plan and scanning for investor matches.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-card border border-border p-6 md:p-8">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-text-light mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[200px]">
          {role === 'student' ? renderStudentSteps() : role === 'founder' ? renderFounderSteps() : (
             <div className="space-y-4">
               <h2 className="text-xl font-bold text-text-dark">Welcome to VoyageAI!</h2>
               <p className="text-sm text-text-light">Let's set up your profile.</p>
             </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 1}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleNext}>
              Skip
            </Button>
            <Button onClick={handleNext} loading={isSubmitting}>
              {step === totalSteps ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
