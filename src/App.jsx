import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import FeaturedDishes from './components/FeaturedDishes';
import MenuSection from './components/MenuSection';
import RestaurantInfo from './components/RestaurantInfo';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import WaiterViewModal from './components/WaiterViewModal';
import MobileOrderBar from './components/MobileOrderBar';

import {
  loadSavedOrder,
  saveOrderToStorage,
  loadSavedTable,
  saveTableToStorage,
  loadSavedNotes,
  saveNotesToStorage,
  clearOrderStorage
} from './utils/storage';

export default function App() {
  // Order state persisted in localStorage
  const [cartItems, setCartItems] = useState(() => loadSavedOrder());
  const [tableNumber, setTableNumber] = useState(() => loadSavedTable());
  const [cookingNotes, setCookingNotes] = useState(() => loadSavedNotes());

  // UI modal states
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isWaiterViewOpen, setIsWaiterViewOpen] = useState(false);

  // Active navigation & menu filtering
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sync to localStorage
  useEffect(() => {
    saveOrderToStorage(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveTableToStorage(tableNumber);
  }, [tableNumber]);

  useEffect(() => {
    saveNotesToStorage(cookingNotes);
  }, [cookingNotes]);

  // Derived totals
  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const cartCount = useMemo(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (item) => {
    const key = item.cartKey || (item.selectedPortion ? `${item.id}-${item.selectedPortion}` : item.id);
    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartKey === key);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartKey: key,
          quantity: 1,
        }
      ];
    });
  };

  const handleUpdateQuantity = (cartKey, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartKey);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartKey === cartKey ? { ...i, quantity: newQuantity } : i))
    );
  };

  const handleRemoveItem = (cartKey) => {
    setCartItems((prev) => prev.filter((i) => i.cartKey !== cartKey));
  };

  const handleClearOrder = () => {
    setCartItems([]);
    setCookingNotes('');
    clearOrderStorage();
  };

  // Navigation actions
  const handleExploreMenu = () => {
    setActiveTab('menu');
    setSelectedCategory('all');
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreThalis = () => {
    setActiveTab('thalis');
    const el = document.getElementById('thalis');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf7] text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900 pb-16 sm:pb-0">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
        onOpenWaiterView={() => setIsWaiterViewOpen(true)}
      />

      {/* Main App Content */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <div id="home">
          <HeroBanner
            onExploreMenu={handleExploreMenu}
            onExploreThalis={handleExploreThalis}
            onOpenOrder={() => setIsOrderDrawerOpen(true)}
            cartCount={cartCount}
          />
        </div>

        {/* Featured Specialties */}
        <FeaturedDishes
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

        {/* Interactive Food Menu */}
        <MenuSection
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateQuantity={handleUpdateQuantity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Restaurant Heritage, Special Thalis, Amenities & Contact */}
        <RestaurantInfo
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />

      </main>

      {/* Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Floating Order Bar on Mobile Screen */}
      <MobileOrderBar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
        onOpenWaiterView={() => setIsWaiterViewOpen(true)}
      />

      {/* Slide-out Order Review Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        cookingNotes={cookingNotes}
        setCookingNotes={setCookingNotes}
        onOpenWaiterView={() => {
          setIsOrderDrawerOpen(false);
          setIsWaiterViewOpen(true);
        }}
        cartTotal={cartTotal}
        cartCount={cartCount}
      />

      {/* High-contrast Waiter View Slip Modal */}
      <WaiterViewModal
        isOpen={isWaiterViewOpen}
        onClose={() => setIsWaiterViewOpen(false)}
        cartItems={cartItems}
        tableNumber={tableNumber}
        setTableNumber={setTableNumber}
        cookingNotes={cookingNotes}
        cartTotal={cartTotal}
        cartCount={cartCount}
        onEditOrder={() => {
          setIsWaiterViewOpen(false);
          setIsOrderDrawerOpen(true);
        }}
      />

    </div>
  );
}
