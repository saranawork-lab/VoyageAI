import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Crown, CheckCircle2, Shield, Zap, ArrowRight, Loader2, Star, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { PRO_FEATURES, PLUS_FEATURES, CUSTOM_FEATURES, ROUTES } from '@/utils/constants';
import { PageHeader } from '@/components/layout/PageHeader';
import type { UserTier } from '@/types/user.types';

export const UpgradePage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTier, setSelectedTier] = useState<UserTier>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const navigate = useNavigate();
  const location = useLocation();
  const { setTier, tier: currentTier } = useAuthStore();
  const addToast = useUIStore(s => s.addToast);

  const blockedFeature = location.state?.blockedFeature;

  const handleUpgrade = async () => {
    if (selectedTier === 'custom') {
      addToast({ type: 'info', message: 'Redirecting to sales contact...', duration: 3000 });
      return;
    }

    setIsProcessing(true);

    // Simulate Razorpay placeholder flow
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update state
      setTier(selectedTier);
      addToast({ type: 'success', message: `Welcome to ${selectedTier.toUpperCase()}! Features unlocked.`, duration: 5000 });

      // Redirect back or to dashboard
      const from = location.state?.from?.pathname || ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    } catch (e) {
      addToast({ type: 'error', message: 'Payment failed. Please try again.', duration: 4000 });
      setIsProcessing(false);
    }
  };

  const getPrice = (tier: UserTier) => {
    if (tier === 'plus') return billingCycle === 'monthly' ? 499 : 399;
    if (tier === 'pro') return billingCycle === 'monthly' ? 999 : 799;
    return 0; // Custom
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <PageHeader
        title="Upgrade your VoyageAI Plan"
        subtitle="Unlock the full power of AI career and startup guidance."
      />

      {blockedFeature && (
        <div className="bg-warning-light border border-warning/30 p-4 rounded-xl flex items-start gap-3">
          <Crown size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-text-dark">Upgrade Required</h3>
            <p className="text-sm text-text-mid mt-1">
              You tried to access <span className="font-semibold">{blockedFeature}</span> which requires a higher tier. Upgrade now to unlock it!
            </p>
          </div>
        </div>
      )}

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex flex-col sm:flex-row p-1 bg-surface border border-border rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-sm text-text-dark' : 'text-text-light'
              }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 sm:px-6 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-white shadow-sm text-text-dark' : 'text-text-light'
              }`}
          >
            Yearly <span className="text-[10px] bg-success-light text-success px-1.5 rounded uppercase font-bold">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Plus Tier */}
        <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${selectedTier === 'plus' ? 'border-primary shadow-modal ring-2 ring-primary/20' : 'hover:border-primary/50'}`} onClick={() => setSelectedTier('plus')}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-dark mb-1">Plus</h3>
            <p className="text-text-light text-sm mb-6">For serious learners</p>
            <div className="text-4xl font-extrabold text-text-dark mb-2">
              ₹{getPrice('plus')}
              <span className="text-base font-normal text-text-light">/mo</span>
            </div>
            {billingCycle === 'yearly' && (
              <p className="text-sm text-success font-medium mb-6">Billed annually at ₹{getPrice('plus') * 12}</p>
            )}
            {billingCycle === 'monthly' && (
              <p className="text-sm text-text-light mb-6">Cancel anytime.</p>
            )}

            <div className="space-y-4 mb-8">
              {PLUS_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={18} className="text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-text-dark">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              fullWidth
              variant={selectedTier === 'plus' ? 'primary' : 'secondary'}
              onClick={selectedTier === 'plus' ? handleUpgrade : () => setSelectedTier('plus')}
              disabled={selectedTier === 'plus' && isProcessing}
            >
              {selectedTier === 'plus' ? (isProcessing ? <Loader2 size={18} className="animate-spin" /> : 'Upgrade to Plus') : 'Select Plus'}
            </Button>
          </div>
        </Card>

        {/* Pro Tier */}
        <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${selectedTier === 'pro' ? 'border-primary shadow-modal ring-2 ring-primary/20' : 'hover:border-primary/50'}`} onClick={() => setSelectedTier('pro')}>
          <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            Most Popular
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-dark mb-1">Pro</h3>
            <p className="text-text-light text-sm mb-6">Full access to everything</p>
            <div className="text-4xl font-extrabold text-text-dark mb-2">
              ₹{getPrice('pro')}
              <span className="text-base font-normal text-text-light">/mo</span>
            </div>
            {billingCycle === 'yearly' && (
              <p className="text-sm text-success font-medium mb-6">Billed annually at ₹{getPrice('pro') * 12}</p>
            )}
            {billingCycle === 'monthly' && (
              <p className="text-sm text-text-light mb-6">Cancel anytime.</p>
            )}

            <div className="space-y-4 mb-8">
              {PRO_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-text-dark">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              fullWidth
              variant={selectedTier === 'pro' ? 'primary' : 'secondary'}
              onClick={selectedTier === 'pro' ? handleUpgrade : () => setSelectedTier('pro')}
              disabled={selectedTier === 'pro' && isProcessing}
            >
              {selectedTier === 'pro' ? (isProcessing ? <Loader2 size={18} className="animate-spin" /> : 'Upgrade to Pro') : 'Select Pro'}
            </Button>
          </div>
        </Card>

        {/* Custom Tier */}
        <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${selectedTier === 'custom' ? 'border-primary shadow-modal ring-2 ring-primary/20' : 'hover:border-primary/50'}`} onClick={() => setSelectedTier('custom')}>
          <div className="p-6">
            <h3 className="text-xl font-bold text-text-dark mb-1">Custom</h3>
            <p className="text-text-light text-sm mb-6">Pay as you go</p>
            <div className="text-4xl font-extrabold text-text-dark mb-2">
              Usage
              <span className="text-base font-normal text-text-light"> based</span>
            </div>
            <p className="text-sm text-text-light mb-6">Contact us for pricing.</p>

            <div className="space-y-4 mb-8">
              {CUSTOM_FEATURES.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Star size={18} className="text-purple flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-text-dark">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              fullWidth
              variant={selectedTier === 'custom' ? 'primary' : 'secondary'}
              onClick={selectedTier === 'custom' ? handleUpgrade : () => setSelectedTier('custom')}
            >
              {selectedTier === 'custom' ? 'Contact Sales' : 'Select Custom'}
            </Button>
          </div>
        </Card>

      </div>

      <div className="pt-6 flex justify-center items-center gap-6 text-sm text-text-light">
        <div className="flex items-center gap-1.5"><Shield size={16} /> Secure Payment Processing</div>
        <div className="flex items-center gap-1.5"><Zap size={16} /> Instant Account Upgrade</div>
      </div>
    </div>
  );
};

export default UpgradePage;
