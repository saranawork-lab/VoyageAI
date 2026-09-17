import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass, Lightbulb, ListChecks, Handshake, ChevronDown, ChevronRight,
  ArrowRight, Sun, Moon, Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/utils/constants';
import { useUIStore } from '@/store/ui.store';

const steps = [
  { icon: Lightbulb, title: 'Describe Your Idea', body: 'Tell VoyageAI your startup idea, sector, budget, and team size. Takes under 3 minutes.' },
  { icon: ListChecks, title: 'Get Your Action Plan', body: 'AI generates a full startup roadmap: entity registration, MVP scope, go-to-market, funding stage guide, and legal checklist. Every step is trackable.' },
  { icon: Handshake, title: 'Connect With Investors', body: 'Once your milestones are on track, VoyageAI matches your startup profile with investors in the network who match your sector and stage.' },
];

const founderTestimonials = [
  { name: 'Vikram Joshi', role: 'Founder, NexaHealth', quote: 'The AI action plan saved me 3 months of guesswork. I went from idea to investor pitch in 6 weeks.' },
  { name: 'Sneha Reddy', role: 'Co-founder, EduBridge', quote: 'VoyageAI matched us with the perfect angel investor. The structured milestones gave them confidence in our execution.' },
  { name: 'Arjun Kapoor', role: 'Founder, GreenLogistics', quote: 'I chose the flat fee model and got a legal checklist, MVP scope, and go-to-market plan. Worth every rupee.' },
];

const faqs = [
  { q: 'Do I have to give equity?', a: 'No. The flat fee option (₹15,000) is always available. You only give equity if you explicitly choose the equity partnership model at onboarding.' },
  { q: 'What does the action plan include?', a: 'A full step-by-step startup roadmap covering: legal entity registration, MVP scope and timeline, go-to-market strategy, funding stage guide, compliance checklist, and milestone tracking.' },
  { q: 'When does VoyageAI take equity?', a: 'Only if the equity model is chosen at onboarding. The terms (1–3%) are detailed in a signed agreement via DocuSign before any work begins.' },
  { q: 'Can I upgrade from flat fee to equity later?', a: 'No. The pricing model is fixed at signing and cannot be changed after onboarding.' },
  { q: 'Is my idea kept confidential?', a: 'Yes. All data is encrypted and never shared with third parties — including investors — without your explicit written consent.' },
];

export const ForFoundersPage: React.FC = () => {
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
              <Link to={ROUTES.FOR_FOUNDERS} className="text-sm font-medium text-primary">For Founders</Link>
              <Link to={ROUTES.FOR_INVESTORS} className="text-sm font-medium text-text-mid hover:text-text-dark transition-colors">For Investors</Link>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-text-mid hover:bg-gray-50 transition-all duration-200" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link to={ROUTES.LOGIN}>
                <button className="bg-white dark:bg-surface border border-gray-200 dark:border-border rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-text-mid hover:bg-gray-50 transition-all duration-200">Log in</button>
              </Link>
              <Link to={ROUTES.REGISTER}>
                <Button size="sm">Get Started <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-surface to-blue-50 dark:from-purple-950/30 dark:via-surface dark:to-blue-950/30" />
        <div className="relative w-full px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate="left" className="flex flex-col justify-center">
              <h1 className="text-5xl lg:text-6xl font-bold text-text-dark leading-tight mb-4 transition-colors duration-300">
                Turn Your Idea Into a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Running Startup.</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-text-mid mt-4 mb-8 max-w-lg">
                VoyageAI gives you a step-by-step action plan — legal, product, funding, and growth — generated by AI and reviewed by domain mentors. No overpriced consultant. No generic advice.
              </p>
              <div className="flex flex-row gap-3 flex-wrap">
                <Link to={ROUTES.REGISTER}>
                  <Button size="lg" className="transition-all duration-200 hover:scale-105 active:scale-95">
                    Get My Startup Plan <ChevronRight size={18} />
                  </Button>
                </Link>
                <a href="#how-it-works">
                  <Button variant="secondary" size="lg" className="bg-white border border-gray-200 dark:bg-surface dark:border-border transition-all duration-200 hover:scale-105 active:scale-95">
                    See How It Works
                  </Button>
                </a>
              </div>
            </div>
            <div data-animate="right" className="hidden lg:flex justify-center">
              <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-blue-600 p-1">
                <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Rocket size={120} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white dark:bg-surface-light/5">
        <div className="w-full px-6 lg:px-16">
          <h2 className="text-4xl font-bold text-text-dark text-center mb-4 transition-colors duration-300">How It Works</h2>
          <p className="text-gray-500 text-center mb-14 max-w-xl mx-auto">Three simple steps from idea to funded startup.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} data-animate className="bg-surface dark:bg-surface border border-border rounded-2xl p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <step.icon size={28} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-text-dark">{step.title}</h3>
                <p className="text-sm text-text-mid leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="py-20">
        <div className="w-full px-6 lg:px-16">
          <div data-animate className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-10 md:p-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Choose Your Model</h2>
            <p className="text-purple-100 text-center mb-10 max-w-xl mx-auto">Three transparent options depending on your idea's validation stage.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1: Registration */}
              <div className="bg-white rounded-2xl p-8 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Registration</h3>
                <p className="text-gray-500 text-sm mb-4">For early-stage startups</p>
                <p className="text-4xl font-extrabold text-blue-600 mb-2">₹5,000</p>
                <p className="text-sm text-gray-400 mb-6">one-time registration fee</p>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 mb-6">Access AI platform features, idea structuring, and community.</p>
                </div>
                <Link to={ROUTES.REGISTER}>
                  <Button fullWidth variant="secondary" className="transition-all duration-200 hover:scale-105 active:scale-95 text-blue-600 border-blue-600 hover:bg-blue-50">Register</Button>
                </Link>
              </div>

              {/* Card 2: Pro Plan */}
              <div className="bg-white rounded-2xl p-8 relative shadow-xl transform md:-translate-y-4 flex flex-col border-4 border-blue-600">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                  1-on-1 Guidance
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pro Plan</h3>
                <p className="text-gray-500 text-sm mb-4">Validate your idea</p>
                <p className="text-4xl font-extrabold text-gray-900 mb-2">₹25,000</p>
                <p className="text-sm text-gray-400 mb-6">expert validation</p>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 mb-6">Everything in Registration, plus 1-on-1 sessions to validate viability and GTM strategy.</p>
                </div>
                <Link to={ROUTES.REGISTER}>
                  <Button fullWidth className="transition-all duration-200 hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-700">Get Pro Plan</Button>
                </Link>
              </div>

              {/* Card 3: Custom */}
              <div className="bg-white rounded-2xl p-8 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Custom</h3>
                <p className="text-gray-500 text-sm mb-4">For validated, strong ideas</p>
                <p className="text-4xl font-extrabold text-purple-600 mb-2">Let's Talk</p>
                <p className="text-sm text-gray-400 mb-6">tailored terms</p>
                <div className="flex-grow">
                  <p className="text-sm text-gray-600 mb-6">Bespoke advisory, long-term partnership, and priority investor introductions.</p>
                </div>
                <Link to={ROUTES.REGISTER}>
                  <Button fullWidth variant="secondary" className="transition-all duration-200 hover:scale-105 active:scale-95 text-purple-600 border-purple-600 hover:bg-purple-50">Contact Us</Button>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Founder Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-surface">
        <div className="w-full px-6 lg:px-16">
          <h2 className="text-3xl font-bold text-text-dark text-center mb-12 transition-colors duration-300">What Founders Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {founderTestimonials.map((t, i) => (
              <div key={i} data-animate className="bg-white dark:bg-surface border border-gray-100 dark:border-border p-6 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="text-sm text-text-mid leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-sm font-semibold text-text-dark">{t.name}</p>
                <p className="text-xs text-text-light">{t.role}</p>
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
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="w-full px-6 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Startup Plan Is Ready to Build</h2>
          <Link to={ROUTES.REGISTER}>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 border-none transition-all duration-200 hover:scale-105 active:scale-95">
              Get Started as a Founder <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ForFoundersPage;
