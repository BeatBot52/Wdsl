
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, MapPin, Users, ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { CLUBS, getClubDivisions, LEAGUE_TABLES } from '../constants';
import { Favorite } from '../types';
import Button from '../components/Button';
import TeamLogo from '../components/TeamLogo';
import LeagueTableWidget from '../components/LeagueTableWidget';

const ClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const club = CLUBS.find(c => c.id === id);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [expandedDivisions, setExpandedDivisions] = useState<Set<string>>(new Set());

  // Load favorites from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('wdsl_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites whenever they change
  const toggleFavorite = (e: React.MouseEvent, division: string) => {
    e.stopPropagation(); // Prevent toggling expansion
    if (!club) return;
    
    setFavorites(prev => {
      const exists = prev.some(f => f.clubId === club.id && f.division === division);
      let newFavorites;
      if (exists) {
        newFavorites = prev.filter(f => !(f.clubId === club.id && f.division === division));
      } else {
        newFavorites = [...prev, { clubId: club.id, clubName: club.name, division }];
      }
      localStorage.setItem('wdsl_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const toggleExpand = (division: string) => {
    setExpandedDivisions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(division)) {
        newSet.delete(division);
      } else {
        newSet.add(division);
      }
      return newSet;
    });
  };

  if (!club) return <div className="p-8 text-center text-white">Club not found</div>;

  const rawDivisions = getClubDivisions(club.name);
  
  // Advanced sorting to make sense of the list (U8 -> U9 -> U10 -> U11 -> U12, Premier -> Div 1)
  const sortedDivisions = [...rawDivisions].sort((a, b) => {
    // Extract numbers for age comparison
    const ageAMatch = a.match(/U(\d+)/);
    const ageBMatch = b.match(/U(\d+)/);
    const ageA = ageAMatch ? parseInt(ageAMatch[1]) : 99; // Girls/Youths handled roughly
    const ageB = ageBMatch ? parseInt(ageBMatch[1]) : 99;

    if (ageA !== ageB) return ageA - ageB;

    // If ages same, prioritize Premier > Div 1 > Div 2 > Group A > Group B
    const gradeScore = (str: string) => {
      if (str.includes('Premier')) return 1;
      if (str.includes('Division 1')) return 2;
      if (str.includes('Division 2')) return 3;
      if (str.includes('Division 3')) return 4;
      if (str.includes('Group A')) return 5;
      if (str.includes('Group B')) return 6;
      if (str.includes('Group C')) return 7;
      return 8;
    };
    return gradeScore(a) - gradeScore(b);
  });

  // Group by Age Group for cleaner UI
  const groupedSquads = sortedDivisions.reduce((acc, div) => {
    // Determine logical group key
    let key = "Other";
    if (div.startsWith("Girls")) {
        // Handle "Girls U12" -> "Girls U12"
        const match = div.match(/Girls U\d+/);
        key = match ? match[0] : "Girls";
    } else if (div.startsWith("Youths")) {
        key = "Youths";
    } else {
        const match = div.match(/^U\d+/);
        key = match ? match[0] : "Other";
    }

    if (!acc[key]) acc[key] = [];
    acc[key].push(div);
    return acc;
  }, {} as Record<string, string[]>);

  // Sort keys U8, U9, U10...
  const sortedKeys = Object.keys(groupedSquads).sort((a, b) => {
      // Prioritize age
      const getNum = (s: string) => parseInt(s.replace(/\D/g, '')) || 100;
      return getNum(a) - getNum(b);
  });

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      
      {/* Header Image/Gradient */}
      <div className="h-40 bg-gradient-to-b from-brand-900 to-slate-900 relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-slate-900/50 backdrop-blur rounded-full text-white hover:bg-slate-800 transition-colors z-10"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="px-4 sm:px-6 -mt-16 relative z-10">
        <div className="flex flex-col items-center">
          
          {/* Big UHD Logo */}
          <div className="relative">
             <div className="absolute inset-0 bg-brand-500 blur-[40px] opacity-20 rounded-full"></div>
             <TeamLogo team={club} size="2xl" className="drop-shadow-2xl" />
          </div>

          <h1 className="text-2xl font-black text-white mt-4 text-center">{club.name}</h1>
          <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
             <MapPin size={14} />
             <span>Wicklow</span>
          </div>
        </div>

        <div className="mt-8">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center mb-8">
             <h2 className="text-lg font-bold text-white mb-2">Follow Your Team</h2>
             <p className="text-sm text-slate-400">
               Tap the star to track a specific squad. We'll show their results and tables on your home dashboard.
             </p>
           </div>

           {sortedKeys.map(groupKey => (
             <div key={groupKey} className="mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h3 className="flex items-center gap-2 text-sm font-bold text-brand-400 uppercase tracking-wider mb-3 px-2">
                   <Users size={14} /> {groupKey} Squads
                </h3>
                <div className="space-y-3">
                  {groupedSquads[groupKey].map((division) => {
                    const isFav = favorites.some(f => f.clubId === club.id && f.division === division);
                    const isExpanded = expandedDivisions.has(division);
                    const hasTable = LEAGUE_TABLES[division] && LEAGUE_TABLES[division].length > 0;

                    return (
                      <div 
                        key={division}
                        className={`rounded-xl border transition-all overflow-hidden ${
                          isFav 
                            ? 'bg-brand-500/5 border-brand-500/50' 
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {/* Main Row */}
                        <div 
                           onClick={() => hasTable && toggleExpand(division)}
                           className={`p-4 flex items-center justify-between ${hasTable ? 'cursor-pointer' : ''}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isFav ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                              <Shield size={18} />
                            </div>
                            <div>
                              <p className={`font-bold ${isFav ? 'text-brand-400' : 'text-white'}`}>{division}</p>
                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <span>Season 2024/25</span>
                                {hasTable && (
                                  <span className="flex items-center gap-0.5 text-slate-400">
                                    <Trophy size={10} /> Table Available
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {/* Favorite Button */}
                            <button 
                              onClick={(e) => toggleFavorite(e, division)}
                              className={`p-2 rounded-full transition-colors z-10 ${
                                isFav ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'
                              }`}
                            >
                              <Star size={24} fill={isFav ? "currentColor" : "none"} />
                            </button>
                            
                            {/* Expand Chevron */}
                            {hasTable && (
                              <div className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                <ChevronDown size={20} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Expandable Table Area */}
                        {isExpanded && hasTable && (
                          <div className="px-3 pb-3 animate-in slide-in-from-top-2 duration-300">
                            <div className="pt-2 border-t border-slate-800/50">
                               <LeagueTableWidget 
                                  rows={LEAGUE_TABLES[division]} 
                                  title={division} 
                                  highlightTeam={club.name}
                               />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
             </div>
           ))}

           {favorites.length > 0 && (
             <div className="mt-8 flex justify-center sticky bottom-6 z-20">
               <Button onClick={() => navigate('/')} className="w-full md:w-auto shadow-2xl shadow-black">
                 Go to My Dashboard
               </Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;