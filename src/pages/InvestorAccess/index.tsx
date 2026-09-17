import React, { useState } from 'react';
import { Search, Filter, Handshake, ExternalLink, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { useInvestorMatch } from '@/hooks/useInvestorMatch';
import { RoleGuard } from '@/components/guards/RoleGuard';
import { SECTORS } from '@/utils/constants';

export const InvestorAccessPage: React.FC = () => {
  const { deals, requestIntro, isRequestingIntro } = useInvestorMatch();
  const [filterSector, setFilterSector] = useState('');

  const filteredDeals = filterSector 
    ? deals.filter(d => d.sector.toLowerCase() === filterSector.toLowerCase()) 
    : deals;

  return (
    <RoleGuard roles={['investor']} fallback={<div className="p-8 text-center text-accent">Access Denied</div>}>
      <div className="space-y-6">
        <PageHeader 
          title="Deal Flow" 
          subtitle="Curated startup matches based on your investment thesis."
          action={<Button variant="secondary" size="sm"><TrendingUp size={16} /> Sector Reports</Button>}
        />

        {/* Filters */}
        <Card>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                id="search-deals"
                placeholder="Search startups by name or keyword..."
                icon={<Search size={18} />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                id="filter-sector"
                options={SECTORS.map(s => ({ value: s, label: s }))}
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
                placeholder="All Sectors"
              />
            </div>
            <Button variant="ghost" className="px-3 border border-border sm:w-auto">
              <Filter size={18} className="text-text-mid" />
            </Button>
          </div>
        </Card>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} hoverable className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-text-dark text-lg">{deal.name}</h3>
                  <p className="text-xs text-text-light">{deal.sector}</p>
                </div>
                <Badge variant={deal.matchScore > 90 ? 'success' : 'primary'}>
                  {deal.matchScore}% Match
                </Badge>
              </div>
              
              <p className="text-sm text-text-mid mb-4 line-clamp-3 flex-1">
                {deal.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 mb-4 bg-surface p-3 rounded-lg border border-border">
                <div>
                  <p className="text-[10px] text-text-light uppercase tracking-wider">Stage</p>
                  <p className="text-sm font-semibold text-text-dark">{deal.stage}</p>
                </div>
                <div>
                  <p className="text-[10px] text-text-light uppercase tracking-wider">Ask</p>
                  <p className="text-sm font-semibold text-text-dark">{deal.askAmount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a href="#" className="text-sm font-medium text-text-light hover:text-primary flex items-center gap-1 transition-colors">
                  Pitch Deck <ExternalLink size={14} />
                </a>
                <Button 
                  size="sm" 
                  onClick={() => requestIntro(deal.id)}
                  loading={isRequestingIntro}
                >
                  <Handshake size={16} /> Request Intro
                </Button>
              </div>
            </Card>
          ))}
          {filteredDeals.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-light">
              No matching deals found for the selected criteria.
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
};

export default InvestorAccessPage;
