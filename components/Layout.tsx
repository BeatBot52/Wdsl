import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Trophy, Users, Phone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import SupportChat from './SupportChat';

interface LayoutProps {
  children: React.ReactNode;
}

const MobileNav: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Fixtures', path: '/fixtures' },
    { icon: Trophy, label: 'Tables', path: '/tables' },
    { icon: Users, label: 'Clubs', path: '/clubs' },
    { icon: Phone, label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-brand-400' : 'text-slate-500'
              }`
            }
          >
            <item.icon size={20} strokeWidth={2.5} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-200">
      <Navbar />
      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileNav />
      <div className="pb-16 md:pb-0">
        <SupportChat />
      </div>
    </div>
  );
};

export default Layout;