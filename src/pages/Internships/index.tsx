import React, { useState } from 'react';
import { Search, MapPin, Building, Calendar, DollarSign, ExternalLink, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { useInternships } from '@/hooks/useInternships';

export const InternshipsPage: React.FC = () => {
  const { listings, applications, apply, isApplying } = useInternships();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [coverNote, setCoverNote] = useState('');

  const filteredListings = listings.filter(l => 
    l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeListing = listings.find(l => l.id === selectedListing);
  const hasApplied = (id: string) => applications.some(a => a.listingId === id);

  const handleApply = () => {
    if (selectedListing) {
      apply({ listingId: selectedListing, coverNote });
      setSelectedListing(null);
      setCoverNote('');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Internships & Global Roles" 
        subtitle="Exclusive opportunities matched to your roadmap."
      />

      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              id="search-internships"
              placeholder="Search roles or companies (e.g. Frontend Intern, Google)"
              icon={<Search size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Applied Roles (if any) */}
      {applications.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-text-dark mb-3 uppercase tracking-wider">Your Applications</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {applications.map(app => (
              <Card key={app.id} className="min-w-[280px] p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-text-dark text-sm">{app.company}</h4>
                  <Badge 
                    variant={app.status === 'accepted' ? 'success' : app.status === 'rejected' ? 'danger' : 'warning'} 
                    size="sm"
                  >
                    {app.status}
                  </Badge>
                </div>
                <p className="text-xs text-text-light mb-2">Applied: {app.appliedAt}</p>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
                  <div 
                    className={`h-full rounded-full ${app.status === 'accepted' ? 'bg-success' : app.status === 'rejected' ? 'bg-accent' : 'bg-warning'}`}
                    style={{ width: app.status === 'reviewing' ? '50%' : '100%' }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Listings */}
      <div className="space-y-4">
        {filteredListings.map((listing) => {
          const applied = hasApplied(listing.id);
          
          return (
            <Card key={listing.id} hoverable={!applied} className={`transition-opacity ${applied ? 'opacity-70' : ''}`}>
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Company Logo Area */}
                <div className="hidden sm:flex w-16 h-16 rounded-xl border border-border items-center justify-center bg-surface">
                  <Building size={24} className="text-text-light" />
                </div>
                
                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-text-dark text-lg">{listing.title}</h3>
                    {applied && <Badge variant="success">Applied</Badge>}
                  </div>
                  <p className="text-sm text-primary font-medium mb-3">{listing.company}</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    <div className="flex items-center gap-1.5 text-xs text-text-mid">
                      <MapPin size={14} /> {listing.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-mid">
                      <Briefcase size={14} /> {listing.type}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-mid">
                      <DollarSign size={14} /> {listing.stipend}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-text-mid">
                      <Calendar size={14} /> {listing.duration}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.requirements.slice(0, 3).map(req => (
                      <Badge key={req} variant="default" size="sm">{req}</Badge>
                    ))}
                    {listing.requirements.length > 3 && (
                      <Badge variant="default" size="sm">+{listing.requirements.length - 3} more</Badge>
                    )}
                  </div>
                </div>
                
                {/* Action */}
                <div className="flex items-center sm:items-end justify-between sm:flex-col pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
                  <span className="text-[10px] text-text-light">{listing.matchScore}% AI Match</span>
                  <Button 
                    disabled={applied}
                    onClick={() => setSelectedListing(listing.id)}
                    className="sm:w-full"
                  >
                    {applied ? 'Applied' : 'Apply Now'}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Apply Modal */}
      <Modal
        isOpen={!!selectedListing}
        onClose={() => { setSelectedListing(null); setCoverNote(''); }}
        title="Apply for Internship"
      >
        {activeListing && (
          <div className="space-y-6">
            <div className="bg-surface p-4 rounded-lg border border-border">
              <h4 className="font-bold text-text-dark">{activeListing.title}</h4>
              <p className="text-sm text-text-light">{activeListing.company}</p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-text-mid">Your profile and generated roadmap will be shared with the recruiter to show your alignment with the role.</p>
              
              <Textarea
                id="cover-note"
                label="Cover Note (Optional)"
                placeholder="Briefly explain why you're a great fit..."
                rows={4}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
              />
            </div>
            
            <div className="pt-4 border-t border-border flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setSelectedListing(null)}>Cancel</Button>
              <Button onClick={handleApply} loading={isApplying}>Submit Application</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InternshipsPage;
