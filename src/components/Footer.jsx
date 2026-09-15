import React from 'react';
import { Phone, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';
import { restaurantInfo } from '../data/restaurantInfo';

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-stone-100 border-t border-stone-200/80 pt-12 pb-16 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full p-0.5 bg-white border border-amber-300 shadow-xs">
                <img
                  src="/logo.png"
                  alt="MH 14 Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-stone-900 font-display block leading-tight">
                  MH 14
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  Family Restaurant • Lonavala
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Serving authentic Maharashtrian handi gravies, clay tandoor starters, and wholesome thalis for families and travelers in Lonavala.
            </p>

            {/* Social Media Logos (without links) */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-stone-500 block mb-2">
                Connect With Us:
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors shadow-xs cursor-default"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors shadow-xs cursor-default"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('menu')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Browse Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('thalis')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Special Thalis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Opening Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-bold text-stone-800">
                  {restaurantInfo.timing}
                </span>
              </div>
              <p className="text-stone-500 pl-6">
                Open 7 Days a week for Lunch & Dinner.
              </p>
              <div className="pt-2">
                <span className="text-xs text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-md font-semibold inline-block">
                  Family Seating Available
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Visit & Inquiries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Address & Calling
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="leading-snug">{restaurantInfo.location}</span>
              </div>
              <div className="pt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <a
                    href={`tel:${restaurantInfo.phoneRaw}`}
                    className="font-bold text-stone-900 hover:text-amber-800"
                  >
                    {restaurantInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <a
                    href={`tel:${restaurantInfo.altPhoneRaw}`}
                    className="font-bold text-stone-700 hover:text-amber-800"
                  >
                    {restaurantInfo.altPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} MH 14 Family Restaurant, Lonavala. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic family dining</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
