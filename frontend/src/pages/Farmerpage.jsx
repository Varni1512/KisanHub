import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, Bell, MessageCircle } from 'lucide-react';
import Sidebar from '../components/Farmer/Sidebar';
import Marketplace from '../components/Farmer/Marketplace';
import WeatherSection from '../components/Farmer/WeatherSection';
import GovtSchemes from '../components/Farmer/GovtSchemes';
import MedicineShop from '../components/Farmer/MedicineShop';
import RentalHub from '../components/Farmer/RentalHub';
import FarmerProfile from '../components/Farmer/FarmerProfile';
import FarmerOrders from '../components/Farmer/FarmerOrders';
import GoogleTranslate from '../components/Landing/Language';
import { marketplaceOrdersAPI } from '../utils/api';

const Farmer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sell');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user?._id) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.role !== 'Farmer') {
      const routes = { User: '/user', Seller: '/user', 'Medicine Shopkeeper': '/medicine', Admin: '/admin' };
      navigate(routes[user.role] || '/user', { replace: true });
    }
  }, [user?._id, user?.role, navigate]);

  useEffect(() => {
    if (!user?._id) return;
    marketplaceOrdersAPI.getBySeller(user._id).then((res) => {
      if (res.success && res.orders) {
        const pending = res.orders.filter((o) => o.status === 'Pending').length;
        setCartCount(pending);
      }
    });
  }, [user?._id, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <FarmerProfile />;
      case 'sell': return <Marketplace />;
      case 'rent': return <RentalHub />;
      case 'weather': return <WeatherSection />;
      case 'schemes': return <GovtSchemes />;
      case 'medicine': return <MedicineShop />;
      case 'orders': return <FarmerOrders />;
      default: return <FarmerProfile />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* 1. Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-white animate-in slide-in-from-left duration-300"
            onClick={e => e.stopPropagation()}
          >
            <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }} />
          </div>
        </div>
      )}

      {/* 2. Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 border-r bg-white shadow-sm">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* 3. Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col">

        {/* Navbar (Stays at top) */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

          </div>

          {/* Top Right Icons (Matching your image) */}
          <div className="flex items-center gap-3 md:gap-5">
            <GoogleTranslate defaultState={user?.state} />
            <button className="p-2 text-slate-500 cursor-pointer hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-all shadow-sm active:scale-95"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-bold">{cartCount} Orders</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Floating Help Button (Optional) */}
        {/* <a 
          href="#" 
          className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform z-40"
        >
          <MessageCircle size={24} fill="currentColor" />
        </a> */}
      </div>
    </div>
  );
};

export default Farmer;