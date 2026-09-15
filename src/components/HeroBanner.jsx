import React from 'react';
import { Utensils, Sparkles, Flame, Clock, MapPin, CheckCircle2, ChevronDown, ArrowRight } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export default function HeroBanner({ onExploreMenu, onExploreThalis, onOpenOrder, cartCount }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-stone-50 to-[#fafaf7] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-stone-200/60">
      
      {/* Decorative ambient background rings */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* Left Column: Text & Call to Actions */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold mb-5 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Pimpri-Chinchwad's Favorite Family Dine-In</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display leading-[1.15]">
              Real Desi Taste, <br className="hidden sm:inline" />
              <span className="text-brand-700 underline decoration-amber-300 decoration-wavy decoration-2">
                Pure Family Comfort
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              Experience the genuine flavors of Maharashtra—from hand-ground Kolhapuri and Malwani handi gravies, sizzling tandoor starters, to rich Special Thalis prepared with traditional culinary passion.
            </p>

            {/* Quick Dine-in helper note */}
            <div className="mt-4 p-3 rounded-xl bg-white/90 border border-amber-200/80 shadow-xs inline-flex items-center gap-3 text-left">
              <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm shrink-0">
                1-2-3
              </span>
              <p className="text-xs sm:text-sm text-stone-700">
                <span className="font-semibold text-stone-900">Dine-In Helper:</span> Browse the menu, add items to your table order, and show the clean summary screen to the waiter!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onExploreMenu}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm sm:text-base shadow-card hover:shadow-float active:scale-98 transition-all"
              >
                <Utensils className="w-4 h-4" />
                <span>Browse Full Menu</span>
              </button>

              <button
                onClick={onExploreThalis}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-amber-50/70 border border-amber-300 text-stone-800 font-semibold text-sm sm:text-base shadow-xs hover:border-amber-400 active:scale-98 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Special Thalis</span>
              </button>

              {cartCount > 0 && (
                <button
                  onClick={onOpenOrder}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-card active:scale-98 transition-all"
                >
                  <span>My Order ({cartCount})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Key Value Points */}
            <div className="mt-8 pt-6 border-t border-stone-200/70 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left text-xs sm:text-sm text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AC Family Seating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Chulha & Handi Recipes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Live Clay Tandoor</span>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Official Logo Badge Showcase */}
          <div className="flex-1 w-full flex flex-col items-center justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-amber-100/70 via-white to-amber-50 p-3 sm:p-5 shadow-float border-4 border-white">
              
              {/* Spinning / subtle glowing outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/80 animate-spin-slow pointer-events-none" />

              {/* Logo container */}
              <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-2 shadow-inner border border-stone-200/80">
                <img
                  src="/logo.png"
                  alt="MH 14 Family Restaurant Official Emblem"
                  className="w-full h-full object-contain rounded-full hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Floating feature pills */}
              <div className="absolute -bottom-2 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-amber-300 shadow-card flex items-center gap-2 text-xs font-semibold text-stone-800 whitespace-nowrap">
                <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
                <span>Fresh & Piping Hot Food</span>
              </div>
            </div>

            {/* Quick Timing & Location snippet */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-500">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Open 11:00 AM – 11:30 PM
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-200/80 shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                PCMC / Pune (MH 14)
              </span>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
