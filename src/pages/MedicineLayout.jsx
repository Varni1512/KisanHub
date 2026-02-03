import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Pill, ShoppingCart, User, LogOut, Menu, Bell, ChevronRight, ShoppingBag } from 'lucide-react';

const MedicineLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  

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
        className={`${isSidebarOpen ? 'w-64' : 'w-20'
          } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed h-full z-20 shadow-sm`}
      >
        {/* Sidebar Header / Logo */}
        <div
          className="h-20 flex items-center justify-center px-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => navigate('/medicine/dashboard')}
        >
          {isSidebarOpen ? (
            <div className="w-full flex justify-center">
              {/* Full Width Logo Logic */}
              <img
                src="/logo.png"
                alt="Logo"
                className="w-48 max-h-20 object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 flex items-center justify-center">
              {/* Collapsed Small Logo */}
              <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {/* Toggle Button for Collapsed View (Only visible when collapsed) */}
          {!isSidebarOpen && (
            <div className="flex justify-center mb-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <Menu size={20} />
              </button>
            </div>
          )}

          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center p-3 text-sm font-semibold rounded-xl transition-all duration-200 group relative cursor-pointer ${isActive
                    ? 'bg-green-50 text-green-700 font-semibold'
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


          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 rounded-full transition-colors cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors group">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200">
                G
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-bold text-slate-700 leading-none group-hover:text-green-700 transition-colors">Gupta Agri</p>
                <p className="text-[10px] text-slate-400 font-medium">Store Admin</p>
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