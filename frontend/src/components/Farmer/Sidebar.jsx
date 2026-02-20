import React from 'react';
import {
  User,
  ShoppingBag,
  Tractor,
  CloudSun,
  Gavel,
  Pill,
  LogOut,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const menu = [
    { id: 'sell', name: 'Browse Products', icon: <ShoppingBag size={22} /> },
    { id: 'rent', name: 'Rent Hub', icon: <Tractor size={22} /> },
    { id: 'weather', name: 'Weather Forecast', icon: <CloudSun size={22} /> },
    { id: 'schemes', name: 'Govt Schemes', icon: <Gavel size={22} /> },
    { id: 'medicine', name: 'Agro Medicine', icon: <Pill size={22} /> },
    { id: 'orders', name: 'My Orders', icon: <Package size={22} /> },
    { id: 'profile', name: 'Farmer Profile', icon: <User size={22} /> },
  ];

  return (
    <div className="bg-white h-screen fixed left-0 top-0  flex flex-col p-4 z-50">
      {/* Logo Section */}
      <div className="mb-4 px-2">
        <img
          src="/logo.png"
          alt="KisanHub Logo"
          className="h-18 w-auto object-contain"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 cursor-pointer rounded-xl transition-all duration-200 ${activeTab === item.id
                ? 'bg-green-600 text-white shadow-lg shadow-green-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-green-600'
              }`}
          >
            <span className={activeTab === item.id ? 'text-white' : 'text-slate-500 hover:bg-slate-50 hover:text-green-600'}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button at bottom */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => navigate("/")}
          className="w-full flex cursor-pointer items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold">
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;