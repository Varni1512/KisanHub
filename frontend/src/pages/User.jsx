import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, Bell } from 'lucide-react';
import Dashboard from '../components/User/Dashboard';
import BrowseProducts from '../components/User/BrowseProducts';
import Cart from '../components/User/Cart';
import Orders from '../components/User/Orders';
import Messages from '../components/User/Messages';
import Sidebar from '../components/User/Sidebar';
import Profile from '../components/User/Profile';
import GoogleTranslate from '../components/Landing/Language';

const CART_KEY = 'kisanhub_marketplace_cart';

const User = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem(CART_KEY) || '[]'));
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user?._id) {
      navigate('/login', { replace: true });
      return;
    }
    if (user.role === 'Farmer') {
      navigate('/farmer', { replace: true });
      return;
    }
    if (user.role === 'Medicine Shopkeeper') navigate('/medicine', { replace: true });
    if (user.role === 'Admin') navigate('/admin', { replace: true });
  }, [user?._id, user?.role, navigate]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p._id === item._id);
      if (exists) {
        return prev.map((p) => (p._id === item._id ? { ...p, qty: Math.min((p.qty || 1) + 1, p.stock || 999) } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((p) => (p._id === id ? { ...p, qty: Math.max(1, (p.qty || 1) + delta) } : p)).filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p._id !== id));
  };

  const clearCart = () => setCartItems([]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <Dashboard />;
      case 'Browse Products': return <BrowseProducts addToCart={addToCart} />;
      case 'Cart': return <Cart cartItems={cartItems} updateCartQty={updateCartQty} removeFromCart={removeFromCart} clearCart={clearCart} setActiveTab={setActiveTab} />;
      case 'My Orders': return <Orders />;
      case 'Messages': return <Messages />;
      case 'Profile': return <Profile />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="w-72 h-full bg-white animate-in slide-in-from-left duration-300" onClick={e => e.stopPropagation()}>
             <Sidebar activeTab={activeTab} setActiveTab={(tab) => {setActiveTab(tab); setIsMobileMenuOpen(false);}} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 border-r bg-white">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-72 flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b h-16 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 hover:bg-slate-100 rounded-lg" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            
          </div>
          
          <div className="flex items-center gap-3 md:gap-5">
          <GoogleTranslate defaultState={user?.state} />
            <button className="p-2 text-slate-500 cursor-pointer hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button onClick={() => setActiveTab('Cart')} className="flex cursor-pointer items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-all shadow-sm">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-bold">{cartItems.length} Items</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 md:p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default User;