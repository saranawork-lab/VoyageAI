import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/utils/validators';
import { ROUTES } from '@/utils/constants';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await login(data);
    } catch {
      // Error handled in useAuth
    } finally {
      setIsSubmitting(false);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
    } catch {
      // Error handled in useAuth
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Left panel — branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-purple p-12 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-8">
            <Compass size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome Back to VoyageAI</h2>
          <p className="text-white/70 text-lg">
            Continue your personalized journey with AI-powered career guidance, startup advisory, and more.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
              <Compass size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-text-dark">
              Voyage<span className="text-primary">AI</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-text-dark mb-2">Sign in to your account</h1>
          <p className="text-sm text-text-light mb-8">
            Don't have an account?{' '}
            <Link to={ROUTES.REGISTER} className="text-primary font-medium hover:underline">
              Create one
            </Link>
          </p>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e); }} className="space-y-5">
            <Input
              id="login-email"
              label="Email or Phone"
              placeholder="arjun@example.com or +91..."
              icon={<Mail size={18} />}
              error={errors.emailOrPhone?.message}
              {...register('emailOrPhone')}
            />

            <div className="relative">
              <Input
                id="login-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-text-light hover:text-text-mid"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-end">
              <Link to={ROUTES.LOGIN} className="text-sm text-primary font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth loading={isSubmitting}>
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-light">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google OAuth */}
          <Button variant="secondary" fullWidth onClick={onGoogleSignIn}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
