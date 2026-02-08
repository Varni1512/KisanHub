import React, { useState, useRef, useEffect } from 'react';
import {
  User, MapPin, Phone, LandPlot, ShieldCheck, Edit3, Camera,
  Wallet, ShoppingBag, History, Tractor, ChevronRight, X, Plus
} from 'lucide-react';
import { farmerProfileAPI, ordersAPI, marketplaceOrdersAPI, rentalRequestsAPI, uploadAPI } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const FarmerProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const profileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?._id;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newCrop, setNewCrop] = useState('');

  const [medicineOrders, setMedicineOrders] = useState([]);
  const [marketplaceOrders, setMarketplaceOrders] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);

  const farmerData = {
    name: profile?.name || user?.name || '',
    location: profile?.location || user?.state || '',
    phone: profile?.phone || '',
    email: profile?.email || user?.email || '',
    landSize: profile?.landSize || '',
    primaryCrops: profile?.primaryCrops || [],
    experience: profile?.experience || '',
    verified: true,
    totalEarnings: profile?.totalEarnings ?? 0,
    totalSpent: profile?.totalSpent ?? 0,
    profileImg: profile?.profileImg || '',
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      setLoading(true);
      const [profileRes, medRes, mpRes, rentRes] = await Promise.all([
        farmerProfileAPI.get(userId),
        ordersAPI.getByFarmer(userId),
        marketplaceOrdersAPI.getBySeller(userId),
        rentalRequestsAPI.getByOwner(userId),
      ]);
      if (profileRes.success && profileRes.profile) setProfile(profileRes.profile);
      if (medRes.success && medRes.orders) setMedicineOrders(medRes.orders);
      if (mpRes.success && mpRes.orders) setMarketplaceOrders(mpRes.orders);
      if (rentRes.success && rentRes.requests) {
        const accepted = rentRes.requests.filter((r) => r.status === 'Accepted');
        setRentalHistory(accepted);
      }
      setLoading(false);
    };
    fetch();
  }, [userId]);

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;
    setSaving(true);
    try {
      const res = await uploadAPI.image(file);
      if (res.success && res.url) {
        const up = await farmerProfileAPI.update(userId, { profileImg: res.url });
        if (up.success) setProfile((p) => ({ ...p, profileImg: res.url }));
      }
    } catch (err) {
      toast.error('Upload failed');
    }
    setSaving(false);
  };

  const handleSaveProfile = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const res = await farmerProfileAPI.update(userId, {
        name: farmerData.name,
        location: farmerData.location,
        phone: farmerData.phone,
        email: farmerData.email,
        landSize: farmerData.landSize,
        primaryCrops: farmerData.primaryCrops,
        experience: farmerData.experience,
      });
      if (res.success) {
        setProfile(res.profile);
        setShowEditModal(false);
        toast.success('Profile updated!');
      } else toast.error(res.message || 'Update failed');
    } catch (err) {
      toast.error('Something went wrong');
    }
    setSaving(false);
  };

  const addCrop = () => {
    if (newCrop && !farmerData.primaryCrops.includes(newCrop)) {
      setProfile((p) => ({ ...p, primaryCrops: [...(p?.primaryCrops || []), newCrop] }));
      setNewCrop('');
    }
  };

  const removeCrop = (c) => {
    setProfile((p) => ({ ...p, primaryCrops: (p?.primaryCrops || []).filter((x) => x !== c) }));
  };

  const recentOrders = medicineOrders.slice(0, 5).map((o) => ({
    id: o.orderId || o._id,
    item: o.items?.[0]?.name || 'Order',
    date: o.createdAt,
    price: o.total,
    status: o.status,
    img: o.items?.[0]?.img || 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=150',
  }));

  const formatDate = (d) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img
                src={farmerData.profileImg || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Farmer'}`}
                className="w-full h-full rounded-xl object-cover border-2 border-slate-100 shadow-sm"
                alt="profile"
              />
              <button onClick={() => profileInputRef.current?.click()} className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-lg shadow-md border-2 border-white cursor-pointer hover:bg-blue-700 transition">
                <Camera size={14} />
              </button>
              <input type="file" ref={profileInputRef} onChange={handleProfileUpload} className="hidden" accept="image/*" />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-slate-800">{farmerData.name || 'Farmer'}</h2>
              <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Verified Farmer</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <MapPin size={16} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-600">{farmerData.location || '-'}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Phone size={16} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-600">{farmerData.phone || farmerData.email || '-'}</span>
              </div>
            </div>
            <button onClick={() => setShowEditModal(true)} className="w-full mt-6 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm">
              <Edit3 size={16} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => setActiveTab('rentals')}>
              <div className="bg-emerald-50 p-3 rounded-lg text-emerald-600"><Wallet size={20} /></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Earnings</p><h4 className="text-lg font-bold text-slate-800">₹{farmerData.totalEarnings}</h4></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-blue-300 transition-colors" onClick={() => setActiveTab('orders')}>
              <div className="bg-blue-50 p-3 rounded-lg text-blue-600"><ShoppingBag size={20} /></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Spent</p><h4 className="text-lg font-bold text-slate-800">₹{farmerData.totalSpent}</h4></div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="bg-amber-50 p-3 rounded-lg text-amber-600"><LandPlot size={20} /></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Land Size</p><h4 className="text-lg font-bold text-slate-800">{farmerData.landSize || '-'} Acres</h4></div>
            </div>
          </div>

          <div className="space-y-6">
            {(activeTab === 'all' || activeTab === 'orders') && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide"><History size={16} className="text-blue-600" /> Medicine Orders</h3>
                  {activeTab === 'all' ? (
                    <button onClick={() => setActiveTab('orders')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">VIEW ALL <ChevronRight size={14} /></button>
                  ) : (
                    <button onClick={() => setActiveTab('all')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">BACK TO OVERVIEW</button>
                  )}
                </div>
                <div className="space-y-3">
                  {recentOrders.length === 0 ? (
                    <p className="text-slate-500 text-sm">No medicine orders yet.</p>
                  ) : (
                    recentOrders.map((o) => (
                      <div key={o.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between hover:bg-white transition-all shadow-sm">
                        <div className="flex items-center gap-3">
                          <img src={o.img} className="w-12 h-12 rounded-lg object-cover border" alt="p" />
                          <div><h4 className="font-bold text-slate-800 text-xs">{o.item}</h4><p className="text-[10px] text-slate-400 font-bold mt-0.5">{formatDate(o.date)}</p></div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-slate-900">₹{o.price}</p>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${o.status === 'Completed' || o.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{o.status}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'rentals') && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide"><Tractor size={16} className="text-blue-600" /> Rental Income</h3>
                  {activeTab === 'all' ? (
                    <button onClick={() => setActiveTab('rentals')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">DASHBOARD <ChevronRight size={14} /></button>
                  ) : (
                    <button onClick={() => setActiveTab('all')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">BACK TO OVERVIEW</button>
                  )}
                </div>
                <div className="space-y-3">
                  {rentalHistory.length === 0 ? (
                    <p className="text-slate-500 text-sm">No rental income yet.</p>
                  ) : (
                    rentalHistory.map((r) => (
                      <div key={r._id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between hover:bg-white transition-all shadow-sm">
                        <div className="flex items-center gap-3">
                          <img src={r.item?.img || 'https://images.unsplash.com/photo-1594913785162-e6786b42dea3?auto=format&fit=crop&w=150'} className="w-12 h-12 rounded-lg object-cover border" alt="m" />
                          <div><h4 className="font-bold text-slate-800 text-xs">{r.item?.name || 'Rental'}</h4><p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase">By: {r.renter?.name || 'Renter'}</p></div>
                        </div>
                        <div className="text-right text-xs"><p className="font-bold text-emerald-600">+₹{r.item?.price * (r.duration || 1)}</p><p className="text-[9px] text-slate-400 font-bold">{formatDate(r.createdAt)}</p></div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">Edit Profile & Land</h2>
              <button onClick={() => setShowEditModal(false)} className="cursor-pointer p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label><input type="text" value={farmerData.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label><input type="text" value={farmerData.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Land Size (Acres)</label><input type="number" value={farmerData.landSize} onChange={(e) => setProfile((p) => ({ ...p, landSize: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Experience</label><input type="text" value={farmerData.experience} onChange={(e) => setProfile((p) => ({ ...p, experience: e.target.value }))} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none" /></div>
            </div>
            <div className="space-y-1 mb-6">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Manage Crops</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Add crop..." value={newCrop} onChange={(e) => setNewCrop(e.target.value)} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                <button onClick={addCrop} className="bg-blue-600 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-700 transition shadow-md"><Plus size={18} /></button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {(farmerData.primaryCrops || []).map((c) => (
                  <span key={c} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-[10px] font-bold border border-blue-100 flex items-center gap-1">{c} <X size={12} className="cursor-pointer hover:text-rose-500" onClick={() => removeCrop(c)} /></span>
                ))}
              </div>
            </div>
            <button onClick={handleSaveProfile} disabled={saving} className="w-full bg-[#0f172a] text-white py-3 rounded-xl font-bold text-xs cursor-pointer hover:bg-blue-600 transition-all shadow-md active:scale-95 disabled:opacity-70">
              {saving ? <Loader2 size={16} className="animate-spin mx-auto" /> : 'SAVE CHANGES'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;
