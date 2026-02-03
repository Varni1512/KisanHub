import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Camera,
  ChevronRight,
  Wallet
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Chandigarh, India",
    balance: "1,250.00",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-1 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Sidebar - Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <img src={user.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" />
                  <button className="absolute bottom-0 right-0 bg-white p-1.5 cursor-pointer rounded-full border border-gray-200 text-slate-600 hover:text-green-600 shadow-sm">
                    <Camera size={12} />
                  </button>
                </div>
                <h2 className="font-bold text-slate-900">{user.name}</h2>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>

              <nav className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md text-sm font-medium transition-colors mb-1 ${
                      activeTab === item.id 
                        ? 'bg-green-50 text-green-700' 
                        : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 space-y-6">
            
            {/* Profile Form */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Personal Information</h3>
                <button className="text-sm text-green-600 cursor-pointer font-medium hover:underline">Edit</button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            defaultValue={user.name} 
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            type="email" 
                            defaultValue={user.email} 
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-slate-500 cursor-not-allowed"
                            disabled
                        />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            type="tel" 
                            defaultValue={user.phone} 
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">City / Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            defaultValue={user.location} 
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                        />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                    <button className="bg-slate-900 cursor-pointer text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                        Save Changes
                    </button>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Saved Addresses</h3>
                    <button className="text-sm text-green-600 cursor-pointer font-medium hover:underline">+ Add New</button>
                </div>
                <div className="p-6">
                    <div className="flex items-start justify-between border border-green-200 bg-green-50/30 p-4 rounded-md">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-slate-900">Home</span>
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Default</span>
                            </div>
                            <p className="text-sm text-slate-600">123, Green Park Avenue, Sector 45, Chandigarh</p>
                        </div>
                        <button className="text-slate-400 cursor-pointer hover:text-slate-600">
                            <Settings size={16} />
                        </button>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;