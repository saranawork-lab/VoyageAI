import React, { useState, useRef } from 'react';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export const VerifyOTPPage: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { verifyOTP } = useAuth();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pasted.split('').forEach((ch, i) => {
      newOtp[i] = ch;
    });
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length !== 6) return;
    setIsSubmitting(true);
    try {
      await verifyOTP({ phone: '+919876543210', otp: code });
    } catch {
      // handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
            <Compass size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-text-dark">
            Voyage<span className="text-primary">AI</span>
          </span>
        </div>

        <div className="bg-white p-8 rounded-xl border border-border shadow-card">
          <h1 className="text-2xl font-bold text-text-dark mb-2">Verify Your Phone</h1>
          <p className="text-sm text-text-light mb-8">
            We sent a 6-digit code to your phone number.
          </p>

          {/* OTP inputs */}
          <div className="flex items-center justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`
                  w-12 h-14 text-center text-xl font-bold rounded-lg border
                  outline-none transition-all duration-200
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  ${digit ? 'border-primary bg-primary-light' : 'border-border bg-white'}
                `}
              />
            ))}
          </div>

          <Button
            fullWidth
            loading={isSubmitting}
            disabled={otp.join('').length !== 6}
            onClick={handleSubmit}
          >
            Verify & Continue
          </Button>

          <div className="mt-6">
            <p className="text-sm text-text-light">
              Didn't receive the code?{' '}
              <button className="text-primary font-medium hover:underline">
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPPage;
