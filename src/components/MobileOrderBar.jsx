import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export default function MobileOrderBar({ cartCount, cartTotal, onOpenOrder, onOpenWaiterView }) {
  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden bg-gradient-to-t from-white via-white to-transparent pt-4">
      <div className="bg-stone-900 text-white rounded-2xl shadow-float p-3 flex items-center justify-between gap-3 border border-stone-800">
        
        {/* Left: Cart items & total */}
        <button
          onClick={onOpenOrder}
          className="flex items-center gap-2.5 text-left focus:outline-none flex-1 min-w-0"
        >
          <div className="relative w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-xs">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-stone-900">
              {cartCount}
            </span>
          </div>

          <div className="truncate">
            <div className="text-xs font-medium text-stone-300">
              {cartCount} {cartCount === 1 ? 'Dish' : 'Dishes'}
            </div>
            <div className="text-base font-extrabold text-white leading-tight">
              ₹{cartTotal}
            </div>
          </div>
        </button>

        {/* Right: Show to Waiter / View Order Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onOpenWaiterView}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-950 text-xs font-extrabold rounded-xl flex items-center gap-1 shadow-xs transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Show Waiter</span>
          </button>

          <button
            onClick={onOpenOrder}
            className="p-2 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-300 rounded-xl"
            aria-label="View Order Drawer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
