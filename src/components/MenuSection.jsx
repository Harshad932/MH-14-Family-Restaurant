import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Sparkles,
  Utensils,
  Flame,
  Soup,
  Salad,
  Wheat,
  Disc,
  CookingPot,
  Filter,
  Check
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import MenuItemCard from './MenuItemCard';

// Icon mapper helper
const iconMap = {
  Utensils,
  Sparkles,
  Flame,
  Soup,
  Salad,
  Wheat,
  Disc,
  CookingPot,
};

export default function MenuSection({
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  selectedCategory,
  setSelectedCategory,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'nonveg'
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price_asc', 'price_desc'

  // Filter & search logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'veg' && !item.isVeg) return false;
      if (dietaryFilter === 'nonveg' && item.isVeg) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesBadge = item.badge?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesBadge) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, dietaryFilter, searchQuery, sortBy]);

  // Compute counts per category for badge indicators
  const categoryCounts = useMemo(() => {
    const counts = { all: MENU_ITEMS.length };
    MENU_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section id="menu" className="py-12 sm:py-16 bg-[#fbfbf8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            <Utensils className="w-3.5 h-3.5 text-amber-600" />
            Explore Our Delicacies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            The MH 14 Food Menu
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Select your favorite dishes, choose portion sizes, and assemble your table order to show to your waiter.
          </p>
        </div>

        {/* Controls: Search Bar & Dietary Filter */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-soft mb-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Kolhapuri, Tandoori, Biryani, Roti, Paneer...)"
                className="w-full pl-11 pr-10 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-stone-50/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 focus:outline-none"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter (All, Veg, Non-Veg) */}
            <div className="flex items-center gap-1.5 bg-stone-100/80 p-1 rounded-xl border border-stone-200/80 shrink-0">
              <button
                type="button"
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dietaryFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Dishes
              </button>

              <button
                type="button"
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-stone-600 hover:text-emerald-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-300" />
                <span>Pure Veg</span>
              </button>

              <button
                type="button"
                onClick={() => setDietaryFilter('nonveg')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dietaryFilter === 'nonveg'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-rose-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-300" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Sorting Dropdown */}
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold text-stone-700 bg-stone-100 border border-stone-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="default">Default Order</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Pills (Horizontal scrolling with touch & click) */}
        <div className="relative mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = iconMap[cat.icon] || Utensils;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 shrink-0 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-card scale-102 font-bold'
                      : 'bg-white text-stone-700 hover:bg-amber-50/70 border border-stone-200/90 shadow-xs'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-amber-700'}`} />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? 'bg-brand-700 text-amber-100'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Context & Count status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-display capitalize">
              {CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Menu Dishes'}
            </h3>
            <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full font-medium">
              {filteredItems.length} items found
            </span>
          </div>

          {(searchQuery || dietaryFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
              }}
              className="text-xs font-semibold text-brand-700 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-md mx-auto my-8 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-amber-700">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">No dishes match your criteria</h4>
            <p className="text-sm text-stone-500 mt-1">
              Try searching for something else or clearing your dietary/category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-5 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition-colors shadow-xs"
            >
              Show All Dishes
            </button>
          </div>
        ) : (
          /* Food Items Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                cartItems={cartItems}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
