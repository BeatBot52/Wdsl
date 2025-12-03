import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, CalendarPlus, CloudRain, Sun, Cloud, Wind, ExternalLink, Share2, Navigation, TrendingUp, Radio, AlertTriangle, Minus, Plus } from 'lucide-react';
import { Fixture, TableRow } from '../types';
import TeamLogo from './TeamLogo';
import { getVenueMapLink, LEAGUE_TABLES } from '../constants';

interface MatchCardProps {
  fixture: Fixture;
  variant?: 'default' | 'hero';
  className?: string;
}

const WeatherDisplay: React.FC<{ weather?: string }> = ({ weather }) => {
  if (!weather) return null;

  const config = {
    rain: { icon: CloudRain, color: 'text-blue-400', label: 'Rainy' },
    sunny: { icon: Sun, color: 'text-yellow-400', label: 'Sunny' },
    cloudy: { icon: Cloud, color: 'text-slate-400', label: 'Cloudy' },
    windy: { icon: Wind, color: 'text-slate-300', label: 'Windy' },
    clear: { icon: Sun, color: 'text-orange-300', label: 'Clear' },
  };

  const current = config[weather as keyof typeof config] || config.cloudy;
  const Icon = current.icon;

  return (
    <div className={`flex items-center gap-1 ${current.color} bg-slate-950/50 px-2 py-0.5 rounded text-[10px] font-medium border border-slate-800`}>
      <Icon size={12} />
      <span className="hidden sm:inline">{current.label}</span>
    </div>
  );
};

// --- HELPER: GET TEAM STATS ---
const getTeamStats = (division: string, teamName: string) => {
  const table = LEAGUE_TABLES[division];
  if (!table) return null;
  
  // Find fuzzy match for team name
  const row = table.find(r => r.team.includes(teamName));
  if (!row) return null;

  // Calculate Win %
  const winRate = row.played > 0 ? Math.round((row.won / row.played) * 100) : 0;
  
  return { ...row, winRate };
};

const MatchCard: React.FC<MatchCardProps> = ({ fixture, variant = 'default', className = '' }) => {
  const isFinished = fixture.status === 'finished';
  const isHero = variant === 'hero';
  
  const dateStr = fixture.date.toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' });
  const timeStr = fixture.date.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' });
  const mapLink = getVenueMapLink(fixture.venue);

  // Get Stats if league table exists
  const homeStats = getTeamStats(fixture.competition, fixture.homeTeam.name);
  const awayStats = getTeamStats(fixture.competition, fixture.awayTeam.name);

  // --- LIVE SCORE STATE ---
  const [showLiveUpdater, setShowLiveUpdater] = useState(false);
  const [liveScore, setLiveScore] = useState(fixture.score || { home: 0, away: 0 });
  const [isFanUpdated, setIsFanUpdated] = useState(false);

  // Load saved score from local storage on mount (simulating persistence)
  useEffect(() => {
    const saved = localStorage.getItem(`live_score_${fixture.id}`);
    if (saved) {
      setLiveScore(JSON.parse(saved));
      setIsFanUpdated(true);
    }
  }, [fixture.id]);

  const updateScore = (team: 'home' | 'away', delta: number) => {
    setLiveScore(prev => {
      const newVal = Math.max(0, prev[team] + delta);
      const newScore = { ...prev, [team]: newVal };
      
      // Save to local storage
      localStorage.setItem(`live_score_${fixture.id}`, JSON.stringify(newScore));
      setIsFanUpdated(true);
      return newScore;
    });
  };

  const openMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(mapLink, '_blank', 'noopener,noreferrer');
  };

  const shareMatch = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const scoreText = isFanUpdated ? `(Live: ${liveScore.home}-${liveScore.away})` : '';
    const text = `⚽ Match Invite: ${fixture.homeTeam.shortName} vs ${fixture.awayTeam.shortName} ${scoreText}\n🏆 ${fixture.competition}\n📅 ${dateStr} @ ${timeStr}\n📍 ${fixture.venue}\n🗺️ Map: ${mapLink}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WDSL Match Details',
          text: text,
        });
      } catch (error: any) {
        // Ignore AbortError (User cancelled the share dialog)
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Match details copied to clipboard! Paste into WhatsApp.');
    }
  };

  const addToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Generate .ics file content
    const startTime = fixture.date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endDate = new Date(fixture.date.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
    
    const title = `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`;
    const description = `${fixture.competition} Match. WDSL Fixture.`;
    const location = fixture.venue;
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WDSL//Match Centre//EN',
      'BEGIN:VEVENT',
      `UID:${fixture.id}@wdsl.ie`,
      `DTSTAMP:${startTime}`,
      `DTSTART:${startTime}`,
      `DTEND:${endDate}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wdsl_fixture.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----------------------------------------------------------------------
  // HERO CARD
  // ----------------------------------------------------------------------
  if (isHero) {
    return (
      <div className={`bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl shadow-xl shadow-brand-900/50 overflow-hidden relative group ${className}`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <Calendar size={120} className="text-white" />
        </div>

        <div className="p-5 relative z-10">
          <div className="flex justify-between items-start mb-6">
             <span className="bg-black/20 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm border border-white/10 uppercase tracking-wider">
               {fixture.competition}
             </span>
             <div className="flex gap-2">
                <WeatherDisplay weather={fixture.weather} />
                <span className="text-white font-mono font-bold text-xs bg-white/20 px-2 py-1 rounded-lg">
                   {timeStr}
                </span>
             </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-center gap-2 flex-1">
               <TeamLogo team={fixture.homeTeam} size="lg" showShadow={false} className="drop-shadow-lg" />
               <span className="text-white font-black text-xs text-center leading-tight line-clamp-2 w-full">{fixture.homeTeam.shortName}</span>
            </div>

            <div className="flex flex-col items-center gap-1">
               {(isFinished || isFanUpdated) ? (
                 <div className="bg-slate-900/90 text-white px-4 py-2 rounded-xl font-black text-2xl border border-white/20 shadow-lg backdrop-blur-md">
                    {liveScore.home} - {liveScore.away}
                 </div>
               ) : (
                 <span className="text-brand-200 text-[10px] font-bold uppercase opacity-60">VS</span>
               )}
               {isFanUpdated && <span className="text-[9px] text-yellow-300 font-bold animate-pulse mt-1">LIVE (Fan)</span>}
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
               <TeamLogo team={fixture.awayTeam} size="lg" showShadow={false} className="drop-shadow-lg" />
               <span className="text-white font-black text-xs text-center leading-tight line-clamp-2 w-full">{fixture.awayTeam.shortName}</span>
            </div>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm p-3 flex justify-between items-center text-xs text-brand-100 border-t border-white/10">
           <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-medium">
                  <Calendar size={14} /> {dateStr}
              </div>
              <button onClick={openMap} className="flex items-center gap-1.5 font-medium truncate max-w-[120px] hover:text-white transition-colors">
                  <MapPin size={14} /> <span className="truncate">{fixture.venue}</span>
              </button>
           </div>
           
           <div className="flex items-center gap-2">
             {!isFinished && (
               <button 
                 onClick={() => setShowLiveUpdater(!showLiveUpdater)}
                 className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${showLiveUpdater ? 'bg-brand-500 text-white' : 'bg-white/20 hover:bg-white/30 text-white'}`}
               >
                 {showLiveUpdater ? 'Close' : 'Update'}
               </button>
             )}
             <button 
               onClick={shareMatch}
               className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors"
             >
                <Share2 size={12} />
             </button>
           </div>
        </div>

        {/* --- LIVE UPDATER CONTROLS (HERO) --- */}
        {showLiveUpdater && !isFinished && (
          <div className="bg-slate-950 p-4 border-t border-slate-800 animate-in slide-in-from-top-2 duration-300 relative z-20">
             <div className="flex items-center justify-between gap-4 mb-3">
                {/* Home Controls */}
                <div className="flex items-center gap-2">
                   <button onClick={() => updateScore('home', -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"><Minus size={14} /></button>
                   <span className="font-mono font-bold text-white w-6 text-center text-lg">{liveScore.home}</span>
                   <button onClick={() => updateScore('home', 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20"><Plus size={14} /></button>
                </div>
                
                <span className="text-[10px] font-bold text-slate-500">GOALS</span>

                {/* Away Controls */}
                <div className="flex items-center gap-2">
                   <button onClick={() => updateScore('away', -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"><Minus size={14} /></button>
                   <span className="font-mono font-bold text-white w-6 text-center text-lg">{liveScore.away}</span>
                   <button onClick={() => updateScore('away', 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20"><Plus size={14} /></button>
                </div>
             </div>
             
             {/* Disclaimer Banner */}
             <div className="bg-yellow-500/10 border border-yellow-500/20 p-2.5 rounded-lg flex items-start gap-2">
                <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-yellow-200/80 leading-tight">
                  <strong className="text-yellow-400 block mb-0.5">Unofficial Fan Score</strong>
                  Scores are updated by people at the match. Please check back later for official results confirmed by referee and clubs.
                </p>
             </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // DEFAULT CARD (List View)
  // ----------------------------------------------------------------------
  return (
    <div className={`bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden relative group active:border-slate-700 transition-colors ${className}`}>
      
      {/* Header */}
      <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-[140px]">{fixture.competition}</span>
           {!isFinished && homeStats && awayStats && (
              <div className="hidden sm:flex items-center gap-1 text-[9px] font-medium text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded border border-slate-700">
                 <TrendingUp size={10} className="text-brand-500" />
                 <span>POS: <span className="text-white">{homeStats.position}</span> vs <span className="text-white">{awayStats.position}</span></span>
              </div>
           )}
        </div>
        <div className="flex items-center gap-2">
            {!isFinished && <WeatherDisplay weather={fixture.weather} />}
            {isFinished ? (
               <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">FT</span>
            ) : isFanUpdated ? (
               <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-900/20 px-2 py-0.5 rounded border border-red-900/30 animate-pulse">
                 <Radio size={10} /> Live
               </span>
            ) : (
               <div className="flex items-center gap-1 text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded">
                 <Clock size={10} /> {timeStr}
               </div>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          
          {/* Home Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <TeamLogo team={fixture.homeTeam} size="md" className="transition-transform group-hover:scale-105 duration-300" />
            <span className="text-xs font-bold text-slate-200 text-center leading-tight line-clamp-2 h-8 flex items-center justify-center w-full">{fixture.homeTeam.name}</span>
            {!isFinished && homeStats && homeStats.played > 0 && (
                <div className="flex flex-col items-center w-full max-w-[60px] gap-1">
                   <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden flex">
                       <div className="h-full bg-brand-500" style={{ width: `${homeStats.winRate}%` }}></div>
                   </div>
                   <span className="text-[9px] text-slate-500 font-mono">{homeStats.winRate}% Win</span>
                </div>
            )}
          </div>

          {/* Score / VS / Live Inputs */}
          <div className="shrink-0 px-2 flex flex-col items-center">
             {(isFinished || isFanUpdated) ? (
               <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isFanUpdated ? 'bg-slate-800 border-yellow-500/50' : 'bg-slate-950 border-slate-800'}`}>
                 <span className={`text-lg font-black ${isFanUpdated ? 'text-yellow-400' : 'text-white'}`}>{liveScore.home}</span>
                 <span className="text-slate-600 text-xs">:</span>
                 <span className={`text-lg font-black ${isFanUpdated ? 'text-yellow-400' : 'text-white'}`}>{liveScore.away}</span>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-slate-800 shadow-inner">
                  <span className="text-[10px] font-black text-slate-600">VS</span>
               </div>
             )}
             
             {/* Live Update Toggle Button */}
             {!isFinished && (
               <button 
                 onClick={() => setShowLiveUpdater(!showLiveUpdater)}
                 className={`mt-2 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 transition-all ${showLiveUpdater ? 'bg-brand-600 text-white' : 'text-brand-500 bg-brand-900/10 hover:bg-brand-900/20'}`}
               >
                 {showLiveUpdater ? 'Close' : 'Update'}
               </button>
             )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <TeamLogo team={fixture.awayTeam} size="md" className="transition-transform group-hover:scale-105 duration-300" />
            <span className="text-xs font-bold text-slate-200 text-center leading-tight line-clamp-2 h-8 flex items-center justify-center w-full">{fixture.awayTeam.name}</span>
            {!isFinished && awayStats && awayStats.played > 0 && (
                <div className="flex flex-col items-center w-full max-w-[60px] gap-1">
                   <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden flex">
                       <div className="h-full bg-brand-500" style={{ width: `${awayStats.winRate}%` }}></div>
                   </div>
                   <span className="text-[9px] text-slate-500 font-mono">{awayStats.winRate}% Win</span>
                </div>
            )}
          </div>
        </div>

        {/* --- LIVE UPDATER CONTROLS (DEFAULT) --- */}
        {showLiveUpdater && !isFinished && (
          <div className="mt-4 bg-slate-950/50 p-3 rounded-xl border border-slate-700 animate-in slide-in-from-top-2 duration-300">
             <div className="flex items-center justify-between gap-4 mb-2">
                {/* Home Controls */}
                <div className="flex items-center gap-2">
                   <button onClick={() => updateScore('home', -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-600"><Minus size={14} /></button>
                   <span className="font-mono font-bold text-white w-4 text-center">{liveScore.home}</span>
                   <button onClick={() => updateScore('home', 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20"><Plus size={14} /></button>
                </div>
                
                <span className="text-[10px] font-bold text-slate-500">SCORE</span>

                {/* Away Controls */}
                <div className="flex items-center gap-2">
                   <button onClick={() => updateScore('away', -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-600"><Minus size={14} /></button>
                   <span className="font-mono font-bold text-white w-4 text-center">{liveScore.away}</span>
                   <button onClick={() => updateScore('away', 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20"><Plus size={14} /></button>
                </div>
             </div>
             
             {/* Disclaimer Banner */}
             <div className="bg-yellow-500/10 border border-yellow-500/20 p-2 rounded-lg flex items-start gap-2">
                <AlertTriangle size={12} className="text-yellow-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-yellow-200/80 leading-tight">
                  <strong className="text-yellow-400 block mb-0.5">Unofficial Fan Score</strong>
                  Scores are updated by people at the match. Please check back later for official results confirmed by referee and clubs.
                </p>
             </div>
          </div>
        )}
      </div>

      {/* Footer (Date & Location & Action) */}
      <div className="px-4 py-2.5 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
                <Calendar size={12} /> {dateStr}
            </div>
            <button 
                onClick={openMap}
                className="flex items-center gap-1.5 text-brand-400 hover:text-white transition-colors bg-brand-900/10 px-2 py-1 rounded hover:bg-brand-900/30 border border-transparent hover:border-brand-500/20"
                title="Get Directions"
            >
                <Navigation size={10} /> <span className="truncate max-w-[80px] font-bold">Directions</span>
            </button>
        </div>

        {!isFinished && (
           <div className="flex items-center gap-1">
             <button 
               onClick={shareMatch}
               className="text-slate-400 hover:text-brand-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
               title="Share to WhatsApp"
             >
               <Share2 size={16} />
             </button>
             <button 
               onClick={addToCalendar}
               className="text-slate-400 hover:text-brand-400 transition-colors p-1.5 rounded-lg hover:bg-slate-800"
               title="Add to Calendar"
             >
               <CalendarPlus size={16} />
             </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;