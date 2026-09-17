import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Phone, User, Eye, EyeOff, Compass, GraduationCap, Rocket, TrendingUp, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/utils/validators';
import { ROUTES } from '@/utils/constants';
import type { UserRole } from '@/types/user.types';

const roles: { value: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
  { value: 'student', label: 'Career Seeker', icon: GraduationCap, desc: 'For those who want to explore, search, and find a path.' },
  { value: 'founder', label: 'Founder', icon: Rocket, desc: 'Startup plans & funding' },
  { value: 'investor', label: 'Investor', icon: TrendingUp, desc: 'Deal flow & reports' },
  { value: 'parent', label: 'Parent', icon: Users, desc: 'Child progress tracking' },
];

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' },
  });

  const selectedRole = watch('role');

  const handleNextStep = async () => {
    // Validate role before proceeding
    const isRoleValid = await trigger('role');
    if (isRoleValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      await registerUser({ name: data.name, email: data.email, phone: data.phone, password: data.password, role: data.role });
    } catch {
      // handled in hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Left side: Premium Image Background */}
      <div className="hidden md:flex flex-1 relative bg-black items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/auth_background_1789222570504.jpg" 
            alt="Abstract glowing spheres" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Much darker gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/40"></div>
        </div>
        
        {/* Marketing copy overlay */}
        <div className="relative z-10 max-w-lg px-12 text-white animate-slide-in-right">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
              <Compass size={32} className="text-white" />
            </div>
            <span className="text-4xl font-black tracking-tight drop-shadow-md">
              Voyage<span className="text-primary-light">AI</span>
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 drop-shadow-lg text-white">
            Unlock your true <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">potential.</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed drop-shadow-md font-medium border-l-4 border-primary pl-4">
            Step into the future with AI-driven intelligence. Whether you are aiming for IIT, launching a startup, or investing in the next big thing, we have your map.
          </p>
          
          <div className="mt-14 flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-fit">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center overflow-hidden shadow-lg">
                  <User size={16} className="text-white/80" />
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-white">
              Trusted by <span className="text-primary-light">50,000+</span> visionaries.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative overflow-hidden bg-surface dark:bg-surface-dark">
        {/* Mobile Header */}
        <div className="md:hidden absolute top-6 left-6 flex items-center gap-2.5 z-20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
            <Compass size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-text-dark">
            Voyage<span className="text-primary">AI</span>
          </span>
        </div>

        {/* Sliding Form Wrapper */}
        <div className="w-full max-w-[480px] bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-modal border border-border overflow-hidden relative min-h-[550px] mt-12 md:mt-0">
          
          <div className="mb-6 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-extrabold text-text-dark">Create an account</h1>
              <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full">Step {step} of 2</span>
            </div>
            <p className="text-text-mid text-sm">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="text-primary font-bold hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e); }} className="relative h-[400px] overflow-hidden">
            {/* Sliding Track */}
            <div 
              className="absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${step === 1 ? '0%' : '-50%'})` }}
            >
              
              {/* Step 1: Role Selection */}
              <div className="w-1/2 h-full pr-4 flex flex-col justify-between">
                <div>
                  <label className="text-base font-bold text-text-dark mb-4 block">I am joining as a...</label>
                  <div className="grid grid-cols-2 gap-4">
                    {roles.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setValue('role', r.value)}
                        className={`
                          p-4 rounded-xl border-2 text-left transition-all duration-300 group
                          ${selectedRole === r.value
                            ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                            : 'border-border hover:border-primary/40 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800'
                          }
                        `}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors ${selectedRole === r.value ? 'bg-primary text-white' : 'bg-surface text-text-mid group-hover:text-primary'}`}>
                          <r.icon size={20} />
                        </div>
                        <p className={`text-sm font-bold ${selectedRole === r.value ? 'text-primary' : 'text-text-dark'}`}>
                          {r.label}
                        </p>
                        <p className="text-xs text-text-light leading-snug mt-1.5">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                  {errors.role && <p className="text-xs text-accent mt-2 font-medium">{errors.role.message}</p>}
                </div>
                <Button type="button" size="lg" fullWidth onClick={handleNextStep} className="mt-6 shadow-md hover:-translate-y-0.5 transition-transform">
                  Continue <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Step 2: User Details */}
              <div className="w-1/2 h-full pl-4 flex flex-col">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm font-semibold text-text-mid hover:text-primary transition-colors mb-4 -ml-1 w-fit"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-1 pb-4 scrollbar-hide">
                  <Input
                    id="register-name" label="Full Name" placeholder="e.g. Arjun Sharma"
                    icon={<User size={18} />} error={errors.name?.message} {...register('name')}
                  />
                  <Input
                    id="register-email" label="Email Address" type="email" placeholder="arjun@example.com"
                    icon={<Mail size={18} />} error={errors.email?.message} {...register('email')}
                  />
                  <Input
                    id="register-phone" label="Phone Number" placeholder="+91 98765 43210"
                    icon={<Phone size={18} />} error={errors.phone?.message} {...register('phone')}
                  />
                  <div className="relative">
                    <Input
                      id="register-password" label="Password" type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 8 characters" icon={<Lock size={18} />}
                      error={errors.password?.message} {...register('password')}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-[38px] text-text-light hover:text-text-mid transition-colors">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <Input
                    id="register-confirm" label="Confirm Password" type="password"
                    placeholder="Repeat your password" icon={<Lock size={18} />}
                    error={errors.confirmPassword?.message} {...register('confirmPassword')}
                  />
                  
                  <Button type="submit" fullWidth size="lg" loading={isSubmitting} className="mt-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                    Complete Registration
                  </Button>
                  <p className="text-xs text-center text-text-light mt-4 px-4">
                    By registering, you agree to our <a href="#" className="underline hover:text-text-mid">Terms of Service</a>.
                  </p>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
