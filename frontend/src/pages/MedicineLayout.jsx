import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, User, LogOut, Bell, ChevronRight, ShoppingBag, Package } from 'lucide-react';
import GoogleTranslate from '../components/Landing/Language';
import { shopProfileAPI, ordersAPI } from '../utils/api';

const MedicineLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const shopkeeperId = user?._id;

  useEffect(() => {
    if (!shopkeeperId) return;
    shopProfileAPI.get(shopkeeperId).then((res) => {
      if (res.success && res.profile) setProfile(res.profile);
    });
  }, [shopkeeperId]);

  useEffect(() => {
    if (!shopkeeperId) return;
    ordersAPI.getByShopkeeper(shopkeeperId).then((res) => {
      if (res.success && res.orders) {
        const notifs = (res.orders || []).slice(0, 8).map((o) => ({
          id: o._id,
          text: o.status === 'Pending' ? `New order ${o.orderId} from ${o.farmer?.name || 'Farmer'}` : `Order ${o.orderId} ${o.status.toLowerCase()}`,
          time: o.createdAt,
          type: o.status === 'Pending' ? 'new' : 'info',
        }));
        setNotifications(notifs);
      }
    });
  }, [shopkeeperId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = profile?.shopName || profile?.ownerName || user?.name || 'Shopkeeper';
  const displaySub = profile?.shopName ? 'Store Admin' : 'Store Admin';
  const avatarLetter = (displayName || 'S')[0].toUpperCase();
  const avatarImg = profile?.logoImg;

  const formatTime = (d) => {
    if (!d) return '';
    const date = new Date(d);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  // --- Default Dashboard Logic ---
  // Agar path sirf '/medicine' ya '/medicine/' hai, toh auto-redirect to dashboard
  useEffect(() => {
    if (location.pathname === '/medicine' || location.pathname === '/medicine/') {
      navigate('/medicine/dashboard', { replace: true });
    }
  }, [location, navigate]);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/medicine/dashboard' },
    { name: 'My Products', icon: ShoppingBag, path: '/medicine/products' },
    { name: 'Orders', icon: ShoppingCart, path: '/medicine/orders' },
    { name: 'Profile', icon: User, path: '/medicine/profile' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-full z-20 shadow-sm`}
      >
        {/* Sidebar Header / Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-slate-100">
          {isSidebarOpen ? (
            <div 
              className="flex-1 flex justify-center cursor-pointer" 
              onClick={() => navigate('/medicine/dashboard')}
            >
              <img src="/logo.png" alt="Logo" className="w-70 max-h-24 object-contain" />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              {/* <img src="/logo.png" alt="Logo" className="h-12 w-auto object-contain" /> */}
            </div>
          )}
          
          {/* Sidebar Toggle Button (Inside Header) */}
          
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {menuItems.map((item) => {
            // Dashboard selected background logic
            const isActive = location.pathname === item.path;
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3 text-sm font-semibold rounded-xl transition-all duration-200 group relative cursor-pointer ${
                  isActive
                    ? 'bg-green-50 text-green-700' // Click karne wala background
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon
                  size={22}
                  className={`${isActive ? 'text-green-600' : 'text-slate-400 group-hover:text-slate-600'}`}
                />

                {isSidebarOpen && (
                  <span className="ml-3 text-sm">{item.name}</span>
                )}

                {/* Active Indicator Tooltip for collapsed view */}
                {!isSidebarOpen && isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-green-600 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors group cursor-pointer"
          >
            <LogOut size={22} className="group-hover:scale-110 transition-transform" />
            {isSidebarOpen && (
              <span className="ml-3 text-sm font-semibold">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>

        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {/* Page Title showing dynamically based on path */}
            {/* <h2 className="text-lg font-bold text-slate-800 capitalize">
              {location.pathname.split('/').pop()}
            </h2> */}
          </div>

          <div className="flex items-center gap-4">
          <GoogleTranslate defaultState={user?.state} />
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="relative p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
              >
                <Bell size={20} />
                {notifications.some(n => n.type === 'new') && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <h4 className="font-bold text-slate-800">Notifications</h4>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="px-4 py-8 text-slate-500 text-sm text-center">No notifications yet</p>
                  ) : (
                    <div className="divide-y divide-slate-50">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => { navigate('/medicine/orders'); setShowNotif(false); }}
                          className="px-4 py-3 hover:bg-slate-50 flex gap-3 cursor-pointer"
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${n.type === 'new' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                            <Package size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-slate-800 truncate">{n.text}</p>
                            <p className="text-xs text-slate-400">{formatTime(n.time)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="h-8 w-px bg-slate-200"></div>

            <div 
              onClick={() => navigate('/medicine/profile')}
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors group"
            >
              {/* <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200 overflow-hidden shrink-0">
                {avatarImg ? (
                  <img src={avatarImg} alt="" className="w-full h-full object-cover" />
                ) : (
                  avatarLetter
                )}
              </div> */}
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-700 leading-none group-hover:text-green-700 transition-colors">{displayName}</p>
                <p className="text-[10px] text-slate-400 font-medium">{displaySub}</p>
              </div>
              <ChevronRight size={16} className="text-slate-400 hidden md:block group-hover:text-green-600 transition-colors" />
            </div>
          </div>
        </header>

        {/* Dynamic Content (Outlet) */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-64px)] bg-slate-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MedicineLayout;