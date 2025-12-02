
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import Button from './Button';

const Navbar: React.FC = () => {
  return (
    <header className="hidden md:block sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-brand-500 to-brand-700 text-white p-2 rounded-xl shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <Trophy size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white leading-none tracking-tight">WDSL</span>
              <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Wicklow League</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-all duration-200 hover:text-brand-400 ${
                    isActive ? 'text-brand-400' : 'text-slate-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <Link to="/fixtures">
              <Button size="sm" variant="primary" className="bg-brand-600 hover:bg-brand-500 text-white border-0 shadow-lg shadow-brand-500/20">
                Find My Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;