import React, { useState } from 'react';
import { Search, Calendar as CalendarIcon, Clock, Star, MapPin, Briefcase, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { useMentor } from '@/hooks/useMentor';
import { ROUTES } from '@/utils/constants';

export const MentorsPage: React.FC = () => {
  const { mentors, isLoading, bookSession, isBooking, bookings } = useMentor();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Human Mentors" 
        subtitle="Connect with industry experts when AI guidance isn't enough."
      />

      {/* Upcoming Sessions (if any) */}
      {bookings.filter(b => b.status === 'scheduled').length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-text-dark mb-3 uppercase tracking-wider">Upcoming Sessions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.filter(b => b.status === 'scheduled').map(booking => (
              <Card key={booking.id} accentColor="primary" className="bg-primary-light/10 border-primary/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-primary" />
                    <span className="text-sm font-medium text-text-dark">{booking.date}</span>
                  </div>
                  <Badge variant="primary" size="sm">Scheduled</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200" />
                  <div>
                    <p className="text-sm font-semibold text-text-dark">Mentor Session</p>
                    <p className="text-xs text-text-light">{booking.timeSlot} • 45 mins</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-border/50 flex gap-2">
                  <Button size="sm" fullWidth>Join Call</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              id="search-mentors"
              placeholder="Search by name, role, or expertise (e.g. React, System Design)"
              icon={<Search size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Mentor List */}
      <div className="space-y-4">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="p-0 overflow-hidden group">
            <div className="flex flex-col sm:flex-row">
              {/* Profile Section */}
              <div className="p-6 sm:w-1/3 border-b sm:border-b-0 sm:border-r border-border bg-surface/30">
                <div className="flex flex-col items-center text-center">
                  <Avatar name={mentor.name} imageUrl={mentor.avatarUrl} size="xl" className="mb-3" />
                  <h3 className="font-bold text-text-dark text-lg">{mentor.name}</h3>
                  <p className="text-sm text-text-mid font-medium flex items-center justify-center gap-1.5 mt-1">
                    <Briefcase size={14} className="text-text-light" /> {mentor.role}
                  </p>
                  <p className="text-xs text-text-light flex items-center justify-center gap-1.5 mt-1 mb-3">
                    <MapPin size={14} /> {mentor.company}
                  </p>
                  
                  <div className="flex items-center gap-1 bg-warning-light text-warning px-2 py-1 rounded text-xs font-bold">
                    <Star size={12} className="fill-warning" />
                    {mentor.rating} <span className="font-normal opacity-80">({mentor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              {/* Details & Actions Section */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-text-dark mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map(skill => (
                      <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold text-text-dark mb-1">About</h4>
                  <p className="text-sm text-text-mid line-clamp-2">{mentor.bio}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <div className="text-sm">
                    <span className="font-bold text-text-dark">₹{mentor.hourlyRate}</span>
                    <span className="text-text-light"> / session</span>
                  </div>
                  <Button 
                    onClick={() => bookSession({ mentorId: mentor.id, date: '2023-11-20', timeSlot: '10:00 AM' })}
                    loading={isBooking}
                  >
                    Book Session <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredMentors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-border">
            <Search size={32} className="mx-auto text-text-light mb-3" />
            <p className="text-text-dark font-medium">No mentors found</p>
            <p className="text-sm text-text-light mt-1">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorsPage;
