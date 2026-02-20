import React, { useState, useRef } from 'react';
import { 
  User, MapPin, Phone, Mail, LandPlot, Award, 
  ShieldCheck, Edit3, Camera, ShoppingBag, 
  Tractor, History, ArrowUpRight, Wallet, 
  CheckCircle2, X, Save, Plus, ChevronRight
} from 'lucide-react';

const FarmerProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'orders', 'rentals'
  const profileInputRef = useRef(null);
  
  const [farmerData, setFarmerData] = useState({
    name: "Rajesh Kumar",
    location: "Kothri Kalan, Madhya Pradesh",
    phone: "+91 98765 43210",
    email: "rajesh.kisan@example.com",
    landSize: "12",
    primaryCrops: ["Wheat", "Soybean", "Garlic"],
    experience: "15+ Years",
    verified: true,
    totalEarnings: "12,450",
    totalSpent: "4,800",
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
  });

  const [newCrop, setNewCrop] = useState("");

  const recentOrders = [
    { id: 'ORD-99', item: 'Urea Fertilizer', date: '10 FEB 2026', price: '450', status: 'DELIVERED', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=150' },
    { id: 'ORD-82', item: 'Organic Pesticide', date: '02 FEB 2026', price: '1200', status: 'PROCESSING', img: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=150' }
  ];

  const rentalHistory = [
    { id: 'RENT-21', machine: 'Mahindra Tractor', date: '08 FEB 2026', earned: '1500', renter: 'AMIT SINGH', img: 'https://images.unsplash.com/photo-1594913785162-e6786b42dea3?auto=format&fit=crop&w=150' },
    { id: 'RENT-15', machine: 'Water Pump', date: '28 JAN 2026', earned: '600', renter: 'SURESH P.', img: 'https://images.unsplash.com/photo-1594901851141-86971932371a?auto=format&fit=crop&w=150' }
  ];

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setFarmerData({ ...farmerData, profileImg: URL.createObjectURL(file) });
  };

  const btnStyle = "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm";

  return (
    <div className="bg-slate-50/50 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <img src={farmerData.profileImg} className="w-full h-full rounded-xl object-cover border-2 border-slate-100 shadow-sm" alt="profile" />
              <button onClick={() => profileInputRef.current.click()} className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-lg shadow-md border-2 border-white cursor-pointer hover:bg-blue-700 transition">
                <Camera size={14} />
              </button>
              <input type="file" ref={profileInputRef} onChange={handleProfileUpload} className="hidden" accept="image/*" />
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-slate-800">{farmerData.name}</h2>
              <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Verified Farmer</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <MapPin size={16} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-600">{farmerData.location}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <Phone size={16} className="text-blue-500" />
                <span className="text-xs font-semibold text-slate-600">{farmerData.phone}</span>
              </div>
            </div>

            <button onClick={() => setShowEditModal(true)} className={`${btnStyle} w-full mt-6`}>
              <Edit3 size={16} /> Edit Profile
            </button>
          </div>

          
        </div>

        {/* Main Dashboard */}
        <div className="lg:col-span-8 space-y-4">
          {/* Stats Row */}
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
              <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Land Size</p><h4 className="text-lg font-bold text-slate-800">{farmerData.landSize} Acres</h4></div>
            </div>
          </div>

          {/* Conditional Sections Based on Tab */}
          <div className="space-y-6">
            {(activeTab === 'all' || activeTab === 'orders') && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide"><History size={16} className="text-blue-600" /> Medicine Orders</h3>
                  {activeTab === 'all' ? (
                    <button onClick={() => setActiveTab('orders')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">VIEW ALL <ChevronRight size={14}/></button>
                  ) : (
                    <button onClick={() => setActiveTab('all')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">BACK TO OVERVIEW</button>
                  )}
                </div>
                <div className="space-y-3">
                  {recentOrders.map((o) => (
                    <div key={o.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between hover:bg-white transition-all shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={o.img} className="w-12 h-12 rounded-lg object-cover border" alt="p" />
                        <div><h4 className="font-bold text-slate-800 text-xs">{o.item}</h4><p className="text-[10px] text-slate-400 font-bold mt-0.5">{o.date}</p></div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-900">₹{o.price}</p>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${o.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'rentals') && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wide"><Tractor size={16} className="text-blue-600" /> Rental Income</h3>
                  {activeTab === 'all' ? (
                    <button onClick={() => setActiveTab('rentals')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">DASHBOARD <ChevronRight size={14}/></button>
                  ) : (
                    <button onClick={() => setActiveTab('all')} className="text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline cursor-pointer">BACK TO OVERVIEW</button>
                  )}
                </div>
                <div className="space-y-3">
                  {rentalHistory.map((r) => (
                    <div key={r.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between hover:bg-white transition-all shadow-sm">
                      <div className="flex items-center gap-3">
                        <img src={r.img} className="w-12 h-12 rounded-lg object-cover border" alt="m" />
                        <div><h4 className="font-bold text-slate-800 text-xs">{r.machine}</h4><p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase">By: {r.renter}</p></div>
                      </div>
                      <div className="text-right text-xs"><p className="font-bold text-emerald-600">+₹{r.earned}</p><p className="text-[9px] text-slate-400 font-bold">{r.date}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[150] p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-xl p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">Edit Profile & Land</h2>
              <button onClick={() => setShowEditModal(false)} className="cursor-pointer p-1 hover:bg-slate-100 rounded-lg"><X size={20} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label><input type="text" value={farmerData.name} onChange={(e) => setFarmerData({...farmerData, name: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none transition-colors" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label><input type="text" value={farmerData.phone} onChange={(e) => setFarmerData({...farmerData, phone: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none transition-colors" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Land Size (Acres)</label><input type="number" value={farmerData.landSize} onChange={(e) => setFarmerData({...farmerData, landSize: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none" /></div>
              <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Experience</label><input type="text" value={farmerData.experience} onChange={(e) => setFarmerData({...farmerData, experience: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:border-blue-500 outline-none" /></div>
            </div>
            <div className="space-y-1 mb-6">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Manage Crops</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Add crop..." value={newCrop} onChange={(e) => setNewCrop(e.target.value)} className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                <button onClick={() => { if(newCrop) { setFarmerData({...farmerData, primaryCrops: [...farmerData.primaryCrops, newCrop]}); setNewCrop(""); } }} className="bg-blue-600 text-white p-2 rounded-lg cursor-pointer hover:bg-blue-700 transition shadow-md"><Plus size={18}/></button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {farmerData.primaryCrops.map(c => <span key={c} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-[10px] font-bold border border-blue-100 flex items-center gap-1">{c} <X size={12} className="cursor-pointer hover:text-rose-500" onClick={() => setFarmerData({...farmerData, primaryCrops: farmerData.primaryCrops.filter(i => i !== c)})} /></span>)}
              </div>
            </div>
            <button onClick={() => setShowEditModal(false)} className="w-full bg-[#0f172a] text-white py-3 rounded-xl font-bold text-xs cursor-pointer hover:bg-blue-600 transition-all shadow-md active:scale-95">SAVE CHANGES</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerProfile;