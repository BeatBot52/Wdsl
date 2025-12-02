
import React, { useState, useEffect } from 'react';
import { ChevronRight, RefreshCw, Star, Shield, Calendar, Trophy, ClipboardList, MapPin, Info, Download, Clock, CloudRain, Sun, Ticket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MatchCard from '../components/PlanCard';
import { UPCOMING_FIXTURES, RECENT_RESULTS, PITCH_STATUS, CLUBS } from '../constants';
import { Favorite } from '../types';
import Button from '../components/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [greeting, setGreeting] = useState('Welcome');

  // --- DATA COMPUTATION ---
  const today = new Date();
  const todaysFixtures = UPCOMING_FIXTURES.filter(f => 
    f.date.getDate() === today.getDate() &&
    f.date.getMonth() === today.getMonth() &&
    f.date.getFullYear() === today.getFullYear()
  );

  const upcomingCount = todaysFixtures.length;

  useEffect(() => {
    // Load Favorites
    const saved = localStorage.getItem('wdsl_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }

    // Set Greeting
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    // PWA Install Prompt
    const handleInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') setInstallPrompt(null);
    });
  };

  // --- MY TEAMS LOGIC ---
  const myFixtures = UPCOMING_FIXTURES.filter(f => 
    favorites.some(fav => 
      (f.homeTeam.name === fav.clubName || f.awayTeam.name === fav.clubName) && 
      f.competition === fav.division
    )
  );
  
  // Sort by date to get the absolute next game for the user
  const nextKickOff = myFixtures.length > 0 
    ? myFixtures.sort((a, b) => a.date.getTime() - b.date.getTime())[0] 
    : null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950 pb-24 select-none">
      
      {/* --- TOP BAR (Status & Profile) --- */}
      <div className="pt-safe px-4 pb-2 bg-gradient-to-b from-slate-900 to-slate-950 sticky top-0 z-30 border-b border-white/5 backdrop-blur-xl bg-slate-950/80">
        <div className="flex justify-between items-center h-14">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{greeting}</p>
            <h1 className="text-lg font-black text-white leading-none">Match Centre</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Install Button */}
            {installPrompt && (
              <button onClick={handleInstallClick} className="flex items-center gap-1 bg-brand-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-brand-500/20 animate-pulse">
                <Download size={12} /> <span className="hidden sm:inline">App</span>
              </button>
            )}

            {/* Pitch Status Pill */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${
              PITCH_STATUS === 'ON' 
               ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
               : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
               {PITCH_STATUS === 'ON' ? <Sun size={12} /> : <CloudRain size={12} />}
               <span className="text-[10px] font-bold">PITCH {PITCH_STATUS}</span>
            </div>
            
            <button 
              onClick={handleRefresh}
              className={`w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 active:bg-slate-700 active:text-white transition-all ${isRefreshing ? 'animate-spin text-brand-500' : ''}`}
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-6">

        {/* --- 1. HERO ACTION CENTER --- */}
        {/* Priority: Today's Games > User's Next Match > General Promo */}
        <section className="animate-in slide-in-from-top-4 fade-in duration-500">
           
           {upcomingCount > 0 ? (
             // SCENARIO A: GAMES TODAY (High Urgency)
             <Link to="/fixtures?date=today" className="block relative group overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-800 transition-transform duration-500 group-hover:scale-105"></div>
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                   <Clock size={140} />
                </div>
                
                <div className="relative p-6 flex flex-col justify-between h-40">
                   <div className="flex justify-between items-start">
                      <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[10px] font-bold border border-white/10 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> LIVE ACTION
                      </div>
                   </div>
                   
                   <div>
                      <h2 className="text-3xl font-black text-white mb-1">{upcomingCount} Matches</h2>
                      <div className="flex items-center gap-2 text-emerald-100 font-medium text-sm">
                         <span>Happening Today across Wicklow</span>
                         <ChevronRight size={16} className="text-white" />
                      </div>
                   </div>
                </div>
             </Link>
           ) : favorites.length > 0 && nextKickOff ? (
             // SCENARIO B: MY NEXT MATCH
             <div>
                <div className="flex items-center justify-between mb-2 px-1">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                     <Star size={12} className="text-yellow-500 fill-yellow-500" /> Next Kick-off
                   </h3>
                </div>
                <MatchCard fixture={nextKickOff} variant="hero" />
             </div>
           ) : (
             // SCENARIO C: DEFAULT PROMO
             <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl shadow-brand-900/50">
                <div className="relative z-10">
                   <h2 className="text-2xl font-black text-white mb-2">Season 2024/25</h2>
                   <p className="text-brand-100 text-sm mb-4 max-w-[200px]">Everything you need for the new season in one place.</p>
                   <div className="flex gap-2">
                      <Link to="/fixtures" className="bg-white text-brand-700 px-4 py-2 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-transform">
                         Find Fixtures
                      </Link>
                      <Link to="/clubs" className="bg-brand-700 text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform">
                         Join a Club
                      </Link>
                   </div>
                </div>
                <div className="absolute -bottom-4 -right-4 text-brand-500 opacity-20 rotate-12">
                   <Trophy size={140} />
                </div>
             </div>
           )}
        </section>

        {/* --- 2. QUICK ACTIONS GRID --- */}
        <section>
          <div className="grid grid-cols-2 gap-3">
             <Link to="/fixtures" className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-28 active:scale-[0.98] transition-all hover:border-brand-500/50 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                   <Calendar size={20} />
                </div>
                <div>
                   <span className="block text-white font-bold text-sm">Fixtures</span>
                   <span className="text-[10px] text-slate-500 group-hover:text-slate-400">Upcoming games</span>
                </div>
             </Link>
             
             <Link to="/tables" className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-28 active:scale-[0.98] transition-all hover:border-brand-500/50 group">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                   <Trophy size={20} />
                </div>
                <div>
                   <span className="block text-white font-bold text-sm">Tables</span>
                   <span className="text-[10px] text-slate-500 group-hover:text-slate-400">League standings</span>
                </div>
             </Link>

             <Link to="/results" className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-28 active:scale-[0.98] transition-all hover:border-brand-500/50 group">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                   <ClipboardList size={20} />
                </div>
                <div>
                   <span className="block text-white font-bold text-sm">Results</span>
                   <span className="text-[10px] text-slate-500 group-hover:text-slate-400">Latest scores</span>
                </div>
             </Link>

             <Link to="/clubs" className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col justify-between h-28 active:scale-[0.98] transition-all hover:border-brand-500/50 group">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                   <MapPin size={20} />
                </div>
                <div>
                   <span className="block text-white font-bold text-sm">Directory</span>
                   <span className="text-[10px] text-slate-500 group-hover:text-slate-400">Club locations</span>
                </div>
             </Link>
          </div>
        </section>

        {/* --- 3. MY TEAMS REEL --- */}
        {favorites.length > 0 && (
          <section>
             <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Following</h3>
                <Link to="/clubs" className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-1 rounded-lg">
                   Manage
                </Link>
             </div>
             
             <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                {favorites.map((fav, idx) => {
                  const clubInfo = CLUBS.find(c => c.id === fav.clubId);
                  // Find next match for this specific team
                  const teamNextMatch = UPCOMING_FIXTURES.find(f => 
                     (f.homeTeam.id === fav.clubId || f.awayTeam.id === fav.clubId) &&
                     f.competition === fav.division
                  );
                  
                  return (
                    <div 
                      key={idx}
                      onClick={() => navigate(`/clubs/${fav.clubId}`)}
                      className="flex-shrink-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden active:scale-[0.98] transition-transform"
                    >
                       <div className="flex items-start justify-between mb-4">
                          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/10">
                             {clubInfo?.shortName}
                          </div>
                          {teamNextMatch && (
                            <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                               {teamNextMatch.date.toLocaleDateString('en-IE', { weekday: 'short' })}
                            </span>
                          )}
                       </div>
                       <div>
                          <p className="text-white font-bold text-sm truncate">{fav.clubName}</p>
                          <p className="text-slate-500 text-xs truncate">{fav.division}</p>
                       </div>
                    </div>
                  );
                })}
                
                {/* Add Team Card */}
                <Link to="/clubs" className="flex-shrink-0 w-16 bg-slate-900 border border-dashed border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-500 active:bg-slate-800">
                   <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                     <span className="text-xl leading-none mb-1">+</span>
                   </div>
                   <span className="text-[10px] font-bold">Add</span>
                </Link>
             </div>
          </section>
        )}

        {/* --- 4. LATEST RESULTS --- */}
        <section>
          <div className="flex justify-between items-center mb-3 px-1">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Scores</h3>
             <Link to="/results" className="text-brand-400 text-xs font-bold flex items-center">
               View All <ChevronRight size={12} />
             </Link>
          </div>
          <div className="space-y-3">
             {RECENT_RESULTS.slice(0, 3).map(result => (
               <MatchCard key={result.id} fixture={result} />
             ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
