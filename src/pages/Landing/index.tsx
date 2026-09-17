import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Rocket, TrendingUp, GraduationCap, Users, Shield,
  ChevronRight, Check, Minus, Star, Zap, ArrowRight, Sun, Moon,
  Mail, Phone, ShieldCheck, BarChart, Globe, User, Menu, X, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ROUTES, PRO_FEATURES, FREE_FEATURES, PLUS_FEATURES, CUSTOM_FEATURES } from '@/utils/constants';
import { useUIStore } from '@/store/ui.store';
import { AnimatedStatCard } from '@/components/AnimatedStatCard';

const features = [
  { icon: Compass, title: 'AI Career Roadmaps', description: 'Personalized step-by-step career paths powered by AI. From IIT prep to global tech roles.', color: 'text-primary', bg: 'bg-primary-light', borderGradient: '#2563EB', glowColor: 'rgba(37,99,235,0.4)' },
  { icon: Rocket, title: 'Startup Advisory', description: 'Turn your idea into a funded startup with AI-generated action plans and investor matching.', color: 'text-purple', bg: 'bg-purple-light', borderGradient: '#7C3AED', glowColor: 'rgba(124,58,237,0.4)' },
  { icon: TrendingUp, title: 'Job Market Intel', description: 'Real-time job demand data, salary insights, and AI future-safety scores for any role.', color: 'text-success', bg: 'bg-success-light', borderGradient: '#10B981', glowColor: 'rgba(16,185,129,0.4)' },
  { icon: GraduationCap, title: 'Parent Dashboard', description: 'Track your child\'s academic progress, goal alignment, and weekly AI-generated reports.', color: 'text-warning', bg: 'bg-warning-light', borderGradient: '#F59E0B', glowColor: 'rgba(245,158,11,0.4)' },
];

const stats = [
  { value: '50K+', label: 'Career Seekers Guided' },
  { value: '2,500+', label: 'Startup Plans Created' },
  { value: '₹120Cr+', label: 'Funding Facilitated' },
  { value: '98%', label: 'Parent Satisfaction' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'IIT Delhi Career Seeker', quote: 'VoyageAI gave me a clear roadmap to crack JEE Advanced. The AI mentor suggestions were spot-on!', rating: 5 },
  { name: 'Rahul Verma', role: 'EdTech Founder', quote: 'From idea to investor pitch in 6 weeks. The startup advisor is like having a Y Combinator partner on speed dial.', rating: 5 },
  { name: 'Dr. Meera Patel', role: 'Parent', quote: 'Finally I can track my son\'s preparation progress without constant nagging. The weekly digest is a lifesaver.', rating: 5 },
  { name: 'Ananya Gupta', role: 'Software Engineer', quote: 'The job market intelligence helped me negotiate a 30% hike. Unbelievable value!', rating: 5 },
  { name: 'Siddharth Rao', role: 'Angel Investor', quote: 'The deal flow quality here is insane. The AI matching saves me weeks of due diligence.', rating: 5 },
];

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useUIStore();
  const [pricingTab, setPricingTab] = useState<'students' | 'startups' | 'investors' | 'consultancy'>('students');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isHeader = entry.target.tagName.toLowerCase() === 'h1' || entry.target.tagName.toLowerCase() === 'h2';

        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          if (isHeader) {
            observer.unobserve(entry.target);
          }
        } else {
          if (!isHeader) {
            entry.target.classList.remove('animate-in');
          }
        }
      });
    }, { threshold: 0.1 }); // lowered threshold slightly to ensure it triggers

    // Use a slight timeout to ensure DOM is fully painted after state change
    const timeoutId = setTimeout(() => {
      document.querySelectorAll('[data-animate], [data-animate="left"], [data-animate="right"], [data-animate="drop"], [data-animate="fall"]').forEach((el) => {
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pricingTab]); // <--- Added dependency here!

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">
      {/* Nav */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-6 animate-nav-enter">
        <div className={`w-full mx-auto px-5 sm:px-8 py-2 transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/90 backdrop-blur-3xl border-white/60 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' : 'bg-transparent border-transparent'}`} style={{ borderRadius: '9999px', borderWidth: '1px' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Compass size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-text-dark transition-colors duration-300" style={{ perspective: '400px' }}>
                {'Voyage'.split('').map((char, i) => (
                  <span key={i} className="animate-roll-letter" style={{ animationDelay: `${0.4 + i * 0.08}s` }}>
                    {char}
                  </span>
                ))}
                <span className="text-primary animate-roll-letter" style={{ animationDelay: `${0.4 + 6 * 0.08}s` }}>A</span>
                <span className="text-primary animate-roll-letter" style={{ animationDelay: `${0.4 + 7 * 0.08}s` }}>I</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="animate-fly-top text-sm font-medium text-text-mid dark:text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors" style={{ animationDelay: '0.9s' }}>Features</a>
              <Link to={ROUTES.FOR_FOUNDERS} className="animate-fly-bottom text-sm font-medium text-text-mid dark:text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors" style={{ animationDelay: '1.0s' }}>For Founders</Link>
              <Link to={ROUTES.FOR_INVESTORS} className="animate-fly-top text-sm font-medium text-text-mid dark:text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors" style={{ animationDelay: '1.1s' }}>For Investors</Link>
              <a href="#pricing" className="animate-fly-bottom text-sm font-medium text-text-mid dark:text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors" style={{ animationDelay: '1.2s' }}>Pricing</a>
              <a href="#contact" className="animate-fly-top text-sm font-medium text-text-mid dark:text-gray-400 hover:text-text-dark dark:hover:text-white transition-colors" style={{ animationDelay: '1.3s' }}>Contact</a>
            </div>
            <div className="flex flex-row items-center gap-2">
              <button
                onClick={toggleTheme}
                className={`hidden sm:block rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm ${
                  isScrolled
                    ? 'bg-gray-100 dark:bg-surface border border-gray-200 dark:border-border text-gray-700 dark:text-text-mid hover:bg-gray-200 dark:hover:bg-slate-800'
                    : 'bg-transparent backdrop-blur-md border border-white/30 dark:border-border/50 text-white dark:text-white hover:bg-white/20 dark:hover:bg-slate-800/50'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="group relative flex items-center bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-full p-1 overflow-hidden transition-[width] duration-500 ease-in-out w-[44px] hover:w-[210px] sm:hover:w-[380px] shadow-sm">
                {/* Default State (Visible before hover) */}
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                  <span className="text-sm font-bold text-primary flex items-center justify-center cursor-pointer">
                    <User size={18} />
                  </span>
                </div>

                {/* Hover State (Expands to reveal questions and buttons) */}
                <div className="flex items-center gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 min-w-max pl-1 sm:pl-2 pr-1 sm:pr-2 py-0.5 pointer-events-none group-hover:pointer-events-auto">
                  <span className="hidden sm:block text-[12px] font-medium text-text-mid whitespace-nowrap pl-2 cursor-default">
                    Login or Create Account?
                  </span>
                  <Link to={ROUTES.LOGIN} className="ml-1 sm:ml-2">
                    <button className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-border rounded-full px-4 py-1.5 text-xs font-semibold text-text-dark hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap">
                      Log In
                    </button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button size="sm" className="rounded-full px-4 py-1.5 text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm whitespace-nowrap h-auto" withArrow>
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden ml-1 p-2 text-text-dark dark:text-text-mid hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 -z-10 bg-transparent"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ height: '100vh', top: '-1rem' }}
          />
        )}

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-[calc(100%+0.5rem)] left-6 right-6 overflow-hidden transition-all duration-300 ease-in-out bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl ${isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 !border-transparent !shadow-none'}`}>
          <div className="flex flex-col gap-4 p-5">
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-text-dark dark:text-gray-200 hover:text-primary transition-colors">Features</a>
            <Link to={ROUTES.FOR_FOUNDERS} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-text-dark dark:text-gray-200 hover:text-primary transition-colors">For Founders</Link>
            <Link to={ROUTES.FOR_INVESTORS} onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-text-dark dark:text-gray-200 hover:text-primary transition-colors">For Investors</Link>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-text-dark dark:text-gray-200 hover:text-primary transition-colors">Pricing</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold text-text-dark dark:text-gray-200 hover:text-primary transition-colors">Contact</a>
            <div className="pt-4 border-t border-gray-100 dark:border-border/50 flex items-center justify-between">
              <span className="text-base font-semibold text-text-dark dark:text-gray-200">Theme</span>
              <button
                onClick={() => { toggleTheme(); setIsMobileMenuOpen(false); }}
                className="bg-gray-100 dark:bg-slate-800 rounded-full p-2 text-text-dark dark:text-text-mid hover:bg-gray-200 dark:hover:bg-slate-700 transition-all"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden bg-surface min-h-[calc(100vh-4rem)] flex items-center bg-[url('/hero.jpeg')] bg-cover bg-no-repeat bg-[position:center_right]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent dark:from-surface dark:via-surface/90 dark:to-transparent/30 transition-colors duration-300" />
        <div className="relative w-full px-4 sm:px-6 lg:px-16 pt-20 pb-16 md:pt-32 md:pb-40">
          <div className="flex flex-row items-center w-full">
            <div className="flex flex-col justify-center pt-0">
              <div data-animate="left" style={{ transitionDuration: '2.0s' }}>
                <Badge variant="info" size="md" className="mb-6 shadow-sm w-fit">
                  <Zap size={14} className="mr-1" /> Powered by Advanced AI
                </Badge>
                <h1 className="leading-tight text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                  <span className="text-text-dark">Your AI-Powered</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Career & Startup</span><br />
                  <span className="text-text-dark">Guidance Platform</span>
                </h1>
              </div>
              <p data-animate style={{ transitionDuration: '2.0s', transitionDelay: '0.4s' }} className="text-base sm:text-lg text-gray-600 dark:text-text-mid mt-4 mb-5 sm:mb-8 max-w-lg">
                Personalized roadmaps for career seekers. Step-by-step action plans for founders.
                Deal flow for investors. Smart monitoring for parents. All powered by AI.
              </p>
              <div className="flex flex-row items-center gap-4 flex-wrap mt-2">
                <div data-animate="left" style={{ transitionDuration: '2.0s', transitionDelay: '0.8s' }}>
                  <Link to={ROUTES.REGISTER} className="block">
                    <Button className="min-w-[160px] sm:min-w-[200px] py-2.5 sm:py-3 transition-all duration-200 hover:scale-105 active:scale-95 shadow-button" withArrow>
                      Start Your Journey
                    </Button>
                  </Link>
                </div>
                <div data-animate="right" style={{ transitionDuration: '2.0s', transitionDelay: '0.8s' }}>
                  <a href="#pricing" className="block">
                    <Button variant="secondary" className="min-w-[160px] sm:min-w-[200px] py-2.5 sm:py-3 bg-white/80 backdrop-blur-md hover:bg-white dark:bg-surface-light/80 dark:hover:bg-surface-light border border-gray-200 dark:border-border transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm">
                      View Pricing
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            {/* The right side background image does the work, so no image element here */}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border bg-surface transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <AnimatedStatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delayMs={i * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-16">
            <div data-animate>
              <Badge variant="purple" size="md" className="mb-4">Features</Badge>
            </div>
            <h2 data-animate className="text-3xl md:text-4xl font-bold text-text-dark mb-4 transition-colors duration-300" style={{ transitionDelay: '0.1s' }}>
              Everything You Need to Succeed
            </h2>
            <p data-animate className="text-text-mid max-w-2xl mx-auto" style={{ transitionDelay: '0.2s' }}>
              Four powerful modules designed for career seekers, founders, investors, and parents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                data-animate={i < 2 ? "left" : "right"}
                className="group relative rounded-xl transition-all duration-300 ease-out hover:-translate-y-[6px]"
                style={{ transitionDelay: `${i * 0.1}s`, '--icon-glow-color': feature.glowColor } as React.CSSProperties}
              >
                {/* Glowing Shadow Behind Card */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
                  style={{ backgroundColor: feature.glowColor, transform: 'translateY(4px)' }}
                />

                {/* Rotating Border Wrapper */}
                <div className="absolute inset-[-2px] rounded-[14px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <div
                    className="absolute inset-[-100%] animate-spin-slow motion-reduce:animate-none"
                    style={{ background: `conic-gradient(from 0deg, transparent 0 180deg, ${feature.borderGradient} 360deg)` }}
                  />
                </div>

                {/* Main Card Content */}
                <div className="relative h-full bg-white dark:bg-surface border border-gray-100 dark:border-border group-hover:border-transparent rounded-xl p-6 shadow-sm z-10 flex flex-col transition-colors duration-300">
                  <div className={`feature-icon-wrapper w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon size={24} className={feature.color} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-dark mb-2 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-sm text-text-mid leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-8">
            <div data-animate>
              <Badge variant="success" size="md" className="mb-4">Pricing</Badge>
            </div>
            <h2 data-animate className="text-3xl md:text-4xl font-bold text-text-dark mb-4 transition-colors duration-300" style={{ transitionDelay: '0.1s' }}>Simple, Transparent Pricing</h2>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-1 p-1 bg-gray-100 dark:bg-border rounded-2xl sm:rounded-full mx-auto w-full sm:w-fit mb-10 transition-colors duration-300">
            <button data-animate="drop" style={{ transitionDelay: '0.2s' }} onClick={() => setPricingTab('students')} className={`px-4 sm:px-5 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${pricingTab === 'students' ? 'bg-white dark:bg-surface shadow text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-text-mid dark:hover:text-text-light'}`}>Career Seekers & Parents</button>
            <button data-animate="drop" style={{ transitionDelay: '0.3s' }} onClick={() => setPricingTab('startups')} className={`px-4 sm:px-5 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${pricingTab === 'startups' ? 'bg-white dark:bg-surface shadow text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-text-mid dark:hover:text-text-light'}`}>Startups</button>
            <button data-animate="drop" style={{ transitionDelay: '0.4s' }} onClick={() => setPricingTab('investors')} className={`px-4 sm:px-5 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${pricingTab === 'investors' ? 'bg-white dark:bg-surface shadow text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-text-mid dark:hover:text-text-light'}`}>Investors</button>
            <button data-animate="drop" style={{ transitionDelay: '0.5s' }} onClick={() => setPricingTab('consultancy')} className={`px-4 sm:px-5 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${pricingTab === 'consultancy' ? 'bg-white dark:bg-surface shadow text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-700 dark:text-text-mid dark:hover:text-text-light'}`}>Consultancy</button>
          </div>

          {pricingTab === 'students' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Free */}
              <div data-animate className="bg-surface p-8 rounded-xl border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0s' }}>
                <h3 className="text-xl font-bold text-text-dark mb-1 transition-colors duration-300">Free</h3>
                <p className="text-text-light text-sm mb-6">Core features</p>
                <p className="text-4xl font-extrabold text-text-dark mb-6 transition-colors duration-300">₹0<span className="text-base font-normal text-text-light">/mo</span></p>
                <div className="space-y-3 mb-8">
                  {FREE_FEATURES.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={18} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-mid">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="secondary" fullWidth className="transition-all duration-200 hover:scale-105 active:scale-95">Get Started</Button>
                </Link>
              </div>
              {/* Plus */}
              <div data-animate className="bg-surface p-8 rounded-xl border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0.1s' }}>
                <h3 className="text-xl font-bold text-text-dark mb-1 transition-colors duration-300">Plus</h3>
                <p className="text-text-light text-sm mb-6">For serious learners</p>
                <p className="text-4xl font-extrabold text-text-dark mb-6 transition-colors duration-300">₹499<span className="text-base font-normal text-text-light">/mo</span></p>
                <div className="space-y-3 mb-8">
                  {PLUS_FEATURES.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={18} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-mid">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="secondary" fullWidth className="transition-all duration-200 hover:scale-105 active:scale-95">Upgrade to Plus</Button>
                </Link>
              </div>
              {/* Pro */}
              <div data-animate className="bg-surface p-8 rounded-xl border-2 border-primary shadow-card relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0.2s' }}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="info" size="md">Most Popular</Badge>
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-1 transition-colors duration-300">Pro</h3>
                <p className="text-text-light text-sm mb-6">Full access</p>
                <p className="text-4xl font-extrabold text-text-dark mb-6 transition-colors duration-300">₹999<span className="text-base font-normal text-text-light">/mo</span></p>
                <div className="space-y-3 mb-8">
                  {PRO_FEATURES.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={18} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-mid">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to={ROUTES.REGISTER}>
                  <Button fullWidth className="transition-all duration-200 hover:scale-105 active:scale-95">Upgrade to Pro</Button>
                </Link>
              </div>
              {/* Custom */}
              <div data-animate className="bg-surface p-8 rounded-xl border border-border shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0.3s' }}>
                <h3 className="text-xl font-bold text-text-dark mb-1 transition-colors duration-300">Custom</h3>
                <p className="text-text-light text-sm mb-6">Pay as you go</p>
                <p className="text-4xl font-extrabold text-text-dark mb-6 transition-colors duration-300">Usage<span className="text-base font-normal text-text-light"> based</span></p>
                <div className="space-y-3 mb-8">
                  {CUSTOM_FEATURES.map((f) => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={18} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-mid">{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact">
                  <Button variant="secondary" fullWidth className="transition-all duration-200 hover:scale-105 active:scale-95">Contact Sales</Button>
                </a>
              </div>
            </div>
          )}

          {pricingTab === 'startups' && (
            <div>
              <div className="flex flex-col lg:flex-row gap-6 mt-10 items-stretch max-w-7xl mx-auto">
                {/* Card 1: Registration */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-8 rounded-2xl border border-gray-200 dark:border-border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0s' }}>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">For early-stage startups</p>
                  <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Registration</h3>
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">INR 5,000</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">one-time registration fee</p>
                  </div>
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Access to AI platform features</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">AI startup overview and idea structuring</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Action milestones framework</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Community access</span></div>
                  </div>
                  <Link to={ROUTES.REGISTER}>
                    <Button variant="ghost" fullWidth className="bg-white dark:bg-surface border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-all duration-200" withArrow>Register Startup</Button>
                  </Link>
                </div>

                {/* Card 2: Pro Plan */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-8 rounded-2xl border-2 border-blue-600 relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0.1s' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-600 text-white font-semibold text-xs px-3 py-1 rounded-full whitespace-nowrap">1-on-1 Guidance</div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">To validate if your idea is good</p>
                  <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Pro Plan</h3>
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">INR 25,000</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">expert validation</p>
                  </div>
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Everything in Registration</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">1-on-1 idea validation sessions with experts</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Market viability testing</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Go-to-market strategy guide</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">In-depth feedback on pitch</span></div>
                  </div>
                  <Link to={ROUTES.REGISTER}>
                    <Button fullWidth className="bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200" withArrow>Get Pro Plan</Button>
                  </Link>
                </div>

                {/* Card 3: Custom */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-8 rounded-2xl border border-gray-200 dark:border-border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0.2s' }}>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">For validated, strong ideas</p>
                  <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Custom</h3>
                  <div className="mb-6">
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">Let's Talk</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">tailored structure and terms</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                    If your idea is validated and deemed strong, we will make the necessary changes and arrangements to support your growth.
                  </p>
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Bespoke advisory and structuring</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Active long-term partnership</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Priority investor introductions</span></div>
                    <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Dedicated mentor for 12 months</span></div>
                  </div>
                  <Link to={ROUTES.REGISTER}>
                    <Button fullWidth className="bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all duration-200" withArrow>Contact Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {pricingTab === 'investors' && (
            <div className="w-full">
              <div className="flex flex-col lg:flex-row gap-5 mt-10 items-stretch max-w-7xl mx-auto">

                {/* Card 1 */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-7 rounded-2xl border border-gray-200 dark:border-border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: '0s' }}>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Free preview</p>
                    <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Deal Flow</h3>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">Free</p>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Browse live startup listings</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">See startup name, sector, and stage</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Read one-line pitch per startup</span></div>

                      <div className="flex items-start gap-2.5"><Lock size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-400 line-through">Request introduction</span></div>
                      <div className="flex items-start gap-2.5"><Lock size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-400 line-through">Access pitch deck</span></div>
                      <div className="flex items-start gap-2.5"><Lock size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-400 line-through">View traction metrics</span></div>
                      <div className="flex items-start gap-2.5"><Lock size={18} className="text-gray-400 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-400 line-through">Contact founder</span></div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3 text-sm text-blue-700 dark:text-blue-300 mb-8">
                      You can see who is raising. To request an intro or pitch deck, upgrade to Plus or Pro.
                    </div>
                  </div>
                  <Link to={ROUTES.REGISTER}>
                    <Button fullWidth className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 rounded-full transition-all duration-200">Browse Startups</Button>
                  </Link>
                </div>

                {/* Card 2 */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-7 rounded-2xl border border-gray-200 dark:border-border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative" style={{ transitionDelay: '0.1s' }}>
                  <div className="absolute top-6 right-6">
                    <span className="bg-amber-50 text-amber-600 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">Software Startups Only</span>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">For focused investors</p>
                    <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Plus</h3>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">INR 50,000</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per year</p>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">AI-powered investment match based on your thesis</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Ranked list of software startups that fit your profile</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Full startup profiles with traction and metrics</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Request introductions and pitch decks</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Monthly sector intelligence report</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Software product startups only</span></div>
                    </div>
                  </div>
                  <Link to={ROUTES.REGISTER}>
                    <Button fullWidth className="bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200">Upgrade to Plus</Button>
                  </Link>
                </div>

                {/* Card 3 */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-7 rounded-2xl border-2 border-blue-600 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative mt-6 lg:mt-0" style={{ transitionDelay: '0.2s' }}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-600 text-white font-semibold text-xs px-3 py-1 rounded-full whitespace-nowrap">Most Popular</div>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">For serious investors</p>
                    <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Pro</h3>
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">INR 1,20,000</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">per year</p>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Everything in Plus</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Software and hardware product and service startups</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Access to mentor network for deal diligence support</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Priority introductions with founder availability windows</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Weekly curated deal digest</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Portfolio tracking dashboard</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Success fee applies on closed deals: 1 to 2 percent</span></div>
                    </div>
                  </div>
                  <Link to={ROUTES.REGISTER}>
                    <Button fullWidth className="bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200">Upgrade to Pro</Button>
                  </Link>
                </div>

                {/* Card 4 */}
                <div data-animate className="flex-1 bg-white dark:bg-surface p-7 rounded-2xl border border-gray-200 dark:border-border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mt-6 lg:mt-0" style={{ transitionDelay: '0.3s' }}>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">I don't know where to start</p>
                    <h3 className="text-[22px] font-bold text-gray-900 dark:text-white mb-4">Custom</h3>
                    <div className="mb-4">
                      <p className="text-4xl font-bold text-gray-500 dark:text-gray-400">Let's talk</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      If you have capital but no investment thesis yet, our advisory team will sit with you, understand your financial goals, and recommend which sectors and startup stages fit your profile before you commit to any plan.
                    </p>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">One-on-one investment thesis workshop</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Sector recommendation by VoyageAI advisors</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">Guided onboarding into Deal Flow or Plus</span></div>
                      <div className="flex items-start gap-2.5"><Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-gray-600 dark:text-gray-300">No lock-in until you are ready</span></div>
                    </div>
                  </div>
                  <a href="#contact" className="block mt-auto">
                    <Button fullWidth className="bg-white hover:bg-gray-50 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 dark:bg-surface dark:hover:bg-border rounded-full transition-all duration-200">Talk to an Advisor</Button>
                  </a>
                </div>
              </div>
              <p className="text-sm italic text-gray-400 text-center mt-10 max-w-3xl mx-auto px-4">
                Investor access requires identity verification. VoyageAI does not guarantee returns or deal outcomes. All introductions are facilitated only with mutual consent.
              </p>
            </div>
          )}

          {pricingTab === 'consultancy' && (
            <div className="max-w-xl mx-auto mt-10">
              <div data-animate className="relative overflow-hidden bg-white/40 dark:bg-surface/40 backdrop-blur-xl p-12 rounded-3xl border border-white/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-center transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-6">
                    <Globe className="text-blue-600 dark:text-blue-400" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Consultancy Solutions</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                    White-label our AI guidance platform for your educational institution or consultancy business.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/30">
                    <Zap size={18} className="animate-pulse" />
                    <span>Coming Soon in Next Update</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-surface transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-14">
            <h2 data-animate className="text-4xl font-bold text-gray-900 dark:text-white">Why VoyageAI is Different</h2>
            <p data-animate className="text-lg text-gray-500 mt-3" style={{ transitionDelay: '0.1s' }}>The first platform that closes the loop between career seekers, founders, and investors.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                iconColor: 'text-blue-600',
                title: 'One Platform, Four Experts Replaced',
                description: 'VoyageAI replaces your career counsellor, your startup consultant, your investment advisor, and your abroad consultancy — in one subscription. No juggling four services, four fees, and four different logins.',
                borderGradient: '#2563EB',
                glowColor: 'rgba(37,99,235,0.4)',
                animate: 'left',
                delay: '0s'
              },
              {
                icon: ShieldCheck,
                iconColor: 'text-green-600',
                title: 'Honest Guidance. No Empty Promises.',
                description: 'VoyageAI is the only guidance platform that explicitly tells you what it cannot guarantee. We give you the clearest path possible, with full transparency about risks, costs, and timelines. Trust is built on honesty, not sales pitch.',
                borderGradient: '#16A34A',
                glowColor: 'rgba(22,163,74,0.4)',
                animate: '',
                delay: '0.1s'
              },
              {
                icon: BarChart,
                iconColor: 'text-purple-600',
                title: 'Grade-Aware, Not Goal-Blind',
                description: 'Most platforms ask where you want to go. VoyageAI asks where you are right now. Your grades, your current subjects, and your school performance feed directly into a compatibility score that tells you how achievable your goal is — and what to prioritise.',
                borderGradient: '#9333EA',
                glowColor: 'rgba(147,51,234,0.4)',
                animate: 'right',
                delay: '0.2s'
              },
              {
                icon: Zap,
                iconColor: 'text-amber-500',
                title: "India's First AI Career Future-Safety Score",
                description: 'Before you commit to a career path, VoyageAI shows you an AI disruption risk score for that role — from 0 to 100 — based on current automation trends and job market data. No Indian platform does this today.',
                borderGradient: '#F59E0B',
                glowColor: 'rgba(245,158,11,0.4)',
                animate: 'left',
                delay: '0.3s'
              },
              {
                icon: Users,
                iconColor: 'text-blue-500',
                title: 'The Talent Flywheel — Unique to VoyageAI',
                description: 'Career seekers guided on VoyageAI become vetted intern talent for startups guided on VoyageAI, which are then funded by investors connected on VoyageAI. This closed-loop ecosystem is structurally impossible to build without all three segments in one product. We have all three.',
                borderGradient: '#3B82F6',
                glowColor: 'rgba(59,130,246,0.4)',
                animate: '',
                delay: '0.4s'
              },
              {
                icon: Globe,
                iconColor: 'text-teal-600',
                title: 'Study Abroad Without the Consultancy Bill',
                description: 'The average abroad consultancy charges INR 50,000 to 2,00,000 for information that is freely available but fragmented. VoyageAI consolidates it into a structured AI-generated pathway — visa checklist, university shortlist, cost estimate, exam timeline — at a fraction of the cost. Pro users get a 2-year account manager included.',
                borderGradient: '#0D9488',
                glowColor: 'rgba(13,148,136,0.4)',
                animate: 'right',
                delay: '0.5s'
              }
            ].map((item) => (
              <div
                key={item.title}
                data-animate={item.animate || undefined}
                className="group relative rounded-[20px] transition-all duration-300 ease-out hover:-translate-y-[6px]"
                style={{ transitionDelay: item.delay, '--icon-glow-color': item.glowColor } as React.CSSProperties}
              >
                {/* Glowing Shadow Behind Card */}
                <div
                  className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
                  style={{ backgroundColor: item.glowColor, transform: 'translateY(4px)' }}
                />

                {/* Rotating Border Wrapper */}
                <div className="absolute inset-[-2px] rounded-[22px] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0">
                  <div
                    className="absolute inset-[-100%] animate-spin-slow motion-reduce:animate-none"
                    style={{ background: `conic-gradient(from 0deg, transparent 0 180deg, ${item.borderGradient} 360deg)` }}
                  />
                </div>

                {/* Main Card Content */}
                <div className="relative h-full bg-white dark:bg-surface border border-gray-100 dark:border-border group-hover:border-transparent rounded-[20px] p-7 shadow-sm z-10 flex flex-col gap-3 transition-colors duration-300">
                  <item.icon className={item.iconColor} size={32} />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div data-animate className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 mt-12 text-white text-center" style={{ transitionDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold">The Closed-Loop Ecosystem No Competitor Can Copy</h3>
            <p className="text-blue-100 text-base mt-3 max-w-2xl mx-auto">
              VoyageAI is not just a tool — it is a network. Guided career seekers become the talent pool. Guided startups become the investment pipeline. Connected investors close the loop. Each segment makes the others more valuable.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials - Marquee */}
      <section id="testimonials" className="py-20 bg-surface transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="text-center mb-16">
            <div data-animate>
              <Badge variant="warning" size="md" className="mb-4">Testimonials</Badge>
            </div>
            <h2 data-animate className="text-3xl md:text-4xl font-bold text-text-dark mb-4 transition-colors duration-300" style={{ transitionDelay: '0.1s' }}>Loved by Thousands</h2>
          </div>
          <div className="w-full overflow-hidden relative">
            <div className="marquee-track">
              {[...testimonials, ...testimonials].map((t, index) => (
                <div key={index} className="w-[320px] shrink-0 bg-surface border border-border p-6 rounded-xl shadow-card mr-5 hover:border-primary transition-colors">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="text-warning fill-warning" />
                    ))}
                  </div>
                  <p className="text-sm text-text-mid leading-relaxed mb-4">"{t.quote}"</p>
                  <div>
                    <p className="text-sm font-semibold text-text-dark transition-colors duration-300">{t.name}</p>
                    <p className="text-xs text-text-light">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Gradient overlays for smooth fading edges */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-surface to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-surface to-transparent z-10"></div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-24 md:py-32 relative bg-white dark:bg-surface overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-border to-transparent"></div>
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative w-full px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column: Text & Info */}
            <div>
              <div className="mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wider mb-6 border border-blue-100 dark:border-blue-800/50">
                  LET'S TALK
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight" data-animate>
                  Ready to shape your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple">future?</span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg" data-animate style={{ transitionDelay: '0.1s' }}>
                  Whether you're exploring careers, planning to study abroad, or building a startup—our team is here to guide you every step of the way. Reach out today.
                </p>
              </div>

              <div className="space-y-5">
                {/* Email Card */}
                <div data-animate className="group flex items-center gap-5 p-5 rounded-2xl bg-gray-50 dark:bg-surface-light/5 border border-gray-100 dark:border-border hover:bg-white dark:hover:bg-surface hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ transitionDelay: '0.2s' }}>
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Mail className="text-blue-600 dark:text-blue-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Us</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">contact@voyageai.com</h3>
                  </div>
                </div>

                {/* Phone Card */}
                <div data-animate className="group flex items-center gap-5 p-5 rounded-2xl bg-gray-50 dark:bg-surface-light/5 border border-gray-100 dark:border-border hover:bg-white dark:hover:bg-surface hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ transitionDelay: '0.3s' }}>
                  <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <Phone className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Call Us</p>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">+91 98765 43210</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Form */}
            <div data-animate className="relative" style={{ transitionDelay: '0.4s' }}>
              {/* Decorative border gradient */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-purple rounded-[2.5rem] blur opacity-20 dark:opacity-30"></div>

              <div className="relative bg-white dark:bg-[#0B1121] p-8 sm:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">We usually respond within 24 hours.</p>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">First Name</label>
                      <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Last Name</label>
                      <input type="text" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <input type="email" className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">How can we help?</label>
                    <textarea rows={4} className="w-full px-5 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-slate-800/50 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your inquiry..."></textarea>
                  </div>

                  <Button fullWidth size="lg" className="h-14 mt-2 text-base font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 hover:-translate-y-1">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-surface border-t border-border transition-colors duration-300">
        <div className="w-full px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-text-dark transition-all duration-300 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">VoyageAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-light">
              <Link to={ROUTES.CAREERS} className="hover:text-primary transition-colors">Careers</Link>
              <span className="cursor-pointer hover:text-primary transition-colors">Privacy</span>
              <span className="cursor-pointer hover:text-primary transition-colors">Terms</span>
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                <Shield size={14} />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            <p className="text-xs text-text-light">© 2026 VoyageAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Giant Footer Brand Section */}
      <section className="relative min-h-[30vh] md:min-h-[40vh] flex items-center justify-center overflow-hidden bg-white dark:bg-surface py-20 group cursor-default">
        {/* Outline Text */}
        <h2
          className="relative z-10 text-6xl md:text-8xl lg:text-[10rem] font-black text-transparent tracking-tighter transition-transform duration-700 group-hover:scale-105"
          style={{ WebkitTextStroke: '2px black' }}
        >
          VoyageAI
        </h2>

        {/* Solid Black Text that expands from a circle on hover */}
        <h2
          className="absolute z-20 text-6xl md:text-8xl lg:text-[10rem] font-black text-black tracking-tighter transition-all duration-700 ease-out pointer-events-none [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)] group-hover:scale-105"
        >
          VoyageAI
        </h2>
      </section>
    </div>
  );
};

export default LandingPage;
