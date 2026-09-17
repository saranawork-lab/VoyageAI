import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { ArrowRight, MapPin, Briefcase, Zap, Heart, Coffee, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const openRoles = [
  { id: 1, title: 'Senior AI Engineer', department: 'Engineering', location: 'Remote (India)', type: 'Full-time' },
  { id: 2, title: 'Product Manager, Growth', department: 'Product', location: 'Bangalore, KA', type: 'Full-time' },
  { id: 3, title: 'Student Success Mentor', department: 'Operations', location: 'Remote', type: 'Contract' },
  { id: 4, title: 'UI/UX Designer', department: 'Design', location: 'Remote (Global)', type: 'Full-time' },
];

const perks = [
  { icon: Globe, title: 'Work Anywhere', desc: 'Remote-first culture with co-working allowances.' },
  { icon: Heart, title: 'Comprehensive Health', desc: 'Top-tier medical, dental, and vision for you and dependents.' },
  { icon: Zap, title: 'Learning Stipend', desc: '₹50,000 annual budget for courses, books, and conferences.' },
  { icon: Coffee, title: 'Wellness Days', desc: 'Mandatory paid time off every quarter to recharge.' },
];

export const CareersPage: React.FC = () => {
  return (
    <div className="max-w-[95rem] mx-auto space-y-16 animate-fade-in pb-20">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mt-6">
        <div className="absolute inset-0">
          <img 
            src="/images/careers_team_1789222642585.jpg" 
            alt="VoyageAI Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent dark:from-surface dark:via-surface/90"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-16 lg:p-24 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-text-dark leading-tight mb-6 animate-slide-up">
            Build the Future of <span className="text-primary">Human Potential</span>
          </h1>
          <p className="text-lg md:text-xl text-text-mid mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We're a team of educators, engineers, and dreamers building the AI infrastructure that empowers millions of students and founders globally.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a href="#open-roles">
              <Button size="lg" className="shadow-lg hover:-translate-y-1 transition-transform">
                View Open Roles <ArrowRight size={18} className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Values & Perks Section */}
      <section className="px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-dark mb-4">Why VoyageAI?</h2>
          <p className="text-text-mid max-w-2xl mx-auto">
            We believe that to build the best product, we need the best environment. Here is how we support our team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, i) => (
            <Card key={i} className="p-6 bg-white dark:bg-surface border-border hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                <perk.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">{perk.title}</h3>
              <p className="text-sm text-text-mid leading-relaxed">{perk.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-text-dark mb-2">Open Roles</h2>
            <p className="text-text-mid">Join our fast-growing team.</p>
          </div>
          <Button variant="secondary">View All Roles</Button>
        </div>

        <div className="space-y-4">
          {openRoles.map((role) => (
            <div key={role.id} className="group bg-white dark:bg-surface border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
              <div>
                <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">{role.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-text-light">
                  <span className="flex items-center gap-1.5"><Briefcase size={16} /> {role.department}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={16} /> {role.location}</span>
                  <span className="px-2.5 py-1 rounded-md bg-surface text-text-mid font-medium border border-border">{role.type}</span>
                </div>
              </div>
              <Button variant="secondary" className="group-hover:bg-primary group-hover:text-white transition-colors">
                Apply Now
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-surface border border-border rounded-2xl text-center">
          <h3 className="text-lg font-bold text-text-dark mb-2">Don't see a fit?</h3>
          <p className="text-text-mid mb-6 max-w-md mx-auto">
            We are always looking for talented individuals. Send your resume to <span className="font-semibold text-primary">careers@voyageai.com</span> and we'll reach out when a role opens up.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
