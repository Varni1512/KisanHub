import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  Loader2
} from 'lucide-react';
import { shopProfileAPI, uploadAPI } from '../../utils/api';

const ShopProfile = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?._id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    category: "Fertilizers & Seeds",
    about: "",
    status: "Open",
    bannerImg: "",
    logoImg: "",
  });
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchProfile = async () => {
      try {
        const res = await shopProfileAPI.get(userId);
        if (res.success && res.profile) {
          setFormData({
            shopName: res.profile.shopName || user.name || "",
            ownerName: res.profile.ownerName || user.name || "",
            email: res.profile.email || user.email || "",
            phone: res.profile.phone || "",
            address: res.profile.address || "",
            category: res.profile.category || "Fertilizers & Seeds",
            about: res.profile.about || "",
            status: res.profile.status || "Open",
            bannerImg: res.profile.bannerImg || "",
            logoImg: res.profile.logoImg || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleImageUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (type === 'banner') setUploadingBanner(true);
    else setUploadingLogo(true);
    try {
      const res = await uploadAPI.image(file);
      if (res.success) {
        setFormData((prev) => ({ ...prev, [type === 'banner' ? 'bannerImg' : 'logoImg']: res.url }));
      } else {
        alert(res.message || 'Upload failed');
      }
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      if (type === 'banner') setUploadingBanner(false);
      else setUploadingLogo(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) return;
    setSaving(true);
    try {
      const res = await shopProfileAPI.update(userId, formData);
      if (res.success) alert('Profile saved successfully');
      else alert(res.message || 'Save failed');
    } catch (err) {
      alert(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 font-sans text-slate-800 pb-10">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-900">Shop Settings</h2>
            <p className="text-slate-500 text-sm">Update your store details and public profile.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-slate-200 hover:bg-green-600 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        
        {/* Banner Section */}
        <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 relative group overflow-hidden">
          {formData.bannerImg ? (
            <img src={formData.bannerImg} alt="Banner" className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
          <label className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-lg hover:bg-white/30 transition-colors border border-white/30 cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'banner')} disabled={uploadingBanner} />
            {uploadingBanner ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
          </label>
        </div>

        {/* Profile Image & Status Bar */}
        <div className="px-8 relative -mt-16 mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
           
           {/* Profile Image / Logo */}
           <div className="relative">
              <div className="w-32 h-32 bg-white rounded-2xl p-1.5 shadow-xl">
                 <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden">
                   {formData.logoImg ? (
                     <img src={formData.logoImg} alt="Logo" className="w-full h-full object-cover" />
                   ) : (
                     <Store size={40} />
                   )}
                 </div>
              </div>
              <label className="absolute bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full border-4 border-white shadow-sm hover:bg-green-700 transition-colors cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logo')} disabled={uploadingLogo} />
                {uploadingLogo ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
              </label>
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
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
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