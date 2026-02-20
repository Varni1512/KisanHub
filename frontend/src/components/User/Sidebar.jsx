import React from 'react';
import { LayoutDashboard, ShoppingBag, ClipboardList, ShoppingCart, MessageSquare, User as UserIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Browse Products', icon: <ShoppingBag size={20} /> },
    { name: 'My Orders', icon: <ClipboardList size={20} /> },
    // { name: 'Cart', icon: <ShoppingCart size={20} /> },
    { name: 'Messages', icon: <MessageSquare size={20} /> },
    { name: 'Profile', icon: <UserIcon size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-2">
        <div className="flex items-center gap-2 mb-2">
          <img src="/logo.png" alt="Logo" className="h-18 w-auto" />
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center cursor-pointer gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all ${activeTab === item.name
                ? 'bg-green-600 text-white shadow-lg shadow-green-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-green-600'
              }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer text-red-500 w-full px-4 py-3 hover:bg-red-50 rounded-xl transition-colors font-semibold">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;