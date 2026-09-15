import React from 'react';
import { Sparkles, Flame, Plus, Check, Star } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

export default function FeaturedDishes({ onAddToCart, cartItems }) {
  // Select signature featured items
  const featured = MENU_ITEMS.filter((item) => item.isFeatured).slice(0, 6);

  return (
    <section className="py-12 sm:py-16 bg-[#fafaf7] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Chef's Signatures
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              MH 14 House Specialties
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1">
              The dishes our guests love the most — crafted with secret masalas and authentic chulha-inspired perfection.
            </p>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((item) => {
            const inCart = cartItems.find((c) => c.id === item.id);
            const cartQty = inCart ? inCart.quantity : 0;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between relative group"
              >
                {/* Badge if available */}
                {item.badge && (
                  <div className="absolute top-4 right-4 bg-amber-500/10 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                    {item.badge}
                  </div>
                )}

                <div>
                  {/* Veg / Non-Veg Indicator */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 border ${
                        item.isVeg
                          ? 'border-emerald-600'
                          : 'border-rose-700'
                      } rounded-xs p-0.5`}
                      title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.isVeg ? 'bg-emerald-600' : 'bg-rose-700'
                        }`}
                      />
                    </span>
                    <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                      {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
                    </span>
                    {item.isSpicy && (
                      <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-orange-600">
                        <Flame className="w-3 h-3 text-orange-500" />
                        Spicy
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-brand-700 transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom row: Price & Quick Add */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-stone-500">
                      {item.hasPortions ? 'Starts from' : 'Price'}
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                      ₹{item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(item)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                      cartQty > 0
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                        : 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
                    }`}
                  >
                    {cartQty > 0 ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Added ({cartQty})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add +</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
