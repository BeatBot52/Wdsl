
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import LeagueTableWidget from '../components/LeagueTableWidget';
import { LEAGUE_TABLES } from '../constants';

const TablesPage: React.FC = () => {
  const divisions = Object.keys(LEAGUE_TABLES);
  const [selectedDivision, setSelectedDivision] = useState(divisions[0]);

  // Group divisions by Age Group (e.g., "U12", "U13") for the dropdown
  const groupedDivisions = divisions.reduce((acc, division) => {
    const ageGroup = division.split(' ')[0]; // Extract "U12" from "U12 Premier"
    if (!acc[ageGroup]) acc[ageGroup] = [];
    acc[ageGroup].push(division);
    return acc;
  }, {} as Record<string, string[]>);

  const sortedGroups = Object.keys(groupedDivisions).sort();

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
                  {groupedDivisions[group].map(div => (
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
          <LeagueTableWidget 
            rows={LEAGUE_TABLES[selectedDivision]} 
            title={selectedDivision} 
          />
          
          <div className="mt-4 flex gap-4 text-[10px] text-slate-500 justify-center uppercase tracking-wider">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500"></span> Promotion</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Relegation</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TablesPage;