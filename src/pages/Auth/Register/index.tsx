import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Phone, User, Eye, EyeOff, Compass, GraduationCap, Rocket, TrendingUp, Users, ArrowRight, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterFormData } from '@/utils/validators';
import { ROUTES } from '@/utils/constants';
import type { UserRole } from '@/types/user.types';

const roles: { value: UserRole; label: string; icon: React.ElementType; desc: string }[] = [
  { value: 'student', label: 'Career Seeker', icon: GraduationCap, desc: 'Explore, search & find a path' },
  { value: 'founder', label: 'Founder', icon: Rocket, desc: 'Startup plans & funding' },
  { value: 'investor', label: 'Investor', icon: TrendingUp, desc: 'Deal flow & reports' },
  { value: 'parent', label: 'Parent', icon: Users, desc: 'Child progress tracking' },
];

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { register: registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'student' },
  });

  const selectedRole = watch('role');
  const password = watch('password') || '';

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /[0-9]/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleNextStep = async () => {
    const isRoleValid = await trigger('role');
    if (isRoleValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await registerUser({ name: data.name, email: data.email, phone: data.phone, password: data.password, role: data.role });
    } catch (error: any) {
      // The backend now returns explicit error messages which the hook handles,
      // but we can also display them here if they throw an error object with a message
       setApiError(error.message || 'Registration failed. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-sans overflow-hidden text-text-dark">
      
      {/* Left side: Premium Image Background */}
      <div className="hidden md:flex flex-1 relative items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/auth_background_1789222570504.jpg" 
            alt="Abstract spheres" 
            className="w-full h-full object-cover opacity-50 mix-blend-screen"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
           <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        {/* Marketing copy overlay */}
        <div className="relative z-10 max-w-xl px-12 text-white animate-slide-in-left mt-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-lg">
              <Compass size={24} className="text-white" />
            </div>
            <span className="text-3xl font-black tracking-tight drop-shadow-md">
              Voyage<span className="text-primary-light">AI</span>
            </span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-white drop-shadow-2xl">
            Unlock your true <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              potential.
            </span>
          </h2>
          <div className="w-1 bg-primary rounded-full h-24 absolute left-8 top-[170px] hidden lg:block"></div>
          <p className="text-lg text-gray-200 leading-relaxed font-medium lg:pl-12 max-w-md">
            Step into the future with AI-driven intelligence. Whether you are aiming for IIT, launching a startup, or investing in the next big thing, we have your map.
          </p>
          
          <div className="mt-16 flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl w-fit shadow-2xl">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-11 h-11 rounded-full border-[3px] border-black bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden shadow-lg">
                  <User size={18} className="text-white/60" />
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
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-20 bg-surface">
        {/* Mobile Header */}
        <div className="md:hidden absolute top-6 left-6 flex items-center gap-2.5 z-20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
            <Compass size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold">
            Voyage<span className="text-primary">AI</span>
          </span>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-[480px] bg-white border-border shadow-card p-8 rounded-3xl relative overflow-hidden mt-12 md:mt-0">
          
          <div className="mb-8 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-extrabold tracking-tight">Create an account</h1>
              <span className="text-xs font-bold px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">Step {step} of 2</span>
            </div>
            <p className="text-text-mid text-sm">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="text-primary font-bold hover:text-primary-dark hover:underline transition-all">
                Sign in
              </Link>
            </p>
            {apiError && (
               <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm font-medium">
                 {apiError}
               </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e); }} className="relative min-h-[500px] overflow-hidden">
            {/* Sliding Track */}
            <div 
              className="absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${step === 1 ? '0%' : '-50%'})` }}
            >
              
              {/* Step 1: Role Selection */}
              <div className="w-1/2 h-full pr-4 flex flex-col">
                <label className="text-base font-semibold mb-4 block">I am joining as a...</label>
                
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setValue('role', r.value)}
                      className={`
                        p-4 rounded-2xl border-2 text-left transition-all duration-300 group flex flex-col justify-start h-[140px]
                        ${selectedRole === r.value
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : 'border-border bg-surface hover:border-primary/30 hover:bg-white'
                        }
                      `}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${selectedRole === r.value ? 'bg-primary text-white' : 'bg-surface border border-border text-text-mid group-hover:text-primary group-hover:border-primary/30'}`}>
                        <r.icon size={20} />
                      </div>
                      <p className={`text-sm font-bold tracking-wide ${selectedRole === r.value ? 'text-primary' : 'text-text-dark'}`}>
                        {r.label}
                      </p>
                      <p className="text-xs text-text-light leading-snug mt-1 line-clamp-2">{r.desc}</p>
                    </button>
                  ))}
                </div>
                {errors.role && <p className="text-xs text-accent mt-2 font-medium">{errors.role.message}</p>}
                
                <Button type="button" size="lg" fullWidth onClick={handleNextStep} className="mt-8 shadow-md rounded-xl h-12">
                  Continue <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>

              {/* Step 2: User Details */}
              <div className="w-1/2 h-full pl-4 flex flex-col relative">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm font-semibold text-text-mid hover:text-primary transition-colors mb-4 w-fit bg-surface px-3 py-1.5 rounded-lg border border-border"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 pb-24 scrollbar-hide">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                      <User size={18} />
                    </div>
                    <input
                      type="text" id="name" placeholder="Full Name (e.g. Arjun Sharma)"
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      {...register('name')}
                    />
                    {errors.name && <p className="text-xs text-accent mt-1">{errors.name.message}</p>}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email" id="email" placeholder="Email Address"
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      {...register('email')}
                    />
                    {errors.email && <p className="text-xs text-accent mt-1">{errors.email.message}</p>}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text" id="phone" placeholder="Phone (e.g. +919876543210)"
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      {...register('phone')}
                    />
                    {errors.phone && <p className="text-xs text-accent mt-1">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                        <Lock size={18} />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'} id="password" placeholder="Password"
                        className="w-full pl-10 pr-10 py-3 bg-surface border border-border rounded-xl text-text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                        {...register('password')}
                        onFocus={() => setPasswordFocused(true)}
                        onBlur={() => setPasswordFocused(false)}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-light hover:text-text-dark">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {/* Live Password Strength Indicator */}
                    {passwordFocused && (
                      <div className="mt-3 space-y-1">
                         {passwordRequirements.filter(req => !req.met).map((req, index) => (
                           <div key={index} className="flex items-center gap-2 text-xs font-medium text-text-light transition-all duration-300">
                              <Circle size={14} />
                              <span>{req.label}</span>
                           </div>
                         ))}
                      </div>
                    )}
                    {/* Don't show the zod error if it's just the regex, the checklist handles it. Only show if we've touched it and it's totally invalid. */}
                    {errors.password && !password && <p className="text-xs text-accent mt-1">{errors.password.message}</p>}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-light">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password" id="confirmPassword" placeholder="Confirm Password"
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-text-dark placeholder-text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      {...register('confirmPassword')}
                    />
                    {errors.confirmPassword && <p className="text-xs text-accent mt-1">{errors.confirmPassword.message}</p>}
                  </div>
                </div>

                {/* Fixed bottom area for button to prevent scrolling issues */}
                <div className="absolute bottom-0 left-4 right-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-2 z-10">
                  <Button type="submit" fullWidth size="lg" loading={isSubmitting} className="shadow-md rounded-xl h-12">
                    Complete Registration
                  </Button>
                  <p className="text-xs text-center text-text-light mt-3 px-4">
                    By registering, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a>.
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
