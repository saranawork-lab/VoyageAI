import React, { useState } from 'react';
import { Search, TrendingUp, ShieldAlert, DollarSign, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { DemandChart } from '@/components/charts/DemandChart';
import { FunnelChart } from '@/components/charts/FunnelChart';
import { useJobMarket } from '@/hooks/useJobMarket';

export const JobMarketPage: React.FC = () => {
  const [searchRole, setSearchRole] = useState('');
  const [activeRole, setActiveRole] = useState('software engineer');
  
  const { demand, isLoading, chartData, relatedRolesChartData, trends } = useJobMarket(activeRole);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRole.trim()) {
      setActiveRole(searchRole.toLowerCase());
    }
  };

  const getSafetyBadge = (score: number) => {
    if (score >= 80) return <Badge variant="success">High Safety ({score}/100)</Badge>;
    if (score >= 50) return <Badge variant="warning">Medium Safety ({score}/100)</Badge>;
    return <Badge variant="danger">High AI Risk ({score}/100)</Badge>;
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Job Market Intelligence" 
        subtitle="Real-time data on demand, salaries, and AI automation risk."
      />

      {/* Search Bar */}
      <Card>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              id="role-search"
              placeholder="Search for a role (e.g. Data Scientist, UX Designer)"
              icon={<Search size={18} />}
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
          </div>
          <Button type="submit" className="sm:w-32">Analyze</Button>
        </form>
        
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-light font-medium uppercase tracking-wider">Trending:</span>
          {trends.slice(0, 4).map((trend, i) => (
            <button
              key={i}
              onClick={() => {
                setSearchRole(trend.role);
                setActiveRole(trend.role.toLowerCase());
              }}
              className="px-2.5 py-1 rounded-full bg-surface text-xs text-text-mid hover:bg-primary-light hover:text-primary transition-colors"
            >
              {trend.role} <TrendingUp size={12} className="inline ml-1 text-success" />
            </button>
          ))}
        </div>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="h-32 bg-slate-100 border-none"><div/></Card>
          ))}
        </div>
      ) : demand ? (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 text-center">
              <Briefcase size={24} className="text-primary mx-auto mb-3" />
              <p className="text-sm font-semibold capitalize">{demand.role}</p>
              <p className="text-xs text-text-light mt-1">Role Analyzed</p>
            </Card>
            
            <Card className="p-5 text-center">
              <ShieldAlert size={24} className={demand.automationRiskScore < 50 ? 'text-success mx-auto mb-3' : 'text-accent mx-auto mb-3'} />
              <div className="mt-1">{getSafetyBadge(100 - demand.automationRiskScore)}</div>
              <p className="text-xs text-text-light mt-1">AI Future Safety</p>
            </Card>

            <Card className="p-5 text-center">
              <DollarSign size={24} className="text-success mx-auto mb-3" />
              <p className="text-lg font-bold">{demand.averageSalary}</p>
              <p className="text-xs text-text-light mt-1">Avg Salary (Entry)</p>
            </Card>

            <Card className="p-5 text-center">
              <Users size={24} className="text-purple mx-auto mb-3" />
              <p className="text-lg font-bold">{demand.totalOpenings.toLocaleString()}</p>
              <p className="text-xs text-text-light mt-1">Active Openings</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <Card title="Hiring Demand (Last 6 Months)" icon={<TrendingUp size={18} />}>
              <div className="mt-4">
                <DemandChart data={chartData} />
              </div>
            </Card>

            {/* AI Safety Alternatives Funnel */}
            <Card title="Safer Alternative Roles" icon={<ShieldAlert size={18} />}>
              <div className="mt-4">
                <p className="text-xs text-text-light mb-4">Roles with overlapping skillsets and higher AI safety scores.</p>
                <FunnelChart data={relatedRolesChartData} />
              </div>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default JobMarketPage;
