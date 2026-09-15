import React from 'react';
import {
  Sparkles,
  Flame,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
  Award,
  Heart,
  Plus,
  Check
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurantInfo';
import { MENU_ITEMS } from '../data/menuData';

export default function RestaurantInfo({ onAddToCart, cartItems }) {
  // Grab Thali items for the dedicated Thali section
  const thalis = MENU_ITEMS.filter((item) => item.category === 'thali');

  return (
    <div className="space-y-16 py-12 sm:py-16">
      
      {/* ==================== SPECIAL THALIS SECTION ==================== */}
      <section id="thalis" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Complete Meal Experience
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              MH 14 Signature Thalis
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base">
              Lavish traditional platters served with hot gravies, dry sukha preparations, tandoor rotis, fragrant rice, and refreshing accompaniments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thalis.map((thali) => {
              const inCart = cartItems.find((c) => c.cartKey === thali.id);
              const quantity = inCart ? inCart.quantity : 0;

              return (
                <div
                  key={thali.id}
                  className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 shadow-soft hover:shadow-card transition-all duration-200 flex flex-col justify-between relative overflow-hidden group hover:border-amber-400"
                >
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100 to-transparent -mr-8 -mt-8 rounded-full pointer-events-none" />

                  {thali.badge && (
                    <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                      {thali.badge}
                    </span>
                  )}

                  <div>
                    {/* Dietary badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`w-4 h-4 border ${
                          thali.isVeg ? 'border-emerald-600' : 'border-rose-700'
                        } rounded-xs p-0.5 flex items-center justify-center`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            thali.isVeg ? 'bg-emerald-600' : 'bg-rose-700'
                          }`}
                        />
                      </span>
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        {thali.isVeg ? 'Vegetarian Thali' : 'Non-Veg Thali'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-stone-900 font-display group-hover:text-brand-800 transition-colors">
                      {thali.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                      {thali.description}
                    </p>
                  </div>

                  {/* Pricing & Add to Order button */}
                  <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-stone-400 block font-medium">Per Thali</span>
                      <span className="text-2xl font-black text-brand-700">
                        ₹{thali.price}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        onAddToCart({
                          ...thali,
                          cartKey: thali.id,
                          selectedPortion: null,
                          price: thali.price,
                        })
                      }
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 ${
                        quantity > 0
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                          : 'bg-brand-600 hover:bg-brand-700 text-white'
                      }`}
                    >
                      {quantity > 0 ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Added ({quantity})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add Thali</span>
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

      {/* ==================== ABOUT & STORY SECTION ==================== */}
      <section id="about" className="scroll-mt-20 bg-gradient-to-b from-stone-50 to-white py-12 sm:py-16 border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col: Story */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                <Heart className="w-3.5 h-3.5 text-amber-600" />
                Our Story & Heritage
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
                Rooted in MH 14, Crafted for Families
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                MH 14 Family Restaurant was born out of a genuine passion for traditional Maharashtrian hospitality and bold rustic flavors. Inspired by the age-old earthen hearth (chulha) where gravies simmer slowly in clay pots, we preserve the authentic textures and aroma of fresh spices ground every morning.
              </p>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Whether you crave the fiery kick of Kolhapuri rassa, the rich coconut notes of Malwani masala, a sizzling platter of charcoal-smoked tandoori chicken, or a comforting family veg feast, our kitchen prepares every recipe with the care of home cooking.
              </p>

              {/* Stats Grid */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {restaurantInfo.stats.map((stat, i) => (
                  <div key={i} className="bg-white p-3.5 rounded-2xl border border-stone-200/90 text-center shadow-xs">
                    <span className="text-xl sm:text-2xl font-black text-brand-700 font-display block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold text-stone-500 mt-0.5 block">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Amenities Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {restaurantInfo.amenities.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-soft hover:shadow-card transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm mb-3 border border-amber-200">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ==================== CONTACT & TIMINGS ==================== */}
      <section id="contact" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-r from-amber-50 via-white to-stone-50 rounded-3xl border-2 border-amber-200/90 p-6 sm:p-10 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs border border-amber-200">
                  <MapPin className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base font-display">
                    Our Location
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    {restaurantInfo.location}
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                    Dine-in • Takeaway
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs border border-amber-200">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base font-display">
                    Opening Hours
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-900 font-bold mt-1">
                    {restaurantInfo.timing}
                  </p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {restaurantInfo.days}
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    Lunch & Dinner Service
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 shadow-xs border border-amber-200">
                  <Phone className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-base font-display">
                    Table Inquiries & Booking
                  </h4>
                  <div className="mt-1 space-y-0.5">
                    <a
                      href={`tel:${restaurantInfo.phone}`}
                      className="text-xs sm:text-sm font-bold text-brand-700 hover:underline block"
                    >
                      {restaurantInfo.phone}
                    </a>
                    <a
                      href={`tel:${restaurantInfo.altPhone}`}
                      className="text-xs sm:text-sm font-bold text-stone-700 hover:underline block"
                    >
                      {restaurantInfo.altPhone}
                    </a>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">
                    Feel free to call our captain for table reservations.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
