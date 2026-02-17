import React from 'react';
import { 
  LayoutGrid, 
  Users, 
  FilePlus, 
  User, 
  LogOut 
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  // Aapke bataye huye options: Login Data aur Govt Schemes add karne ke liye
  const menuItems = [
    { id: 'logins', name: 'Login Data', icon: <Users size={22} /> },
    { id: 'schemes', name: 'Manage Schemes', icon: <FilePlus size={22} /> },
  ];

  return (
    <div className="w-72 bg-white h-screen fixed left-0 top-0 flex flex-col border-r border-slate-100 shadow-sm z-10">
      {/* Logo Section with logo.png */}
      <div className="p-1 flex justify-center">
        <img 
          src="/logo.png" 
          alt="KisanHub Logo" 
          className="h-24 w-auto object-contain" 
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${
              activeTab === item.id 
              ? 'bg-green-50 text-green-600 font-bold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700 font-small'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-green-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {item.icon}
            </span>
            <span className="text-lg leading-none pt-0.5">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-50">
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold group">
          <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-lg">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;