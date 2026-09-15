import React from 'react';
import { Phone, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export default function Footer({ onNavClick }) {
  return (
    <footer className="bg-stone-100 border-t border-stone-200/80 pt-12 pb-16 text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
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
                  Family Restaurant
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Serving the true culinary soul of Maharashtra, traditional earthen handi gravies, and live tandoor breads for families & food lovers.
            </p>

            <div className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-3 py-1.5 rounded-xl inline-block">
              ★ Authentic Desi & Kolhapuri Flavors
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavClick('home')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Home & Welcoming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('menu')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Browse Full Food Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('thalis')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Special Thalis Feast
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('about')}
                  className="hover:text-amber-800 transition-colors"
                >
                  About Our Kitchen & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('contact')}
                  className="hover:text-amber-800 transition-colors"
                >
                  Timings & Table Reservations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Timings & Experience */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Service Hours
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="font-semibold text-stone-800">
                  {restaurantInfo.timing}
                </span>
              </div>
              <p className="text-stone-500 pl-6">
                Open all 7 days of the week for Lunch & Dinner.
              </p>
              <div className="pt-2">
                <span className="text-xs text-stone-600 block font-medium">
                  Family Seating:
                </span>
                <span className="text-xs text-stone-500">
                  Spacious AC Family Hall & Dining Area.
                </span>
              </div>
            </div>
          </div>

          {/* Col 4: Visit & Inquiries */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Visit Us
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{restaurantInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-amber-700 shrink-0" />
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="font-bold text-stone-900 hover:text-amber-800"
                >
                  {restaurantInfo.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} MH 14 Family Restaurant. All rights reserved.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic desi dining experiences</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
