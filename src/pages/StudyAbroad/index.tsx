import React, { useState } from 'react';
import { Globe, Plane, DollarSign, MapPin, CheckSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { useAbroadPathway } from '@/hooks/useAbroadPathway';

export const StudyAbroadPage: React.FC = () => {
  const { countries, generatePathway, pathway, isGenerating, updateChecklist } = useAbroadPathway();
  
  const [targetCountry, setTargetCountry] = useState('usa');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [budget, setBudget] = useState('medium');
  const [timeline, setTimeline] = useState('1_year');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    generatePathway({ country: targetCountry, field: fieldOfStudy, budget, timeline });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Study Abroad" 
        subtitle="Plan your international education journey."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card accentColor="primary">
            <h3 className="font-semibold text-text-dark mb-4">Set Preferences</h3>
            <form onSubmit={handleGenerate} className="space-y-4">
              <Select
                id="country"
                label="Target Country"
                options={countries.map(c => ({ value: c.id, label: c.name }))}
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
              />
              
              <Input
                id="field"
                label="Field of Study"
                placeholder="e.g. Computer Science, MBA"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                icon={<Search size={16} />}
              />
              
              <Select
                id="budget"
                label="Annual Budget"
                options={[
                  { value: 'low', label: 'Under $20k' },
                  { value: 'medium', label: '$20k - $40k' },
                  { value: 'high', label: 'Above $40k' }
                ]}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              
              <Select
                id="timeline"
                label="Target Enrollment"
                options={[
                  { value: '6_months', label: 'In 6 Months' },
                  { value: '1_year', label: 'Next Year' },
                  { value: '2_years', label: 'In 2 Years' }
                ]}
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              />

              <Button type="submit" fullWidth loading={isGenerating} className="mt-2">
                <Plane size={16} /> Generate Guide
              </Button>
            </form>
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {isGenerating ? (
            <Card className="h-full min-h-[400px] flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <Globe size={32} className="text-primary mb-4 opacity-50" />
                <p className="text-text-mid">Analyzing visa requirements and university matching...</p>
              </div>
            </Card>
          ) : pathway ? (
            <div className="space-y-4">
              {/* Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                  <MapPin size={20} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">{pathway.countryName}</p>
                  <p className="text-xs text-text-light">Target</p>
                </Card>
                <Card className="p-4 text-center">
                  <DollarSign size={20} className="text-success mx-auto mb-2" />
                  <p className="text-sm font-semibold">{pathway.estimatedCost}</p>
                  <p className="text-xs text-text-light">Estimated</p>
                </Card>
                <Card className="p-4 text-center">
                  <Badge variant="purple" className="mb-2">Visa</Badge>
                  <p className="text-sm font-semibold uppercase">{pathway.visaType}</p>
                  <p className="text-xs text-text-light">Required</p>
                </Card>
                <Card className="p-4 text-center">
                  <CheckSquare size={20} className="text-warning mx-auto mb-2" />
                  <p className="text-sm font-semibold">{pathway.checklist.filter(c => c.completed).length}/{pathway.checklist.length}</p>
                  <p className="text-xs text-text-light">Tasks Done</p>
                </Card>
              </div>

              {/* Checklist */}
              <Card title="Action Checklist" icon={<CheckSquare size={18} />}>
                <div className="mt-4 space-y-3">
                  {pathway.checklist.map((item) => (
                    <label key={item.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border cursor-pointer hover:border-primary/30 transition-colors">
                      <input 
                        type="checkbox" 
                        className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary"
                        checked={item.completed}
                        onChange={(e) => updateChecklist({ itemId: item.id, checked: e.target.checked })}
                      />
                      <div className="flex-1">
                        <span className={`text-sm font-medium ${item.completed ? 'text-text-light line-through' : 'text-text-dark'}`}>
                          {item.task}
                        </span>
                        {item.dueDate && (
                          <p className={`text-xs mt-1 ${item.completed ? 'text-text-light' : 'text-accent'}`}>
                            Due by {item.dueDate}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Top Universities */}
              <Card title="Top University Matches" className="mt-4">
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pathway.universities.map((uni, i) => (
                    <div key={i} className="p-4 rounded-xl border border-border flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-text-dark">{uni.name}</h4>
                        <p className="text-xs text-text-light mb-2">{uni.location}</p>
                        <Badge variant={uni.matchScore > 85 ? 'success' : 'default'} size="sm">
                          {uni.matchScore}% Match
                        </Badge>
                      </div>
                      <Globe size={16} className="text-text-light" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                  <Plane size={28} className="text-text-light" />
                </div>
                <h3 className="text-base font-medium text-text-dark mb-1">Plan your international journey</h3>
                <p className="text-sm text-text-light">Select a country and field to get a step-by-step checklist, cost estimates, and university matches.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyAbroadPage;
