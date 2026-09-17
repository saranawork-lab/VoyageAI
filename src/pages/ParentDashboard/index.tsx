import React from 'react';
import { Mail, Target, TrendingUp, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { GradeChart } from '@/components/charts/GradeChart';
import { useParentDashboard } from '@/hooks/useParentDashboard';
import { RoleGuard } from '@/components/guards/RoleGuard';

export const ParentDashboardPage: React.FC = () => {
  const { child, digests, alignment, getGradeChartData, subjects } = useParentDashboard();

  return (
    <RoleGuard roles={['parent']} fallback={<div className="p-8 text-center text-accent">Access Denied</div>}>
      <div className="space-y-6">
        <PageHeader 
          title="Parent Dashboard" 
          subtitle="Monitor progress, alignment, and get AI insights."
          action={<Button size="sm"><Mail size={16} /> Manage Digest Settings</Button>}
        />

        {/* Overview Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card accentColor="primary" className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              <div className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm">
                <span className="text-3xl font-bold text-primary">{child?.name?.charAt(0) || 'C'}</span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-bold text-text-dark mb-1">{child?.name || 'Child Account'}</h2>
                <p className="text-sm text-text-light mb-4">Grade {child?.grade} • {child?.school}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Badge variant="purple"><Target size={12} className="mr-1" /> Goal: {child?.goal}</Badge>
                  <Badge variant="success"><CheckCircle2 size={12} className="mr-1" /> Roadmap Active</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card accentColor="success" className="flex flex-col items-center justify-center text-center p-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-8 border-success-light mb-3">
              <span className="text-2xl font-bold text-success">{alignment?.score || 0}%</span>
            </div>
            <h3 className="font-semibold text-text-dark">Goal Alignment</h3>
            <p className="text-xs text-text-light mt-1 max-w-[200px]">Current academic performance aligns well with target goal requirements.</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grade Tracker */}
            <Card title="Academic Performance" icon={<TrendingUp size={18} />}>
              <div className="mt-4">
                <div className="mb-4">
                  <p className="text-xs text-text-light font-medium uppercase tracking-wider mb-2">Subject Performance</p>
                  <div className="flex gap-2">
                    {subjects.map(subj => (
                      <Badge key={subj} variant={subj === 'Mathematics' ? 'primary' : 'default'} className="cursor-pointer">
                        {subj}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="h-64">
                  <GradeChart data={getGradeChartData('Mathematics')} />
                </div>
              </div>
            </Card>

            {/* AI Insights & Alerts */}
            <Card title="AI Insights & Action Items" icon={<AlertCircle size={18} />} accentColor="warning">
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-warning-light/30 border border-warning/20 rounded-lg flex gap-3">
                  <AlertCircle className="text-warning flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark">Physics performance dip detected</h4>
                    <p className="text-xs text-text-mid mt-1">Scores dropped 15% in recent mock tests. Consider scheduling a mentor session.</p>
                    <Button variant="ghost" size="sm" className="mt-2 text-primary px-0 h-auto">Find Physics Mentor</Button>
                  </div>
                </div>
                <div className="p-3 bg-success-light/30 border border-success/20 rounded-lg flex gap-3">
                  <CheckCircle2 className="text-success flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark">Milestone Completed Ahead of Schedule</h4>
                    <p className="text-xs text-text-mid mt-1">Completed 'Advanced Algebra Practice' 3 days early.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Digests */}
            <Card title="Weekly Digests" icon={<FileText size={18} />}>
              <div className="mt-4 space-y-3">
                {digests.map((digest) => (
                  <div key={digest.id} className="p-3 border border-border rounded-lg hover:bg-surface cursor-pointer transition-colors group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-text-dark group-hover:text-primary transition-colors">
                        Week of {digest.weekOf}
                      </p>
                      {digest.isRead ? (
                        <span className="text-[10px] text-text-light uppercase">Read</span>
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-text-light line-clamp-2">{digest.summary}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" fullWidth className="mt-4 text-xs">View Archive</Button>
            </Card>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default ParentDashboardPage;
