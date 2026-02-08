import React, { useState, useRef, useEffect } from 'react';
import {
  Tractor, Plus, MapPin, ShieldCheck, X, ImagePlus, CalendarCheck, User,
  Phone, Check, Trash2, Info, Clock, Loader2
} from 'lucide-react';
import { rentalItemsAPI, rentalRequestsAPI, uploadAPI } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';

const RentalHub = () => {
  const [showListModal, setShowListModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(null);
  const [machinery, setMachinery] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const ownerId = user?._id;
  const isFarmer = user?.role === 'Farmer';

  const [newMachine, setNewMachine] = useState({ name: '', price: '', unit: 'Day', type: 'TRACTOR', img: '', location: '' });
  const [bookingForm, setBookingForm] = useState({ renterName: user?.name || '', phone: '', date: '', duration: '1' });

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const [itemsRes, reqRes] = await Promise.all([
        rentalItemsAPI.getAll(),
        ownerId ? rentalRequestsAPI.getByOwner(ownerId) : Promise.resolve({ success: false }),
      ]);
      if (itemsRes.success && itemsRes.items) setMachinery(itemsRes.items);
      if (reqRes.success && reqRes.requests) setIncomingRequests(reqRes.requests);
      setLoading(false);
    };
    fetch();
  }, [ownerId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSaving(true);
    try {
      const res = await uploadAPI.image(file);
      if (res.success && res.url) setNewMachine((prev) => ({ ...prev, img: res.url }));
    } catch (err) {
      toast.error('Upload failed');
    }
    setSaving(false);
  };

  const handleAddMachine = async (e) => {
    e.preventDefault();
    if (!newMachine.name || !newMachine.price || !ownerId || !isFarmer) {
      toast.error('Fill required fields');
      return;
    }
    setSaving(true);
    try {
      const res = await rentalItemsAPI.create({
        name: newMachine.name,
        price: Number(newMachine.price),
        unit: newMachine.unit || 'Day',
        type: newMachine.type || 'TRACTOR',
        img: newMachine.img || '',
        owner: ownerId,
        location: newMachine.location || '',
      });
      if (res.success) {
        setMachinery((prev) => [res.item, ...prev]);
        setShowListModal(false);
        setNewMachine({ name: '', price: '', unit: 'Day', type: 'TRACTOR', img: '', location: '' });
        toast.success('Equipment listed!');
      } else toast.error(res.message || 'Failed');
    } catch (err) {
      toast.error('Something went wrong');
    }
    setSaving(false);
  };

  const handleConfirmBooking = async () => {
    if (!bookingForm.renterName || !bookingForm.phone || !bookingForm.date || !showBookModal || !ownerId) {
      toast.error('Fill all fields');
      return;
    }
    setSaving(true);
    try {
      const res = await rentalRequestsAPI.create({
        item: showBookModal._id,
        renter: ownerId,
        startDate: bookingForm.date,
        duration: Number(bookingForm.duration) || 1,
        durationUnit: showBookModal.unit || 'Day',
        phone: bookingForm.phone,
        renterName: bookingForm.renterName,
      });
      if (res.success) {
        setIncomingRequests((prev) => [res.request, ...prev]);
        setMachinery((prev) => prev.map((m) => (m._id === showBookModal._id ? { ...m, status: 'Booked' } : m)));
        setShowBookModal(null);
        setBookingForm({ renterName: user?.name || '', phone: '', date: '', duration: '1' });
        toast.success('Rental request sent!');
      } else toast.error(res.message || 'Failed');
    } catch (err) {
      toast.error('Something went wrong');
    }
    setSaving(false);
  };

  const handleRespond = async (reqId, status) => {
    const res = await rentalRequestsAPI.respond(reqId, status);
    if (res.success) {
      setIncomingRequests((prev) => prev.map((r) => (r._id === reqId ? { ...r, status } : r)));
      if (status === 'Accepted') {
        const req = incomingRequests.find((r) => r._id === reqId);
        if (req?.item?._id) setMachinery((prev) => prev.map((m) => (m._id === req.item._id ? { ...m, status: 'Booked' } : m)));
      }
      toast.success(status === 'Accepted' ? 'Accepted!' : 'Rejected');
    } else toast.error(res.message || 'Failed');
  };

  const isOwnItem = (item) => item.owner?._id === ownerId || item.owner === ownerId;

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-0 space-y-6 text-slate-900 bg-slate-50/30 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Rental Hub</h1>
          <p className="text-slate-500 text-sm font-medium">Rent equipment or manage your machine requests.</p>
        </div>
        {isFarmer && (
          <button onClick={() => setShowListModal(true)} className="bg-[#0f172a] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-slate-800 transition-all text-sm shadow-sm cursor-pointer">
            <Plus size={18} /> Add New Product
          </button>
        )}
      </div>

      {incomingRequests.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-50 pb-3">
            <Info size={18} className="text-blue-600" />
            <h2 className="font-bold text-xs uppercase tracking-wider text-slate-600">Rental Requests for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incomingRequests.map((req) => (
              <div key={req._id} className={`border p-4 rounded-xl flex flex-col gap-4 transition-all ${req.status === 'Accepted' ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100 shadow-sm'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-widest">{req.item?.name || 'Item'}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${req.status === 'Accepted' ? 'bg-emerald-500 text-white' : 'bg-amber-100 text-amber-700'}`}>{req.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold text-sm border">{(req.renter?.name || req.renterName || 'U')[0]}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{req.renter?.name || req.renterName || 'Renter'}</p>
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] font-medium">
                      <Phone size={10} /> {req.phone || '-'} • <Clock size={10} /> {req.duration} {req.durationUnit}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-50">
                  {req.status === 'Pending' && (
                    <>
                      <button onClick={() => handleRespond(req._id, 'Accepted')} className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-emerald-700 transition-colors"><Check size={14} /> Accept</button>
                      <button onClick={() => handleRespond(req._id, 'Rejected')} className="flex-1 bg-white border border-rose-100 text-rose-500 py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-rose-50 transition-colors"><Trash2 size={14} /> Reject</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machinery.map((item) => (
          <div key={item._id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 transition-all group shadow-sm flex flex-col">
            <div className="h-64 bg-slate-50 flex items-center justify-center relative border-b border-slate-100">
              {item.img ? (
                <img src={item.img} className="w-full h-full object-cover object-top" alt={item.name} />
              ) : (
                <Tractor size={40} className="text-slate-200" />
              )}
              <div className="absolute top-3 right-3 bg-[#0f172a] text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                ₹{item.price}<span className="text-[10px] opacity-60">/{item.unit}</span>
              </div>
            </div>
            <div className="p-5 space-y-4 flex-1 flex flex-col">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm">{item.name}</h3>
                <ShieldCheck size={18} className={isOwnItem(item) ? 'text-blue-500' : 'text-emerald-500'} />
              </div>
              <div className="text-[11px] font-medium text-slate-500 space-y-2">
                <p className="flex items-center gap-1"><MapPin size={12} /> {item.location || item.owner?.state || '-'}</p>
                <p className="flex items-center gap-1"><User size={12} /> Owner: <span className="text-slate-700 font-bold">{item.owner?.name || 'Farmer'}</span></p>
              </div>
              <button
                disabled={item.status === 'Booked'}
                onClick={() => setShowBookModal(item)}
                className={`w-full py-2.5 mt-auto rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${item.status === 'Available' ? 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100'}`}
              >
                {item.status === 'Available' ? <><CalendarCheck size={14} /> Book Rental</> : <><Clock size={14} /> Booked</>}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBookModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow-xl animate-in zoom-in duration-200 border border-slate-200">
            <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-3">
              <h2 className="text-base font-bold text-slate-800">Booking Details</h2>
              <button onClick={() => setShowBookModal(null)} className="p-1 cursor-pointer hover:bg-slate-100 rounded-md transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Full Name</label>
                <input type="text" placeholder="e.g. Ramesh Patel" value={bookingForm.renterName} onChange={(e) => setBookingForm({ ...bookingForm, renterName: e.target.value })} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Phone</label>
                <input type="tel" placeholder="+91" value={bookingForm.phone} onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Start Date</label>
                  <input type="date" value={bookingForm.date} onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Duration ({showBookModal.unit})</label>
                  <input type="number" placeholder="1" value={bookingForm.duration} onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" />
                </div>
              </div>
            </div>
            <button onClick={handleConfirmBooking} disabled={saving} className="w-full mt-8 bg-[#0f172a] text-white py-3 rounded-xl font-bold text-sm cursor-pointer shadow-lg active:scale-95 hover:bg-blue-600 transition-all disabled:opacity-70">
              {saving ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Confirm Rental Request'}
            </button>
          </div>
        </div>
      )}

      {showListModal && isFarmer && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white w-full max-w-lg rounded-xl p-8 shadow-2xl relative animate-in zoom-in duration-200 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Register Equipment</h2>
              <button onClick={() => setShowListModal(false)} className="cursor-pointer bg-slate-50 rounded-lg p-1 hover:bg-slate-100 transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddMachine} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Machine Name</label>
                <input type="text" placeholder="e.g. Swaraj 855 FE" value={newMachine.name} onChange={(e) => setNewMachine({ ...newMachine, name: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm focus:border-blue-500 transition-colors" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Rent Rate (₹)</label>
                  <input type="number" placeholder="500" value={newMachine.price} onChange={(e) => setNewMachine({ ...newMachine, price: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" required />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Pricing Unit</label>
                  <select value={newMachine.unit} onChange={(e) => setNewMachine({ ...newMachine, unit: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-bold cursor-pointer outline-none">
                    <option value="Day">Per Day</option>
                    <option value="Hour">Per Hour</option>
                    <option value="Acre">Per Acre</option>
                  </select>
                </div>
              </div>
              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-100 rounded-xl h-44 flex flex-col items-center justify-center text-slate-400 bg-slate-50 cursor-pointer overflow-hidden transition-colors hover:bg-slate-100">
                {newMachine.img ? <img src={newMachine.img} className="w-full h-full object-cover" alt="preview" /> : <><ImagePlus size={28} /><p className="text-[10px] font-bold mt-2 uppercase tracking-widest">Upload Machine Photo</p></>}
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
              <button type="submit" disabled={saving} className="w-full mt-4 bg-[#0f172a] text-white py-4 rounded-xl font-bold text-sm cursor-pointer shadow-xl active:scale-95 transition-all disabled:opacity-70">
                {saving ? <Loader2 size={18} className="animate-spin mx-auto" /> : 'Register and List for Rent'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default RentalHub;
