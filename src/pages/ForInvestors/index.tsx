import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Briefcase, BarChart, Users, ChevronDown, ChevronRight,
  ArrowRight, Sun, Moon, ShieldCheck, Target, Handshake, Check, Lock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { useUIStore } from '@/store/ui.store';

const features = [
  { icon: Target, title: 'Curated Deal Flow', body: 'Every startup in your feed has completed at least 3 milestones in the VoyageAI startup program. You see sector, stage, traction summary, and funding ask — all standardised.' },
  { icon: BarChart, title: 'Sector Intelligence Reports', body: 'Monthly AI-generated reports on your chosen sectors: job market demand, funding trends, and emerging verticals. The same data your portfolio companies use to pitch.' },
  { icon: Handshake, title: 'Warm Introductions Only', body: 'No cold outreach. VoyageAI facilitates the introduction only when both sides have expressed interest. Founders and investors both consent before contact details are exchanged.' },
  { icon: Users, title: 'Talent Pipeline Access', body: 'Invest in a startup and immediately access VoyageAI\'s vetted student talent pool for that startup\'s hiring needs. Your portfolio companies hire faster.' },
];

const steps = [
  { icon: ShieldCheck, title: 'Apply and Verify', body: 'Submit your investment thesis, sectors, and ticket range. VoyageAI verifies your identity before granting access.' },
  { icon: Target, title: 'Get Matched Deal Flow', body: 'Every week, a curated list of startups matching your thesis arrives in your dashboard, ranked by match score.' },
  { icon: Handshake, title: 'Close via VoyageAI', body: 'Express interest, VoyageAI facilitates the intro, and the success fee applies only if a deal closes.' },
];

const faqs = [
  { q: 'How are startups vetted?', a: 'Startups must complete an AI-guided action plan covering legal, MVP scope, and go-to-market strategy. We track their milestones to ensure they are execution-focused before they appear in your deal flow.' },
  { q: 'Is the success fee negotiable?', a: 'The success fee (1–2%) is standard for institutional investors and syndicates closing deals via our platform introductions, detailed during onboarding.' },
  { q: 'Can I set deal alerts for specific sectors?', a: 'Yes. Your dashboard allows you to filter deal flow by sector, stage, ticket size, and founder background, with instant alerts for high-match startups.' },
  { q: 'What if I want to invest in a startup not on VoyageAI?', a: 'VoyageAI is a closed-loop platform. We only facilitate introductions to startups currently building their roadmap within our ecosystem.' },
];

export const ForInvestorsPage: React.FC = () => {
  const { theme, toggleTheme } = useUIStore();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface transition-colors duration-300">
      {/* Nav */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-6">
        <div className="w-full mx-auto px-6 py-2 bg-white/90 dark:bg-surface/90 backdrop-blur-md border border-gray-200 dark:border-border shadow-sm" style={{ borderRadius: '9999px' }}>
          <div className="flex items-center justify-between">
            <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
                <Compass size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-text-dark">
                Voyage<span className="text-primary">AI</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link to={ROUTES.HOME} className="text-sm font-medium text-text-mid hover:text-text-dark transition-colors">Home</Link>
              <Link to={ROUTES.FOR_FOUNDERS} className="text-sm font-medium text-text-mid hover:text-text-dark transition-colors">For Founders</Link>
              <Link to={ROUTES.FOR_INVESTORS} className="text-sm font-medium text-emerald-600">For Investors</Link>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-text-mid hover:bg-gray-50 transition-all duration-200" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link to={ROUTES.LOGIN}>
                <button className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-text-mid hover:bg-gray-50 transition-all duration-200">Log in</button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Get Started <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-surface to-blue-50 dark:from-emerald-950/30 dark:via-surface dark:to-blue-950/30" />
        <div className="relative w-full px-6 lg:px-16 text-center max-w-4xl mx-auto">
          <div data-animate="left" className="flex flex-col justify-center items-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight mb-4 transition-colors duration-300">
              Access Pre-Vetted,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">AI-Guided Startups.</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-text-mid mt-4 mb-8">
              VoyageAI's investor network gives you structured deal flow from startups that have completed an AI-generated advisory program — not cold pitches, but guided, milestone-tracked companies.
            </p>
            <div className="flex flex-row justify-center gap-3 flex-wrap">
              <Link to={ROUTES.REGISTER}>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 border-none transition-all duration-200 hover:scale-105 active:scale-95">
                  Join as Investor <ChevronRight size={18} />
                </Button>
              </Link>
              <a href="#pricing">
                <Button variant="secondary" size="lg" className="bg-white border border-gray-200 dark:bg-surface dark:border-border transition-all duration-200 hover:scale-105 active:scale-95">
                  View Deal Flow Sample
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-gray-50 dark:bg-surface-light/5">
        <div className="w-full px-6 lg:px-16">
          <h2 className="text-4xl font-bold text-text-dark text-center mb-14 transition-colors duration-300">What You Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <div key={feature.title} data-animate className="bg-white dark:bg-surface border border-gray-100 dark:border-border rounded-2xl p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <feature.icon size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark">{feature.title}</h3>
                <p className="text-sm text-text-mid leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="w-full px-6 lg:px-16">
          <div className="text-center mb-14">
             <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4 transition-colors duration-300">Investor Access Pricing</h2>
             <p className="text-text-mid max-w-2xl mx-auto">Flexible models for angels, HNIs, and institutional investors.</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto items-stretch">
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
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-surface">
        <div className="w-full px-6 lg:px-16">
          <h2 className="text-3xl font-bold text-text-dark text-center mb-14 transition-colors duration-300">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} data-animate className="bg-white dark:bg-surface-light/5 border border-gray-100 dark:border-border p-6 rounded-2xl shadow-sm text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <step.icon size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">{step.title}</h3>
                <p className="text-sm text-text-mid leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="w-full px-6 lg:px-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-dark text-center mb-12 transition-colors duration-300">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} data-animate className="border border-border rounded-xl overflow-hidden" style={{ transitionDelay: `${i * 0.08}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-surface hover:bg-gray-50 dark:hover:bg-surface-light/10 transition-colors"
                >
                  <span className="font-medium text-text-dark">{faq.q}</span>
                  <ChevronDown size={20} className={`text-text-light transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-text-mid leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="w-full px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to See the Pipeline?</h2>
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 border-none transition-all duration-200 hover:scale-105 active:scale-95">
              Join the Investor Network <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ForInvestorsPage;
