import React, { useState } from 'react';
import { Plus, Minus, Flame, Sparkles } from 'lucide-react';

export default function MenuItemCard({ item, cartItems, onAddToCart, onUpdateQuantity }) {
  // If item has portions, default to first portion
  const [selectedPortion, setSelectedPortion] = useState(
    item.hasPortions && item.portions ? item.portions[0] : null
  );

  // Compute unique cart key: if has portion, 'id-portionName', else 'id'
  const cartKey = selectedPortion
    ? `${item.id}-${selectedPortion.name}`
    : item.id;

  // Check if this specific portion or item is in cart
  const inCart = cartItems.find((c) => c.cartKey === cartKey);
  const quantity = inCart ? inCart.quantity : 0;

  const currentPrice = selectedPortion ? selectedPortion.price : item.price;

  const handleAdd = () => {
    onAddToCart({
      ...item,
      cartKey,
      selectedPortion: selectedPortion ? selectedPortion.name : null,
      price: currentPrice,
    });
  };

  const handleIncrement = () => {
    onUpdateQuantity(cartKey, quantity + 1);
  };

  const handleDecrement = () => {
    onUpdateQuantity(cartKey, quantity - 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-5 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between relative group hover:border-amber-200">
      
      {/* Top badges & indicators */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          {/* Dietary Veg / Non-Veg Indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center justify-center w-4 h-4 border ${
                item.isVeg ? 'border-emerald-600' : 'border-rose-700'
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
              {item.isVeg ? 'Veg' : 'Non-Veg'}
            </span>
            {item.isSpicy && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-orange-600">
                <Flame className="w-3 h-3 text-orange-500" />
                Spicy
              </span>
            )}
          </div>

          {/* Custom tag/badge if available */}
          {item.badge && (
            <span className="bg-amber-50 text-amber-800 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border border-amber-200/80">
              {item.badge}
            </span>
          )}
        </div>

        {/* Item Name */}
        <h4 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-brand-800 transition-colors leading-snug">
          {item.name}
        </h4>

        {/* Item Description */}
        <p className="text-xs sm:text-sm text-stone-500 mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Portions selector (if item offers Full/Half or Veg/Non-Veg) */}
      <div className="mt-4 pt-3 border-t border-stone-100">
        {item.hasPortions && item.portions && (
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-stone-500 block mb-1">
              Select {item.portionLabel || 'Portion'}:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {item.portions.map((portion) => {
                const isSelected = selectedPortion?.name === portion.name;
                return (
                  <button
                    key={portion.name}
                    type="button"
                    onClick={() => setSelectedPortion(portion)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-xs font-semibold'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {portion.name} (₹{portion.price})
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom row: Price & Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-stone-400 font-medium">
              {selectedPortion ? `${selectedPortion.name} Price` : 'Price'}
            </span>
            <span className="text-lg sm:text-xl font-black text-stone-900">
              ₹{currentPrice}
            </span>
          </div>

          {/* Stepper / Add button */}
          {quantity > 0 ? (
            <div className="flex items-center bg-amber-50 border border-amber-300 rounded-xl overflow-hidden shadow-xs">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center text-amber-900 hover:bg-amber-200/80 active:bg-amber-300 transition-colors focus:outline-none"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs sm:text-sm font-extrabold text-amber-950">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-8 h-8 flex items-center justify-center text-amber-900 hover:bg-amber-200/80 active:bg-amber-300 transition-colors focus:outline-none"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-card transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
