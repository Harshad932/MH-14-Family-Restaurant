import React, { useState } from 'react';
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  Phone,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './SocialIcons';
import { restaurantInfo } from '../data/restaurantInfo';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenOrder,
  onOpenWaiterView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Food Menu' },
    { id: 'thalis', label: 'Special Thalis' },
    { id: 'contact', label: 'Contact & Timings' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fdfdfb]/95 backdrop-blur-md border-b border-stone-200/80 shadow-soft transition-all">
      {/* Top micro banner for dine-in quick info */}
      <div className="hidden sm:block bg-amber-50/80 border-b border-amber-100/60 py-1.5 px-4 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              MH 14 Family Restaurant • Lonavala
            </span>
            <span className="hidden md:inline text-stone-300">|</span>
            <span className="hidden md:flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              {restaurantInfo.timing}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Social media icons without external links */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-stone-400 font-medium">Follow:</span>
              <button
                type="button"
                className="w-5 h-5 rounded flex items-center justify-center text-pink-600 hover:text-pink-700 transition-colors cursor-default"
                title="Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-5 h-5 rounded flex items-center justify-center text-red-600 hover:text-red-700 transition-colors cursor-default"
                title="YouTube"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-stone-300">•</span>

            <a
              href={`tel:${restaurantInfo.phoneRaw}`}
              className="flex items-center gap-1 font-semibold text-brand-800 hover:underline transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              {restaurantInfo.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden p-0.5 bg-amber-100/60 border border-amber-300/80 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="MH 14 Family Restaurant Logo"
                className="w-full h-full object-contain rounded-full bg-white"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-bold tracking-tight text-stone-900 font-display">
                  MH 14
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                  Lonavala
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-stone-600 -mt-0.5">
                Family Restaurant
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-amber-100/80 text-amber-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Order Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Waiter View Button if order has items */}
            {cartCount > 0 && (
              <button
                onClick={onOpenWaiterView}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg shadow-xs transition-colors"
                title="Show formatted order summary to waiter"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Show to Waiter</span>
              </button>
            )}

            {/* View Order Drawer Button */}
            <button
              onClick={onOpenOrder}
              className={`relative flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                cartCount > 0
                  ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-card active:scale-98'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
              aria-label="View Order"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="hidden sm:inline text-xs leading-none opacity-90">
                  {cartCount > 0 ? 'Selected Order' : 'Order (0)'}
                </span>
                <span className="font-bold text-xs sm:text-sm leading-tight">
                  {cartCount > 0 ? `₹${cartTotal}` : 'Empty'}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-5 shadow-lg animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium text-left transition-colors ${
                  activeTab === link.id
                    ? 'bg-amber-100/80 text-amber-900 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2.5 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Timings: {restaurantInfo.timing}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{restaurantInfo.location}</span>
            </div>

            {/* Socials on mobile */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-stone-500 font-medium">Follow:</span>
              <button
                type="button"
                className="flex items-center gap-1 text-pink-600 font-semibold cursor-default"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1 text-red-600 font-semibold cursor-default"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>YouTube</span>
              </button>
            </div>

            <div className="flex flex-col gap-1 pt-2">
              <a
                href={`tel:${restaurantInfo.phoneRaw}`}
                className="flex items-center gap-2 text-brand-700 font-bold"
              >
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Call: {restaurantInfo.phone}</span>
              </a>
              <a
                href={`tel:${restaurantInfo.altPhoneRaw}`}
                className="flex items-center gap-2 text-stone-700 font-bold"
              >
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Call: {restaurantInfo.altPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
