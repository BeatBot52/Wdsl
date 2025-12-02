import React from 'react';
import { TableRow } from '../types';

interface LeagueTableWidgetProps {
  rows: TableRow[];
  title?: string;
  highlightTeam?: string;
}

const LeagueTableWidget: React.FC<LeagueTableWidgetProps> = ({ 
  rows, 
  title = "Premier Division",
  highlightTeam
}) => {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
            <tr>
              <th className="px-4 py-3 w-10 text-center">#</th>
              <th className="px-4 py-3">Team</th>
              <th className="px-4 py-3 text-center">P</th>
              <th className="px-4 py-3 text-center text-white">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {rows.map((row) => {
              // Check if this row matches the highlighted team (partial match to catch "Arklow Town A" etc)
              const isHighlighted = highlightTeam && row.team.includes(highlightTeam);
              
              return (
                <tr 
                  key={row.team} 
                  className={`transition-colors ${
                    isHighlighted 
                      ? 'bg-brand-900/30 hover:bg-brand-900/40' 
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <td className="px-4 py-3 text-center">
                    <span className={`flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold ${
                      row.position === 1 ? 'bg-brand-500 text-white' : 
                      row.position <= 3 ? 'bg-slate-800 text-slate-300' : 'text-slate-500'
                    }`}>
                      {row.position}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-medium ${isHighlighted ? 'text-brand-400' : 'text-slate-200'}`}>
                    {row.team}
                    {isHighlighted && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-brand-500"></span>}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-500">{row.played}</td>
                  <td className={`px-4 py-3 text-center font-bold ${isHighlighted ? 'text-white' : 'text-brand-400'}`}>
                    {row.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 bg-slate-950/30 border-t border-slate-800 text-center">
         <button className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            {highlightTeam ? 'Full Standings' : 'View Full Table'}
         </button>
      </div>
    </div>
  );
};

export default LeagueTableWidget;