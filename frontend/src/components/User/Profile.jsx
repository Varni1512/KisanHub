import React, { useState } from 'react';
import { 
  User, MapPin, Mail, Phone, ShoppingBag, Settings, 
  LogOut, Camera, ChevronRight, Wallet, X, Check, Trash2, Plus, Pencil
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  // --- User State ---
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    location: "Chandigarh, India",
    balance: "1,250.00",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  });

  // --- Address State ---
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', address: '123, Green Park Avenue, Sector 45, Chandigarh', isDefault: true }
  ]);
  
  const [currentAddress, setCurrentAddress] = useState({ id: null, type: '', address: '' });

  // Sidebar Menu Items (Sare ke sare wapas)
  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: <User size={18} /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  const openEditAddress = (addr) => {
    setCurrentAddress(addr);
    setShowAddressModal(true);
  };

  const saveAddress = () => {
    if (currentAddress.id) {
      setAddresses(addresses.map(a => a.id === currentAddress.id ? currentAddress : a));
    } else {
      setAddresses([...addresses, { ...currentAddress, id: Date.now(), isDefault: false }]);
    }
    setShowAddressModal(false);
  };

  return (
    <div className="bg-gray-50 p-4 md:p-1 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100 flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <img src={userData.avatar} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-sm" />
                  <button className="absolute bottom-0 right-0 bg-white p-1.5 cursor-pointer rounded-full border border-gray-200 text-slate-600 hover:text-green-600 shadow-sm">
                    <Camera size={12} />
                  </button>
                </div>
                <h2 className="font-bold text-slate-900">{userData.name}</h2>
                <p className="text-xs text-slate-500">{userData.email}</p>
              </div>

              <nav className="p-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-md text-sm font-medium transition-colors mb-1 ${
                      activeTab === item.id 
                        ? 'bg-green-50 text-green-700' 
                        : `${item.color || 'text-slate-600'} hover:bg-gray-50 hover:text-slate-900`
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-6">
            
            {/* Personal Information Card - SARE FIELDS WAPAS HAIN */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Personal Information</h3>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="text-sm text-green-600 cursor-pointer font-medium hover:underline">Edit</button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setIsEditing(false)} className="text-sm text-slate-400 cursor-pointer">Cancel</button>
                    <button onClick={handleSaveProfile} className="text-sm text-green-600 cursor-pointer font-bold">Save Changes</button>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            name="name"
                            disabled={!isEditing}
                            type="text" 
                            value={userData.name} 
                            onChange={handleInputChange}
                            className={`w-full pl-9 pr-3 py-2 border rounded-md text-sm transition-colors outline-none ${isEditing ? 'border-green-500 ring-1 ring-green-500' : 'bg-gray-50 border-gray-300 text-slate-500'}`}
                        />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            disabled
                            type="email" 
                            value={userData.email} 
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-slate-500 cursor-not-allowed"
                        />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            name="phone"
                            disabled={!isEditing}
                            type="tel" 
                            value={userData.phone} 
                            onChange={handleInputChange}
                            className={`w-full pl-9 pr-3 py-2 border rounded-md text-sm transition-colors outline-none ${isEditing ? 'border-green-500 ring-1 ring-green-500' : 'bg-gray-50 border-gray-300 text-slate-500'}`}
                        />
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">City / Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 text-slate-400" size={16} />
                        <input 
                            name="location"
                            disabled={!isEditing}
                            type="text" 
                            value={userData.location} 
                            onChange={handleInputChange}
                            className={`w-full pl-9 pr-3 py-2 border rounded-md text-sm transition-colors outline-none ${isEditing ? 'border-green-500 ring-1 ring-green-500' : 'bg-gray-50 border-gray-300 text-slate-500'}`}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Addresses Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Saved Addresses</h3>
                    <button onClick={() => { setCurrentAddress({id: null, type: '', address: ''}); setShowAddressModal(true); }} className="text-sm text-green-600 cursor-pointer font-medium hover:underline">+ Add New</button>
                </div>
                <div className="p-6">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="flex items-start justify-between border border-green-200 bg-green-50/30 p-4 rounded-md mb-4">
                        <div className="flex gap-3">
                          <MapPin className="text-green-600 mt-1" size={18} />
                          <div>
                              <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-slate-900">{addr.type}</span>
                                  {addr.isDefault && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Default</span>}
                              </div>
                              <p className="text-sm text-slate-600">{addr.address}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => openEditAddress(addr)} className="text-slate-400 cursor-pointer hover:text-green-600">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))} className="text-slate-400 cursor-pointer hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        </div>
                      </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">{currentAddress.id ? 'Edit Address' : 'Add New Address'}</h3>
              <button onClick={() => setShowAddressModal(false)} className="text-slate-400 cursor-pointer"><X /></button>
            </div>
            <div className="space-y-4">
              <input 
                placeholder="Label (e.g. Home, Office)" 
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-green-500"
                value={currentAddress.type}
                onChange={(e) => setCurrentAddress({...currentAddress, type: e.target.value})}
              />
              <textarea 
                placeholder="Full Address" 
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-green-500 h-24"
                value={currentAddress.address}
                onChange={(e) => setCurrentAddress({...currentAddress, address: e.target.value})}
              />
              <button onClick={saveAddress} className="w-full bg-slate-900 text-white py-2.5 rounded-md font-medium hover:bg-slate-800 cursor-pointer">
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;