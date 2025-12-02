
import React from 'react';
import { Calendar, MapPin, Clock, CalendarPlus, CloudRain, Sun, Cloud, Wind, ExternalLink } from 'lucide-react';
import { Fixture } from '../types';
import TeamLogo from './TeamLogo';
import { getVenueMapLink } from '../constants';

interface MatchCardProps {
  fixture: Fixture;
  variant?: 'default' | 'hero';
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

const MatchCard: React.FC<MatchCardProps> = ({ fixture, variant = 'default' }) => {
  const isFinished = fixture.status === 'finished';
  const isHero = variant === 'hero';
  
  const dateStr = fixture.date.toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' });
  const timeStr = fixture.date.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' });
  const mapLink = getVenueMapLink(fixture.venue);

  const openMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(mapLink, '_blank', 'noopener,noreferrer');
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
  // HERO CARD (Compact Version for New Dashboard)
  // ----------------------------------------------------------------------
  if (isHero) {
    return (
      <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl shadow-xl shadow-brand-900/50 overflow-hidden relative group">
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
               <span className="text-brand-200 text-[10px] font-bold uppercase opacity-60">VS</span>
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
           
           {!isFinished && (
             <button 
               onClick={addToCalendar}
               className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors active:scale-95"
             >
               <CalendarPlus size={12} /> Add
             </button>
           )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // DEFAULT CARD (List View)
  // ----------------------------------------------------------------------
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden relative group active:border-slate-700 transition-colors">
      
      {/* Header */}
      <div className="bg-slate-950/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-[140px]">{fixture.competition}</span>
        <div className="flex items-center gap-2">
            {!isFinished && <WeatherDisplay weather={fixture.weather} />}
            {isFinished ? (
               <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">FT</span>
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
          </div>

          {/* Score / VS */}
          <div className="shrink-0 px-2">
             {isFinished && fixture.score ? (
               <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                 <span className="text-lg font-black text-white">{fixture.score.home}</span>
                 <span className="text-slate-600 text-xs">:</span>
                 <span className="text-lg font-black text-white">{fixture.score.away}</span>
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center w-8 h-8 rounded-full bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-black text-slate-600">VS</span>
               </div>
             )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex flex-col items-center gap-2">
            <TeamLogo team={fixture.awayTeam} size="md" className="transition-transform group-hover:scale-105 duration-300" />
            <span className="text-xs font-bold text-slate-200 text-center leading-tight line-clamp-2 h-8 flex items-center justify-center w-full">{fixture.awayTeam.name}</span>
          </div>
        </div>
      </div>

      {/* Footer (Date & Location & Action) */}
      <div className="px-4 py-2.5 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
                <Calendar size={12} /> {dateStr}
            </div>
            <button 
                onClick={openMap}
                className="flex items-center gap-1.5 truncate max-w-[120px] md:max-w-none hover:text-brand-400 transition-colors"
                title="Open in Maps"
            >
                <MapPin size={12} /> <span className="truncate underline decoration-dotted">{fixture.venue}</span>
            </button>
        </div>

        {!isFinished && (
           <button 
             onClick={addToCalendar}
             className="text-brand-400 hover:text-white transition-colors p-1.5 -mr-1 rounded-lg hover:bg-brand-600/20"
             title="Add to Calendar"
           >
             <CalendarPlus size={16} />
           </button>
        )}
      </div>
    </div>
  );
};

export default MatchCard;