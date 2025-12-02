
import React, { useState } from 'react';
import { Search, MapPin, ChevronRight, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CLUBS } from '../constants';
import TeamLogo from '../components/TeamLogo';

const ClubsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClubs = CLUBS.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    club.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 md:pt-24 pb-24 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl font-black text-white mb-6">Club Directory</h1>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-500" />
          </div>
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
          />
        </div>

        {/* List */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => (
            <div 
              key={club.id}
              onClick={() => navigate(`/clubs/${club.id}`)}
              className="group bg-slate-900 p-4 rounded-xl border border-slate-800 hover:border-brand-500/50 transition-all cursor-pointer flex items-center gap-4 relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="text-slate-600" size={16} />
              </div>

              {/* UHD Team Logo */}
              <div className="shrink-0 group-hover:scale-110 transition-transform">
                <TeamLogo team={club} size="md" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm truncate">{club.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin size={10} />
                    <span className="text-xs truncate">Wicklow</span>
                  </div>
                  <div className="flex items-center gap-1 text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded">
                    <Users size={10} />
                    <span className="text-[10px] font-bold">Teams</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No clubs found matching "{searchQuery}"</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ClubsPage;
