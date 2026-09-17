import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Calendar, AlertCircle, TrendingUp, CheckCircle, Rocket, Handshake } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ROUTES } from '@/utils/constants';
import { useCareerGuidance } from '@/hooks/useCareerGuidance';
import { useStartupPlan } from '@/hooks/useStartupPlan';
import { useParentDashboard } from '@/hooks/useParentDashboard';

const StudentDashboard = () => {
  const { roadmap, todaysTasks, scholarships, completionPercentage } = useCareerGuidance();
  const upcomingScholarship = scholarships?.[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Progress Card */}
        <Card accentColor="primary" className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-text-dark">Current Goal</h3>
              <p className="text-sm text-text-light">{roadmap?.goalTitle || 'Not set'}</p>
            </div>
            <Link to={ROUTES.CAREER_GUIDANCE} className="text-primary hover:underline text-sm font-medium">
              View Roadmap
            </Link>
          </div>
          <ProgressBar value={completionPercentage} label="Overall Completion" />
        </Card>

        {/* Next Action */}
        <Card accentColor="accent">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-text-dark">Next Action</h3>
            <Compass size={18} className="text-accent" />
          </div>
          {todaysTasks?.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-text-dark mb-1">{todaysTasks[0].title}</p>
              <p className="text-xs text-text-light mb-3 line-clamp-2">{todaysTasks[0].description}</p>
              <Badge variant="warning">In Progress</Badge>
            </div>
          ) : (
            <p className="text-sm text-text-light">No active tasks right now.</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Today's Tasks List */}
        <Card title="Today's Focus" icon={<Calendar size={18} />}>
          <div className="space-y-3 mt-2">
            {todaysTasks?.map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border">
                <div className="mt-0.5">
                  <div className="w-4 h-4 rounded border-2 border-border" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-dark">{task.title}</p>
                  <p className="text-xs text-text-light mt-0.5">{task.subTasks?.[0]?.title || 'Continue working on this milestone.'}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts & Insights */}
        <div className="space-y-4">
          {upcomingScholarship && (
            <Card accentColor="warning">
              <div className="flex gap-3">
                <AlertCircle className="text-warning flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-text-dark">Scholarship Deadline</h4>
                  <p className="text-xs text-text-light mt-1 mb-2">
                    {upcomingScholarship.name} applications close soon.
                  </p>
                  <Link to={ROUTES.CAREER_GUIDANCE} className="text-xs font-medium text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </Card>
          )}
          
          <Card title="Market Pulse" icon={<TrendingUp size={18} />} hoverable>
            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-dark">Software Engineer</span>
                <Badge variant="success">High Demand</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-dark">Data Scientist</span>
                <Badge variant="success">High Demand</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-dark">Product Manager</span>
                <Badge variant="default">Stable</Badge>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <Link to={ROUTES.JOB_MARKET} className="text-xs font-medium text-primary hover:underline block text-center">
                Explore Market Data
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const FounderDashboard = () => {
  const { plan, completionPercentage, matchCount, todoTasks } = useStartupPlan();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Startup Progress */}
        <Card accentColor="purple" className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-text-dark">Startup Journey</h3>
                <Badge variant="purple">Pre-Seed</Badge>
              </div>
              <p className="text-sm text-text-light mt-1">Action Plan Completion</p>
            </div>
            <Link to={ROUTES.STARTUP_ADVISOR} className="text-primary hover:underline text-sm font-medium">
              View Board
            </Link>
          </div>
          <ProgressBar value={completionPercentage} variant="purple" />
        </Card>

        {/* Investor Matches */}
        <Card accentColor="success">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-text-dark">Investor Matches</h3>
            <Handshake size={18} className="text-success" />
          </div>
          <div className="mt-2">
            <p className="text-3xl font-bold text-text-dark">{matchCount?.count || 0}</p>
            <p className="text-xs text-success font-medium mt-1">+{matchCount?.newThisWeek || 0} new this week</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Up Next" icon={<Rocket size={18} />}>
          <div className="space-y-3 mt-2">
            {todoTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="p-3 rounded-lg bg-surface border border-border">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-text-dark">{task.title}</p>
                  <Badge variant="default" size="sm">{task.category}</Badge>
                </div>
                <p className="text-xs text-text-light line-clamp-2">{task.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const ParentDashboardRole = () => {
  const { child, alignment, getGradeChartData } = useParentDashboard();
  
  return (
    <div className="space-y-6">
      <Card accentColor="warning">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-warning-light flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-warning">{child?.name?.charAt(0) || 'C'}</span>
          </div>
          <div>
            <h3 className="font-bold text-text-dark">{child?.name || 'Child'}</h3>
            <p className="text-sm text-text-light">{child?.goal || 'No goal set'}</p>
          </div>
          <div className="ml-auto text-right">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-4 border-success-light text-success font-bold">
              {alignment?.score || 0}%
            </div>
            <p className="text-xs text-text-light mt-1">Alignment</p>
          </div>
        </div>
      </Card>
      
      <div className="text-center mt-8">
        <Link to={ROUTES.PARENT_DASHBOARD}>
          <Button variant="secondary">Go to Full Parent Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export const DashboardPage: React.FC = () => {
  const { user, role } = useAuthStore();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title={`${getGreeting()}, ${user?.name?.split(' ')[0] || 'there'}!`}
        subtitle="Here's what's happening with your journey today."
      />

      {role === 'student' && <StudentDashboard />}
      {role === 'founder' && <FounderDashboard />}
      {role === 'investor' && (
        <div className="text-center py-12">
          <p className="text-text-mid mb-4">View your curated deal flow in the Investor Access module.</p>
          <Link to={ROUTES.INVESTOR_ACCESS}>
            <Button>Go to Deal Flow</Button>
          </Link>
        </div>
      )}
      {role === 'parent' && <ParentDashboardRole />}
    </div>
  );
};

export default DashboardPage;
