import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LeagueTableWidget from '../components/LeagueTableWidget';
import { LEAGUE_TABLES } from '../constants';

const TablesPage: React.FC = () => {
  const divisions = Object.keys(LEAGUE_TABLES);
  const [selectedDivision, setSelectedDivision] = useState(divisions[0]);

  // Group divisions by Age Group (e.g., "U12", "U13") for the dropdown
  const groupedDivisions = divisions.reduce((acc, division) => {
    // Advanced grouping: Girls, U8-U11, U12+, Youths
    let group = 'Other';
    if (division.startsWith('Girls')) {
      group = 'Girls Leagues';
    } else if (division.startsWith('Youths')) {
      group = 'Youths (U18)';
    } else {
      const match = division.match(/^U(\d+)/);
      if (match) {
        const age = parseInt(match[1]);
        if (age <= 11) group = 'Non-Competitive (U8-U11)';
        else group = `Competitive (U${age})`;
      }
    }

    if (!acc[group]) acc[group] = [];
    acc[group].push(division);
    return acc;
  }, {} as Record<string, string[]>);

  // Custom sort order for groups
  const groupOrder = ['Non-Competitive (U8-U11)', 'Competitive (U12)', 'Competitive (U13)', 'Competitive (U14)', 'Competitive (U15)', 'Competitive (U16)', 'Youths (U18)', 'Girls Leagues'];
  const sortedGroups = Object.keys(groupedDivisions).sort((a, b) => {
    return groupOrder.indexOf(a) - groupOrder.indexOf(b);
  });

  const isNonCompetitive = selectedDivision.includes('U8') || selectedDivision.includes('U9') || selectedDivision.includes('U10') || selectedDivision.includes('U11') && !selectedDivision.includes('Girls');

  return (
    <div className="pt-20 md:pt-24 pb-24 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Selector */}
        <div className="mb-8">
          <h1 className="text-2xl font-black text-white mb-4">League Tables</h1>
          
          <div className="relative">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full md:w-auto appearance-none bg-slate-900 border border-slate-800 text-white text-lg font-bold py-3 pl-5 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
            >
              {sortedGroups.map(group => (
                <optgroup key={group} label={group} className="bg-slate-900 text-slate-300">
                  {groupedDivisions[group]?.map(div => (
                    <option key={div} value={div} className="text-white">
                      {div}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Table Display */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {isNonCompetitive ? (
             <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{selectedDivision}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  This age group is non-competitive to encourage development and fun. No league tables or points are recorded.
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-300 font-medium">
                   {LEAGUE_TABLES[selectedDivision].map(row => (
                      <div key={row.team} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                         {row.team}
                      </div>
                   ))}
                </div>
             </div>
          ) : (
            <LeagueTableWidget 
                rows={LEAGUE_TABLES[selectedDivision]} 
                title={selectedDivision} 
            />
          )}
          
          {!isNonCompetitive && (
            <div className="mt-4 flex gap-4 text-[10px] text-slate-500 justify-center uppercase tracking-wider">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500"></span> Promotion</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Relegation</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TablesPage;