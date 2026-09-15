import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  AlertCircle,
  RotateCcw,
  ChefHat
} from 'lucide-react';

const COMMON_TABLES = ['T-1', 'T-2', 'T-3', 'T-4', 'T-5', 'T-6', 'T-7', 'T-8', 'T-9', 'T-10', 'T-12', 'T-14', 'AC-1', 'AC-2'];

export default function OrderDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  tableNumber,
  setTableNumber,
  cookingNotes,
  setCookingNotes,
  onOpenWaiterView,
  cartTotal,
  cartCount
}) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200 bg-stone-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                  Your Table Order
                </h3>
                <p className="text-xs text-stone-500">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 focus:outline-none"
              aria-label="Close Order"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Table Number Selector */}
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/80">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <span>Your Table Number:</span>
                </label>
                {tableNumber && (
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                    {tableNumber}
                  </span>
                )}
              </div>

              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g. Table 5 or T-4"
                className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2.5"
              />

              {/* Quick Table Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-stone-500 font-medium">Quick pick:</span>
                {COMMON_TABLES.slice(0, 7).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTableNumber(t)}
                    className={`text-[11px] px-2 py-0.5 rounded-md font-bold transition-colors ${
                      tableNumber === t
                        ? 'bg-amber-700 text-white'
                        : 'bg-white border border-amber-200 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Items List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Order Items ({cartCount})
                </h4>

                {cartItems.length > 0 && (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-stone-400">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-stone-600">No items selected yet</p>
                  <p className="text-xs text-stone-400 mt-1">
                    Browse the menu and click "Add" to build your order.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartKey}
                      className="p-3.5 rounded-xl border border-stone-200/90 bg-white shadow-xs flex items-center justify-between gap-3 hover:border-amber-200 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-600' : 'bg-rose-700'
                            }`}
                          />
                          <h5 className="text-sm font-bold text-stone-900 truncate">
                            {item.name}
                          </h5>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                          {item.selectedPortion && (
                            <span className="px-1.5 py-0.2 bg-stone-100 rounded text-[11px] font-semibold text-stone-700">
                              {item.selectedPortion}
                            </span>
                          )}
                          <span>₹{item.price} each</span>
                          <span className="text-stone-300">•</span>
                          <span className="font-bold text-stone-800">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg overflow-hidden shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.cartKey, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:bg-stone-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartKey, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-700 hover:bg-stone-200 active:bg-stone-300"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove item button */}
                      <button
                        onClick={() => onRemoveItem(item.cartKey)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        aria-label="Delete item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Special Instructions / Cooking Notes */}
            {cartItems.length > 0 && (
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block mb-1.5 flex items-center gap-1.5">
                  <ChefHat className="w-3.5 h-3.5 text-stone-500" />
                  <span>Cooking Requests / Notes for Waiter:</span>
                </label>
                <textarea
                  value={cookingNotes}
                  onChange={(e) => setCookingNotes(e.target.value)}
                  placeholder="e.g. Medium spicy, less oil, serve soups first, extra onions & lemons..."
                  rows={2}
                  className="w-full p-2.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Clear Order Confirmation Modal */}
            {showClearConfirm && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-2">
                <p className="font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  Are you sure you want to clear your selected order?
                </p>
                <div className="flex gap-2 justify-end pt-1">
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2.5 py-1 bg-white border border-rose-300 rounded-lg text-rose-800 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onClearOrder();
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1 bg-rose-600 text-white rounded-lg font-semibold"
                  >
                    Yes, Clear
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Footer: Totals & Show to Waiter Action */}
          <div className="p-5 border-t border-stone-200 bg-stone-50/90 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Selected Items</span>
              <span className="font-semibold text-stone-800">{cartCount} items</span>
            </div>

            <div className="flex items-center justify-between text-lg font-bold border-t border-stone-200/80 pt-2">
              <span className="text-stone-900 font-display">Estimated Total</span>
              <span className="text-2xl font-black text-brand-700">₹{cartTotal}</span>
            </div>

            <p className="text-[11px] text-stone-500 text-center">
              Dine-in total. Taxes & bill details will be prepared by the restaurant.
            </p>

            {/* Show to Waiter Primary Action Button */}
            <button
              disabled={cartItems.length === 0}
              onClick={() => {
                onClose();
                onOpenWaiterView();
              }}
              className={`w-full py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-base shadow-card transition-all ${
                cartItems.length > 0
                  ? 'bg-brand-600 hover:bg-brand-700 text-white hover:shadow-float active:scale-98'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Show Order to Waiter</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
