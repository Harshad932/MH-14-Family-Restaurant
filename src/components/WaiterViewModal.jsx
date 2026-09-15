import React, { useState } from 'react';
import {
  X,
  Check,
  Copy,
  Printer,
  Sparkles,
  ArrowLeft,
  Clock,
  MapPin,
  FileText,
  ChefHat
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';

export default function WaiterViewModal({
  isOpen,
  onClose,
  cartItems,
  tableNumber,
  setTableNumber,
  cookingNotes,
  cartTotal,
  cartCount,
  onEditOrder
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Format order text for clipboard copying
  const generateOrderText = () => {
    let text = `*MH 14 Family Restaurant - Dine-In Order*\n`;
    text += `Table: ${tableNumber || 'Not Specified'}\n`;
    text += `Time: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n`;
    text += `--------------------------------\n`;
    cartItems.forEach((item, index) => {
      const portionStr = item.selectedPortion ? ` (${item.selectedPortion})` : '';
      text += `${index + 1}. [${item.quantity}x] ${item.name}${portionStr} - ₹${item.price * item.quantity}\n`;
    });
    text += `--------------------------------\n`;
    text += `Total Items: ${cartCount}\n`;
    text += `Estimated Total: ₹${cartTotal}\n`;
    if (cookingNotes) {
      text += `Special Instructions: ${cookingNotes}\n`;
    }
    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateOrderText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy order:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      
      {/* Modal Container */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto animate-fadeIn">
        
        {/* Top Announcement Bar */}
        <div className="bg-amber-600 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">
              Waiter Order Screen
            </span>
          </div>
          <span className="text-xs font-semibold bg-amber-700/70 px-2.5 py-0.5 rounded-full">
            Please show this screen to your server
          </span>
        </div>

        {/* Receipt Header */}
        <div className="p-6 sm:p-8 bg-[#fdfdfb] border-b border-stone-200 text-center relative">
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors focus:outline-none"
            aria-label="Close Waiter Screen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Logo Badge */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full p-1 bg-white border-2 border-amber-300 shadow-card mb-3">
            <img
              src="/logo.png"
              alt="MH 14 Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-display">
            MH 14 Family Restaurant
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Dine-In Customer Order Slip
          </p>

          {/* Table & Time Information Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100/80 border-2 border-amber-300 rounded-2xl">
              <span className="text-xs font-bold text-amber-900 uppercase">Table:</span>
              <span className="text-lg sm:text-xl font-black text-amber-950">
                {tableNumber || 'Enter Table'}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 border border-stone-200 rounded-2xl text-xs font-semibold text-stone-700">
              <Clock className="w-4 h-4 text-stone-500" />
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 border border-stone-200 rounded-2xl text-xs font-semibold text-stone-700">
              <MapPin className="w-4 h-4 text-stone-500" />
              <span>PCMC / Pune</span>
            </div>
          </div>

          {/* Quick Table input if not set */}
          {!tableNumber && (
            <div className="mt-4 max-w-xs mx-auto">
              <label className="text-[11px] font-bold text-amber-800 uppercase block mb-1">
                Enter your table number:
              </label>
              <input
                type="text"
                placeholder="e.g. Table 4"
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-3 py-1.5 text-center text-sm font-bold bg-white border-2 border-amber-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

        </div>

        {/* Order Items List (High Contrast & Clear Readability) */}
        <div className="p-6 sm:p-8 flex-1 max-h-[45vh] overflow-y-auto bg-white space-y-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-400">
            <span>Dish Description</span>
            <span>Quantity & Price</span>
          </div>

          {cartItems.map((item, idx) => (
            <div
              key={item.cartKey}
              className="flex items-start justify-between gap-4 py-3 border-b border-stone-100 last:border-0"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-rose-700'
                      }`}
                    />
                    <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                      {item.name}
                    </h4>
                  </div>

                  {item.selectedPortion && (
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                      Portion: {item.selectedPortion}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 block mt-0.5">
                    ₹{item.price} each
                  </span>
                </div>
              </div>

              {/* Right: Big Bold Quantity Pill and Line Total */}
              <div className="text-right shrink-0">
                <span className="inline-block px-3 py-1 bg-amber-500 text-white rounded-xl text-base sm:text-lg font-black shadow-xs">
                  {item.quantity} x
                </span>
                <span className="block text-sm font-extrabold text-stone-900 mt-1">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            </div>
          ))}

          {/* Kitchen / Waiter Special Notes Callout */}
          {cookingNotes && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                <ChefHat className="w-4 h-4 text-amber-700" />
                <span>Special Instructions for Kitchen / Waiter:</span>
              </div>
              <p className="text-sm font-medium text-amber-950">
                "{cookingNotes}"
              </p>
            </div>
          )}

        </div>

        {/* Bill Grand Total Bar */}
        <div className="p-6 bg-stone-50 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Total Ordered Items
              </span>
              <span className="text-sm font-bold text-stone-800">
                {cartCount} Dishes
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                Estimated Order Amount
              </span>
              <span className="text-3xl font-black text-brand-700 font-display">
                ₹{cartTotal}
              </span>
            </div>
          </div>

          {/* Bottom Actions: Edit Order, Copy Slip, Print */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                onClose();
                onEditOrder();
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs sm:text-sm font-bold hover:bg-stone-100 active:scale-95 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Modify Order</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs sm:text-sm font-bold active:scale-95 transition-all"
                title="Copy order text"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Order Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-600" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs sm:text-sm font-bold active:scale-95 transition-all"
                title="Print order slip"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print Slip</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-card active:scale-95 transition-all"
              >
                Done
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
