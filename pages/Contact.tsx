import React from 'react';
import { Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const Contact: React.FC = () => {
  return (
    <div className="pt-4 md:pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-white mb-4">Contact The League</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Get in touch with the committee regarding fixtures, registrations, or general enquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">League Office</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 text-brand-400 rounded-xl border border-slate-700">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 mb-1">Postal Address</p>
                    <p className="text-slate-200 text-sm">WDSL Secretary</p>
                    <p className="text-slate-200 text-sm">Wicklow Town</p>
                    <p className="text-slate-200 text-sm">Co. Wicklow</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-800 text-brand-400 rounded-xl border border-slate-700">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500 mb-1">Email</p>
                    <p className="text-slate-200 text-sm font-medium">secretary@wdsl.ie</p>
                    <p className="text-slate-200 text-sm font-medium mt-2">fixtures@wdsl.ie</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-900/50 to-slate-900 p-6 md:p-8 rounded-2xl border border-red-900/30">
                <div className="flex items-center gap-3 mb-4 text-red-400">
                    <AlertCircle size={24} />
                    <h3 className="text-lg font-bold">Match Day Emergency</h3>
                </div>
                <p className="text-slate-300 mb-6 text-xs leading-relaxed">For urgent match-day issues (referee no-show, pitch unplayable), club secretaries only.</p>
                <div className="p-4 bg-slate-950/50 rounded-xl border border-red-500/20 flex items-center gap-3">
                    <Phone size={18} className="text-red-400" />
                    <span className="text-sm font-bold text-slate-200">087 000 0000</span>
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form className="bg-slate-900 p-6 md:p-10 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase mb-2">Your Name</label>
                  <input type="text" id="name" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="club" className="block text-xs font-bold text-slate-500 uppercase mb-2">Club (Optional)</label>
                  <input type="text" id="club" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" placeholder="e.g. Arklow Town" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" placeholder="you@example.com" />
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject</label>
                <select id="subject" className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all appearance-none">
                  <option>General Enquiry</option>
                  <option>Player Registration</option>
                  <option>Transfer Request</option>
                  <option>Child Welfare Concern</option>
                  <option>Referee Feedback</option>
                </select>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all resize-none placeholder-slate-600" placeholder="How can we help?"></textarea>
              </div>

              <Button size="lg" className="w-full md:w-auto">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;