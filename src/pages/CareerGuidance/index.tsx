import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, CheckCircle2, Circle, Clock, ExternalLink, PlayCircle, BookOpen, Crown, Compass } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Modal } from '@/components/ui/Modal';
import { PageHeader } from '@/components/layout/PageHeader';
import { useCareerGuidance } from '@/hooks/useCareerGuidance';
import { useAuthStore } from '@/store/auth.store';
import { careerQuerySchema } from '@/utils/validators';
import { FREE_QUERY_LIMIT } from '@/utils/constants';

export const CareerGuidancePage: React.FC = () => {
  const { tier } = useAuthStore();
  const { 
    roadmap, isLoadingRoadmap, pastQueries, generateRoadmap, 
    isGenerating, markMilestoneComplete 
  } = useCareerGuidance();
  
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(careerQuerySchema),
    defaultValues: { query: '' }
  });

  const onSubmit = (data: { query: string }) => {
    generateRoadmap(data.query);
  };

  const activeMilestoneData = roadmap?.milestones.find(m => m.id === selectedMilestone);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <PageHeader 
        title="Career Guidance" 
        subtitle="AI-powered roadmaps to achieve your dream career."
      />

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        {/* Left Panel - Query Input */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card accentColor="primary">
            <h3 className="text-sm font-semibold text-text-dark mb-4">Generate New Roadmap</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e); }} className="space-y-4">
              <Input
                id="career-query"
                placeholder="e.g. Software Engineer at Google"
                error={errors.query?.message}
                {...register('query')}
              />
              <Button type="submit" fullWidth loading={isGenerating}>
                <Sparkles size={16} /> Generate Path
              </Button>
            </form>
            
            {tier === 'free' && (
              <p className="text-xs text-text-light text-center mt-4">
                1 of {FREE_QUERY_LIMIT} queries used this month.
              </p>
            )}
          </Card>

          {pastQueries.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-text-light uppercase tracking-wider mb-3">Recent Queries</h4>
              <div className="flex flex-wrap gap-2">
                {pastQueries.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => generateRoadmap(q.query)}
                    className="px-3 py-1.5 bg-white border border-border rounded-full text-xs text-text-mid hover:border-primary hover:text-primary transition-colors text-left"
                  >
                    {q.query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Roadmap Timeline */}
        <div className="w-full lg:w-2/3">
          <Card className="h-full min-h-[500px] relative overflow-hidden flex flex-col">
            {isLoadingRoadmap || isGenerating ? (
              <div className="flex items-center justify-center flex-1">
                <div className="animate-pulse flex flex-col items-center">
                  <Sparkles size={32} className="text-primary mb-4 opacity-50" />
                  <p className="text-text-mid">Generating your personalized path...</p>
                </div>
              </div>
            ) : roadmap ? (
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-text-dark">{roadmap.goalTitle}</h3>
                  <div className="mt-4">
                    <ProgressBar value={roadmap.completionPercentage} label="Roadmap Progress" />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative">
                  {/* Timeline line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-border z-0" />

                  {roadmap.milestones.map((milestone, index) => {
                    const isBlurred = tier === 'free' && index >= 3;
                    
                    return (
                      <div key={milestone.id} className="relative z-10 flex gap-4">
                        <div className="flex-shrink-0 mt-1 bg-white">
                          {milestone.status === 'done' ? (
                            <CheckCircle2 size={32} className="text-success fill-white" />
                          ) : milestone.status === 'in_progress' ? (
                            <Clock size={32} className="text-warning fill-white" />
                          ) : (
                            <Circle size={32} className="text-border fill-white" />
                          )}
                        </div>
                        
                        <div 
                          className={`flex-1 p-4 rounded-xl border transition-all ${
                            isBlurred ? 'opacity-40 blur-[2px] select-none pointer-events-none border-border' : 
                            milestone.status === 'in_progress' ? 'border-warning shadow-sm bg-warning-light/30' :
                            'border-border bg-white hover:border-primary/40 cursor-pointer shadow-sm'
                          }`}
                          onClick={() => !isBlurred && setSelectedMilestone(milestone.id)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant={milestone.status === 'done' ? 'success' : milestone.status === 'in_progress' ? 'warning' : 'default'}>
                              {milestone.month}
                            </Badge>
                            {milestone.examDate && (
                              <span className="text-xs text-text-light font-medium">{milestone.examDate}</span>
                            )}
                          </div>
                          
                          <h4 className="font-semibold text-text-dark mt-2 mb-1">{milestone.title}</h4>
                          <p className="text-sm text-text-mid line-clamp-2">{milestone.description}</p>
                          
                          {milestone.examName && (
                            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-light text-purple text-xs font-medium">
                              <BookOpen size={12} /> {milestone.examName} Target
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Upgrade Overlay for Free Tier */}
                  {tier === 'free' && roadmap.milestones.length > 3 && (
                    <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white to-transparent z-20 flex items-end justify-center pb-8">
                      <div className="bg-white px-6 py-4 rounded-xl shadow-card border border-primary/20 text-center max-w-sm">
                        <Crown size={24} className="text-warning mx-auto mb-2" />
                        <h4 className="font-bold text-text-dark mb-1">Unlock Full Roadmap</h4>
                        <p className="text-xs text-text-light mb-4">Upgrade to Pro to see steps 4-10 and get mentor support.</p>
                        <Button size="sm" fullWidth>Upgrade to Pro</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-1 text-center px-6">
                <div>
                  <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mx-auto mb-4">
                    <Compass size={28} className="text-text-light" />
                  </div>
                  <h3 className="text-base font-medium text-text-dark mb-1">No roadmap generated</h3>
                  <p className="text-sm text-text-light">Enter your career goal to get a personalized step-by-step path.</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Milestone Detail Modal */}
      <Modal
        isOpen={!!selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
        title={activeMilestoneData?.title}
      >
        {activeMilestoneData && (
          <div className="space-y-6">
            <p className="text-sm text-text-mid">{activeMilestoneData.description}</p>
            
            <div>
              <h4 className="text-sm font-semibold text-text-dark mb-3">Tasks to Complete</h4>
              <div className="space-y-2">
                {activeMilestoneData.subTasks.map((task) => (
                  <label key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-surface cursor-pointer hover:border-primary/30 transition-colors">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
                      defaultChecked={task.completed}
                    />
                    <span className={`text-sm ${task.completed ? 'text-text-light line-through' : 'text-text-dark'}`}>
                      {task.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {activeMilestoneData.resources.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-text-dark mb-3">Recommended Resources</h4>
                <div className="space-y-2">
                  {activeMilestoneData.resources.map((res) => (
                    <a 
                      key={res.id} 
                      href={res.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {res.type === 'video' ? <PlayCircle size={18} className="text-accent" /> : <BookOpen size={18} className="text-primary" />}
                        <span className="text-sm font-medium text-text-dark">{res.title}</span>
                      </div>
                      <ExternalLink size={16} className="text-text-light" />
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4 mt-4 border-t border-border flex justify-end">
              <Button 
                onClick={() => {
                  markMilestoneComplete(activeMilestoneData.id);
                  setSelectedMilestone(null);
                }}
              >
                Mark Milestone Complete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CareerGuidancePage;
