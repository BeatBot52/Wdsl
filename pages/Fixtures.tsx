
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Filter, X, ChevronDown, Clock } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import MatchCard from '../components/PlanCard'; // Using PlanCard as MatchCard
import { UPCOMING_FIXTURES, RECENT_RESULTS, CLUBS } from '../constants';
import Button from '../components/Button';

type Tab = 'upcoming' | 'results';
type DateFilter = 'all' | 'today' | 'tomorrow' | 'weekend';

const Fixtures: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [ageFilter, setAgeFilter] = useState<string | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam === 'today') {
      setDateFilter('today');
    }
  }, [searchParams]);

  // Helper functions for dates
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isTomorrow = (date: Date) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return date.getDate() === tomorrow.getDate() &&
           date.getMonth() === tomorrow.getMonth() &&
           date.getFullYear() === tomorrow.getFullYear();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    // Friday evening (optional), Saturday, Sunday
    return day === 0 || day === 6; 
  };

  // Combine logic for filtering
  const data = activeTab === 'upcoming' ? UPCOMING_FIXTURES : RECENT_RESULTS;
  
  const filteredData = data.filter(item => {
    const query = searchQuery.toLowerCase();
    
    // 1. Text Search (Venue, Competition name, Teams)
    const textMatch = (
      item.homeTeam.name.toLowerCase().includes(query) ||
      item.awayTeam.name.toLowerCase().includes(query) ||
      item.competition.toLowerCase().includes(query) ||
      item.venue.toLowerCase().includes(query)
    );

    // 2. Age Filter (e.g. "U12")
    const ageMatch = ageFilter ? item.competition.includes(ageFilter) : true;

    // 3. Club Filter
    const clubMatch = selectedClubId 
      ? (item.homeTeam.id === selectedClubId || item.awayTeam.id === selectedClubId)
      : true;

    // 4. Grade Filter (e.g. "Premier", "Division 1")
    const gradeMatch = selectedGrade
      ? item.competition.includes(selectedGrade)
      : true;

    // 5. Date Filter
    let dateMatch = true;
    if (dateFilter !== 'all') {
      if (dateFilter === 'today') dateMatch = isToday(item.date);
      else if (dateFilter === 'tomorrow') dateMatch = isTomorrow(item.date);
      else if (dateFilter === 'weekend') dateMatch = isWeekend(item.date);
    }

    return textMatch && ageMatch && clubMatch && gradeMatch && dateMatch;
  });

  // Group by date
  const groupedData = filteredData.reduce((acc, fixture) => {
    const dateKey = fixture.date.toLocaleDateString('en-IE', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(fixture);
    return acc;
  }, {} as Record<string, typeof filteredData>);

  const toggleAgeFilter = (age: string) => {
    setAgeFilter(prev => prev === age ? null : age);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setAgeFilter(null);
    setSelectedClubId('');
    setSelectedGrade('');
    setDateFilter('all');
    setShowFilters(false);
  };

  const hasActiveFilters = ageFilter || selectedClubId || selectedGrade || searchQuery || dateFilter !== 'all';

  const ageGroups = ['U8', 'U9', 'U10', 'U11', 'U12', 'U13', 'U14', 'U15', 'U16', 'Youths', 'Girls'];
  const grades = ['Premier', 'Division 1', 'Division 2', 'Division 3', 'Group A', 'Group B', 'Group C'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      
      {/* Search Header - Sticky */}
      <div className="sticky top-16 md:top-20 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 pb-2">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
           <div className="flex justify-between items-center mb-4">
             <h1 className="text-2xl font-black text-white hidden md:block">Fixtures & Results</h1>
             <div className="flex-1 md:flex-none flex gap-2">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-slate-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm shadow-sm"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                </div>
                
                {/* Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-2 transition-all ${
                    showFilters || (hasActiveFilters && !searchQuery) // Highlight if filters are active
                      ? 'bg-brand-600 text-white border-brand-500' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  <Filter size={18} />
                  {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>}
                </button>
             </div>
           </div>

           {/* --- EXPANDABLE FILTERS PANEL --- */}
           {showFilters && (
             <div className="mb-4 p-4 bg-slate-900/50 border border-slate-800 rounded-2xl animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="space-y-4">
                   
                   {/* Date Filter */}
                   <div>
                     <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Time Period</label>
                     <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'all', label: 'All Dates' },
                          { id: 'today', label: 'Today' },
                          { id: 'tomorrow', label: 'Tomorrow' },
                          { id: 'weekend', label: 'This Weekend' }
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setDateFilter(opt.id as DateFilter)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              dateFilter === opt.id
                                ? 'bg-brand-500/20 border-brand-500 text-brand-400'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                     </div>
                   </div>

                   {/* Club Selector */}
                   <div>
                     <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Filter by Club</label>
                     <div className="relative">
                       <select 
                          value={selectedClubId} 
                          onChange={(e) => setSelectedClubId(e.target.value)}
                          className="w-full appearance-none bg-slate-950 border border-slate-700 text-white rounded-xl py-2 pl-3 pr-10 text-sm focus:ring-2 focus:ring-brand-500 focus:outline-none"
                       >
                         <option value="">All Clubs</option>
                         {CLUBS.map(club => (
                           <option key={club.id} value={club.id}>{club.name}</option>
                         ))}
                       </select>
                       <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                     </div>
                   </div>

                   {/* Grade Selector */}
                   <div>
                     <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Competition Grade</label>
                     <div className="flex flex-wrap gap-2">
                        {grades.map(grade => (
                          <button
                            key={grade}
                            onClick={() => setSelectedGrade(prev => prev === grade ? '' : grade)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                              selectedGrade === grade 
                                ? 'bg-brand-500/20 border-brand-500 text-brand-400' 
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                            }`}
                          >
                            {grade}
                          </button>
                        ))}
                     </div>
                   </div>

                   {/* Clear Action */}
                   <div className="flex justify-end pt-2 border-t border-slate-800">
                      <button 
                        onClick={clearAllFilters}
                        className="text-xs text-red-400 font-bold hover:text-red-300 flex items-center gap-1"
                      >
                        <X size={12} /> Clear Filters
                      </button>
                   </div>
                </div>
             </div>
           )}

           {/* Quick Age Filters (Horizontal Scroll) */}
           {!showFilters && (
             <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {ageGroups.map(age => (
                  <button
                    key={age}
                    onClick={() => toggleAgeFilter(age)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                      ageFilter === age
                        ? 'bg-brand-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
                    }`}
                  >
                    {age}
                  </button>
                ))}
             </div>
           )}

           {/* Tabs */}
           <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                  activeTab === 'upcoming' 
                    ? 'bg-brand-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${
                  activeTab === 'results' 
                    ? 'bg-brand-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Results
              </button>
           </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full pb-24 md:pb-8">
        
        {/* Active Filters Summary (if filters are hidden but active) */}
        {!showFilters && hasActiveFilters && (
          <div className="mb-4 flex flex-wrap gap-2 animate-in fade-in zoom-in duration-300">
             {dateFilter !== 'all' && (
               <div className="bg-emerald-900/50 border border-emerald-800 text-emerald-200 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                 Time: {dateFilter === 'weekend' ? 'This Weekend' : dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)} 
                 <X size={12} className="cursor-pointer" onClick={() => setDateFilter('all')} />
               </div>
             )}
             {ageFilter && (
               <div className="bg-brand-900/50 border border-brand-800 text-brand-200 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                 Age: {ageFilter} <X size={12} className="cursor-pointer" onClick={() => setAgeFilter(null)} />
               </div>
             )}
             {selectedClubId && (
               <div className="bg-blue-900/50 border border-blue-800 text-blue-200 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                 Club: {CLUBS.find(c => c.id === selectedClubId)?.shortName} <X size={12} className="cursor-pointer" onClick={() => setSelectedClubId('')} />
               </div>
             )}
             {selectedGrade && (
               <div className="bg-purple-900/50 border border-purple-800 text-purple-200 px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                 Grade: {selectedGrade} <X size={12} className="cursor-pointer" onClick={() => setSelectedGrade('')} />
               </div>
             )}
             <button onClick={clearAllFilters} className="text-xs text-slate-500 underline ml-2">Clear All</button>
          </div>
        )}

        {Object.keys(groupedData).length > 0 ? (
          Object.entries(groupedData).map(([date, fixtures]) => (
            <div key={date} className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-3 px-1">
                <Calendar size={14} className="text-brand-500" />
                <h3 className="text-xs font-bold text-brand-400 uppercase tracking-wider">{date}</h3>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {fixtures.map(fixture => (
                  <MatchCard key={fixture.id} fixture={fixture} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-600">
              <Filter size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No matches found</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-4">
              We couldn't find any {activeTab} matches matching your filters.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllFilters}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Fixtures;
