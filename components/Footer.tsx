
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-brand-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <Trophy className="text-brand-500" size={24} />
              <span className="text-2xl font-bold">WDSL</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The Wicklow District Schoolboys/Girls League. Promoting and developing youth football across County Wicklow since its foundation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">League Centre</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/fixtures" className="hover:text-brand-400 transition-colors">Fixtures</Link></li>
              <li><Link to="/results" className="hover:text-brand-400 transition-colors">Results</Link></li>
              <li><Link to="/tables" className="hover:text-brand-400 transition-colors">League Tables</Link></li>
              <li><Link to="/clubs" className="hover:text-brand-400 transition-colors">Club Directory</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact League</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 shrink-0" />
                <span>WDSL Secretary,<br/>Wicklow Town, Co. Wicklow</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500 shrink-0" />
                <span>secretary@wdsl.ie</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="bg-slate-800 p-2.5 rounded-lg hover:bg-brand-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2.5 rounded-lg hover:bg-brand-600 hover:text-white transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-slate-800 p-2.5 rounded-lg hover:bg-brand-600 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Wicklow & District Schoolboys/Girls League. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Rulebook</a>
            <a href="#" className="hover:text-white transition-colors">Child Protection</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;