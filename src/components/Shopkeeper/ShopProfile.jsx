import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Store, 
  Save, 
  Camera, 
  Mail,
  Clock,
  Briefcase,
  ChevronDown // Added for custom dropdown arrow
} from 'lucide-react';

const ShopProfile = () => {
  const [formData, setFormData] = useState({
    shopName: "Gupta Agri Store",
    ownerName: "Rajesh Gupta",
    email: "gupta.agri@example.com",
    phone: "+91 98765 43210",
    address: "Shop No. 12, Main Market, Kothri Kalan, MP",
    category: "Fertilizers & Seeds",
    about: "We provide high quality seeds and fertilizers for all types of crops since 2010.",
    status: "Open"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 font-sans text-slate-800 pb-10">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Shop Settings</h2>
            <p className="text-slate-500 text-sm">Update your store details and public profile.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-green-600 transition-all flex items-center gap-2 cursor-pointer">
            <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        
        {/* Banner Section */}
        <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 relative group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-lg hover:bg-white/30 transition-colors border border-white/30 cursor-pointer">
            <Camera size={20} />
          </button>
        </div>

        {/* Profile Image & Status Bar */}
        <div className="px-8 relative -mt-16 mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
           
           {/* Profile Image */}
           <div className="relative">
              <div className="w-32 h-32 bg-white rounded-2xl p-1.5 shadow-xl">
                 <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                    <Store size={40} />
                 </div>
              </div>
              <button className="absolute bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full border-4 border-white shadow-sm hover:bg-green-700 transition-colors cursor-pointer">
                 <Camera size={16} />
              </button>
           </div>

           {/* IMPROVED STATUS SECTION */}
           <div className="bg-white p-2 pr-3 rounded-xl shadow-md border border-slate-100 flex items-center gap-3 ">
              <div className="flex flex-col items-end px-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Status</span>
                  <span className={`text-xs font-bold ${formData.status === 'Open' ? 'text-green-600' : 'text-red-600'}`}>
                    {formData.status === 'Open' ? 'Store is Online' : 'Store is Offline'}
                  </span>
              </div>
              
              <div className="relative h-full">
                  <select 
                    value={formData.status}
                    onChange={handleChange}
                    name="status"
                    className={`appearance-none pl-4 pr-10 py-2.5 rounded-lg text-sm font-bold outline-none cursor-pointer transition-all shadow-sm ${
                        formData.status === 'Open' 
                        ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100' 
                        : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                    }`}
                  >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                  </select>
                  {/* Custom Arrow Icon */}
                  <ChevronDown 
                    size={16} 
                    className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                        formData.status === 'Open' ? 'text-green-700' : 'text-red-700'
                    }`} 
                  />
              </div>
           </div>
        </div>

        {/* Form Content */}
        <div className="p-8 pt-0">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Section 1: Basic Information */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Basic Information</h3>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Shop Name</label>
                    <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Owner Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Business Category</label>
                    <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <select 
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium appearance-none cursor-pointer"
                        >
                            <option>Fertilizers & Seeds</option>
                            <option>Farm Machinery</option>
                            <option>Pesticides</option>
                            <option>General Store</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">About Shop</label>
                    <textarea 
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium resize-none"
                    ></textarea>
                </div>
            </div>

            {/* Section 2: Contact & Location */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Contact & Location</h3>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium" 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Shop Address</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <textarea 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all font-medium resize-none"
                        ></textarea>
                    </div>
                </div>

                {/* Opening Hours (Static for UI) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                    <Clock className="text-slate-400 w-5 h-5 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-slate-800">Opening Hours</h4>
                        <p className="text-xs text-slate-500 mt-1">Mon - Sat: 09:00 AM - 08:00 PM</p>
                        <p className="text-xs text-red-400 font-medium">Sunday: Closed</p>
                        <button className="text-xs font-bold text-green-600 mt-2 hover:underline cursor-pointer">Edit Hours</button>
                    </div>
                </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;